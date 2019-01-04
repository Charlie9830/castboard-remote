import React from 'react';
import { AppBar, Toolbar, Grid, Typography, IconButton, Tabs, Tab, List, ListItem, ListSubheader, ListItemText, Drawer,
ListItemSecondaryAction,
Divider,  } from '@material-ui/core';
import CastMemberSelect from './CastMemberSelect';
import CastGroupChooser from './CastGroupChooser';
import OrchestraMemberSelect from './OrchestraMemberSelect';
import LogViewer from './LogViewer';

import GetCastIdFromMap from '../utilities/GetCastIdFromMap';
import GetOrchestraIdFromMap from '../utilities/GetOrchestraIdFromMap';

import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import RefreshIcon from '@material-ui/icons/Refresh';
import UploadIcon from '@material-ui/icons/CloudUpload';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsMenu from './SettingsMenu';
import ConnectionValidationOverlay from './ConnectionValidationOverlay';


class App extends React.Component {
    constructor(props) {
        super(props);

        // State.
        this.state = {
            currentTab: 0,
        }

        // Method Bindings.
        this.getSlideshowControlTabJSX = this.getSlideshowControlTabJSX.bind(this);
        this.getCastChangeTabJSX = this.getCastChangeTabJSX.bind(this);
        this.getCastChangeListItemsJSX = this.getCastChangeListItemsJSX.bind(this);
        this.getOrchestraChangeTabJSX = this.getOrchestraChangeTabJSX.bind(this);
        this.getOrchestraChangeItemsJSX = this.getOrchestraChangeItemsJSX.bind(this);
    }

    render() {
        return (
            <React.Fragment>

                <ConnectionValidationOverlay open={this.props.isConnectionValidationOverlayOpen} 
                isCheckingConnection={this.props.isCheckingConnection} isConnectionBad={this.props.isConnectionBad}
                onRetryButtonClick={this.props.onConnectionValidationOverlayRetryButtonClick}/>

                <Drawer open={this.props.isLogViewerOpen} anchor="left" variant="persistent">
                    <LogViewer logs={this.props.logs} onCopyLogsButtonClick={this.props.onCopyLogsButtonClick}
                    onCloseButtonClick={this.props.onLogViewerCloseButtonClick}/>
                </Drawer>

                <Drawer open={this.props.isSettingsMenuOpen} anchor="left" variant="persistent">
                    <SettingsMenu onBackArrowClick={this.props.onSettingsMenuBackArrowClick} 
                    onGetDebugLogsButtonClick={this.props.onGetDebugLogsButtonClick}
                    onSoftResetButtonClick={this.props.onSoftResetButtonClick}
                    onFileUpload={this.props.onFileUpload}
                    onPowerOffButtonClick={this.props.onPowerOffButtonClick}
                    onHardResetButtonClick={this.props.onHardResetButtonClick}
                    />
                </Drawer>


                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6"> Castboard </Typography>

                        <Grid container
                        direction="row-reverse"
                        justify="flex-start">
                        <IconButton onClick={this.props.onRefreshButtonClick}>
                            <RefreshIcon/>
                        </IconButton>
                        <IconButton onClick={this.props.onUploadButtonClick}>
                            <UploadIcon/>
                        </IconButton>

                        <IconButton onClick={this.props.onSettingsButtonClick}>
                            <SettingsIcon/>
                        </IconButton>
                        </Grid>
                        
                    </Toolbar>

                    <Tabs fullWidth onChange={(e, value) => { this.setState({currentTab: value})} }
                    value={this.state.currentTab}>
                        <Tab label="Cast"/>
                        <Tab label="Orchestra"/>
                        <Tab label="Slideshow"/>
                    </Tabs>
                </AppBar>

                <Grid container
                direction="column">
                    { this.state.currentTab === 0 && this.getCastChangeTabJSX() }
                    { this.state.currentTab === 1 && this.getOrchestraChangeTabJSX() }
                    { this.state.currentTab === 2 && this.getSlideshowControlTabJSX() }
                    
                </Grid>
            </React.Fragment>
        )
    }

    getCastChangeTabJSX() {
        return (
            <List style={{width: '100%'}}>
                {this.getCastChangeListItemsJSX()}
            </List>
        )
    }

    getOrchestraChangeTabJSX() {
        return (
            <List style={{width: '100%'}}>
                {this.getOrchestraChangeItemsJSX()}
            </List>
        )
    }

    getOrchestraChangeItemsJSX() {
        let typographyStyle = {
            width: '45%',
            paddingRight: '3%'
        }

        let jsx = this.props.orchestraRoles.map( item => {
            return (
                <ListItem key={item.uid}>
                    <Grid container style={{ width: '100%' }}
                        direction="row"
                        justify="space-between"
                        alignItems="center">
                        <Typography style={typographyStyle}> {item.name} </Typography>
                        <OrchestraMemberSelect value={GetOrchestraIdFromMap(this.props.orchestraChangeMap, item.uid)}
                            onChange={(e) => { this.props.onOrchestraChange(item.uid, e.target.value) }}
                            orchestraMembers={this.props.orchestraMembers} />
                    </Grid>
                </ListItem>
            )
        })

        return jsx;
    }

    getCastChangeListItemsJSX() {
        let typographyStyle = {
            width: '45%',
            paddingRight: '3%'
        }

        let individualRolesSubheadingJSX = [
            (<ListSubheader disableSticky={true} key="individualrolessubheader"> Individual Roles </ListSubheader>),
            (<Divider key="individualrolesdivider"/>)
        ];

        let individualRoles = this.props.roles.filter( item => {
            return item.groupId === "-1";
        })

        let individualRolesJSX = individualRoles.map( item => {
            return (
                <ListItem key={item.uid}>
                    <Grid container style={{width: '100%'}}
                        direction="row"
                        justify="space-between"
                        alignItems="center">
                        <Typography style={typographyStyle}> {item.name} </Typography>
                            <CastMemberSelect castMembers={this.props.castMembers}
                                value={GetCastIdFromMap(this.props.castChangeMap, item.uid)}
                                onChange={(e) => { this.props.onCastChange(item.uid, e.target.value) }} />
                    </Grid>
                    
                </ListItem>
            )
        })

        let roleGroupSubheadingJSX = [
            (<ListSubheader key="rolegroupssubheader"> Role Groups </ListSubheader>),
            (<Divider key="rolegroupsdivider"/>)
        ];

        let roleGroupJSX = this.props.roleGroups.map ( item => {
            let relatedRoles = this.props.roles.filter( role => {
                return role.groupId === item.uid;
            })

            let relatedRolesJSX = relatedRoles.map( (role, index) => {
                return (
                    <ListItem key={role.uid} style={{ paddingLeft: '8px' }}>
                        <Grid container style={{ width: '100%' }}
                            direction="row"
                            justify="space-between"
                            alignItems="center">
                            <Typography style={typographyStyle}> {role.name} </Typography>
                            <CastMemberSelect castMembers={this.props.castMembers}
                                value={GetCastIdFromMap(this.props.castChangeMap, role.uid)} />
                        </Grid>
                    </ListItem>
                )  
            })

            return (
                <React.Fragment key={item.uid}>
                    <ListItem>
                        <Grid container style={{ width: '100%' }}
                            direction="row"
                            justify="space-between"
                            alignItems="center">
                            <Typography style={typographyStyle}> {item.name} </Typography>

                            <CastGroupChooser castGroups={this.props.castGroups}
                                onChoose={(groupId) => { this.props.onGroupCastChange(item.uid, groupId) }} />
                        </Grid>

                    </ListItem>
                    {relatedRolesJSX}
                </React.Fragment>
            )
        })

        return [...individualRolesSubheadingJSX, ...individualRolesJSX, ...roleGroupSubheadingJSX, ...roleGroupJSX];
    }



    getSlideshowControlTabJSX() {
        return (
            <Grid style={{marginTop: '25%'}}
                container
                direction="row"
                justify="space-evenly"
                alignItems="center">
                <IconButton onClick={this.props.onPreviousSlideButtonClick}>
                    <SkipPreviousIcon />
                </IconButton>

                <IconButton onClick={this.props.onPauseButtonClick}>
                    <PauseIcon />
                </IconButton>

                <IconButton onClick={this.props.onPlayButtonClick}>
                    <PlayIcon />
                </IconButton>

                <IconButton onClick={this.props.onNextSlideButtonClick}>
                    <SkipNextIcon />
                </IconButton>
            </Grid>
        )
    }
}

export default App;