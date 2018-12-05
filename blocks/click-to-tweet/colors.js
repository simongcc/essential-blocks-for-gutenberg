const { withColors } = wp.editor;

const applyWithColors = withColors(
    'backgroundColor',
    { textColor: 'color' },
    { buttonColor: 'background-color' }
);

export default applyWithColors;