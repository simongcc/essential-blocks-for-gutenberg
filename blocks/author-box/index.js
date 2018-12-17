/*
* Author/Profile Block Dependencies
*/

/* Block Imports */
import icons from '../../utils/icons';
import classnames from 'classnames';
import Inspector from './components/inspector';
import AuthorBox from './components/author';
import SocialIcons from './components/social';
import AvatarColumn from './components/avatar';

/* Style Imports */
import './style.scss';
import './editor.scss';

/*
* Author/Profile Block Libraries
*/


import {
    __,
    Fragment,
    URLInput,
    IconButton,
    Tooltip,
    TextControl,
    Toolbar,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
    registerBlockType,
    RichText,
    Button,
    MediaUpload,
    Component

} from '../../utils/wp-import'


const blockAttributes = {
    authorName: {
        type: 'array',
        source: 'children',
        selector: '.egb-author-name'
    },
    authorTitle: {
		type: 'array',
		source: 'children',
		selector: '.egb-author-title',
	},
	authorContent: {
		type: 'array',
		selector: '.egb-author-text',
		source: 'children',
	},
	authorAlignment: {
		type: 'string',
	},
	authorImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	authorImgID: {
		type: 'number',
	},
	authorBackgroundColor: {
		type: 'string',
		default: '#f2f2f2'
	},
	authorTextColor: {
		type: 'string',
		default: '#32373c'
	},
	authorLinkColor: {
		type: 'string',
		default: '#392f43'
	},
	authorFontSize: {
		type: 'number',
		default: 18
	},
	authorAvatarShape: {
		type: 'string',
		default: 'square',
	},
	twitter: {
		type: 'url',
	},
	facebook: {
		type: 'url',
	},
	instagram: {
		type: 'url',
	},
	pinterest: {
		type: 'url',
	},
	google: {
		type: 'url',
	},
	youtube: {
		type: 'url',
	},
	github: {
		type: 'url',
	},
	email: {
		type: 'url',
	},
	website: {
		type: 'url',
	},

};

const ALLOWED_MEDIA_TYPES = ['image'];

class EGBAuthorBlock extends Component{
    render(){

        // Attributes Setup
        const {
            attributes:{
				authorName,
				authorTitle,
				authorContent,
				authorAlignment,
				authorImgURL,
				authorImgID,
				authorFontSize,
				authorBackgroundColor,
				authorTextColor,
				authorLinkColor,
				twitter,
				facebook,
				instagram,
				pinterest,
				google,
				youtube,
				github,
				email,
				website,
				authorAvatarShape
            },
            attributes,
			isSelected,
			editable,
			className,
			setAttributes
        } = this.props;
        

        const onSelectImage = img =>{
            setAttributes({
                authorImgID: img.id,
                authorImgURL: img.url
            })
        }

        const onRemoveImage = () =>{
            setAttributes({
                authorImgID: null,
                authorImgURL: null
            })
        }
        return [
            <BlockControls key="controls">
                <AlignmentToolbar
                    value={ authorAlignment }
                    onChange={ ( nextAuthorAlignment ) => setAttributes( { authorAlignment: nextAuthorAlignment } ) }
                />
            </BlockControls>,

            <Inspector
                { ...{ setAttributes, ...this.props } }
            />,

            <AuthorBox { ...this.props } >
                
                <AvatarColumn { ...this.props }>

                    <div className="egb-author-img-square">
                        
                        { ! authorImgID ? (

                            <MediaUpload
                                type="image"
                                onSelect={ ( img ) => setAttributes(
                                    {
                                        authorImgID: img.id,
                                        authorImgURL: img.url,
                                    }
                                ) }
                                allowed={ ALLOWED_MEDIA_TYPES }
                                value={ authorImgID }
                                render = { ( { open } ) => (
                                        <Button
                                            className= { "button button-large" }
                                            onClick={ open }
                                        >
                                            { icons.upload }
                                            { __('Upload Image', 'ugb')}
                                        </Button>
                                )}
                            ></MediaUpload>
                        ) : (
                            <p className="image-wrapper">
                                <img
                                    src={ authorImgURL }
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
                        ) }
                    </div>
                </AvatarColumn>

                <div className={ classnames( 'egb-author-column egb-author-content-wrap') }>
                    
                    <RichText
                        tagName="h2"
                        placeholder={ __('Add Author name', 'ugb') }
                        value={ authorName }
                        onChange={ ( nextAuthorName ) => setAttributes( { authorName: nextAuthorName } ) }
                        style={{
                            color: authorTextColor
                        }}
                        className="egb-author-name"
                        keepPlaceholderOnFocus
                    />

                    <RichText
                        tagName="p"
                        placeholder={ __('Add Title', 'ugb') }
                        value={ authorTitle }
                        onChange={ ( nextAuthorTitle ) => setAttributes( { authorTitle: nextAuthorTitle } ) }
                        style={{
                            color: authorTextColor
                        }}
                        className="egb-author-title"
                        keepPlaceholderOnFocus
                    />                    

                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ __('Add Author Description...', 'ugb') }
                        value={ authorContent }
                        onChange={ ( nextAuthorContent ) => setAttributes( { authorContent: nextAuthorContent } ) }
                        formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
                        className="egb-author-desc"
                        keepPlaceholderOnFocus
                    />

                    <SocialIcons { ...this.props} />
                </div>
            </AuthorBox>
        ];
    }
}


registerBlockType(
    'essential-gutenberg-blocks/author-box',
    {
        title : __('Author/Profile Box', 'ugb'),
        description: __('Ultimate Gutenberg Author/Profile Box', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.image_content
        },
        keywords: [
            __('EGB', 'ugb'),
            __('Profile Box', 'ugb'),
            __('EBG Author or Profile Box', 'ugb')
        ],
        attributes: blockAttributes,

        edit: EGBAuthorBlock,

        save: props => {
            const { 
                authorName, 
                authorTitle, 
                authorContent, 
                authorAlignment, 
                authorImgURL, 
                authorImgID, 
                authorFontSize, 
                authorBackgroundColor, 
                authorTextColor, 
                authorLinkColor, 
                twitter, 
                facebook, 
                instagram, 
                pinterest, 
                google, 
                youtube, 
                github, 
                email, 
                website, 
                authorAvatarShape 
            } = props.attributes;

            return (
                <AuthorBox { ...props }>

                    { authorImgURL && (
                        <AvatarColumn { ...props }>
                            <div className="egb-author-image-square">
                                <img 
                                    className="egb-author-image"
                                    src={ authorImgURL }
                                    alt="Author Avatar"
                                />
                            </div>
                        </AvatarColumn>
                    ) }
                    
                    <div className={ classnames( 'egb-author-column egb-author-content-wrap')}>
                        { authorName && (
                            <RichText.Content 
                                tagName="h2"
                                className="egb-author-name"
                                style={{
                                    color:authorTextColor
                                }}
                                value={ authorName }
                            />
                        ) }

                        { authorTitle && (
                            <RichText.Content 
                                tagName="p"
                                className="egb-author-title"
                                style={{
                                    color:authorTextColor
                                }}
                                value={ authorTitle }
                            />
                        ) }

                        { authorContent && (
                            <RichText.Content 
                                tagName="div"
                                className="egb-author-desc"
                                value={ authorContent }
                            />
                        ) }
                        
                        <SocialIcons { ...props }></SocialIcons>
                    </div>

                </AuthorBox>
            )

        }






    },
);