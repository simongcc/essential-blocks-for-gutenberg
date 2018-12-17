const { __ } = wp.i18n;
const { Component } = wp.element;
const el = wp.element.createElement;

export default class Select extends Component {

    constructor( props ) {
        super( ...props );
        this.selectCallback = this.selectCallback.bind(this);
        this.state = {
            current_editing: 'The bold attribute has NOT been changed',
            change_time: 0
        }
    }

    selectCallback(event){
        this.setState({change_time: this.state.change_time+=1 });
        this.setState({current_editing: 'The bold attribute HAS been changed ' + this.state.change_time + ' times'});
        this.props.changeHandler(event);
    }

    render() {
        return el(
            'div',
            {},
            [
                el(
                    'div',
                    {},
                    this.state.current_editing,
                ),
                el(
                    'select',
                    {
                        onChange: this.props.changeHandler,
                        id: this.props.id,
                        value: this.props.value
                    },
                    [
                        el(
                            'option',
                            {
                                value: 'true'
                            },
                            __( 'Bold On', 'text-domain' )
                        ),
                        el(
                            'option',
                            {
                                value: 'false'
                            },
                            __( 'Bold Off', 'text-domain' )
                        )
                    ]
                )
            ]
        )
    }
}