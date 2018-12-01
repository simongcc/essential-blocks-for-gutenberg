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
    // Component,
    // Toolbar,
    registerBlockType,
    // BlockControls,
    // AlignmentToolbar,
    // BlockAlignmentToolbar,
    MediaUpload,
    RichText,
    Button

} from '../../utils/wp-import'


/*
* Register Testimonial Blocks
*/

export default registerBlockType(
    'gutenberg-blocks/testimonial-slider',
    {
        title : __('Testimonial Slider', 'ugb'),
        description: __('Essential Gutenberg Testimonial Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.swap
        },
        keywords: [
            __('Testimonial Slider', 'ugb'),
            __('EGB Testimonial Slider', 'ugb')
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
            body_content: {
                type: 'html',
                selector: '.details',
                default: __( 'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium','ugb' ),
            },
            newItem: {
                type: 'array',
                selector: 'children',
                default: []
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
                    body_content,
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

            const onRemoveListImage = (imageID) =>{
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
                        designation,
                        body_content,
                        imageID,
                        imageAlt,
                        imageUrl,
                     };
                itemArray.push( copyItem );
                
                setAttributes({
                    title:'',
                    designation:'',
                    body_content:'',
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


            const testimonialListImage = (imageUrl, imageAlt) => {
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

                <Fragment>
                        <div className={ mainClasses }>

                            <div 
                                className={ 'wp-block-gutenberg-blocks-testimonial' }>
                                
                                <RichText
                                    tagName="div"
                                    placeholder={ body_content.default }
                                    value={ body_content }
                                    placeholder={ __( 'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium','ugb' ) }
                                    className="details"
                                    onChange={ ( nextbody_content ) => setAttributes( { body_content: nextbody_content } ) }
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

                            <button 
                                id="add-new__btn" 
                                className="button button-primary" 
                                onClick={ handleAddNewItem }>
                                Add New
                            </button>
                            
                            {
                                newItem.map((i, index) => <li
                                    key={i.id} 
                                    onClick={e => index}
                                    >{index}</li>
                                    )
                            }
                            
                            { newItem.map( item => {
                                console.log(item);
                               
                                return (
                                    <div className="testimonial_list">
                                    
                                        {/* console.log( newItem ); */}
                                        {/* {newItem.length > 0 && <ListItem item={newItem[ props.state.selectedItem]} handleItemDelete={ handleItemDelete } />} */}

                                        <RichText
                                            tagName="p"
                                            value={ item.body_content }
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
                                        
                                        <p>
                                            Image: 
                                        
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
                                        
                                        <button onClick={() => handleItemDelete(item.id)}>
                                            Delete
                                        </button>
                                    </div>
                                )
                            } )}

                        </div>

                </Fragment>

            )

        },


        
        save: props => {

            const { title, designation, body_content, imageUrl, imageAlt } = props.attributes;


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
                        <RichText
                            tagName="h3"
                            value={ title }
                            className={`card_title`}
                        />
                        <RichText
                            value={ designation }
                            className={`designation`}
                        />
                        <RichText
                            tagName="p"
                            value={ body_content }
                            className={`card_body`}
                        />
                    </div>
                </div>
            );

        },

    },
);