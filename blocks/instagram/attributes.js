import {__} from "../../utils/wp-import";

export const attributes = {
    token: {
        type: 'string',
        default: ''
    },
    displayType: {
      type: 'string',
      default: 'grid'
    },
    useThumbnail:{
      type: "boolean",
      default: false
    },
    numCols:{
      type: 'number',
      default: 4
    },
    numImages: {
        type: 'number',
        default: 4
    },
    thumbs:{
        type: "array",
        default:[]
    },
    gridGap:{
        type: 'number',
        default: 0
    },
    showProfile: {
        type: 'boolean',
        default: false
    },
    profile: {
        type:'array',
        default: []
    },
    backgroundColor: {
        type: 'string',
        default: 'transparent'
    },

    //
    // imageID: {
    //     type: 'number',
    // },
    // imageAlt: {
    //     type: 'string',
    //     source: 'attribute',
    //     attribute: 'alt',
    //     selector: 'img',
    // },
    // imageUrl: {
    //     type: 'string',
    //     source: 'attribute',
    //     attribute: 'src',
    //     selector: 'img',
    // },
    textAlignment: {
        type: 'string',
    },
    blockAlignment: {
        type: 'string',
        default: 'center',
    },
};