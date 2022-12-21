import React, { Component } from 'react';

class DeleteButton extends Component {
    render() { 
        const { itemId, onDeleteItem } = this.props;
        
        return (
            <button id={`apt-btn-${itemId}`} onClick={() =>
                {
                    const but = document.getElementById(`apt-btn-${itemId}`)
                    but.setAttribute('disabled', true)
                    but.innerHTML = 'Deleting...'
                    onDeleteItem(itemId)
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