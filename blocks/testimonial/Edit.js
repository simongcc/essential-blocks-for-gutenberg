import uuid from 'uuid/v4'
import AddItem from './AddItem'
import ListItem from './List';
import icons from '../../utils/icons';
// import classnames from 'classnames';


/*
 * Testimonial Block Libraries
 */

import {
    __,
    Fragment,
    Component,
    Toolbar,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
    MediaUpload,
    RichText,
    Button

} from '../../utils/wp-import'


export default class Edit extends Component {

    constructor(props) {
        super(...arguments);
        this.state = {
            item: {
                title:'',
                image: '',
                content: ''
            },
            newItem: []
        }
        this.handleInputNewItem = this.handleInputNewItem.bind(this);
        this.handleAddNewItem = this.handleAddNewItem.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    handleInputNewItem(e) {
        let itemEl = e.currentTarget,
            name = itemEl.getAttribute('name'),
            value = itemEl.value;
        this.setState(
            {
                item: {
                    ...this.state.item,
                    [name]: value
                }
            }
        );
    }

    handleItemDelete(id){
        let itemToKeep = this.state.newItem.filter((item) => item.id !== id)
        this.setState({
            newItem: itemToKeep
        });
    }

    handleAddNewItem() {
        let itemArray = this.state.newItem.slice(),
            item = this.state.item;
        item.id = uuid();
        itemArray.push(this.state.item);

        this.setState({
            item: {
                title:'',
                image: '',
                content: ''
            },
            newItem: itemArray
        });
    }

    render() {
        const items = this.state.newItem.slice();

        // const {
        //     attributes,
        //     setAttributes,
        // } = this.props;

        const{
            attributes: {
                title,
                body,
                imageID,
                imageAlt,
                imageUrl,
                textAlignment,
                blockAlignment
            },
            isSelected, setAttributes, className
        } = this.props;


        return (
            <Fragment>
                <BlockControls>
                    <BlockAlignmentToolbar
                        value={ blockAlignment }
                        onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
                    />
                    <AlignmentToolbar
                        value={ textAlignment }
                        onChange={ textAlignment => setAttributes( { textAlignment } ) }
                    />
                </BlockControls>
                
                    <div className="testimonial_container">
                        <AddItem handleAddNewItem={this.handleAddNewItem} handleInputNewItem={this.handleInputNewItem} item={this.state.item} />
                        {
                            items.map((item) =>{
                                return <ListItem key={item.id} item={item} handleItemDelete={this.handleItemDelete} />
                            })
                        }
                    </div>
                
            </Fragment>
        )
    }

}