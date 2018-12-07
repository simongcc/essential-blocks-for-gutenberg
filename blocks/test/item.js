
import {
    __,
    Fragment,
    Editable,
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

class Item extends Component {

    saveItem (attrs) {
        this.props.saveItem(this.props.item.id, ( {...this.props.item, ...attrs}))
    }


    render(){
        const {
                title,
                designation,
                body_content
        } = this.props.item

        return (
            <div className={ 'wp-block-gutenberg-blocks-testimonial' }>
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
            </div>
        )


    }
}

export default Item;
