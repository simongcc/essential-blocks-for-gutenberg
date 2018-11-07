/*
* Card Block Dependencies
*/

import icons from '../../utils/icons';
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
                selector: '.card_title'
            },
            body: {
              type: 'array',
              source: 'children',
              selector: '.card_body'
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
                'has-image': mediaURL,
            } )

            return (
                
                  <Fragment>
                        <BlockControls>
                            
                            <AlignmentToolbar
                                value={ textAlignment }
                                onChange={ textAlignment => setAttributes( { textAlignment } ) }
                            />
                        </BlockControls>
                        

                        <div className={ mainClasses }>
                            
                            { ! imageID ? (

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
                        />
                    </div>
                
                </Fragment>
                
            )

        },
        save: props => {



        },

    },
);
