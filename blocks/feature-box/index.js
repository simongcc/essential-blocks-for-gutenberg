/*
* Feature Box Block Dependencies
*/

import icons from '../../utils/icons';
// import EditFeature from './edit';
// import FeatureAttributes from './attributes';
import SaveFeature from './save';
import classnames from 'classnames';

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
    PanelBody
} from '../../utils/wp-import'





export const FeatureAttributes = {
    columns: {
        type: 'number',
        default: 3,
    },
    iconSize: {
		type: 'number',
		default: 100,
    },
    title1: {
        type: 'string',
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(1) h5',
		default: __( 'Feature 1' ),
    },
	title2: {
        type: 'string',
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(2) h5',
		default: __( 'Feature 2' ),
	},
	title3: {
        type: 'string',
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(3) h5',
		default: __( 'Feature 3' ),
	},
	description1: {
        type: 'string',
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(1) .ugb-fg-description',
		default: __( 'Some feature description for an awesome feature' ),
	},
	description2: {
        type: 'string',
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(2) .ugb-fg-description',
		default: __( 'Some feature description for an awesome feature' ),
	},
	description3: {
        type: 'string',
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(3) .ugb-fg-description',
		default: __( 'Some feature description for an awesome feature' ),
    },    
    
	linkUrl1: {
		type: 'string',
		source: 'attribute',
		selector: '.ugb-feature-grid > *:nth-child(1) .ugb-fg-link',
		attribute: 'href',
	},
	linkUrl2: {
		type: 'string',
		source: 'attribute',
		selector: '.ugb-feature-grid > *:nth-child(2) .ugb-fg-link',
		attribute: 'href',
	},
	linkUrl3: {
		type: 'string',
		source: 'attribute',
		selector: '.ugb-feature-grid > *:nth-child(3) .ugb-fg-link',
		attribute: 'href',
	},
	linkText1: {
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(1) .ugb-fg-link',
		default: __( 'View More' ),
	},
	linkText2: {
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(2) .ugb-fg-link',
		default: __( 'View More' ),
	},
	linkText3: {
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(3) .ugb-fg-link',
		default: __( 'View More' ),
    },
        
}


export const EditFeature = ( props ) => {

    const {
		isSelected,
		setState,
		className,
		setAttributes
	} = props;

    const { attributes } = props

    const {
        columns,
        iconSize,
    } = attributes;

    const mainClasses = classnames( [
        className,
        'egb-feature-grid',
        `columns-${columns}`,
    ] )


    return(
        <Fragment>
            <InspectorControls>
                <PanelBody>
                    <RangeControl
                        label={ __( 'Columns' ) }
                        value={ columns }
                        onChange={ columns => setAttributes( { columns } ) }
                        min={ 1 }
                        max={ 3 }
                    />
                    <RangeControl
                        label={ __( 'Icon Font Size(px)' ) }
                        value={ iconSize }
                        onChange={ iconSize => setAttributes( { iconSize } ) }
                        min={ 0 }
                        max={ 100 }
                    />
                </PanelBody>
            </InspectorControls>
            
            <div className={ mainClasses }>
            { [1, 2, 3].map( i => {
                    // const icon = attributes[ `icon${i}` ]
                    // const imageID = attributes[ `imageID${i}` ]
                    const title = attributes[ `title${i}` ]
                    const description = attributes[ `description${i}` ]
                    const linkUrl = attributes[ `linkUrl${i}` ]
                    const linkText = attributes[ `linkText${i}` ]

                    console.log( title )

                    return(
                        <div key={ i }>
                            <div className={ `egb-feature-grid-item` }>
                                <RichText
                                    tagName='h5'
                                    value={ title }
                                    onChange={ title => setAttributes( { [ `title${i}` ]: title } ) }
                                    placeholder={ attributes[ `title${i}` ].default }
                                    keepPlaceholderOnFocus
                                />
                                <RichText
                                    value={ description }
                                    // onChange={ description => setAttributes( { [ `description${i}` ]: description } ) }
                                    onChange={ ( description ) => setAttributes( { description: [ `description${i}` ] }) }
                                    // placeholder={ attributes[ `description${i}` ].default }
                                    // keepPlaceholderOnFocus
                                />
	                            
                                <RichText
									tagName='p'
									value={ description }
									onChange={ description => setAttributes( { [ `description${i}` ]: description } ) }
									placeholder={ attributes[ `description${i}` ].default }
									keepPlaceholderOnFocus
								/>

								<p>
									<a href='#'>
										<RichText
											tagName='span'
											value={ linkText }
											onChange={ linkText => setAttributes( { [ `linkText${i}` ]: linkText } ) }
											placeholder={ attributes[ `linkText${i}` ].default }
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
										{ icons.profile }
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

/*
* Register Feature Box Block Slider
*/

export default registerBlockType(
    'gutenberg-blocks/feature-box',
    {
        title : __('Feature Box', 'ugb'),
        description: __('Essential Gutenberg Feature Box', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.number
        },
        keywords: [
            __('EGB', 'ugb'),
            __('Feature Box', 'ugb'),
            __('EBG Feature Box', 'ugb')
        ],
        
        attributes: FeatureAttributes,

        edit: EditFeature,

        save: props=>{
            return(
                <h2>Liton Arefin</h2>
            )
        }

    }
)