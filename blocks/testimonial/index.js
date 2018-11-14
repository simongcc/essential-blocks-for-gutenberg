/*
* Card Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import Edit from './Edit';

import './style.scss';
import './editor.scss';

/*
 * Card Block Libraries
 */

import {
    __,

    registerBlockType,
} from '../../utils/wp-import'


/*
* Register Cards Block
*/


export default registerBlockType(
    'gutenberg-blocks/testimonial',
    {
        title : __('Testimonial', 'ugb'),
        description: __('Essential Gutenberg Testimonial Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.swap
        },
        keywords: [
            __('Testimonial', 'ugb'),
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

        edit: Edit,
        save: props => {

            const { title, body, imageUrl, imageAlt } = props.attributes;


            const cardImage = (imageUrl, imageAlt) => {
                if(!imageUrl) return null;

                if(imageAlt) {
                    return (
                        <img
                            className="card_image"
                            src={ imageUrl }
                            alt={ imageAlt }
                        />
                    );
                }

                // No alt set, so let's hide it from screen readers
                return (
                    <img
                        className="card_image"
                        src={ imageUrl }
                        alt=""
                        aria-hidden="true"
                    />
                );
            };

            return (
                <div className="card">
                    { cardImage( imageUrl, imageAlt) }
                    <div className="card_content">
                        <h3 className="card_title">{ title }</h3>
                        <div className="card_body">
                            { body }
                        </div>
                    </div>
                </div>
            );

        },

    },
);
