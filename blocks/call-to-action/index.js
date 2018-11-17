/*
* Call to Action Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
import './style.scss';
import './editor.scss';


/*
* Call to Action Block Libraries
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
    Button

} from '../../utils/wp-import'

export default registerBlockType(
    'gutenberg-blocks/cta',
    {
        title : __('Call To Action', 'ugb'),
        description: __('Ultimate Gutenberg Call To Action Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:'megaphone',
        keywords: [
            __('Call To Action', 'ugb'),
            __('Content', 'ugb')
        ],

        attributes:{
            message: {
                type: 'html',
                selector: 'p',
                default: __( 'Purchase Osaka now and get lifetime support','ugb' ),
            },
            buttonText:{
                type: 'html',
                selector: 'a',
                default: __( 'Purchase now $45','ugb' ),
            },
            buttonUrl:{
                type: 'string',
                source: 'attribute',
                attribute: 'href',
                selector: 'a',
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
            const{
                attributes: {
                    message,
                    buttonText,
                    buttonUrl,
                    textAlignment,
                    blockAlignment
                },
                isSelected, setAttributes, className
            } = props;

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

                    <section className="section-content alice-green-bg">
                        <div className="container">
                            <div className="cta-content">
                                <div className="action-content">
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <RichText
                                                tagName="h3"
                                                onChange={ message => setAttributes({ message }) }
                                                value={ message }
                                            />
                                        </div>
                                        <div className="col-lg-4 text-right">
                                            { isSelected ? (
                                                <div>

                                                    <RichText
                                                        tagName="a"
                                                        value={ buttonText }
                                                        onChange={ buttonText => setAttributes({ buttonText }) } 
                                                        className="btn"
                                                    />
                                                    <form
                                                        onSubmit={ event => event.preventDefault() }
                                                    >

                                                        <URLInput
                                                            className="cta-url"
                                                            value = { buttonUrl }
                                                            onChange={ buttonUrl => setAttributes({ buttonUrl                                                    }) } />
                                                        <IconButton
                                                            icon="editor-break"
                                                            label={ __('Apply', 'ugb') }
                                                            type="submit"
                                                        />
                                                    </form>
                                                </div>

                                            ) : (
                                                <p>
                                                    <a href={ buttonUrl } className="btn">
                                                        { buttonText || __('Edit URL', 'ugb') }
                                                    </a>
                                                </p>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )

        },
        save: props => {

            const {
                message,
                buttonText,
                buttonUrl,
                blockAlignment,
                textAlignment,
            } = props.attributes;

            return(
                <section className={ `section-content alice-green-bg align${blockAlignment}`}>
                    <div className="container">
                        <div className="content">
                            <div className="action-content">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <h3>{ message }</h3>
                                    </div>
                                    <div className="col-lg-4 text-right">
                                        <a href={ buttonUrl } className="btn">
                                            { buttonText }
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }



    },
);
