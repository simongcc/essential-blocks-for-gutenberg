/*
* Alert Block Dependencies
*/

import icons from '../../utils/icons';
import './style.scss';
import './editor.scss';

/*
* Alert Block Libraries
 */

import {
    __,
    registerBlockType,
    SelectControl,
    ToggleControl,
    InspectorControls,
    RichText,
    PanelBody,
    Fragment,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar

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
            message:{
                type: 'html',
                selector: 'p',
                default: __('This is Alert for Promo, Subscriptions Notification', 'ugb')
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
                    message,
                    textColor,
                    bgColor,
                    alertClass,
                    dismissible,
                    textAlignment,
                    blockAlignment,
                },
                editable, isSelected, setState, setAttributes, className
            } = props;

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
                            tagName={ 'p' }
                            value={ message }
                            onChange={ ( nextMessage ) => setAttributes( { message: nextMessage } ) }
                            style={{
                                backgroundColor: bgColor,
                                color: textColor,
                                textAlign: textAlignment
                            }}
                            className={`${alertClass}`}
                            placeholder={ message.default }
                            keepPlaceholderOnFocus
                        />                        
                    </div>
                </Fragment>
            )

        },
        save: props => {
            const{
                message,
                textColor,
                bgColor,
                alertClass,
                dismissible,
                blockAlignment,
                textAlignment,
            } = props.attributes;

            const buttonStyle = {
                backgroundColor: bgColor,
                color: textColor,
                textAlign: textAlignment
            }

            return(
                <div
                    className={`ugb-alert ${alertClass} dismissible-${dismissible} align${blockAlignment}` }>
                    { dismissible && (
                        <span key='button' className={ 'alert-close' }>
                                { icons.close }
                            </span>
                    )}
                    { message }
                </div>
            )


        },

    },
);
