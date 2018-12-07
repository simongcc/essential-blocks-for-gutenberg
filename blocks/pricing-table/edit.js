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


export class EditPricing extends Component {

    componentDidMount() {
        if(this.props.attributes.newItem.length) {
            this.props.setAttributes(this.props.attributes.newItem[0])
            // console.log('set first one as default')
        }
    }
}