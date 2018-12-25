import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

let OrchestraMemberSelect = (props) => {
    let options = props.orchestraMembers.map( item => {
        return (
            <MenuItem key={item.uid} value={item.uid}> {item.name} </MenuItem>
        )
    });

    options.unshift(<MenuItem key={-1} value={-1}> Track Cut </MenuItem>);

    return (
        <Select onChange={props.onChange} value={props.value}>
            {options}
        </Select>
    )
}

export default OrchestraMemberSelect;