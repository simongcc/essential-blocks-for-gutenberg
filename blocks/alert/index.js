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
            color: {
                type: 'string',
                default: '#155724'
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

            const alertClass = [
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
                    color,
                    alertType,
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
                                value={ alertType }
                                options={ [
                                    { value: 'success', label: __('Success','ugb') },
                                    { value: 'warning', label: __('Warning','ugb') },
                                    { value: 'danger', label: __('Danger','ugb') },
                                    { value: 'info', label: __('Info','ugb') },
                                    { value: 'primary', label: __('Primary','ugb') },
                                    { value: 'secondary', label: __('Secondary','ugb') },
                                    { value: 'light', label: __('Light','ugb') },
                                    { value: 'dark', label: __('Dark','ugb') }
                                ] }
                                onChange={ ( newSize ) => { setAttributes( { alertType: newSize } ) } }
                            />
                        </PanelBody>
                        <PanelColorSettings
                            title={ __( 'Color Settings' ) }
                            colorSettings={ [
                                {
                                    value: color,
                                    onChange: ( colorValue ) => setAttributes( { color: colorValue } ),
                                    label: __( 'Background Color' ),
                                },
                                {
                                    value: textColor,
                                    onChange: ( colorValue ) => setAttributes( { textColor: colorValue } ),
                                    label: __( 'Text Color' ),
                                },
                            ] }
                        >
                        </PanelColorSettings>
                    </InspectorControls>

                    <div
                        className={`ugb-alert
                        type=${alertClass} dismissible-${dismissible}` }>
                        { dismissible && (
                            <span key='button' className={ 'close-button' }>
                                { icons.close }
                            </span>
                        )}
                        <RichText
                            tagName="p"
                            placeholder={ content.default }
                            value={content}
                            onChange={(content)=> setAttributes({content})}
                            className={`wp-ugb-alert-${alertClass}`}
                            style={{
                                backgroundColor: color,
                                color: textColor
                            }}
                        />
                    </div>
                </Fragment>
            )

        },
        save: props => {

        },

    },
);
