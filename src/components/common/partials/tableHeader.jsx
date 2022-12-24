import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css'
import "bootstrap/dist/css/bootstrap.css";
class TableHeader extends Component {

    raiseSort = column => {
        const sortColumn = { ...this.props.sortColumn }
        if (sortColumn.column === column)
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.column = column;
            sortColumn.order = "asc"
        }        
        this.props.onSort(sortColumn)
    } 

    renderSortIcon = column => {
        const { sortColumn } = this.props
        if (column.name !== sortColumn.column) return null;
        if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>
        
        return <i className="fa fa-sort-desc"></i>;
    };

    render() { 
        const { columns } = this.props
        return (
            <thead>
                <tr>
                <th key={"row"}>Row</th>
                    {
                        columns?.map(column => 
                            
                            <th className='clickable' key={column.name || column.key}
                                onClick={() => this.raiseSort(column.name)}
                            >{ column.lable }{ this.renderSortIcon(column) }</th>
                        )
                    }
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;