import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Radio, DialogActions, Button } from '@material-ui/core';

class EditPresetDialog extends React.Component {
    constructor(props) {
        super(props);

        // Refs.
        this.nameFieldRef = React.createRef();
        this.detailsFieldRef = React.createRef();

    }

    render() {
        let { preset } = this.props;

        let defaultName = preset === null || preset === undefined ? "" : preset.name;
        let defaultDetails = preset == null || preset === undefined ? "" : preset.details;

        return (
            <Dialog open={this.props.open}>
                <DialogTitle> Edit Preset </DialogTitle>
                <DialogContent>
                    <TextField label="Name" defaultValue={defaultName}
                    inputRef={this.nameFieldRef}/>
                    <TextField label="Details" placeholder="eg: Georgie Off" defaultValue={defaultDetails}
                    inputRef={this.detailsFieldRef}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" onClick={this.props.onCancel}> Cancel </Button>
                    <Button variant="text" 
                    onClick={() => { this.props.onDone(this.nameFieldRef.current.value, this.detailsFieldRef.current.value) }}> Done </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default EditPresetDialog;