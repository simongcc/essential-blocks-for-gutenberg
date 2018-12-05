/*
Block setup
*/
import icons from '../../../utils/icons';
import classnames from 'classnames';


const { __ } = wp.i18n;
import {
    Component,
    MediaUpload
} from '../../../utils/wp-import'


export default class AvatarColumn extends Component{
    constructor( props ){
        super( ...arguments );
    }

    render(){
        return(
            <div class="egb-author-column egb-author-avatar-wrap">
				<div class="egb-author-image-wrap">
					{ this.props.children }
				</div>
			</div>
        )   
    }
}