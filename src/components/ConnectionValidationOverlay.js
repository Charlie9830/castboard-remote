import React from 'react';
import { Modal, CircularProgress, Typography, Paper, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

let ConnectionValidationOverlay = (props) => {
    let checkingConnectionJSX = (
        <DialogContent key="checkingconnectionjsx">
                <DialogContentText align="center"> Checking connection to Castboard </DialogContentText>
                <Grid container
                direction="column"
                justify="center"
                alignItems="center">
                <CircularProgress/>
                </Grid>
                
            </DialogContent>
    )

    let badConnectionJSX = (
        <DialogContent key="badconnectionjsx">
            <DialogTitle> Connection failed </DialogTitle>
            <DialogContentText>  Please ensure you are connected to the 'cbremote' wireless network. </DialogContentText>
        </DialogContent>
    )

    let badConnectionActions = (
        <DialogActions key="badconnectionactions">
            <Button variant="text" onClick={props.onRetryButtonClick}> Retry </Button>
        </DialogActions>
    )

    let contentsJSX;

    if (props.isCheckingConnection) {
        contentsJSX = checkingConnectionJSX;
    }

    if (props.isCheckingConnection === false && props.isConnectionBad === true) {
        contentsJSX = [badConnectionJSX, badConnectionActions];
    }

    return (
        <Dialog open={props.open}>
            { null }
            {contentsJSX}
        </Dialog>
    )
}

export default ConnectionValidationOverlay;