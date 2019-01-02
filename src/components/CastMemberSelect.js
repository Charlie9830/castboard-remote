import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

let CastMemberSelect = (props) => {
    let options = props.castMembers.map( item => {
        return (
            <option key={item.uid} value={item.uid}> {item.name} </option>
        )
    });

    options.unshift(<option key={-1} value={-1}> Track Cut </option>);

    return (
        <Select style={{background: 'white'}} native onChange={props.onChange} value={props.value}>
            {options}
        </Select>
    )
}

export default CastMemberSelect;