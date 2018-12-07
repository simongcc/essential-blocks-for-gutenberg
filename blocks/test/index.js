import icons from '../../utils/icons';
import classnames from 'classnames';

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

import Edit from './edit'





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
            items: {
                type: 'object',
                selector: 'children',
                default: {}
            },

        },


        edit: Edit,

        save: props=>{
            // console.log(props)
            console.log('In save function', props)

            const {
                items
            } = props.attributes;

            return(

                    <div
                        id="testimonial-slider"
                        className="testimonial-slider text-center carousel slide"  data-ride="carousel"
                    >
                        <div className="carousel-inner">
                            {Object.values(items).map( ( item, index) => (

                                <div
                                    key={item.id}
                                    className={( ( index == 0 ? 'carousel-item active' : 'carousel-item' ) )}
                                >
                                    console.log( item )
                                    <RichText.Content
                                        tagName="h2"
                                        value={ item.title }
                                    />
                                    <RichText.Content
                                        tagName="p"
                                        value={ item.designation }
                                    />


                                </div>
                            ))}
                        </div>
                    </div>
            )

        }

    }
)