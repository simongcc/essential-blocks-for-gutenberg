const { Component } = wp.element;

export default class ListItem extends Component {
    render() {
        const item = this.props.item;
        return (
            <div className="testimonial_list">
                <h4>{item.title}</h4>
                <p>Content: {item.content}</p>
                <p>Image: {item.image}</p>
                <button onClick={() => this.props.handleItemDelete(item.id)}>delete</button>
            </div>
        )
    }
}
