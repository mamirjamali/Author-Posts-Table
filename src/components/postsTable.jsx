import React, { Component } from 'react'

import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
import DeleteButton from './common/deleteButton';

class PostsTable extends Component {
    columns = [
        { name: "title.raw", lable: "Title" },
        { name: "status", lable: "Status" },
        { name: "date", lable: "Date" },
        {
            name: "delete",
            content: item => (<DeleteButton itemId={item.id} onDeleteItem={this.props.onDeleteItem} />)
        }
    ];

    render() { 

        const { items, itemsCount, onDeleteItem, itemsNotLoaded, onSort, sortColumn } = this.props

        return ( 
            <table class="table">
                <TableHeader columns={this.columns} onSort={onSort}
                    sortColumn={sortColumn}
                />
                <TableBody items={items} itemsCount={itemsCount}
                    onDeleteItem={onDeleteItem} itemsNotLoaded={itemsNotLoaded}
                    columns={ this.columns }
                />
            </table >
        );
    }
}
 
export default PostsTable;