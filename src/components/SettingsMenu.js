import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon,
Button, ListSubheader, Input, SvgIcon} from '@material-ui/core';

import BackArrowIcon from '@material-ui/icons/ArrowBack';
import CodeIcon from '@material-ui/icons/Code';
import MemoryIcon from '@material-ui/icons/Memory';
import SoftResetIcon from '@material-ui/icons/SentimentDissatisfied';
import HardResetIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import FileUploadButton from './FileUploadButton';

let UploadFileIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24" width="24" height="24">
            <path fill="#000000" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13.5,16V19H10.5V16H8L12,12L16,16H13.5M13,9V3.5L18.5,9H13Z" />
        </SvgIcon>
    )
    
}

class SettingsMenu extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Grid container style={{width: '100vw'}}
                direction="column"
                justify="flex-start"
                alignItems="stretch">
                    <Grid item>
                        <AppBar position="relative">
                            <Toolbar>
                                <IconButton onClick={this.props.onBackArrowClick}>
                                    <BackArrowIcon />
                                </IconButton>
                                <Typography variant="h6"> Settings </Typography>
                            </Toolbar>
                        </AppBar>
                    </Grid>

                    <Grid item>
                        <List>
                            <ListSubheader> Show File </ListSubheader>
                            <ListItem>
                                <ListItemIcon>
                                    <UploadFileIcon/>
                                </ListItemIcon>

                                <ListItemText primary="Upload showfile"/>

                                <ListItemSecondaryAction>
                                    <FileUploadButton onFileUpload={this.props.onFileUpload}/> 
                                </ListItemSecondaryAction>

                            </ListItem>

                            <ListSubheader> Control </ListSubheader>
                            <ListItem>
                                <ListItemIcon>
                                    <PowerIcon />
                                </ListItemIcon>

                                <ListItemText primary="Power off" />
                                <ListItemSecondaryAction>
                                    <Button variant="contained" onClick={this.props.onPowerOffButtonClick}> Off </Button>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <SoftResetIcon />
                                </ListItemIcon>

                                <ListItemText primary="Soft reset" />
                                <ListItemSecondaryAction>
                                    <Button variant="contained" onClick={this.props.onSoftResetButtonClick}> Reset </Button>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <HardResetIcon />
                                </ListItemIcon>

                                <ListItemText primary="Hard Reset" />
                                <ListItemSecondaryAction>
                                    <Button variant="contained" onClick={this.props.onHardResetButtonClick}> Reset </Button>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListSubheader> Debug </ListSubheader>

                            <ListItem>
                                <ListItemIcon>
                                    <MemoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Download debug logs." />
                                <ListItemSecondaryAction>
                                    <Button variant="contained" onClick={this.props.onGetDebugLogsButtonClick}> Go </Button>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListSubheader> About </ListSubheader>

                            <ListItem>
                                <ListItemIcon>
                                    <CodeIcon />
                                </ListItemIcon>
                                <ListItemText secondary="Developed by Charlie Hall" />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </React.Fragment>
        )

    }
}

export default SettingsMenu;