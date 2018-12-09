
import {
    __,
    Fragment,
    Editable,
    isSelected,
    Toolbar,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
    Dashicon,
    registerBlockType,
    MediaUpload,
    RichText,
    Button,
    Component

} from '../../utils/wp-import'
import icons from "../../utils/icons";

class Item extends Component {

    saveItem (attrs) {
        this.props.saveItem(this.props.item.id, ( {...this.props.item, ...attrs}))
    }


    render(){
        const {
                id,
                title,
                designation,
                imageID,
                imageUrl,
                body_content
        } = this.props.item

        return (
            <div className={ 'wp-block-gutenberg-blocks-testimonial' }>

                <button
                    className="egb_testiomonial_delete"
                    onClick={ () => this.props.deleteItem(id)}

                >
                        { icons.trash }
                </button>

                <RichText
                    tagName="h6"
                    value={ title }
                    placeholder={ __( 'Jordan Ramos','ugb' ) }
                    onChange={ title => this.saveItem( { title } ) }

                />

                <RichText
                    tagName="div"
                    value={ designation }
                    placeholder={ __( 'King of the North, GoT','ugb' ) }
                    onChange={ designation => this.saveItem( { designation } ) }
                    className={`designation`}

                />

                <RichText
                    tagName="h6"
                    multiline= "true"
                    value={ body_content }
                    placeholder={ __( 'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'ugb' ) }
                    onChange={ body_content => this.saveItem( { body_content } ) }
                    className={`testimonial_content`}

                />



                { ! imageID ? (

                    <div className="button-container">
                        <MediaUpload
                            // onSelect={ onSelectImage }
                            onSelect={ ( img ) => this.saveItem(
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
                        <p className="image-wrapper">
                            <img
                                src={ imageUrl }
                                alt='Testimonial Image'
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
        )


    }
}

export default Item;
