import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, List, ListItem, ListItemText, ListItemSecondaryAction,
Button,} from '@material-ui/core';

import BackArrowIcon from '@material-ui/icons/ArrowBack';

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
                                <ListItemText primary="Download debug logs." />
                                <ListItemSecondaryAction>
                                    <Button variant="contained" onClick={this.props.onGetDebugLogsButtonClick}> Go </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                        <div style={{flex: 1}}>
                            {this.props.logs}
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        )

    }
}

export default SettingsMenu;