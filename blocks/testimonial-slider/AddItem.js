const { Component } = wp.element;

class AddItem extends Component {

    render() {
        return (
            <div className="testimonial_container">
                <input
                    type="text"
                    id="add-new__input"
                    placeholder="Add new title"
                    name="title"
                    value={this.props.item.title}
                    onChange={(e) => this.props.handleInputNewItem(e)}/>
                <input
                    type="text"
                    id="add-new__input"
                    placeholder="Add new image"
                    name="image"
                    value={this.props.item.image}
                    onChange={(e) => this.props.handleInputNewItem(e)}/>
                <textarea
                    type="text"
                    id="add-new__input"
                    placeholder="Add new content"
                    name="content"
                    value={this.props.item.content}
                    onChange={(e) => this.props.handleInputNewItem(e)}/>

                <button id="add-new__btn" className="button button-primary" onClick={this.props.handleAddNewItem}>
                    Add New
                </button>
            </div>
        )
    }
}
export default AddItem;
