/*
* Testimonial Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';

import './style.scss';
import './editor.scss';

/*
 * Testimonial Block Libraries
 */

import {
    __,
    Fragment,
    Component,
    Toolbar,
    registerBlockType,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
    MediaUpload,
    RichText,
    Button

} from '../../utils/wp-import'


/*
* Register Testimonial Blocks
*/

export default registerBlockType(
    'gutenberg-blocks/testimonial',
    {
        title : __('Testimonial', 'ugb'),
        description: __('Essential Gutenberg Testimonial Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.testimonial
        },
        keywords: [
            __('Testimonial', 'ugb'),
            __('EBG Testimonial', 'ugb')
        ],

        attributes:{
            title:{
                type: 'html',
                selector: 'h6',
                default: __( 'Jordan Ramos','ugb' ),
            },
            designation:{
                type: 'html',
                selector: 'span',
                default: __( 'King of the North, GoT','ugb' ),
            },
            id:{
                type: 'number'
            },            
            content: {
                type: 'html',
                selector: '.details',
                default: __( 'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium','ugb' ),
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
            textAlignment: {
                type: 'string',
            },
            blockAlignment: {
                type: 'string',
                default: 'center',
            },
        },


        edit: props =>{
            
            const{
                attributes: {
                    title,
                    designation,
                    content,
                    imageID,
                    imageAlt,
                    imageUrl,
                    textAlignment,
                    blockAlignment
                },
                isSelected, setAttributes, className
            } = props;

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
                'egb-testimonial',
            ], {
                'has-image': imageUrl,
            })

            return (

                <Fragment>
                        <div className={ mainClasses }>

                            <div 
                                className={ 'wp-block-gutenberg-blocks-testimonial' }>
                                
                                <RichText
                                    tagName="p"
                                    placeholder={ content.default }
                                    value={ content }
                                    placeholder={ __( 'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium','ugb' ) }
                                    className="details"
                                    onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
                                    keepPlaceholderOnFocus
                                /> 

                                <RichText
                                    tagName="h6"
                                    value={ title }
                                    placeholder={ __( 'Jordan Ramos','ugb' ) }
                                    onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
                                    className={`name`}
                                    keepPlaceholderOnFocus
                                />   
                                
                                <RichText
                                    tagName="span"
                                    value={ designation }
                                    placeholder={ __( 'King of the North, GoT','ugb' ) }
                                    onChange={ ( nextDesignation ) => setAttributes( { designation: nextDesignation } ) }
                                    keepPlaceholderOnFocus
                                />
                                
                                { ! imageID ? (

                                    <div className="button-container">
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
                            </div>
                        </div>

                </Fragment>

            )

        },


        
        save: props => {

            const { title, designation, content, imageUrl, imageAlt } = props.attributes;


            const testimonialImage = (imageUrl, imageAlt) => {
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

            return (

                <div class="egb-testimonial">
                    <RichText.Content
                        tagName="p"
                        value={ content }
                        className={`details`}
                    />                    

                    <RichText.Content
                        tagName="h6"
                        value={ title }
                        className={`name`}
                    />                    
                    <RichText.Content
                        tagName="span"
                        value={ designation }
                    />
                    <div class="avatar">
                        { testimonialImage( imageUrl, imageAlt) }
                    </div>
                </div>

            );

        },

    },
);
