/*
* Click to Tweet
*/

import icons from '../../utils/icons';
import classnames from 'classnames';

import './style.scss';
import './editor.scss';

// import './sidebar.js';

/*
 * Click to Tweet Block Libraries
 */

import {
    __,
    Fragment,
    InspectorControls,
    registerBlockType,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
    MediaUpload,
    RichText,
    PanelBody,
    TextareaControl,
	TextControl,
	Dashicon,
	Toolbar,
	Button,
    Tooltip,

} from '../../utils/wp-import'

/*
 * Register Click to Tweet Block
 */

export default registerBlockType(
    'gutenberg-blocks/click-to-tweet',
    {
        title : __('Click to Tweet', 'ugb'),
        description: __('Essential Gutenberg Blocks Click to Tweet', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.testimonial
        },
        keywords: [
            __('EGB', 'ugb'),
            __('Click to Tweet', 'ugb'),
            __('EBG Click to Tweet', 'ugb')
        ],


        attributes:{
            
            tweet: {
                type: 'string',
            },
            tweetsent: {
                type: 'string',
            },
            button: {
                type: 'string',
                default: __( 'Tweet' ),
            },
            theme: {
                type: 'boolean',
                default: false,
            }

        },


        edit: props =>{
            const onChangeTweet = value => {
                props.setAttributes( { tweet: value } );
            };
            const onChangeTweetSent = value => {
                props.setAttributes( { tweetsent: value } );
            };
            const onChangeButton = value => {
                props.setAttributes( { button: value } );
            };
            const toggletheme = value => {
                props.setAttributes( { theme: !props.attributes.theme } );
            };
            

            return [
                !! props.isSelected && (
                    <BlockControls key="custom-controls">
                        <Toolbar
                            className='components-toolbar'
                        >
                            <Tooltip text={ __( 'Alternative Design' )	}>
                                <Button
                                    className={ classnames(
                                        'components-icon-button',
                                        'components-toolbar__control',
                                        { 'is-active': props.attributes.theme },
                                    ) }
                                    onClick={ toggletheme }
                                >
                                    <Dashicon icon="tablet" />
                                </Button>
                            </Tooltip>
                        </Toolbar>
                    </BlockControls>
                ),
                
                <div className={ props.className }>
                    <div className={ ( props.attributes.theme ? 'click-to-tweet-alt' : 'click-to-tweet' ) }>
                        <div className="ctt-text">
                            <RichText
                                format="string"
                                formattingControls={ [] }
                                placeholder={ __( 'Tweet, tweet!', 'egb' ) }
                                onChange={ onChangeTweet }
                                value={ props.attributes.tweet }
                                keepPlaceholderOnFocus
                            />
                        </div>
                        <p>
                            <a className="ctt-btn">
                                { props.attributes.button }
                            </a>
                        </p>
                    </div>
                </div>
            ];


        },

        save: props => {
            const{
                tweet,
                tweetsent,
                button,
                theme
            } = props.attributes;

            return(
                <div className={ ( theme ? 'click-to-tweet-alt' : 'click-to-tweet' ) }>
                    <div className="ctt-text">
                        <RichText.Content
                            value={ tweet }
                        // style={{
                        //     textAlign: textAlignment
                        // }}                            
                        />
                    </div>
                    
                    <a className="ctt-btn">
                        { button }
                    </a>                
                </div>
            )
            
        }

    }
);
