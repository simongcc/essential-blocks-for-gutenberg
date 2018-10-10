export const { __ } = wp.i18n
const attributes = {
    content:{
        type: 'array',
        source: 'children',
        selector: 'p',
        default: __('This is Alert for Promo, Sucriptions Notification', 'ugb')
    },
    blockAlignment: {
        type: 'string',
    },
    textColor: {
        type: 'string',
    },
    color: {
        type: 'string',
        default: '#000000'
    },
    dismissable: {
        type: 'boolean',
        default: true,
    },
    alertClass: {
        type: 'string',
        default: 'success',
    }
};

export default attributes;