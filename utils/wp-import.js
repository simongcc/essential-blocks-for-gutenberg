/*
 * It's better for manage to all Imports from one Location
 * Gutenberg is continously changing. It's more Managable
 */
export const { registerBlockType } = wp.blocks

export const { __ } = wp.i18n

export const {
    RangeControl,
    SelectControl,
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
    FormToggle


} = wp.components

export const {
    InspectorControls,
    BlockControls,
    ColorPalette,
    AlignmentToolbar,
    RichText,
    URLInput,
    MediaUpload,
} = wp.editor.InspectorControls ? wp.editor : wp.blocks

export const {
    PanelColorSettings,
    BlockAlignmentToolbar,
} = wp.editor

export const {
    Fragment,
} = wp.element

export const {
    omit,
    merge,
} = lodash

export const {
    doAction,
    addAction,
    applyFilters,
    addFilter,
} = wp.hooks

// export const isPro = ugb.isPro