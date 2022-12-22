import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ columns, onSort, sortColumn, items,
                 itemsCount, onDeleteItem, itemsNotLoaded }) => {
    
    return ( 
        <table class="table">
            <TableHeader columns={columns} onSort={onSort}
                sortColumn={sortColumn}
            />
            <TableBody items={items} itemsCount={itemsCount}
                onDeleteItem={onDeleteItem} itemsNotLoaded={itemsNotLoaded}
                columns={columns}
            />
        </table >
     );
}
 
export default Table;