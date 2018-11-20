/*
* Heading & Sub Heading Dependencies
*/

import icons from '../../utils/icons';
import './style.scss';
import './editor.scss';

/*
* Heading & Sub Heading Libraries
 */

import {
    __,
    registerBlockType,
    SelectControl,
    ToggleControl,
    InspectorControls,
    RichText,
    PanelBody,
    Fragment,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar

} from '../../utils/wp-import'

/*
* Register Heading & Sub Heading
 */



export default registerBlockType(
    'essential-gutenberg-blocks/title-subtitle',
    {
        title : __('Heading & Sub Heading', 'ugb'),
        description: __('Ultimate Gutenberg Heading & Sub Heading', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.title_subtitle
        },
        keywords: [
            __('Heading & Sub Heading', 'ugb'),
            __('EBG Heading & Sub Heading', 'ugb')
        ],

        attributes:{
            title:{
                type: 'html',
                selector: '.section-title',
                default: __('All the tools you’ll need', 'ugb')
            },            
            content:{
                type: 'html',
                selector: 'p',
                default: __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'ugb')
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
                default: 'center'
            },
            blockAlignment: {
                type: 'string',
                default: 'center'
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
                    title,
                    content,
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


                    <div
                        className={`egb-title-subtitle section-top text-center` }>
                        
                        <RichText
                            tagName="h2"
                            placeholder={ title.default }
                            value={ title }
                            onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
                            className={`section-title`}
                            style={{
                                textAlign: textAlignment
                            }}
                            keepPlaceholderOnFocus
                        />
                        
                        <RichText
                            tagName="p"
                            placeholder={ content.default }
                            value={ content }
                            onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
                            style={{
                                textAlign: textAlignment
                            }}
                            keepPlaceholderOnFocus
                        />
                    </div>

                </Fragment>
            )

        },
        save: props => {
            const{
                    title,
                    content,
                    textColor,
                    bgColor,
                    alertClass,
                    dismissible,
                    blockAlignment,
                    textAlignment,
            } = props.attributes;

            const buttonStyle = {
                backgroundColor: bgColor,
                color: textColor,
                textAlign: textAlignment
            }

            return(

                <div className={`egb-title-subtitle section-top align${blockAlignment}`}>

                        <RichText.Content
                            tagName="h2"
                            placeholder={ title.default }
                            value={ title }
                            onChange={( title )=> setAttributes({ title })}
                            className={`section-title`}
                            style={{
                                textAlign: textAlignment
                            }}
                        />

                        <RichText.Content
                            tagName="p"
                            placeholder={ content.default }
                            value={ content }
                            onChange={( content )=> setAttributes({ content })}
                            style={{
                                textAlign: textAlignment
                            }}                            
                        />
                </div>
            )


        },

    },
);
