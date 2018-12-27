import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon,
Button,} from '@material-ui/core';

import BackArrowIcon from '@material-ui/icons/ArrowBack';
import CodeIcon from '@material-ui/icons/Code';
import MemoryIcon from '@material-ui/icons/Memory';
import InfoIcon from '@material-ui/icons/Info';

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
                            <ListItem>
                                <ListItemIcon>
                                    <MemoryIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Download debug logs." />
                                <ListItemSecondaryAction>
                                    <Button variant="contained" onClick={this.props.onGetDebugLogsButtonClick}> Go </Button>
                                </ListItemSecondaryAction>
                            </ListItem>

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