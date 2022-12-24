import React, { Component } from 'react';

class DeleteButton extends Component {

    delete = React.createRef()

    render() { 
        const { itemId, onDeleteItem } = this.props;
        
        return (
            <button ref={this.delete} id={`apt-btn-${itemId}`} onClick={() =>
                {
                const but = this.delete.current
                setTimeout(() => {
                    but.setAttribute('disabled', true)
                    but.innerHTML = 'Deleting...'
                    onDeleteItem(itemId)
                },3000)
                but.innerHTML = 'Undo...'
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