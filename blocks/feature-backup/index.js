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
    Button,
    Component

} from '../../utils/wp-import'



class EditSlider extends Component {

    componentDidMount() {
        if(this.props.attributes.newItem.length) {
            this.props.setAttributes(this.props.attributes.newItem[0])
            // console.log('set first one as default')
        }
    }

    render() {
            
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
            isSelected, setState, setAttributes, className
        } = this.props;

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

        const handleItemDelete = ( id ) => {
            let itemToKeep = newItem.filter((item) => item.id !== id)
            setAttributes({
                newItem: itemToKeep
            });
        }

        const selectItem = ( selectedItem, element ) => {
            // setAttributes({selectedItem})
            const item = newItem[selectedItem]
            
            const currentItem = element.currentTarget;
            const siblingItems = currentItem.parentElement.querySelectorAll('li');

            siblingItems.forEach(el => el.classList.remove("active"));

            currentItem.classList.add("active");

            setAttributes( item )
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
                                    tagName="h6"
                                    value={ title }
                                    placeholder={ __( 'Jordan Ramos','ugb' ) }
                                    onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
                                    
                                />   
                                
                                <RichText
                                    tagName="div"
                                    value={ designation }
                                    placeholder={ __( 'King of the North, GoT','ugb' ) }
                                    onChange={ ( nextDesignation ) => setAttributes( { designation: nextDesignation } ) }
                                    className={`designation`}
                                    
                                />

                                <RichText
                                    tagName="h6"
                                    multiline= "true"
                                    value={ body_content }
                                    placeholder={ __( 'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'ugb' ) }
                                    onChange={ ( nextbodyContent ) => setAttributes( { body_content: nextbodyContent } ) }
                                    className={`testimonial_content`}
                                    
                                />                                     

                                { ! imageID ? (

                                    <div className="button-container">
                                        <MediaUpload
                                            // onSelect={ onSelectImage }
                                            onSelect={ ( img ) => setAttributes(
                                                {
                                                    imageID: img.id,
                                                    imageUrl: img.url,
                                                }
                                            ) }
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
                            

                        <ul class="egb_testimonial_pagination">
                            {
                                newItem.map((i, index) => <li
                                    key={i.id} 
                                    onClick={e => selectItem( index, e )}
                                    className={( ( index == 0 ? 'active' : 'inactive' ) )}
                                    >{index + 1}</li>
                                )
                            }
                            <li 
                                id="add-new__btn" 
                                className="add-new__btn" 
                                onClick={ handleAddNewItem }>
                                { icons.plus }
                            </li>
                            
                        </ul>
                        
                        
                            

                    </div>

            </Fragment>

        )

    }
}


/*
* Register Testimonial Blocks
*/

export default registerBlockType(
    'easy-blocks/service-grid',
    {
        title : __('Feature Grid', 'ugb'),
        description: __('Easy Gutenberg Features Grid Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.slider
        },
        keywords: [
            __('EGB', 'ugb'),
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
            selectedItem:{
                type: 'number'
            },            
            body_content: {
                type: 'html',
                selector: '.testimonial_content',
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


        edit: EditSlider,


        
        save: props => {

            const { 
                    title, 
                    newItem,
                    designation, 
                    body_content, 
                    imageUrl,
                } = props.attributes;
            // console.log( newItem );
            

            const testimonialImage = (imageUrl) => {
                if(!imageUrl) return null;

                // if(imageAlt) {
                //     return (
                //         <img
                //             className="card_image"
                //             src={ imageUrl }
                //             alt='Testimonial Slider Image'
                //         />
                //     );
                // }

                // No alt set, so let's hide it from screen readers
                return (
                    <img
                        className="card_image"
                        src={ imageUrl }
                        alt='Testimonial Slider Image'
                        aria-hidden="true"
                    />
                );

            };

            

                
            return (    
                <div 
                    id="testimonial-slider"
                    className="testimonial-slider text-center carousel slide"  data-ride="carousel"
                >

                    <div class="carousel-inner">
                        
                        { newItem.map( ( item, index)  => { 
                            
                            return( 
                                
                                <div 
                                    className={( ( index == 0 ? 'carousel-item active' : 'carousel-item' ) )}
                                    onClick={this.handleClick}
                                >
                                    <RichText.Content
                                        tagName="p"
                                        className="details"
                                        value={ item.body_content }
                                    />

                                    <RichText.Content
                                        tagName="h3"
                                        value={ item.title }
                                    />
                                    
                                    <RichText.Content
                                        tagName="span"
                                        value={ item.designation }
                                    />

                                    { testimonialImage( item.imageUrl ) }

                                </div>
                            )

                        })}

                    </div> 

                </div>
            );
            

        },

    },
);