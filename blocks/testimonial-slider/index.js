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
    'egb-gutenberg-blocks/testimonial-slider',
    {
        title : __('Testimonial Slider', 'ugb'),
        description: __('Essential Gutenberg Testimonial Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.card
        },
        keywords: [
            __('EGB', 'ugb'),
            __('Testimonial Slider', 'ugb'),
            __('EGB Testimonial Slider', 'ugb')
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

                                    <RichText.Content
                                        tagName="p"
                                        value={ item.body_content }
                                    />

                                    <RichText.Content
                                        tagName="h6"
                                        value={ item.title }
                                    />
                                    <RichText.Content
                                        tagName="span"
                                        className="designation"
                                        value={ item.designation }
                                    />

                                    <img
                                        className="testimonial_image"
                                        src={ item.imageUrl }
                                    />

                                </div>
                            ))}
                        </div>
                    </div>
            )

        }

    }
)