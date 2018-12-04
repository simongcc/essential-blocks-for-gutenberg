/*
 * It's better for manage to all Imports from one Location
 * Gutenberg is continously changing. It's more Managable
 */
export const { registerBlockType } = wp.blocks

export const { __ } = wp.i18n

export const { compose } = wp.compose;

export const { withSelect } = wp.data;

export const {
    RangeControl,
    SelectControl,
    TextareaControl,
    TextControl,
    ToggleControl,
    Dashicon,
    IconButton,
    Button,
    Tooltip,
    PanelBody,
    PanelRow,
    RadioControl,
    Toolbar,
    FormToggle,

    withNotices,
    withAPIData, 
    withState


} = wp.components

export const {
    InspectorControls,
    BlockControls,
    ColorPalette,
    AlignmentToolbar,
    RichText,
    URLInput,
    MediaUpload,
    
    MediaPlaceholder,
    withColors,
    getColorClassName,
    MediaUploadCheck,

} = wp.editor.InspectorControls ? wp.editor : wp.blocks

export const {
    PanelColorSettings,
    BlockAlignmentToolbar,
} = wp.editor

export const {
    Fragment,
    Component
} = wp.element

export const {
    omit,
    merge,
    isUndefined,
    pickBy

} = lodash

export const {
    doAction,
    addAction,
    applyFilters,
    addFilter,
} = wp.hooks

// export const isPro = egb.isPro