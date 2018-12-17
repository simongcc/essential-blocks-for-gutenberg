import classnames from 'classnames';
import uuid from 'uuid/v4';

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
    RichText,
    Button,
    PanelBody
} from '../../utils/wp-import'



class EditPricing extends Component {

    constructor() {
		super( ...arguments );
    }
    

    render(){

        const {
			attributes,
			buttonColor,
			className,
			isSelected,
			setAttributes,
			setButtonColor,
			setTextColor,
			fallbackButtonColor,
			fallbackTextColor,
			fallbackFontSize,
			fontSize,
		} = this.props;

		// const {
        //     title,
        //     icon,
        //     description,
        //     textColor,
        //     bgColor,
        //     alertClass,
        //     dismissible,
        //     textAlignment,
        //     blockAlignment,
		// } = attributes;

        // const { attributes } = this.props
        
        const {
            columns,
            iconSize,
        } = attributes;

        const mainClasses = classnames( [
            className,
            'egb-feature-grid',
            `columns-${columns}`,
        ] );
    

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
                        // const linkUrl = attributes[ `linkUrl${i}` ]
                        // const linkText = attributes[ `linkText${i}` ]

                        return(
                            <div key={ i }>
                                <div className={ `egb-feature-grid-item` }>
                                    <RichText
                                        tagName='h5'
                                        value={ title }
                                        onChange={ title => setAttributes( { [ `title${i}` ]: title } ) }
                                        placeholder={ this.attributes[ `title${i}` ].default }
                                        keepPlaceholderOnFocus
                                    />
                                    <RichText
                                        tagName='p'
                                        value={ description }
                                        onChange={ description => setAttributes( { [ `description${i}` ]: description } ) }
                                        placeholder={ this.attributes[ `description${i}` ].default }
                                        keepPlaceholderOnFocus
                                    />
                                </div>
                            </div>
                        )

                    })
                }
                </div>

            </Fragment>
        )
    }


}

export default EditPricing;