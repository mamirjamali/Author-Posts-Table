import React, { Component } from 'react';
import TableHeader from './partials/tableHeader';
import TableBody from './partials/tableBody';

const Table = ({ columns, onSort, sortColumn, items,
                 itemsCount, onDeleteItem, itemsLoaded }) => {
    
    return ( 
        <table class="table">
            <TableHeader columns={columns} onSort={onSort}
                sortColumn={sortColumn}
            />
            <TableBody items={items} itemsCount={itemsCount}
                onDeleteItem={onDeleteItem} itemsLoaded={itemsLoaded}
                columns={columns}
            />
        </table >
     );
}
 
export default Table;