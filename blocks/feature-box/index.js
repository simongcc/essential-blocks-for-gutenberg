/*
* Feature Box Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import './style.scss';
import './editor.scss';


/*
 * Feature Box Block Libraries
 */

import {
    __,
    registerBlockType,
    PanelColorSettings,
    SelectControl,
    Dashicon,
    IconButton,
    RangeControl,
    InspectorControls,
    RichText,
    BlockControls,
    ToggleControl,
    PanelBody,
    URLInput,
    omit,
    Fragment,
    BlockAlignmentToolbar,
    AlignmentToolbar
} from '../../utils/wp-import'


export const range = ( start, end ) => {
    return Array.from( { length: ( end - start ) }, ( v, k ) => k + start );
}



export const featureAttributes = {
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
        default: 'center',
    },
    title: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(1) .feature-title',
        default: __( 'Feature 1' ),
    },
    description: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(1) .feature-desc',
        default: __( 'Some feature description for an awesome feature' ),
    },

    linkUrl: {
        type: 'string',
        source: 'attribute',
        selector: '.egb-feature-grid > *:nth-child(1) .feature-link',
        attribute: 'href',
    },
    linkText: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(1) .feature-link',
        default: __( 'View More' ),
    }

}

export const editFeature = ( props ) => {

    // console.log('Edit Block', props)

    const {
        isSelected,
        editable,
        setState,
        className,
        setAttributes
    } = props;

    const { attributes } = props;

    const {
        columns,
        design,
        title,
        description,
        linkUrl,
        linkText,

        textAlignment,
        blockAlignment,
    } = attributes;

    const mainClasses = classnames( [
        className,
        'egb-feaure-box',
        `columns-${columns}`,
    ], {
        [ `egb-design-${design}` ]: design && design !== 'basic',
    } );



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
                    {/*<RangeControl*/}
                        {/*label={ __( 'Columns' ) }*/}
                        {/*value={ columns }*/}
                        {/*onChange={ columns => setAttributes( { columns } ) }*/}
                        {/*min={ 1 }*/}
                        {/*max={ 3 }*/}
                    {/*/>*/}

                    {/*<RangeControl*/}
                    {/*label={ __( 'Image Size(Percentage %)' ) }*/}
                    {/*value={ imageSize }*/}
                    {/*onChange={ imageSize => setAttributes( { imageSize } ) }*/}
                    {/*min={ 0 }*/}
                    {/*max={ 100 }*/}
                    {/*/>*/}
                </PanelBody>
            </InspectorControls>

            <div className={ mainClasses }>

                <div className={ `egb-feaure-box-item` }>

                    <RichText
                        tagName='h5'
                        className={"feature-title"}
                        value={ title }
                        onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
                        placeholder={ title.default }

                        keepPlaceholderOnFocus
                    />

                    <RichText
                        tagName='p'
                        value={ description }
                        className={"feature-desc"}
                        onChange={ ( nextDescription ) => setAttributes( { description: nextDescription } ) }
                        placeholder={ description.default }
                        keepPlaceholderOnFocus
                    />

                    <p>
                        <a href='#'>
                            <RichText
                                tagName='span'
                                className={"feature-link"}
                                value={ linkText }
                                onChange={ ( nextLinkText ) => setAttributes( { linkText: nextLinkText } ) }
                                placeholder={ linkText.default }
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
                            className={ `blocks-button__inline-link`}>

                            <URLInput
                                value={ linkUrl }
                                onChange={ linkUrl => setAttributes({ linkUrl }) }
                            />
                            <IconButton
                                icon={ 'editor-break' }
                                label={ __( 'Apply', 'ugb' ) }
                                type={ 'submit' }
                            />
                        </form>
                    )
                }

            </div>

        </Fragment>
    )

}



/*
* Save
 */

export const save = ( props ) => {
    const { attributes, className } = props;
    const {
        columns,
        design,
        title,
        description,
        linkUrl,
        linkText,
        blockAlignment,
        textAlignment,
    } = attributes;

    const mainClasses = classnames( [
        className,
        'egb-feaure-box',
        `columns-${columns}`,
    ], {
        [ `egb-design-${design}` ]: design && design !== 'basic',
    } );

    return(
        <div className={ `${mainClasses} align${blockAlignment}`}>

            <div className={ `egb-feaure-box-item` }>

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
        </div>
    );
}





/*
* Register Feature Box Block Slider
*/

export default registerBlockType(
    'easy-blocks/feature-box',
    {
        title : __('Feature Box', 'ugb'),
        description: __('Easy Gutenberg Feature Box Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.pricing
        },
        keywords: [
            __('EGB', 'ugb'),
            __('Feature Box', 'ugb'),
            __('EBG Feature Box', 'ugb')
        ],

        attributes: featureAttributes,

        getEditWrapperProps( { blockAlignment } ){
            if( 'left' === blockAlignment ||
                'right' === blockAlignment ||
                'full' === blockAlignment
            ){
                return { 'data-align': blockAlignment };
            }
        },

        edit: editFeature,

        save: save

    }
)