/*
* Testimonial Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import uuid from 'uuid/v4'

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
            src: icons.swap
        },
        keywords: [
            __('Testimonial', 'ugb'),
            __('Content', 'ugb')
        ],

        attributes:{
            title:{
                type: 'html',
                selector: '.add-new__input',
                default: __( 'Card Title Here','ugb' ),
            },
            id:{
                type: 'number'
            },            
            content: {
                type: 'html',
                selector: '.card_body',
                default: __( 'Card Content Here','ugb' ),
            },
            newItem: {
                type: 'array',
                selector: 'children',
                default: []
            },

            // body: {
            //     type: 'array',
            //     source: 'children',
            //     selector: '.card_body',
            //     default: __( 'Card Content here...','ugb' ),
            // },
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
                    content,
                    newItem,
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

            const handleInputNewItem = (e) => {
                let itemEl = e.currentTarget,
                    name = itemEl.getAttribute('name'),
                    value = itemEl.value;
                setAttributes({
                    [name]: value
                });
            }

            const handleItemDelete = (id) => {
                let itemToKeep = newItem.filter((item) => item.id !== id)
                setAttributes({
                    newItem: itemToKeep
                });
            }
        
            const handleAddNewItem = () => {
                let itemArray = newItem.slice(),
                    copyItem = { 
                        id: uuid(),
                        title,
                        content,
                        imageID,
                        imageAlt,
                        imageUrl,
                     };
                itemArray.push( copyItem );
                
                setAttributes({
                    title:'',
                    content:'',
                    imageID: '',
                    imageAlt:'',
                    imageUrl:'',
                    newItem: itemArray
                });
            }



            const mainClasses = classnames( [
                className,
                'ugb-testimonial',
            ], {
                'has-image': imageUrl,
            })


            return (

                <Fragment>
                        <div className={ mainClasses }>

                            <div 
                                className={ 'wp-block-gutenberg-blocks-testimonial' }>

                                <RichText
                                    tagName="h2"
                                    value={ title }
                                    placeholder={ title.default }
                                    onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
                                    className={`section-title`}
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

                                <RichText
                                    placeholder={ content.default }
                                    value={ content }
                                    className="card_body"
                                    onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
                                    keepPlaceholderOnFocus
                                />                                
                            </div>

                            <button 
                                id="add-new__btn" 
                                className="button button-primary" 
                                onClick={ handleAddNewItem }>
                                Add New
                            </button>
                            
                            
                            { newItem.map( item => {
                                return (
                                    <div className="testimonial_list">
                                        <h4>{item.title}</h4>
                                        <p>Content: {item.content}</p>
                                        <p>Image: {item.image}</p>
                                        <button onClick={() => handleItemDelete(item.id)}>delete</button>
                                    </div>
                                )
                            } )}

                        </div>

                </Fragment>

            )

        },


        
        save: props => {

            const { title, content, imageUrl, imageAlt } = props.attributes;


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
