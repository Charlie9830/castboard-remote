import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon,
Button,
ListSubheader,} from '@material-ui/core';

import BackArrowIcon from '@material-ui/icons/ArrowBack';
import CodeIcon from '@material-ui/icons/Code';
import MemoryIcon from '@material-ui/icons/Memory';
import BrokenIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';

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
                            <ListSubheader> Control </ListSubheader>

                            <ListItem>
                                <ListItemIcon>
                                    <BrokenIcon/>
                                </ListItemIcon>

                                <ListItemText primary="Soft reset Castboard"/>
                                <ListItemSecondaryAction>
                                    <Button variant="contained" onClick={this.props.onSoftResetButtonClick}> Reset </Button>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListSubheader> Debug </ListSubheader>

                            <ListItem>
                                <ListItemIcon>
                                    <MemoryIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Download debug logs." />
                                <ListItemSecondaryAction>
                                    <Button variant="contained" onClick={this.props.onGetDebugLogsButtonClick}> Go </Button>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListSubheader> About </ListSubheader>

                            <ListItem>
                                <ListItemIcon>
                                    <CodeIcon/>
                                </ListItemIcon>
                                <ListItemText secondary="Developed by Charlie Hall"/>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </React.Fragment>
        )

    }
}

export default SettingsMenu;