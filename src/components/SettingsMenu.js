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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

let UploadFileIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24" width="24" height="24">
            <path fill="#000000" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13.5,16V19H10.5V16H8L12,12L16,16H13.5M13,9V3.5L18.5,9H13Z" />
        </SvgIcon>
    )
    
}

class SettingsMenu extends React.Component {
    constructor(props) {
        super(props)

        // Method Bindings.
        this.getPresetItemsJSX = this.getPresetItemsJSX.bind(this);
    }
    render() {
        let settingsMenuGridStyle = {
            width: '100vw',
            height: '100vh',
            display: 'grid',
            gridTemplateRows: '[AppBar]auto [Content]1fr'
        }

        return (
            <React.Fragment>
                <div style={settingsMenuGridStyle}>
                    <div style={{ gridRow: 'AppBar' }}>
                        <AppBar position="sticky">
                            <Toolbar>
                                <IconButton onClick={this.props.onBackArrowClick}>
                                    <BackArrowIcon />
                                </IconButton>
                                <Typography variant="h6"> Settings </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>


                    <div style={{ gridRow: 'Content', overflowY: 'scroll' }}>
                        <List>
                            <ListSubheader disableSticky={true}> Show File </ListSubheader>
                            <ListItem>
                                <ListItemIcon>
                                    <UploadFileIcon />
                                </ListItemIcon>

                                <ListItemText primary="Upload showfile" />

                                <ListItemSecondaryAction>
                                    <FileUploadButton onFileUpload={this.props.onFileUpload} />
                                </ListItemSecondaryAction>

                            </ListItem>

                            <ListSubheader disableSticky={true}> Control </ListSubheader>
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

                            <ListSubheader disableSticky={true}> Debug </ListSubheader>

                            <ListItem>
                                <ListItemIcon>
                                    <MemoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Download debug logs." />
                                <ListItemSecondaryAction>
                                    <Button variant="contained" onClick={this.props.onGetDebugLogsButtonClick}> Go </Button>
                                </ListItemSecondaryAction>
                            </ListItem>

                            { this.props.presets.length > 0 && <ListSubheader disableSticky={true}> Manage Presets </ListSubheader> }
                            
                            {this.getPresetItemsJSX()}

                            <ListSubheader disableSticky={true}> About </ListSubheader>

                            <ListItem>
                                <ListItemIcon>
                                    <CodeIcon />
                                </ListItemIcon>
                                <ListItemText secondary="Developed by Charlie Hall" />
                            </ListItem>
                        </List>
                    </div>
                </div>
                        
            </React.Fragment>
        )

    }

    getPresetItemsJSX() {
        let jsx = this.props.presets.map( item => {
            return (
                <ListItem key={item.uid}>
                    <ListItemText primary={item.name} secondary={item.details}/>
                    <ListItemSecondaryAction>
                        <IconButton>
                            <EditIcon onClick={() => { this.props.onEditPresetButtonClick(item.uid)}}/>
                        </IconButton>
                        <IconButton onClick={() => { this.props.onDeletePresetButtonClick(item.uid)}}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })

        return jsx;
    }
}

export default SettingsMenu;