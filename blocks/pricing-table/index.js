/*
* Pricing Table Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import uuid from 'uuid/v4';
import EditPricing from './edit';
import SavePricing from './save';


import './style.scss';
import './editor.scss';

/*
 * Pricing Table Block Libraries
 */

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


/*
* Register Pricing Table Block Slider
*/

export default registerBlockType(
    'gutenberg-blocks/pricing-table',
    {
        title : __('Pricing Table', 'ugb'),
        description: __('Essential Gutenberg Pricing Table Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.pricing
        },
        keywords: [
            __('EGB', 'ugb'),
            __('Pricing Table', 'ugb'),
            __('EBG Pricing Table', 'ugb')
        ],

        edit: EditPricing,

        save: SavePricing

    }
)