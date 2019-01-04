import React from 'react';
import { Select } from '@material-ui/core';

let OrchestraMemberSelect = (props) => {
    let options = props.orchestraMembers.map( item => {
        return (
            <option key={item.uid} value={item.uid}> {item.name} </option>
        )
    });

    options.unshift(<option key={-1} value={-1}> Track Cut </option>);

    return (
        <Select style={{background: 'rgb(225,225,225)', width: '50%'}}
         native onChange={props.onChange} value={props.value}>
            {options}
        </Select>
    )
}

export default OrchestraMemberSelect;