/*
* Advertisement Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import './style.scss';
import './editor.scss';

/*
 * Advertisement Block Libraries
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
    PanelBody,
    SelectControl,
    InspectorControls,
    registerBlockType,
    MediaUpload,
    RichText,
    Button

} from '../../utils/wp-import'


/*
* Register Advertisement Block
*/



export default registerBlockType(
    'easy-blocks/advertisement',
    {
        title : __('Advertisement', 'ugb'),
        description: __('Easy Block Advertisement', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.card
        },
        keywords: [
            __('Advertisement', 'ugb'),
            __('EBG Ads Profile', 'ugb'),
            __('Text and Image Ads', 'ugb')
        ],

        attributes:{
            content: {
                type: 'array',
                source: 'children',
                selector: '.ads_content',
                default: __( 'Ads Content here','ugb' ),
            },
            script: {
                type: 'array',
                source: 'children',
                selector: '.ads_script',
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

            adsStyleClass: {
                type: 'string',
                default: 'imgleft',
            },
            textAlignment: {
                type: 'string',
            },
            blockAlignment: {
                type: 'string',
                default: 'center',
            },
        },

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
                    content,
                    script,
                    imageID,
                    imageAlt,
                    imageUrl,
                    adsStyleClass,
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
                'ugb-advertisement',
            ], {
                'has-ads-image': imageUrl,
            });


            const adsAlignment = [
                { value: 'imgright', label: "Image Right Content Left" },
                { value: 'imgleft', label: "Image Left Content Right" },
                { value: 'imgonly', label: "Image Ads" },
                { value: 'textonly', label: "Text Ads" },
            ];



            const adsAlignClass =  props.attributes.adsStyleClass;

            return (

                <Fragment>


                    <InspectorControls>
                        <PanelBody>
                            <SelectControl
                                label={ __( 'Advertisement Style' ) }
                                value={ adsStyleClass }
                                options={ adsAlignment.map( ({ value, label }) => ( {
                                    value: value,
                                    label: label,
                                } ) ) }
                                onChange={ ( newAdsStyle ) => { setAttributes( { adsStyleClass: newAdsStyle } ) } }
                            />
                        </PanelBody>
                    </InspectorControls>

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



                    <div className={`${mainClasses} ${adsStyleClass}` }>

                        {(() => {

                            // console.log( adsAlignClass );

                            //Text Ads Only
                            if( adsAlignClass === 'textonly' ){
                                return(
                                    <RichText
                                        placeholder={ ('Advertise Script Here') }
                                        value={ content }
                                        onChange={ content => setAttributes( { content } ) }
                                        className={`ads_content`}
                                        keepPlaceholderOnFocus
                                    />

                                )
                            }

                            // Image Ads Only
                            if( adsAlignClass === 'imgonly' ){
                                return(

                                    <div className="image_ads_only">

                                        { ! imageID ? (
                                            <MediaUpload
                                                onSelect={ onSelectImage }
                                                type="image"
                                                value={ imageID }
                                                className={ `wp-block-ugb-ads-image` }
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
                                                <p className="image-wrapper">
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



                                )
                            }



                            //Text Ads Only
                            if( adsAlignClass === 'imgright' ){
                                return(

                                    <div className="ads_image_left">

                                        <RichText
                                            placeholder={ ('Advertise Script Here') }
                                            value={ content }
                                            onChange={ content => setAttributes( { content } ) }
                                            className={`ads_content`}
                                            keepPlaceholderOnFocus
                                        />


                                        { ! imageID ? (

                                            <MediaUpload
                                                onSelect={ onSelectImage }
                                                type="image"
                                                value={ imageID }
                                                className={ `wp-block-ugb-ads-image` }
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
                                            <p className="image-wrapper">
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

                                )
                            }




                            //Text Ads Only
                            if( adsAlignClass === 'imgleft' ){
                                return(

                                    <div className="ads_image_left">

                                        { ! imageID ? (

                                                <MediaUpload
                                                    onSelect={ onSelectImage }
                                                    type="image"
                                                    value={ imageID }
                                                    className={ `wp-block-ugb-ads-image` }
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
                                                <p className="image-wrapper">
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
                                            placeholder={ ('Advertise Script Here') }
                                            value={ content }
                                            onChange={ content => setAttributes( { content } ) }
                                            className={`ads_content`}
                                            keepPlaceholderOnFocus
                                        />

                                    </div>

                                )
                            }



                        })()}




                    </div>

                </Fragment>

            )

        },
        save: props => {

            const { title, body, imageUrl, imageAlt, blockAlignment, textAlignment } = props.attributes;


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
                <div className={ ` align${blockAlignment}` }>
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
