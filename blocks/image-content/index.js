/*
* Image & Content Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import './style.scss';
import './editor.scss';


/*
* Image & Content Libraries
 */

import {
    __,
    registerBlockType,
    SelectControl,
    InspectorControls,
    RichText,
    PanelBody,
    Fragment,
    Button,
    MediaUpload,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar

} from '../../utils/wp-import'

/*
* Register Image & Content
 */



export default registerBlockType(
    'essential-gutenberg-blocks/image-content',
    {
        title : __('Image & Content', 'ugb'),
        description: __('Ultimate Gutenberg Image & Content', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.image_content
        },
        keywords: [
            __('EGB', 'ugb'),
            __('Image & Content', 'ugb'),
            __('EBG Image & Content', 'ugb')
        ],

        attributes:{
            title:{
                type: 'html',
                selector: '.item-title',
                default: __('All the tools you’ll need', 'ugb')
            },            
            content:{
                type: 'html',
                selector: 'p',
                default: __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'ugb')
            },
            imageID: {
                type: 'number',
            },
            imageAlt: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',
            },
            imageUrl: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: 'img',
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
            imgAlignmentClass: {
                type: 'string',
                default: 'imgleft',
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
                    imageID,
                    imageAlt,
                    imageUrl,
                    textAlignment,
                    blockAlignment,
                    imgAlignmentClass
                },
                isSelected, setAttributes, className
            } = props;

            const imageContentAlignment = [
                { value: 'imgleft', label: "Image Left Content Right" },
                { value: 'imgright', label: "Image Right Content Left" }
            ];

            const onSelectImage = img =>{
                setAttributes({
                    imageID: img.id,
                    imageUrl: img.url,
                    imageAlt: img.alt,
                })
            }

            const onRemoveImage = () =>{
                setAttributes({
                    imageID: null,
                    imageUrl: null,
                    imageAlt: null
                })
            }

            const mainClasses = classnames( [
                className,
                'egb-image',
            ], {
                'has-image': imageUrl,
            })

            return (
                <Fragment>
                    
                    <div className={ mainClasses }>

                        <InspectorControls>
                            <PanelBody>
                                <SelectControl
                                    label={ __( 'Alignment Style' ) }
                                    value={ imgAlignmentClass }
                                    options={ imageContentAlignment.map( ({ value, label }) => ( {
                                        value: value,
                                        label: label,
                                    } ) ) }
                                    onChange={ ( newSize ) => { setAttributes( { imgAlignmentClass: newSize } ) } }
                                />
                            </PanelBody>
                        </InspectorControls>
                        
                    
 
                        <div className={`item tools-item ${imgAlignmentClass}` }>
                            
                            { ! imageID ? (

                                <div class="item-thumb">
                                    <MediaUpload
                                        onSelect={ onSelectImage }
                                        type="image"
                                        value={ imageID }
                                        render = { ( { open } ) => (
                                            <Button
                                                className= { "button button-large" }
                                                onClick={ open }
                                            >
                                                { icons.upload }
                                                { __('Upload Image', 'ugb')}
                                            </Button>
                                    )}
                                    >
                                    </MediaUpload>
                                </div>

                                ) : (
                                    <p class="image-wrapper">
                                        <img
                                            src={ imageUrl }
                                            alt={ imageAlt }
                                        />

                                        { isSelected ? (

                                            <Button
                                                className="remove-image"
                                                onClick={ onRemoveImage }
                                            >
                                                { icons.remove }
                                            </Button>

                                        ) : null }

                                    </p>
                                )
                            }

                        
                        <div className={ 'wp-block-egb-image-content item-details' }>

                            <RichText
                                tagName="h6"
                                placeholder={ title.default }
                                value={ title }
                                onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
                                className={`item-title`}
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
                        </div>

                    </div>
                </Fragment>
            )

        },
        save: props => {

            const{
                title,
                content,
                imageUrl,
                imageAlt,
                imgAlignmentClass,
                blockAlignment,
                textAlignment,
        } = props.attributes;


            const contentStyle = {
                textAlign: imgAlignmentClass
            }

            const cardImage = (imageUrl, imageAlt) => {
                if(!imageUrl) return null;

                if(imageAlt) {
                    return (
                        <img
                            className="card_image"
                            src={ imageUrl }
                            alt={ imageAlt }
                        />
                    );
                }

                // No alt set, so let's hide it from screen readers
                return (
                    <img
                        className="card_image"
                        src={ imageUrl }
                        alt=""
                        aria-hidden="true"
                    />
                );
            };


            return(

                <div 
                    className={`egb-image-content item tools-item ${imgAlignmentClass} align${blockAlignment}` }>
                    <div className="item-thumb">
                        { cardImage( imageUrl, imageAlt) }
                    </div>
                    <div className="item-details">

                        <RichText.Content
                            tagName="h6"
                            value={ title }
                            onChange={( title )=> setAttributes({ title })}
                            className={`item-title`}
                        />

                        <RichText.Content
                            tagName="p"
                            value={ content }
                            onChange={( content )=> setAttributes({ content })}
                        />
                                                    
                    </div>
                </div>
            )


        },

    },
);
