/*
* Instagram Block Dependencies
*/

import icons from '../../utils/icons';
// import classnames from 'classnames';
import { attributes } from './attributes';
import { default as edit } from './edit';

import './style.scss';
import './editor.scss';

import {
    __,
    registerBlockType
} from '../../utils/wp-import';



/*
* Register Testimonial Blocks
*/

export default registerBlockType(
    'easy-blocks/instagram',
    {
        title : __('Instagram', 'ugb'),
        description: __('Easy Instagram Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.testimonial
        },
        keywords: [
            __('Easy Blocks', 'ugb'),
            __('Instagram', 'ugb'),
            __('Easy Instagram', 'ugb')
        ],

        attributes,

        edit: edit,

        save( { attributes, className } ){
            return null;
        }

    },
);
