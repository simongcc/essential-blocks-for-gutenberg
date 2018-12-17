/*
* Testimonial Block Slider Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import uuid from 'uuid/v4'

import './style.scss';
import './editor.scss';

/*
 * Testimonial Block Slider Libraries
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
* Register Testimonial Block Slider
*/

export default registerBlockType(
    'gutenberg-blocks/testimonial-slider',
    {
        title : __('Testimonial Slider', 'ugb'),
        description: __('Essential Gutenberg Testimonial Block Slider', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.swap
        },
        keywords: [
            __('Testimonial Slider', 'ugb'),
            __('EBG Testimonial Slider', 'ugb')
        ],

        attributes:{
            id:{
                source: "attribute",
                selector:".carousel-item",
                attribute: "id"
            },
            testimonials:{
                source: "query",
                detault: [],
                selector: ".carousel-item",
                query: {
                    index:{
                        source: "text",
                        selector: "span.testimonial-index"
                    },
                    author:{
                        source: "text",
                        selector: ".name"
                    },
                    content:{
                        source: "text",
                        selector: ".details"
                    },
                    designation:{
                        source: "text",
                        selector: "span"
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
                }
            },
            textAlignment: {
                type: 'string',
            },
            blockAlignment: {
                type: 'string',
                default: 'center',
            }
                        
        },


        edit: props =>{
            
            const{
                attributes: {
                    id,
                    testimonials,
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
                'ugb-testimonial',
            ], {
                'has-image': imageUrl,
            })



            if (!id) {
                const id = `testimonial${Math.floor(Math.random() * 100)}`;
                //maybe needed props
                setAttributes({
                    id
                });
            }

            const testimonialsList = testimonials
                .sort((a,b) => a.index -b.index)
                .map(testimonial =>{
                    return(
                        <div className="egb-testimonial-block">
                            <p>
                                <span>
                                    Insert Testimonial { Number (testimonial.index) + 1} Here:
                                </span>
                                <span
                                    className="remove-testimonial"
                                    onClick={() => {
                                        const newTestimonials = testimonials
                                        .filter( item => item.index != testimonial.index )
                                        .map( t =>{
                                            if( t.index > testimonial.index ){
                                                t.index -=1;
                                            }
                                            return t;
                                        });
                                        
                                        //maybe needed props
                                        setAttributes({
                                            testimonials = newTestimonials
                                        });

                                    }}
                                >
                                    <i className="fa fa-times" />
                                </span>
                            </p>

                            <div className="details">
                                <RichText
                                    tagName="p"
                                    value={ item.content }
                                    className="details"
                                    style={{ height: 60 }}
                                    placeholder={ __('Testimonial Content', 'ugb') }
                                    value={ testimonial.content }
                                    autofocus
                                    onChange={ content => {
                                        const newObject = Object.assign({}, testimonial, {
                                            content: content
                                        });
                                        setAttributes({
                                            testimonials: [
                                                ...testimonials.filter(
                                                    item => item.index != testimonial.index
                                                ),
                                                newObject
                                            ]
                                        })
                                    } }
                                />
                                    
                            </div>

                        </div>
                    )
                })

            return (

                <Fragment>
                        <div className={ mainClasses }>

                            <div 
                                className={ 'wp-block-gutenberg-blocks-testimonial' }>
                                
                                <RichText
                                    tagName="div"
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
                                    className="name"
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

                            <button 
                                id="add-new__btn" 
                                className="button button-primary" 
                                onClick={ handleAddNewItem }>
                                Add New
                            </button>
                            
                            
                            { newItem.map( item => {
                                // console.log(item);
                                return (
                                    <div className="testimonial_list">
                                        <RichText
                                            tagName="p"
                                            value={ item.content }
                                            className="details"
                                        />
                                        <RichText
                                            tagName="h6"
                                            value={ item.title }
                                            className="name"
                                        />
                                        <RichText
                                            tagName="span"
                                            value={ item.designation }
                                        />
                                        
                                        <p>Image: 
                                        {/* { testimonialListImage( item.imageUrl, item.imageAlt) } */}


                                        { ! item.imageID ? (

                                            <div className="button-container">
                                                <MediaUpload
                                                    onSelect={ onSelectImage }
                                                    type="image"
                                                    value={ item.imageID }
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
                                                            src={ item.imageUrl }
                                                            alt={ item.imageAlt }
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

                                        </p>
                                        
                                        <button onClick={() => handleItemDelete(item.id)}>delete</button>
                                    </div>
                                )
                            } )}

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
                <div className="card">
                    { testimonialImage( imageUrl, imageAlt) }
                    <div className="card_content">
                        <RichText.Content
                            tagName="h3"
                            value={ title }
                            className={`card_title`}
                        />
                        <RichText.Content
                            value={ designation }
                            className={`designation`}
                        />
                        <RichText.Content
                            tagName="p"
                            value={ content }
                            className={`card_body`}
                        />
                    </div>
                </div>
            );

        },

    },
);
