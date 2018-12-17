// import fetch from 'node-fetch';

import {
    __,
    Fragment,
    Component,
    InspectorControls,
    PanelColorSettings,
    PanelBody,
    RangeControl,
    TextControl,
    ToggleControl,
    Spinner

} from '../../utils/wp-import';



export default class InstagramEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            apiResponseCode: 200,
            apiErrorMessage: '',
        }
    }


    // Get Thumbs and bio on loading
    componentDidMount(){
        this.fetchPhotos();
        this.fetchBio();
    }

    fetchPhotos( count, token ){

        // console.log( count );
        // console.log( token );

        const _COUNT = count ? count: this.props.attributes.numImages;
        const _TOKEN = token ? token: this.props.attributes.token;

        if( ! _TOKEN ){
            return false;
        }

        return fetch(
            `https://api.instagram.com/v1/users/self/media/recent/?access_token=${ _TOKEN }&count=${ _COUNT }`
        )
            .then( res => res.json())
            .then( json =>{
                this.setState({
                    apiResponseCode: json.meta.code,
                    loading: false
                });

                console.log( json );

                if( json.meta.code === 200){
                    this.props.setAttributes({
                        thumbs: json.data
                    })
                } else {
                    this.props.setAttributes({
                        thumbs: []
                    });

                    this.setState({
                        apiErrorMessage: json.meta.error_message,
                    });
                }

            } );

    }



    fetchBio(){
        const _TOKEN = this.props.attributes.token;

        if( ! _TOKEN ){
            return false;
        }
        return fetch(
            `https://api.instagram.com/v1/users/self/?access_token=${ _TOKEN }`
        )
            .then( res=> res.json() )
            .then( json=> {
                if( json.meta.code === 200 ){
                    this.props.setAttributes({
                        profile: json.data
                    });
                } else {
                    this.props.setAttributes({
                        profile: []
                    });
                }
            } );

    }


    onChangeToken( token ) {
        this.props.setAttributes({
            token,
        });
        this.fetchPhotos( this.props.attributes.numImages, token);
    };


    onChangeImages( numImages ){
        this.props.setAttributes({
            numImages,
        });
        this.fetchPhotos( numImages );
    };

    onChangeShowProfile( showProfile ) {
        this.props.setAttributes( {
            showProfile,
        } );
        this.fetchBio();
    };

render(){
    const{
        attributes:{
            token,
            useThumbnail,
            numCols,
            numImages,
            thumbs,
            gridGap,
            showProfile,
            profile,
            backgroundColor,
            textAlignment,
            blockAlignment
        },
        className,
        setAttributes
    } = this.props;

    const { apiResponseCode, apiErrorMessage, loading } = this.state;

    let container;

    if( token && apiResponseCode === 200){
        if( loading ){
            container = (
                <p className={ className }>
                    <Spinner />
                    { __('Loading Instagram Feed', 'ugb') }
                </p>
            );
        } else {
            container = (
                <div
                    className="display-grid easy-instagram-grid"
                    style={{
                        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
                        marginLeft: `-${ gridGap }px`,
                        marginRight: `-${ gridGap }px`
                    }}
                >

                    {/*{Object.values(thumbs).map( ( photo, index) => (*/}

                        {/*// console.log(photo, index);*/}

                    {/*))}*/}


                { thumbs && thumbs.map( photo => {
                    return (
                        <div
                            className="easy_instagram_wrapper"
                            style={ { backgroundColor } }
                            key={ photo.id }
                        >
                            <img
                                className="easy_image"
                                src={
                                    useThumbnail ?
                                        photo.images.thumbnail.url :
                                        photo.images.standard_resolution.url
                                }
                                alt={ photo.caption ? photo.caption.text : '' }
                                style={ {
                                    padding: `${ gridGap }px`,
                                } }
                            />
                            <div className="easy_image_overlay"></div>
                        </div>
                    );

                 } )
                }


                </div>
            );
        }

    } else if( apiResponseCode !== 200 ){
        container = <div> Something went wrong: { apiErrorMessage }</div>
    } else {
        container = (
            <div className={ className }>
                To get Started Please add an Instagram Access Token. {' '}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://instagram.pixelunion.net/">
                    Generate Token by Login Instagram
                </a>
                Once, you have a Token, please paste it into the "Instagram Access Token" Settings
            </div>
        );
    }

    let profileContainer;

    if( showProfile ){
        profileContainer = (
            <div className="display-grid easy-instagram-container">
                <div className="easy-instagram-picture-container">
                    <img
                        className="instagram_profile_picture"
                        src={ profile.profile_picture }
                        alt={ profile.full_name }/>
                </div>
                <div className="easy-instagram-bio-container">
                    <h3>{ profile.username }</h3>
                    <p> { profile.bio } </p>
                </div>
            </div>
        )
    } else {
        profileContainer = <Fragment />;
    }

    return(
        <div className={ className }>
            <InspectorControls>
                <PanelBody title={ __('Step 1: Access Tokens')}>
                    <TextControl
                        label={__('Instagram Access Token','ugb')}
                        value={ token }
                        onChange={ this.onChangeToken.bind(this) }
                        // onChange={ token => this.onChangeToken( { token } ) }
                    />
                </PanelBody>

                <PanelBody title={ __('Step 2: Layout Options', 'ugb') }>
                    <RangeControl
                        value={ numCols }
                        onChange={ numCols => setAttributes( { numCols } ) }
                        min={ 1 }
                        max={ 6 }
                        step={ 1 }
                        label={__('Columns', 'ugb')}
                    />

                    <RangeControl
                        value={ numImages }
                        // onChange={ numImages => setAttributes( { numImages } ) }
                        onChange={ this.onChangeImages.bind(this) }
                        min={ 1 }
                        max={ 20 }
                        step={ 1 }
                        allowReset="true"
                        label={__('Images', 'ugb')}
                    />

                    <RangeControl
                        value={ gridGap }
                        onChange={ gridGap => setAttributes( { gridGap } ) }
                        min={ 1 }
                        max={ 20 }
                        step={ 1 }
                        label={__('Image Spacing (px)', 'ugb')}
                    />

                    <ToggleControl
                        label={ __('Show Profile?', 'ugb') }
                        checked={ showProfile }
                        help={ __('Show your Profile Details such as your biography and profile Photo', 'ugb') }
                        // onChange={ this.onChangeShowProfile }
                        onChange={ showProfile => setAttributes( { showProfile } ) }
                    />

                    <ToggleControl
                        label={ __('Use Thumbnails ?', 'ugb') }
                        checked={ useThumbnail }
                        help={ __('Use Square Thumbnails for each Image ?', 'ugb') }
                        onChange={ useThumbnail => setAttributes({ useThumbnail } ) }
                    />

                    <PanelColorSettings
                        title={ __('Image Background', 'ugb') }
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: colorValue => setAttributes({ backgroundColor: colorValue }),
                                label: __('Background Color', 'ugb')
                            }
                        ]}
                    />
                </PanelBody>

            </InspectorControls>

            { profileContainer }

            { container }

        </div>
    )
}


}