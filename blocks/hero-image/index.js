/*
* Hero Image Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import './style.scss';
import './editor.scss';


/*
* Hero Image Libraries
 */

import {
    __,
    registerBlockType,
    SelectControl,
    InspectorControls,
    RichText,
    PanelBody,
    Fragment,
    Button,
    MediaUpload,
    withColors,

    compose,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar

} from '../../utils/wp-import'

const validAlignments = [ 'left', 'center', 'right', 'wide', 'full' ];

function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		{};
}


const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ];
const IMAGE_BACKGROUND_TYPE = 'image';
const VIDEO_BACKGROUND_TYPE = 'video';
const AUDIO_BACKGROUND_TYPE = 'audio';

/*
* Register Hero Image
*/

export default registerBlockType(
    'essential-gutenberg-blocks/hero-image',
    {
        title : __('Hero Image', 'ugb'),
        description: __('Ultimate Gutenberg Hero Image', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.image_content
        },
        keywords: [
            __('Hero Image', 'ugb'),
            __('EBG', 'ugb'),
            __('Hero Image', 'ugb')
        ],

        attributes:{
            title:{
                type: 'string',
                source: 'html',
                selector: '.item-title',
                default: __('All the tools you’ll need', 'ugb')
            },            
            content:{
                type: 'html',
                selector: 'p',
                default: __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'ugb')
            },
            url: {
                type: 'string',
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
            textColor: {
                type: 'string',
                default: '#155724'
            },
            bgColor: {
                type: 'string',
                default: '#d4edda'
            },

            hasParallax: {
                type: 'boolean',
                default: false,
            },
            dimRatio: {
                type: 'number',
                default: 50,
            },
            overlayColor: {
                type: 'string',
            },
            customOverlayColor: {
                type: 'string',
            },
            backgroundType: {
                type: 'string',
                default: 'image',
            },

            textAlignment: {
                type: 'string',
            },
            blockAlignment: {
                type: 'string',
                default: 'full',
            },
            imgAlignmentClass: {
                type: 'string',
                default: 'imgleft',
            },

        },
        getEditWrapperProps( { attributes } ){
            const { blockAlignment } = attributes;
            if ( -1 !== validAlignments.indexOf( blockAlignment ) ) {
                return { 'data-align': blockAlignment };
            }
        },
        edit: props =>{

            const{
                attributes: {
                    title,
                    content,
                    imageID,
                    imageAlt,
                    imageUrl,
                    textAlignment,
                    blockAlignment,
                    imgAlignmentClass
                },
                isSelected, setAttributes, className
            } = props;

            const imageContentAlignment = [
                { value: 'imgleft', label: "Image Left Content Right" },
                { value: 'imgright', label: "Image Right Content Left" }
            ];

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
                'egb-image',
            ], {
                'has-image': imageUrl,
            })

            return (
                <Fragment>
                    

                        <InspectorControls>
                            <PanelBody>
                                <SelectControl
                                    label={ __( 'Alignment Style' ) }
                                    value={ imgAlignmentClass }
                                    options={ imageContentAlignment.map( ({ value, label }) => ( {
                                        value: value,
                                        label: label,
                                    } ) ) }
                                    onChange={ ( newSize ) => { setAttributes( { imgAlignmentClass: newSize } ) } }
                                />
                            </PanelBody>
                        </InspectorControls>
                        
                    
                        
                        <section 
                            className={ `banner-section banner-01 background-bg ${mainClasses}` }
                            // data-image-src="images/banner.png" 
                            style={ `background-image: url( ${imageUrl} )` }
                        >
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="banner-texts text-left">
                                            <h2 class="banner-title">Ultimate Landing Page for Anything Cool </h2>
                                            <p class="mt-4">
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                            </p>

                                            <a href="#" class="btn btn-lg mt-5">Try out Now</a>
                                        </div>
                                    </div>
                                    <div class="col-lg-6"></div>
                                </div>
                            </div>
                        </section>

 
                        <div className={`item tools-item ${imgAlignmentClass}` }>
                        </div>
                            { ! imageID ? (

                                <div class="item-thumb">
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

                        
                        <div className={ 'wp-block-egb-image-content item-details' }>

                            <RichText
                                tagName="h6"
                                placeholder={ title.default }
                                value={ title }
                                onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
                                className={`item-title`}
                                style={{
                                    textAlign: textAlignment
                                }}
                                keepPlaceholderOnFocus
                            />
                            
                            <RichText
                                tagName="p"
                                placeholder={ content.default }
                                value={ content }
                                onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
                                style={{
                                    textAlign: textAlignment
                                }}
                                keepPlaceholderOnFocus
                            />
                            </div>
                </Fragment>
            )

        },
        save: props => {
			// const { url, title, hasParallax, dimRatio, align } = attributes;
			// const style = backgroundImageStyles( url );
			// const classes = classnames(
			// 	dimRatioToClass( dimRatio ),
			// 	{
			// 		'has-background-dim': dimRatio !== 0,
			// 		'has-parallax': hasParallax,
			// 	},
			// 	align ? `align${ align }` : null,
			// );

			// return (
			// 	<section className={ classes } style={ style }>
			// 		<RichText.Content tagName="h2" value={ title } />
			// 	</section>
			// );
            const{
                title,
                content,
                imageUrl,
                imageAlt,
                imgAlignmentClass,
                blockAlignment,
                textAlignment,
        } = props.attributes;


            const contentStyle = {
                textAlign: imgAlignmentClass
            }

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


            return(

                <div 
                    className={`egb-image-content item tools-item ${imgAlignmentClass} align${blockAlignment}` }>
                    <div className="item-thumb">
                        { cardImage( imageUrl, imageAlt) }
                    </div>
                    <div className="item-details">

                        <RichText.Content
                            tagName="h6"
                            value={ title }
                            onChange={( title )=> setAttributes({ title })}
                            className={`item-title`}
                        />

                        <RichText.Content
                            tagName="p"
                            value={ content }
                            onChange={( content )=> setAttributes({ content })}
                        />
                                                    
                    </div>
                </div>
            )


        },

    },
);
