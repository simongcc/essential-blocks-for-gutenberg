/*
* Card Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import './style.scss';
import './editor.scss';

/*
* Card Block Libraries
 */

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
	Button

} from '../../utils/wp-import'


/*
* Register Cards Block
*/



export default registerBlockType(
    'gutenberg-blocks/card',
    {
        title : __('Cards', 'ugb'),
        description: __('Ultimate Gutenberg Cards Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.swap
        },
        keywords: [
            __('Cards', 'ugb'),
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
            } = props;


            const onSelectImage = img =>{
                setAttributes({
                    imageID: img.id,
                    imageUrl: img.url,
                    imageAlt: img.alt,
                })
            }

            const onRemoveImage = () =>{
                setAttributes({
                    imageID: null,
                    imageUrl: null,
                    imageAlt: null
                })
            }

            const mainClasses = classnames( [
                className,
                'ugb-card',
            ], {
                'has-image': imageUrl,
            })

            return (
                
                  <Fragment>

                        <div className={ mainClasses }>

                            <div className={ 'wp-block-ugb-card-image' }>
                                { ! imageID ? (

                                    <div className="button-container">
                                        <MediaUpload
                                            onSelect={ onSelectImage }
                                            type="image"
                                            value={ imageID }
                                            render = { ( { open } ) => (
                                                <Button
                                                    className= { "button button-large" }
                                                    onClick={ open }
                                                >
                                                    { icons.upload }
                                                    { __('Upload Image', 'ugb')}
                                                </Button>
                                        )}
                                        >
                                        </MediaUpload>
                                    </div>


                                ) : (
                                    <p class="image-wrapper">
                                        <img
                                            src={ imageUrl }
                                            alt={ imageAlt }
                                        />

                                        { isSelected ? (

                                            <Button
                                                className="remove-image"
                                                onClick={ onRemoveImage }
                                            >
                                                { icons.remove }
                                            </Button>

                                        ) : null }

                                    </p>
                                )
                            }

                        </div>

                        <div className={ 'wp-block-ugb-card-content' }>

                            <RichText
                              onChange={ content => setAttributes({ title: content }) }
                              value={ title }
                              placeholder="Your card title"
                              className="heading"
                            />

                            <RichText
                              onChange={ content => setAttributes({ body: content }) }
                              value={ body }
                              multiline="p"
                              placeholder="Your card text"
                              formattingControls={ ['bold', 'italic', 'underline'] }
                              isSelected={ isSelected }
                              className="card_body"
                            />
                        </div>
                    </div>
                
                </Fragment>
                
            )

        },
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
