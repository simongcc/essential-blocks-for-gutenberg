/*
* Block: Blockquote Block Dependencies
*/

import icons from '../../utils/icons';
import './style.scss';
import './editor.scss';

/*
* Blockquote Block Libraries
 */

import {
    __,
    registerBlockType,
    SelectControl,
    ToggleControl,
    InspectorControls,
    RichText,
    PanelBody,
    PanelColorSettings,
    Fragment,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar

} from '../../utils/wp-import'

/*
* Register Blockquote Block
 */



export default registerBlockType(
    'gutenberg-blocks/blockquote',
    {
        title : __('Blockquote', 'ugb'),
        description: __('Ultimate Gutenberg Blockquote Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.leftquote
        },
        keywords: [
            __('Blockquote Message', 'ugb')
        ],

        attributes:{
            content:{
                type: 'array',
                source: 'rich-text',
                selector: 'p',
                default: __('I learned that courage was not the absence of fear', 'ugb')
            },
            textColor: {
                type: 'string',
                default: '#155724'
            },
            bgColor: {
                type: 'string',
                default: '#d4edda'
            },
            textAlignment: {
                type: 'string',
            },
            blockAlignment: {
                type: 'string',
                default: 'center',
            },
        },
        getEditWrapperProps( { blockAlignment } ){
            if( 'left' === blockAlignment ||
                'right' === blockAlignment ||
                'full' === blockAlignment
            ){
                return { 'data-align': blockAlignment };
            }
        },
        edit: props =>{

            const{
                attributes: {
                    content,
                    textColor,
                    bgColor,
                    textAlignment,
                    blockAlignment,
                },
                isSelected, setAttributes, className
            } = props;

            return (
                <Fragment>
                    <BlockControls>
                        <BlockAlignmentToolbar
                            value={ blockAlignment }
                            onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
                        />
                        <AlignmentToolbar
                            value={ textAlignment }
                            onChange={ textAlignment => setAttributes( { textAlignment } ) }
                        />
                    </BlockControls>

                    <InspectorControls>
                        <PanelBody>
                            <PanelColorSettings
                                title={ __( 'Color Settings' ) }
                                colorSettings={ [
                                    {
                                        value: textColor,
                                        onChange: ( colorValue ) => setAttributes( { textColor: colorValue } ),
                                        label: __( 'Text Color' ),
                                    },
                                    {
                                        value: bgColor,
                                        onChange: ( colorValue ) => setAttributes( { bgColor: colorValue } ),
                                        label: __( 'Quote Background Color' ),
                                    },
                                ] }
                            >
                            </PanelColorSettings>
                        </PanelBody>
                    </InspectorControls>

                    <blockquote
                        className="ugb-blockqoute"
                    >
                        <RichText
                            className='ugb-blockquote-text'
                            value={ content }
                            onChange={ ( nextValue ) => setAttributes( { content: nextValue } ) }
                            isSelected={ isSelected }
                            style={ {
                                color: textColor,
                            } }
                        />
                    </blockquote>
                </Fragment>
            )

        },
        save: props => {
            const{
                content,
                textColor,
                bgColor,
                blockAlignment,
                textAlignment,
            } = props.attributes;

            return(
                <blockquote className='ugb-alert'>
                    <RichText.Content
                        tagName="p"
                        value={ content }
                        style={ { textColor } }
                    />
                </blockquote>
            )


        },

    },
);
