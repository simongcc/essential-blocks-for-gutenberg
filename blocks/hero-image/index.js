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
    URLInput,
    IconButton,

    withColors,
    RangeControl,
    PanelColorSettings,
    ToggleControl,
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
                default: __('Ultimate Landing Page for Anything Cool', 'ugb')
            },            
            content:{
                type: 'html',
                selector: 'p',
                default: __('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'ugb')
            },
            buttonText:{
                type: 'html',
                selector: 'a',
                default: __( 'Try out Now','ugb' ),
            },
            buttonUrl:{
                type: 'string',
                source: 'attribute',
                attribute: 'href',
                selector: 'a',
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


        // getEditWrapperProps( { attributes } ){
        //     const { blockAlignment } = attributes;
        //     if ( -1 !== validAlignments.indexOf( blockAlignment ) ) {
        //         return { 'data-align': blockAlignment };
        //     }
        // },

        getEditWrapperProps( { blockAlignment } ){
            if( 'left' === blockAlignment ||
                'right' === blockAlignment ||
                'full' === blockAlignment
            ){
                return { 'data-align': blockAlignment };
            }
        },



        edit: props =>{

            const{
                attributes: {
                    title,
                    content,
                    buttonText,
                    buttonUrl,
                    backgroundType,
                    hasParallax,
                    overlayColor,
                    dimRatio,
                    imageID,
                    imageAlt,
                    imageUrl,
                    textAlignment,
                    blockAlignment,
                    imgAlignmentClass
                },
                isSelected, setAttributes, className, setOverlayColor
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

            const toggleParallax = () => setAttributes( { hasParallax: ! hasParallax } );
			const setDimRatio = ( ratio ) => setAttributes( { dimRatio: ratio } );
            // const style = backgroundImageStyles( imageUrl );

            const style = {
				...(
					backgroundType === IMAGE_BACKGROUND_TYPE ?
						backgroundImageStyles( imageUrl ) :
						{}
				),
                backgroundColor: overlayColor,
                
            };
            
			const classes = classnames(
				className,
				textAlignment !== 'center' && `has-${ textAlignment }-content`,
				dimRatioToClass( dimRatio ),
				{
					'has-background-dim': dimRatio !== 0,
					'has-parallax': hasParallax,
				}
            );
            
            return (
                <Fragment>

                    <BlockControls>
                        <BlockAlignmentToolbar
                            value={ blockAlignment }
                            onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
                        />
                        <AlignmentToolbar
                            value={ textAlignment }
                            onChange={ textAlignment => setAttributes( { textAlignment } ) }
                        />
                    </BlockControls>
                    

                    <InspectorControls>
                        { <PanelBody>
                            <SelectControl
                                label={ __( 'Alignment Style' ) }
                                value={ imgAlignmentClass }
                                options={ imageContentAlignment.map( ({ value, label }) => ( {
                                    value: value,
                                    label: label,
                                } ) ) }
                                onChange={ ( newSize ) => { setAttributes( { imgAlignmentClass: newSize } ) } }
                            />
                        </PanelBody>}

                        <PanelBody title={ __( 'Cover Settings' ) }>
                            { IMAGE_BACKGROUND_TYPE === backgroundType && (
                                <ToggleControl
                                    label={ __( 'Fixed Background' ) }
                                    checked={ hasParallax }
                                    onChange={ toggleParallax }
                                />
                            ) }
                            <PanelColorSettings
                                title={ __( 'Overlay' ) }
                                initialOpen={ true }
                                colorSettings={ [ {
                                    value: overlayColor,
                                    onChange: setOverlayColor,
                                    label: __( 'Overlay Color' ),
                                } ] }
                            >
                                <RangeControl
                                    label={ __( 'Background Opacity' ) }
                                    value={ dimRatio }
                                    onChange={ setDimRatio }
                                    min={ 0 }
                                    max={ 100 }
                                    step={ 10 }
                                />
                            </PanelColorSettings>
                        </PanelBody> 


                    </InspectorControls>
                        
                                            
                        <section 
                            className={ `banner-section banner-01 background-bg ${mainClasses}` }
                            // data-image-src="images/banner.png" 
                            style= { style }
                        >
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="banner-texts text-left">

                                            <RichText
                                                tagName="h2"
                                                placeholder={ title.default }
                                                value={ title }
                                                onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
                                                className={`banner-title`}
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
                                                className={`mt-4`}
                                                keepPlaceholderOnFocus
                                            />    


                                            { isSelected ? (
                                                <div class="hero-btn-container">
                                                    <RichText
                                                        tagName="a"
                                                        value={ buttonText }
                                                        onChange={ buttonText => setAttributes({ buttonText }) } 
                                                        className={`btn btn-lg mt-5`}
                                                    />
                                                    <form
                                                        onSubmit={ event => event.preventDefault() }
                                                    >

                                                        <URLInput
                                                            className="hero-btn-url"
                                                            value = { buttonUrl }
                                                            onChange={ buttonUrl => setAttributes({ buttonUrl }) } />
                                                        <IconButton
                                                            icon="editor-break"
                                                            label={ __('Apply', 'ugb') }
                                                            type="submit"
                                                        />
                                                    </form>
                                                </div>
                                            ) : (
                                                <p>
                                                    <a href={ buttonUrl } className="btn">
                                                        { buttonText || __('Edit URL', 'ugb') }
                                                    </a>
                                                </p>
                                            )}


                                        </div>
                                    </div>


                                    <div class="col-lg-6">

                                        { ! imageID ? (

                                            <div class="slider-image">
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
                                                    {/* <img
                                                        src={ imageUrl }
                                                        alt={ imageAlt }
                                                    /> */}

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
                                </div>
                            </div>
                        </section>

 
                        <div className={`item tools-item ${imgAlignmentClass}` }>

                        </div>
                </Fragment>
            )

        },
        save: props => {
            const{
                title,
                content,
                buttonText,
                buttonUrl,
                imageUrl,
                imageAlt,
                backgroundType,
                overlayColor,
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


            const style = {
				...(
					backgroundType === IMAGE_BACKGROUND_TYPE ?
						backgroundImageStyles( imageUrl ) :
						{}
				),
                backgroundColor: overlayColor,
                
            };

            return(
                <section 
                    className={ `banner-section banner-01 background-bg align${blockAlignment}` }
                    // data-image-src="images/banner.png" 
                    style= { style }
                >
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="banner-texts text-left">

                                    <RichText.Content
                                        tagName="h2"
                                        value={ title }
                                        onChange={( title )=> setAttributes({ title })}
                                        className={`banner-title`}
                                        style={{
                                            textAlign: textAlignment
                                        }}
                                    />

                                    <RichText.Content
                                        tagName="p"
                                        value={ content }
                                        className={`mt-4`}
                                        onChange={( content )=> setAttributes({ content })}
                                    />


                                    <a href={ buttonUrl } className="btn btn-lg mt-5">
                                        { buttonText }
                                    </a>

                                </div>
                            </div> 
                            <div class="col-lg-6"></div>                                       
                        </div>
                    </div>
                </section>
            )


        },

    },
);
