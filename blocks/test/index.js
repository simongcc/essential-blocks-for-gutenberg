import icons from '../../utils/icons';
import classnames from 'classnames';
import uuid from 'uuid/v4'

import './style.scss';
import './editor.scss';


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

const emptyItem = () => ({
    id: uuid(),
    title: '',
    designation: '',
    body_content: ''
})

class Item extends Component {
    
    saveItem = attrs => {
        this.props.saveItem(this.props.item.id, {...this.props.item, ...attrs})
    }
    
    
    render(){
        const {title, designation, body_content} = this.props.item
        
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
    
    class Edit extends Component {
        
        handleItemDelete = ( id ) => {
            let itemToKeep = this.props.items.filter((item) => item.id !== id)
            setAttributes({
                items: itemToKeep
            });
        }
        
        selectItem = ( selectedItem ) => {
            setAttributes({selectedItem})
        }
        
        handleAddNewItem = () => {
            const items = this.props.items.slice(),
            newItem = emptyItem()
            items[newItem.id] = newItem
            this.props.setAttributes({items});
        }
        
        saveItem = (id, item) => {
            const items = this.props.items.slice()
            items[id] = item
            this.props.setAttributes({items});
        }
        
        
        render() {
            const{
                attributes: {
                    items,
                }, setAttributes, className
            } = this.props;
            
            const mainClasses = classnames( [
                className,
                'ugb-testimonial',
            ], {
                'has-image': imageUrl,
            })

            itemLiClass = (id) => this.props.selectedItem === id ? 'active' : ''
            
            
            
            return(
                <Fragment>
                <div className={ mainClasses }>
                
                <Item item={this.props.items[this.props.selectedItem]} saveItem={this.saveItem} />
                
                <ul class="egb_testimonial_pagination">
                {
                    Object.keys(this.props.items).map((id, index) => <li
                      key={id} 
                      onClick={e => this.selectItem( id )}
                      className={this.itemLiClass(id)}
                    >{index + 1}</li>
                    )
                }
                <li 
                id="add-new__btn" 
                className="add-new__btn" 
                onClick={ this.handleAddNewItem }>
                { icons.plus }
                </li>
                
                </ul>
                
                </div>
                
                </Fragment>
                )
            }
        }
        
        export default registerBlockType(
            'gutenberg-blocks/testing',
            {
                title : __('Test Block', 'ugb'),
                description: __('Ultimate Gutenberg Cards Block', 'ugb'),
                category: 'gutenberg-blocks',
                icon:{
                    src: icons.card
                },
                keywords: [
                    __('Card', 'ugb'),
                    __('EBG Card Profile', 'ugb')
                ],
                
                
                attributes:{
                    selectedItem:{
                        type: 'string'
                    },            
                    itmes: {
                        type: 'array',
                        selector: 'children',
                        default: {}
                    },
                    
                },
                
                
                edit: Edit,
                
                save: props=>{
                    return(
                            <h2> Hellooo </h2>
                        )                        
                        }
                    
                    }
                )