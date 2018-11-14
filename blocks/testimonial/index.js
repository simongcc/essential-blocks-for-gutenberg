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
    'essential-gutenberg-blocks/testimonial',
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
                source: 'rich-text',
                selector: '.add-new__input'
            },
            id:{
                type: 'number'
            },            
            content: {
                source: 'rich-text',
                selector: '.add-new__body'
            },
            newItem: {
                type: 'array',
                selector: 'children',
                default: []
            },

            // body: {
            //     type: 'array',
            //     source: 'children',
            //     selector: '.testimonial_body',
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

                            <div className={ 'wp-block-gutenberg-blocks-testimonial' }></div>

                                <RichText
                                    tagName='p'
                                    className={ 'add-new__input' }
                                    onChange={ title => setAttributes({ title: title }) }
                                    value={ title }
                                    placeholder={ __( 'Add New Title', 'ugb' ) }
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
                                    onChange={ content => setAttributes({ content: content }) }
                                    value={ content }
                                    placeholder="Your card text"
                                    className="testimonial_body"
                                />

                                <Button 
                                    id="add-new__btn" 
                                    className="button button-primary" 
                                    onClick={ handleAddNewItem }>
                                    Add New
                                </Button>
                            
                            
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

            const { 
                title,
                content,
                imageAlt,
                imageUrl 
            } = props.attributes;


            const cardImage = (imageUrl, imageAlt) => {
                if(!imageUrl) return null;

                if(imageAlt) {
                    return (
                        <img
                            className="testimonial_image"
                            src={ imageUrl }
                            alt={ imageAlt }
                        />
                    );
                }

                // No alt set, so let's hide it from screen readers
                return (
                    <img
                        className="testimonial_image"
                        src={ imageUrl }
                        alt=""
                        aria-hidden="true"
                    />
                );
            };

            return (
                <div className="testimonial_content">
                    { cardImage( imageUrl, imageAlt) }
                    <div className="testimonial_content">
                        <h3 className="testimonial_title">{ title }</h3>
                        <div className="testimonial_body">
                            { content }
                        </div>
                    </div>
                </div>
            );

        },

    },
);
