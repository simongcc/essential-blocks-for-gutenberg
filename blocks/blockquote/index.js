/*
* Block: Blockquote Block Dependencies
*/

import icons from '../../utils/icons';
import './editor.scss';
import './style.scss';


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
            __('Blockquote Message', 'ugb'),
            __('EBG Blockquote Message', 'ugb')
        ],

        attributes:{
            content:{
                type: 'array',
                source: 'rich-text',
                selector: 'p',
                default: __('I learned that courage was not the absence of fear, but the triumph over it. The braveman is not he who does not feel afraid, but he who conquers that fear. - Nelson Mandela', 'ugb')
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
                editable, isSelected, setState, setAttributes, className
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
                        className={'ugb-blockqoutes'}
                        style={ {
                            '--quote-color': bgColor
                        } }
                    >
                        <RichText
                            className='ugb-blockquotes-text'
                            value={content}
                            onChange={(content)=> setAttributes({content})}
                            isSelected={ isSelected }
                            style={{
                                // backgroundColor: bgColor,
                                color: textColor,
                                // textAlign: textAlignment
                            }}
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
                <blockquote
                    className={`ugb-blockquotes align${blockAlignment}`}
                    style={ { '--quote-color': bgColor } }
                >
                    <RichText.Content
                        tagName="p"
                        value={ content }
                        className='ugb-blockquote-text'
                        style={ { color: textColor } }
                    />
                </blockquote>
            )


        },

    },
);
