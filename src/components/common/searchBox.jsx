import React, { Component } from 'react';
import Input from './partials/input';

const SearchBox = ({value, onChange}) => {
    return ( 
        <Input
        type="text"
        placeholder="  Search ..."
        name="search_field" 
        className= "form-control my-3"
        value = {value}
        onChange = {(e) => onChange(e.currentTarget.value)}
    />
     );
}

export default SearchBox;

 
