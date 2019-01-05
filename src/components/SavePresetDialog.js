import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Radio, DialogActions, Button } from '@material-ui/core';

class SavePresetDialog extends React.Component {
    constructor(props) {
        super(props);

        // State
        this.state = {
            selectedExistingPresetId: -1,
            name: '',
            details: '',
        }

        // Method Bindings.
        this.getPresetItemsJSX = this.getPresetItemsJSX.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.getAcceptButtonJSX = this.getAcceptButtonJSX.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDetailsChange = this.handleDetailsChange.bind(this);
        this.handleOverwriteButtonClick = this.handleOverwriteButtonClick.bind(this);
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    }

    render() {
        let message;

        if (this.props.presets.length === 0) {
            message = "Enter the name and details to create a new preset."
        }

        else {
            message = "Enter the name and details to create a new preset, or select one below to overwrite it."
        }

        return (
            <Dialog open={this.props.open}>
                <DialogTitle> Save Preset </DialogTitle>
                <DialogContent>
                    <Typography>
                         {message}
                    </Typography>
                    <TextField label="Name" 
                    onChange={this.handleNameChange}/>
                    <TextField label="Details" placeholder="eg: Georgie Off"
                    onChange={this.handleDetailsChange}/>
                    <List>
                        { this.getPresetItemsJSX() }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" onClick={this.props.onCancelButtonClick}> Cancel </Button>
                    { this.getAcceptButtonJSX() }
                </DialogActions>
            </Dialog>
        )
    }

    handleNameChange(e) {
        if (this.state.selectedExistingPresetId !== -1) {
            this.setState({ selectedExistingPresetId: -1 })
        }

        this.setState({ name: e.target.value });
    }

    handleDetailsChange(e) {
        if (this.state.selectedExistingPresetId !== -1) {
            this.setState({ selectedExistingPresetId: -1 })
        }

        this.setState({ details: e.target.value });
    }

    getAcceptButtonJSX() {
        if (this.state.selectedExistingPresetId !== -1) {
            return (
                <Button variant="text" color="primary" onClick={this.handleOverwriteButtonClick}> Overwrite </Button>
            )
        }

        else {
            return (
                <Button variant="text" color="primary" onClick={this.handleSaveButtonClick}> Save </Button>
            )
        }
    }

    getPresetItemsJSX() {
        let jsx = this.props.presets.map( item => {
            return (
                <ListItem key={item.uid}>
                    <ListItemText primary={item.name} secondary={item.details}/>
                    <ListItemSecondaryAction>
                        <Radio checked={this.state.selectedExistingPresetId === item.uid} onChange={(e) => { this.handleRadioChange(item.uid, e.target.checked)}} />
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })

        return jsx
    }

    handleRadioChange(uid, checked) {
        if (checked === true) {
            this.setState({ selectedExistingPresetId: uid });
        }
    }

    handleOverwriteButtonClick() {
        this.props.onOverwriteButtonClick(this.state.selectedExistingPresetId);
    }

    handleSaveButtonClick() {
        this.props.onSaveButtonClick(this.state.name, this.state.details);
    }
}

export default SavePresetDialog;