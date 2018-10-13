/*
* Alert Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import './style.scss';
import './editor.scss';
// import attributes from './attributes';

// import './edit';
/*
* Alert Block Libraries
 */

import {
    __,
    registerBlockType,
    SelectControl,
    PanelColorSettings,
    Dashicon,
    ToggleControl,
    InspectorControls,
    RichText,
    PanelBody,
    Fragment,
    ColorPalette,
    BlockControls

} from '../../utils/wp-import'

/*
* Register Alert Block
 */



export default registerBlockType(
    'gutenberg-blocks/alert',
    {
        title : __('Alert', 'ugb'),
        description: __('Ultimate Gutenberg Alert Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.alert
        },
        keywords: [
            __('Alert/Notification', 'ugb'),
            __('Content', 'ugb')
        ],

        attributes:{
            content:{
                type: 'array',
                source: 'rich-text',
                selector: 'p',
                default: __('This is Alert for Promo, Subscriptions Notification', 'ugb')
            },
            blockAlignment: {
                type: 'string',
            },
            textColor: {
                type: 'string',
                default: '#155724'
            },
            bgColor: {
                type: 'string',
                default: '#d4edda'
            },
            dismissible: {
                type: 'boolean',
                default: true,
            },
            alertClass: {
                type: 'string',
                default: 'success',
            }
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

            const alertType = [
                { value: 'success', label: "Success" },
                { value: 'warning', label: "Warning" },
                { value: 'danger', label: "Danger" },
                { value: 'info', label: "Info" },
                { value: 'light', label: "Light" },
                { value: 'dark', label: "Dark" },
            ];

            const{
                attributes: {
                    content,
                    textColor,
                    bgColor,
                    alertClass,
                    dismissible
                },
                editable, isSelected, setState, setAttributes, className
            } = props;

            return (
                <Fragment>

                    <InspectorControls>
                        <PanelBody>
                            <ToggleControl
                                label={ __( 'Dismissible' ) }
                                checked={ dismissible }
                                onChange={ () => setAttributes( { dismissible: ! dismissible } ) }
                            />
                            <SelectControl
                                label={ __( 'Notification Type' ) }
                                value={ alertClass }
                                options={ alertType.map( ({ value, label }) => ( {
                                    value: value,
                                    label: label,
                                } ) ) }
                                onChange={ ( newSize ) => { setAttributes( { alertClass: newSize } ) } }
                            />
                        </PanelBody>
                    </InspectorControls>

                    <div
                        className={`ugb-alert ${alertClass} dismissible-${dismissible}` }>
                        { dismissible && (
                            <span key='button' className={ 'alert-close' }>
                                { icons.close }
                            </span>
                        )}
                        <RichText
                            tagName="p"
                            placeholder={ content.default }
                            value={content}
                            onChange={(content)=> setAttributes({content})}
                            className={`${alertClass}`}
                            style={{
                                backgroundColor: bgColor,
                                color: textColor
                            }}
                        />
                    </div>
                </Fragment>
            )

        },
        save: props => {
            const{
                    content,
                    textColor,
                    bgColor,
                    alertClass,
                    dismissible
            } = props.attributes;

            const buttonStyle = {
                backgroundColor: bgColor,
                color: textColor,
            }

            return(
                <div
                    className={`ugb-alert ${alertClass} dismissible-${dismissible}` }>
                    { dismissible && (
                        <span key='button' className={ 'alert-close' }>
                                { icons.close }
                            </span>
                    )}
                    <RichText.Content
                        tagName="p"
                        value={ content }
                        className={`${alertClass}`}
                        style={ buttonStyle }
                    />
                </div>
            )


        },

    },
);
