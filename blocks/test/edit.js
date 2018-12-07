import classnames from "classnames";
import icons from "../../utils/icons";
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

import uuid from 'uuid/v4'

import Item from './item';

const emptyItem = () => ({
    id: uuid(),
    title: '',
    designation: '',
    body_content: ''
})

class Edit extends Component {

    handleItemDelete( id ){
        let itemToKeep = this.getItems().filter((item) => item.id !== id)
        this.props.setAttributes({
            items: itemToKeep
        });
    }

    getItems() {

        return {...this.props.attributes.items};
    }

    selectItem( selectedItem ) {
        this.props.setAttributes({selectedItem})
    }

    handleAddNewItem () {
        const items = this.getItems(),
            newItem = emptyItem()
        items[newItem.id] = newItem
        this.props.setAttributes({items, selectedItem: newItem.id});
    }

    saveItem (id, item) {
        const items = this.getItems()
        items[id] = item
        this.props.setAttributes({items});
        console.log(this.props.attributes)
    }

    componentDidMount() {
        if(Object.values(this.getItems()).length === 0)
            this.handleAddNewItem()
    }


    render() {
        const {
            attributes: { items, selectedItem }, setAttributes, className
        } = this.props;

        const mainClasses = classnames( [
            className,
            'ugb-testimonial',
        ], {
            // 'has-image': imageUrl,
        })

        const itemLiClass = (id) => selectedItem === id ? 'active' : ''



        return(
            <Fragment>
                <div className={ mainClasses }>
                    <div
                        className={ 'wp-block-gutenberg-blocks-testimonial' }
                    >

                        <Item item={items[selectedItem] || {}} saveItem={this.saveItem.bind(this)} />

                        <ul className="egb_testimonial_pagination">
                            {
                                Object.keys(items).map((id, index) => <li
                                        key={id}
                                        onClick={e => this.selectItem( id )}
                                        className={itemLiClass(id)}
                                    >{index + 1}</li>
                                )
                            }
                            <li
                                id="add-new__btn"
                                className="add-new__btn"
                                onClick={ this.handleAddNewItem.bind(this) }>
                                { icons.plus }
                            </li>

                        </ul>



                        {/*<button*/}
                            {/*className="egb_testiomonial_delete"*/}
                            {/*onClick={ this.handleItemDelete( id )}>*/}
                            {/*{ icons.minus }*/}
                        {/*</button>*/}

                    </div>
                </div>

            </Fragment>
        )
    }
}

export default Edit;