/*
* Author Box 
*/

import classnames from 'classnames';

import {
    Component

} from '../../../utils/wp-import'

export default class AuthorBox extends Component{
    constructor( props ){
        super(...arguments);
    }

    render(){
        const { authorAlignment, authorImgURL, authorFontSize, authorBackgroundColor, authorTextColor, authorAvatarShape  } = this.props.attributes;

        return(
            <div 
                style={{
                    backgroundColor: authorBackgroundColor,
                    color: authorTextColor
                }}
                className={ classnames(
                    this.props.className,
                    authorAlignment,
                    authorAvatarShape,
                    { 'egb-has-avatar': authorImgURL },
                    'egb-font-size-' + authorFontSize,
                    'egb-block-author',
                    'egb-author-columns'
                )}
            >
                    { this.props.children }
            </div>
        );

    }
}