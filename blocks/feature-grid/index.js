/*
* Feature Box Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
// import Autosuggest from 'react-autosuggest';

import './style.scss';
import './editor.scss';

/*
 * Feature Box Block Libraries
 */

import {
    __,
    Fragment,
    Component,
    Toolbar,
    InspectorControls,
    registerBlockType,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
    MediaUpload,
    RangeControl,
    IconButton,
    RichText,
    URLInput,
    Button,
    PanelBody,
    MediaPlaceholder,
    Spinner,
    Placeholder,
    compose,
    withState,
    ContrastChecker

} from '../../utils/wp-import'



export const range = ( start, end ) => {
    return Array.from( { length: ( end - start ) }, ( v, k ) => k + start );
}


export const FeatureAttributes = {
    columns: {
        type: 'number',
        default: 3,
    },
    design: {
        type: 'string',
        default: 'basic',
    },
    textAlignment: {
        type: 'string',
    },
    blockAlignment: {
        type: 'string',
        default: 'full',
    },
    imageSize: {
		type: 'number',
		default: 100,
    },
    imageID1: {
        type: 'number',
    },
    imageID2: {
        type: 'number',
    },
    imageID3: {
        type: 'number',
    },
    imageUrl1: {
        type: 'url',
    },
    imageUrl2: {
        type: 'url',
    },
    imageUrl3: {
        type: 'url',
    },
    title1: {
		source: 'html',
		selector: '.egb-feature-grid > *:nth-child(1) .feature-title',
		default: __( 'Feature 1' ),
    },
	title2: {
		source: 'html',
		selector: '.egb-feature-grid > *:nth-child(2) .feature-title',
		default: __( 'Feature 2' ),
	},
	title3: {
		source: 'html',
		selector: '.egb-feature-grid > *:nth-child(3) .feature-title',
		default: __( 'Feature 3' ),
	},
	description1: {
		source: 'html',
		selector: '.egb-feature-grid > *:nth-child(1) .feature-desc',
		default: __( 'Some feature description for an awesome feature' ),
	},
	description2: {
		source: 'html',
		selector: '.egb-feature-grid > *:nth-child(2) .feature-desc',
		default: __( 'Some feature description for an awesome feature' ),
	},
	description3: {
		source: 'html',
		selector: '.egb-feature-grid > *:nth-child(3) .feature-desc',
		default: __( 'Some feature description for an awesome feature' ),
    },    
    
	linkUrl1: {
		type: 'string',
		source: 'attribute',
		selector: '.egb-feature-grid > *:nth-child(1) .feature-link',
		attribute: 'href',
	},
	linkUrl2: {
		type: 'string',
		source: 'attribute',
		selector: '.egb-feature-grid > *:nth-child(2) .feature-link',
		attribute: 'href',
	},
	linkUrl3: {
		type: 'string',
		source: 'attribute',
		selector: '.egb-feature-grid > *:nth-child(3) .feature-link',
		attribute: 'href',
	},
	linkText1: {
		source: 'html',
		selector: '.egb-feature-grid > *:nth-child(1) .feature-link',
		default: __( 'View More' ),
	},
	linkText2: {
		source: 'html',
		selector: '.egb-feature-grid > *:nth-child(2) .feature-link',
		default: __( 'View More' ),
	},
	linkText3: {
		source: 'html',
		selector: '.egb-feature-grid > *:nth-child(3) .feature-link',
		default: __( 'View More' ),
    },
        
}


export const edit = ( props ) => {

    // console.log('Edit Block', props)

    const {
		isSelected,
		setState,
		className,
		setAttributes
	} = props;

    const { attributes } = props;

    const {
        columns,
        imageSize,
        design,
        textAlignment,
        blockAlignment,
    } = attributes;

    const mainClasses = classnames( [
        className,
        'egb-feature-grid',
        `columns-${columns}`,
    ], {
        [ `egb-design-${design}` ]: design && design !== 'basic',
    } );



    const onSelectImage = img =>{
        setAttributes({
            imageID: img.id,
            imageUrl: img.url
        })
    }

    const onRemoveImage = () =>{
        setAttributes({
            imageID: null,
            imageUrl: null
        })
    }


    return(
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
                <PanelBody title={ __( 'General Settings' ) }>
                    <RangeControl
                        label={ __( 'Columns' ) }
                        value={ columns }
                        onChange={ columns => setAttributes( { columns } ) }
                        min={ 1 }
                        max={ 3 }
                    />

                    <RangeControl
                        label={ __( 'Image Size(Percentage %)' ) }
                        value={ imageSize }
                        onChange={ imageSize => setAttributes( { imageSize } ) }
                        min={ 0 }
                        max={ 100 }
                    />
                </PanelBody>
            </InspectorControls>
            
            <div className={ mainClasses }>
            { [1, 2, 3].map( i => {
                    const imageUrl = attributes[ `imageUrl${i}` ]
                    const imageID = attributes[ `imageID${i}` ]
                    const title = attributes[ `title${i}` ];
                    const description = attributes[ `description${i}` ];
                    const linkUrl = attributes[ `linkUrl${i}` ];
                    const linkText = attributes[ `linkText${i}` ];

                    return(
                        <div key={ i }>
                            <div className={ `egb-feature-grid-item` }>

                                {/*<div className="icon">*/}
                                    {/*{ icons.profile }*/}
                                {/*</div>*/}

                                { ! imageID ? (

                                    <div className="button-container">
                                        <MediaUpload
                                            onSelect={ ( { url, id } ) => { setAttributes( { [ `imageUrl${i}` ]: url, [ `imageID${i}` ]: id } ) } }

                                            value={ `imageID${i}` }
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

                                    <p className="image-wrapper">

                                        <img
                                             src={ imageUrl }
                                             style={ {
                                                 width: `${imageSize}%`,
                                             } }
                                        />

                                        {isSelected ? (

                                            <Button
                                                className="remove-image"
                                                onClick={ () => { setAttributes( { [ `imageUrl${i}` ]: '', [ `imageID${i}` ]: '' } ) } }
                                            >
                                                {icons.remove}
                                            </Button>

                                        ) : null}

                                    </p>
                                ) }

                                <RichText
                                    tagName='h5'
                                    className={"feature-title"}
                                    value={ title }
                                    // onChange={ title => setAttributes( { [ `title${i}` ]: title } ) }
                                    // placeholder={ attributes[ `title${i}` ].default }

                                    onChange={ title => setAttributes( { [ `title${i}` ]: title } ) }
                                    placeholder={ FeatureAttributes[ `title${i}` ].default }

                                    keepPlaceholderOnFocus
                                />

                                <RichText
									tagName='p'
									value={ description }
                                    className={"feature-desc"}
                                    onChange={ description => setAttributes( { [ `description${i}` ]: description } ) }
                                    placeholder={ FeatureAttributes[ `description${i}` ].default }
									keepPlaceholderOnFocus
								/>

								<p>
									<a href='#'>
										<RichText
											tagName='span'
                                            className={"feature-link"}
											value={ linkText }
											onChange={ linkText => setAttributes( { [ `linkText${i}` ]: linkText } ) }
											placeholder={ FeatureAttributes[ `linkText${i}` ].default }
											formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
											keepPlaceholderOnFocus
										/>
									</a>
								</p>                                
                            </div>

							{
								isSelected && (
									<form
										onSubmit={ ( event ) => event.preventDefault() }
										className={ `blocks-button__inline-link pricing-box`}>

										<URLInput
											value={ linkUrl }
											onChange={ url => setAttributes( { [ `linkUrl${i}` ]: url } ) }
										/>
										<IconButton
											icon={ 'editor-break' }
											label={ __( 'Apply' ) }
											type={ 'submit' }
										/>
									</form>
								)
                            }
                            
                        </div>
                    )

                })
            }
            </div>

        </Fragment>
    )

}




export const save = ( props ) => {
    const { attributes, className } = props;
    const {
        columns,
        imageSize,
        design,
        blockAlignment,
        textAlignment,
    } = attributes;

    const mainClasses = classnames( [
        className,
        'egb-feature-grid',
        `columns-${columns}`,
    ], {
        [ `egb-design-${design}` ]: design && design !== 'basic',
    } );

    return(
            <div className={ `${mainClasses} align${blockAlignment}`}>

                { range( 1, columns + 1 ).map( i => {

                    // const icon = attributes['icons'];
                    const imageUrl = attributes[ `imageUrl${i}` ]
                    const title = attributes[ `title${i}` ];
                    const description = attributes[ `description${i}` ];
                    const linkUrl = attributes[ `linkUrl${i}` ];
                    const linkText = attributes[ `linkText${i}` ];
                    return(
                        <div className={ `egb-feature-grid-item` } key={ i }>

                            { imageUrl && <img src={ imageUrl } style={ { width: `${imageSize}%`, height: `100px` } } /> }

                            { ! RichText.isEmpty( title ) && (
                                <RichText.Content
                                    tagName='h5'
                                    className={"feature-title"}
                                    value={ title }
                                />
                            ) }

                            { ! RichText.isEmpty( description ) && (
                                <RichText.Content
                                    tagName='p'
                                    className={"feature-desc"}
                                    value={ description }
                                />
                            ) }

                            { ! RichText.isEmpty( linkText ) && (
                                <p>
                                    <RichText.Content
                                        tagName='a'
                                        href={ linkUrl }
                                        value={ linkText }
                                        className={"feature-link"}
                                    />
                                </p>
                            ) }

                        </div>
                    )

                } ) }
            </div>
        );
}



/*
* Register Feature Grid Block Slider
*/

export default registerBlockType(
    'easy-blocks/feature-grid',
    {
        title : __('Feature Grid', 'ugb'),
        description: __('Easy Gutenberg Feature Grid', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.number
        },
        keywords: [
            __('EGB', 'ugb'),
            __('EGB Feature Grid', 'ugb'),
            __('Service Box', 'ugb')
        ],
        
        attributes: FeatureAttributes,

        getEditWrapperProps( { blockAlignment } ){
            if( 'left' === blockAlignment ||
                'right' === blockAlignment ||
                'full' === blockAlignment
            ){
                return { 'data-align': blockAlignment };
            }
        },


        edit,

        save

    }
)