/*
* Click to Tweet
*/

import icons from '../../utils/icons';
import get from 'lodash/get';
import classnames from 'classnames';

import './style.scss';
import './editor.scss';



/*
 * Click to Tweet Block Libraries
 */

import {
    __,
    Fragment,
    withSelect,
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
    compose,
    Component

} from '../../utils/wp-import'

/*
 * Register Click to Tweet Block
 */


const applyWithSelect = withSelect( ( select ) => {
	const { getPermalink } = select( 'core/editor' );

	return {
		postLink: getPermalink(),
	};
} );


class CTTEdit extends Component {
    componentDidMount( ) {
			this.props.setAttributes( {
				url: this.props.postLink
			} );
	}

    render(){
        const{
            attributes: {
                tweet,
                tweetsent,
                button,
                theme,
                url,
                via
            },
            isSelected, setAttributes, className, editable, setState,
        } = this.props;



        const onChangeTweet = value => {
            this.props.setAttributes( { tweet: value } );
        };
        const onChangeTweetSent = value => {
            this.props.setAttributes( { tweetsent: value } );
        };
        const onChangeButton = value => {
            this.props.setAttributes( { button: value } );
        };
        const toggletheme = value => {
            this.props.setAttributes( { theme: !this.props.attributes.theme } );
        };
        

        return [
            !! this.props.isSelected && (
                <BlockControls key="egb-ctt-controls">
                    <Toolbar
                        className='components-toolbar'
                    >
                        <Tooltip text={ __( 'Alternative Design' )	}>
                            <Button
                                className={ classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': this.props.attributes.theme },
                                ) }
                                onClick={ toggletheme }
                            >
                                <Dashicon icon="tablet" />
                            </Button>
                        </Tooltip>

                        <label
                            aria-label={ __( 'Twitter Username', 'ugb' ) }
                            className="egb-ctt-via-label"
                            htmlFor={ `${ className }__via` }
                        >
                            { icons.at }
                        </label>
 
                        <input
                            aria-label={ __( 'Twitter Username', 'ugb' ) }
                            className={ `${ className }__via` }
                            id={ `${ className }__via` }
                            onChange={ ( event ) => setAttributes( { via: event.target.value } ) }
                            placeholder={ __( 'Username' ) }
                            type="text"
                            value={ via }
                        />
                                                    
                    </Toolbar>
                </BlockControls>
            ),
            


            <div className={ this.props.className }>
                <div className={ ( this.props.attributes.theme ? 'cbp-qtrotator click-to-tweet-alt' : 'cbp-qtrotator click-to-tweet' ) }>
                    
                    
                    <div className="cbp-qtcontent">
                        { icons.twitter }
                        <blockquote>
                            <RichText
                                tagName="p"
                                format="string"
                                key="editable"
                                className="ctt-text"
                                formattingControls={ [] }
                                placeholder={ __( 'My body will not be a tomb for other creatures', 'ugb' ) }
                                onChange={ ( nextTweet ) => {
                                    setAttributes( {
                                        tweet: nextTweet,
                                    } );
                                } }
                                value={ tweet }
                                keepPlaceholderOnFocus
                            />      
                            <footer>
                                <RichText
                                    tagName="a"
                                    className="ctt-btn"
                                    key="editable-via"
                                    placeholder={ button.default }
                                    onChange={ button => setAttributes({ button }) }
                                    value={ this.props.attributes.button }
                                    keepPlaceholderOnFocus
                                />                             
                            </footer>
                        </blockquote>
                    </div>



                </div>
            </div>
        ];


    
}
}



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
                type: 'html',
            },
            tweetsent: {
                type: 'string',
            },
            button: {
                type: 'string',
                default: __( 'Click to Tweet', 'ugb' ),
            },
            theme: {
                type: 'boolean',
                default: false,
            },
            url: {
                type: 'attribute',
            },
            via: {
                type: 'string',
            },

        },
        
        edit: compose( [applyWithSelect] )( CTTEdit ),

        save: props => {
            const{
                tweet,
                tweetsent,
                button,
                theme,
                url,
                via
            } = props.attributes;

            // const viaUrl = window.location.href;
            const viaUrl = via ? `&via=${via}` : '';

            const tweetUrl = `http://twitter.com/share?&text=${ encodeURIComponent( tweet ) }&url=${url}${viaUrl}`;
    
            return(
                
                <div className={ ( theme ? 'cbp-qtrotator click-to-tweet-alt' : 'cbp-qtrotator click-to-tweet' ) }>
                    <div className="cbp-qtcontent">
                        { icons.twitter }
                        <div className="ctt-text">
                            <RichText.Content
                                value={ tweet }              
                            />
                        </div>
                        
                        <a  
                            className="ctt-btn"
                            href={ tweetUrl }
                            target="_blank"
                        >
                            { button }
                        </a>                
                    </div>
                </div>
            )
            
        }

    }
);
