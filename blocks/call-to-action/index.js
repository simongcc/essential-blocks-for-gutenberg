/*
* Call to Action Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import './style.scss';
import './editor.scss';


/*
* Call to Action Block Libraries
*/


import {
    __,
    Fragment,
    Toolbar,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
    Dashicon,
    registerBlockType,
    MediaUpload,
    RichText,
    Button

} from '../../utils/wp-import'

export default registerBlockType(
    'gutenberg-blocks/cta',
    {
        title : __('Call To Action', 'ugb'),
        description: __('Ultimate Gutenberg Call To Action Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:'megaphone',
        keywords: [
            __('Call To Action', 'ugb'),
            __('Content', 'ugb')
        ],

        attributes:{
            title:{
                source: 'rich-text',
                selector: '.card_title',
                default: __( 'Card Title Here','ugb' ),
            },
            body: {
                type: 'array',
                source: 'children',
                selector: '.card_body',
                default: __( 'Card Content here...','ugb' ),
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
            return(
                <h1>Liton Arefin</h1>
            )

        },
        save: props => {

        }



    },
);
