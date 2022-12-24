import React, { Component } from 'react';

const Input = (props) => {
     const {name, ...rest} = props
    return ( 
            <input
                {...rest}
                name={name} 
                id={name}
            />
     );
}
 
export default Input;