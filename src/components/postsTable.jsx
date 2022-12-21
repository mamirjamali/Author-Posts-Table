import { __ } from '@wordpress/i18n';
import { Spinner, } from '@wordpress/components'
import { decodeEntities } from '@wordpress/html-entities';

import React, { Component } from 'react'

import TableHeader from './common/tableHeader';

class PostsTable extends Component {
    columns = [
        { name: "row", lable: "Row" },
        { name: "title", lable: "Title" },
        { name: "status", lable: "Status" },
        { name: "date", lable: "Date" },
        { name: "delete" }
    ];

    render() { 

        const { items, itemsCount, onDeleteItem, itemsLoaded, onSort, sortColumn } = this.props
        let countRow = 1;

        return ( 
            <table class="table">
                <TableHeader columns={this.columns} onSort={ onSort } sortColumn={ sortColumn } />
            <tbody>
                {
                    itemsLoaded &&
                    <>
                        <td></td>
                        <td></td>
                        <td><Spinner/></td>
                        <td></td>
                        <td></td>
                    </>
                }
                {
                    itemsCount === 0 &&
                        <p class="lead">
                        { __('There are no posts for you to retrive.', 'apt-block')}
                        </p>
                }
                {
                    !itemsLoaded && items?.map(item => {
                        
                        return (
                            <tr key={item.id}>
                                <th scope="row">{countRow++}</th>
                                <td>{decodeEntities(item.title.rendered)}</td>
                                <td>{item.status}</td>
                                <td>{item.date}</td>
                                <td>
                                    <button id={`apt-btn-${item.id}`} onClick={() =>
                                    {
                                        const but = document.getElementById(`apt-btn-${item.id}`)
                                        but.setAttribute('disabled', true)
                                        but.innerHTML = 'Deleting...'
                                        onDeleteItem(item.id)
                                    }
                                }
                                    type="button" className="btn btn-danger btn-sm m-2"
                                    >
                                        Delete
                                </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        );
    }
}
 
export default PostsTable;