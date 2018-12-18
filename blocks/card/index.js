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
        title : __('Card', 'ugb'),
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
            title:{
                source: 'html',
                selector: '.card_title',
                default: __( 'Card Title Here','ugb' ),
            },
            body: {
              type: 'html',
            //   source: 'children',
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
                                tagName={ 'h4' }
                                value={ title }
                                className={ 'ugb-card-heading' }
                                onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
                                placeholder={ title.default }
                                keepPlaceholderOnFocus
                            />
                            <RichText
                                placeholder={ body.default }
                                value={ body }
                                onChange={(body)=> setAttributes({body})}
                                className={`card_body`}
                                keepPlaceholderOnFocus
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
                        
                        <RichText.Content
                            tagName="h3"
                            value={ title }
                            onChange={( title )=> setAttributes({ title })}
                            className={`card_title`}
                        />

                        <RichText.Content
                            tagName="p"
                            value={ body }
                            className={`card_body`}
                            onChange={( body )=> setAttributes({ body })}
                        />

                    </div>
                </div>
            );

        },

    },
);
