import React, { Component } from 'react';

class DeleteButton extends Component {

    delete = React.createRef()

    render() { 
        const { item, onDeleteItem } = this.props;
        
        return (
            <button ref={this.delete} id={`apt-btn-${item.id}`} onClick={() =>
                {
                const but = this.delete.current
                // setTimeout(() => {
                //     but.setAttribute('disabled', true)
                    // but.innerHTML = 'Deleting...'
                    onDeleteItem(item)
                // },3000)
                // but.innerHTML = 'Undo...'
                }
            }
                type="button" className="btn btn-danger btn-sm m-2"
                >
                    Delete
            </button>
        );
    }
}
 
export default DeleteButton;