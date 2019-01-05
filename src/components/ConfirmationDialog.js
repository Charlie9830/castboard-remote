import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@material-ui/core';

let ConfirmationDialog = (props) => {
    return (
        <Dialog open={true}>
            <DialogTitle> {props.title} </DialogTitle>
            <DialogContent>
                <Typography> {props.message} </Typography>
            </DialogContent>

            <DialogActions>
                <Button variant="text" onClick={props.onNegative}> No </Button>
                <Button variant="text" onClick={props.onAffirmative}> Yes </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog;