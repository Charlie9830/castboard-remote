import React from 'react';
import { AppBar, Toolbar, Grid, Typography, IconButton, Tabs, Tab, List, ListItem, ListSubheader, ListItemText, Drawer,
ListItemSecondaryAction,
Divider,
BottomNavigation,
BottomNavigationAction,
SvgIcon,
Button,  } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import CastMemberSelect from './CastMemberSelect';
import CastGroupChooser from './CastGroupChooser';
import OrchestraMemberSelect from './OrchestraMemberSelect';
import LogViewer from './LogViewer';
import ConnectionValidationOverlay from './ConnectionValidationOverlay';

import GetCastIdFromMap from '../utilities/GetCastIdFromMap';
import GetOrchestraIdFromMap from '../utilities/GetOrchestraIdFromMap';

import PauseIcon from '@material-ui/icons/PauseCircleOutline';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import RefreshIcon from '@material-ui/icons/Refresh';
import UploadIcon from '@material-ui/icons/CloudUpload';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsMenu from './SettingsMenu';
import SavePresetDialog from './SavePresetDialog';
import InformationSnackbar from './InformationSnackbar';
import EditPresetDialog from './EditPresetDialog';

let ImportIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24" width="24" height="24">
            <path fill="#000000" d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z" />
        </SvgIcon>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);

        // State.
        this.state = {
            currentTab: 2,
        }

        // Method Bindings.
        this.getCastChangeTabJSX = this.getCastChangeTabJSX.bind(this);
        this.getCastChangeListItemsJSX = this.getCastChangeListItemsJSX.bind(this);
        this.getOrchestraChangeTabJSX = this.getOrchestraChangeTabJSX.bind(this);
        this.getOrchestraChangeItemsJSX = this.getOrchestraChangeItemsJSX.bind(this);
        this.getPresetsTabJSX = this.getPresetsTabJSX.bind(this);
        this.getPresetItemsJSX = this.getPresetItemsJSX.bind(this);
    }

    render() {
        let { theme } = this.props;

        let appGridStyle = {
            width: '100vw',
            height: '100vh',
            display: 'grid',
            gridTemplateRows: '[AppBar]auto [Content]1fr [SlideshowControl]auto',
        }

        return (
            <React.Fragment>
                { this.props.confirmationDialogComponent }

                <EditPresetDialog open={this.props.editPresetDialog.open} preset={this.props.editPresetDialog.preset}
                onDone={this.props.editPresetDialog.onDone} onCancel={this.props.editPresetDialog.onCancel}/>

                <InformationSnackbar open={this.props.informationSnackbar.open} message={this.props.informationSnackbar.message}
                onClose={this.props.informationSnackbar.onClose}/>

                <SavePresetDialog open={this.props.isSavePresetDialogOpen} presets={this.props.presets}
                onOverwriteButtonClick={this.props.onSavePresetDialogOverwriteButtonClick}
                onSaveButtonClick={this.props.onSavePresetDialogSaveButtonClick}
                onCancelButtonClick={this.props.onSavePresetDialogCancelButtonClick}/>

                <ConnectionValidationOverlay open={this.props.isConnectionValidationOverlayOpen}
                    isCheckingConnection={this.props.isCheckingConnection} isConnectionBad={this.props.isConnectionBad}
                    onRetryButtonClick={this.props.onConnectionValidationOverlayRetryButtonClick} />

                <Drawer open={this.props.isLogViewerOpen} anchor="left" variant="persistent">
                    <LogViewer logs={this.props.logs} onCopyLogsButtonClick={this.props.onCopyLogsButtonClick}
                        onCloseButtonClick={this.props.onLogViewerCloseButtonClick} />
                </Drawer>

                <Drawer open={this.props.isSettingsMenuOpen} anchor="left" variant="persistent">
                    <SettingsMenu onBackArrowClick={this.props.onSettingsMenuBackArrowClick}
                        onGetDebugLogsButtonClick={this.props.onGetDebugLogsButtonClick}
                        onSoftResetButtonClick={this.props.onSoftResetButtonClick}
                        onFileUpload={this.props.onFileUpload}
                        onPowerOffButtonClick={this.props.onPowerOffButtonClick}
                        onHardResetButtonClick={this.props.onHardResetButtonClick}
                        onDeletePresetButtonClick={this.props.onDeletePresetButtonClick}
                        presets={this.props.presets}
                        onEditPresetButtonClick={this.props.onEditPresetButtonClick}
                    />
                </Drawer>


                <div style={ appGridStyle }>
                    <div style={{ gridRow: 'AppBar' }}>
                        <AppBar position="sticky">
                            <Toolbar>
                                <Typography variant="h6"> Castboard </Typography>

                                <Grid container
                                    direction="row-reverse"
                                    justify="flex-start">
                                    <IconButton onClick={this.props.onRefreshButtonClick}>
                                        <RefreshIcon />
                                    </IconButton>
                                    <IconButton onClick={this.props.onUploadButtonClick}>
                                        <UploadIcon />
                                    </IconButton>

                                    <IconButton onClick={this.props.onSettingsButtonClick}>
                                        <SettingsIcon />
                                    </IconButton>
                                </Grid>

                            </Toolbar>

                            <Tabs fullWidth onChange={(e, value) => { this.setState({ currentTab: value }) }}
                                value={this.state.currentTab}>
                                <Tab label="Cast" />
                                <Tab label="Orchestra" />
                                <Tab label="Presets"/>
                            </Tabs>
                        </AppBar>
                    </div>


                    <div style={{ gridRow: 'Content', overflowY: 'scroll',}}>
                        <Grid container
                            direction="column">
                            { this.state.currentTab === 0 && this.getCastChangeTabJSX() }
                            { this.state.currentTab === 1 && this.getOrchestraChangeTabJSX() }
                            { this.state.currentTab === 2 && this.getPresetsTabJSX() }

                        </Grid>
                    </div>


                    <div style={{ gridRow: 'SlideshowControl'}}>
                        <BottomNavigation style={{background: theme.palette.secondary.light}}>
                            <BottomNavigationAction icon={<SkipPreviousIcon/>} onClick={this.props.onPreviousSlideButtonClick} />
                            <BottomNavigationAction icon={<PauseIcon />} onClick={this.props.onPauseButtonClick} />
                            <BottomNavigationAction icon={<PlayIcon />} onClick={this.props.onPlayButtonClick} />
                            <BottomNavigationAction icon={<SkipNextIcon />} onClick={this.props.onNextSlideButtonClick} />
                        </BottomNavigation>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    getPresetsTabJSX() {
        let presetListJSX = (
            <List>
                { this.getPresetItemsJSX() }
            </List>
        )

        let noPresetsMessageJSX = (
            <Grid container
            direction="column"
            justify="center"
            alignItems="center">
                <Typography> No presets </Typography>
            </Grid>
        )

        return (
            <React.Fragment>
                <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center">
                    <Button variant="contained" style={{margin: '8px'}} onClick={this.props.onSavePresetButtonClick}> Save new Preset </Button>
                </Grid>
            
                {/* Show Presets List or "No Presets" Message  */} 
                { this.props.presets.length > 0 ? presetListJSX : noPresetsMessageJSX }
                
            </React.Fragment>
        )
    }

    getPresetItemsJSX() {
        if (this.props.presets.length === 0) {
            return (
                <Typography> No Presets saved </Typography>
            )    
        }


        let jsx = this.props.presets.map( item => {
            return (
                <ListItem key={item.uid}>
                    <ListItemText primary={item.name} secondary={item.details}/>
                    <ListItemSecondaryAction>
                        <Grid container
                        direction="row-reverse"
                        justify="flex-start"
                        alignItems="center">
                            <IconButton>
                                <ImportIcon onClick={() => { this.props.onLoadPresetButtonClick(item.uid) } }/>
                            </IconButton>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })

        return jsx
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



    
}

export default withTheme()(App);