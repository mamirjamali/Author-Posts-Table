import React, { Component } from 'react';

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

    render() { 
        const { columns } = this.props
        console.log(columns)
        return (
            <thead>
                <tr>
                    {
                        columns?.map(column => {
                            return (
                                <th key={column.name || column.key} onClick={() => this.raiseSort(column.name)}>{ column.lable }</th>
                            )
                        })
                    }
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;