import React, { Component } from 'react'
import Table from './common/table';

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
            <Table columns={this.columns} onSort={onSort} sortColumn={sortColumn} items={items}
            itemsCount={itemsCount} onDeleteItem={onDeleteItem} itemsNotLoaded={itemsNotLoaded} />
        );
    }
}
 
export default PostsTable;