import React from 'react';
import App from '../components/App';
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import url from 'url';
import copy from 'copy-text-to-clipboard';

import CastChangeEntryFactory from '../factories/CastChangeEntryFactory';

const baseURL = process.env.NODE_ENV === "development" ? 'http://localhost:8081' : window.location.href;

let formatPath = (path) => {
    return url.resolve(baseURL,path);
}

class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        // State
        this.state = {
            castMembers: [],
            castGroups: [],
            roles: [],
            roleGroups: [],
            castChangeMap: {},
            orchestraMembers: [],
            orchestraRoles: [],
            orchestraChangeMap: {},
            isSettingsMenuOpen: false,
            logs: [],
            isLogViewerOpen: false,
            isCheckingConnection: true,
            isConnectionBad: false,
            isConnectionValidationOverlayOpen: true,
        }

        // Method Bindings.
        this.getData = this.getData.bind(this);
        this.handleUploadButtonClick = this.handleUploadButtonClick.bind(this);
        this.handleCastChange = this.handleCastChange.bind(this);
        this.handlePreviousSlideButtonClick = this.handlePreviousSlideButtonClick.bind(this);
        this.handlePauseButtonClick = this.handlePauseButtonClick.bind(this);
        this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
        this.handleNextSlideButtonClick = this.handleNextSlideButtonClick.bind(this);
        this.handleRefreshButtonClick = this.handleRefreshButtonClick.bind(this);
        this.handleOrchestraChange = this.handleOrchestraChange.bind(this);
        this.handleSettingsMenuBackArrowClick = this.handleSettingsMenuBackArrowClick.bind(this);
        this.handleSettingsButtonClick = this.handleSettingsButtonClick.bind(this);
        this.handleGetDebugLogsButtonClick = this.handleGetDebugLogsButtonClick.bind(this);
        this.handleCopyLogsButtonClick = this.handleCopyLogsButtonClick.bind(this);
        this.handleLogViewerCloseButtonClick = this.handleLogViewerCloseButtonClick.bind(this);
        this.handleSoftResetButtonClick = this.handleSoftResetButtonClick.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handlePowerOffButtonClick = this.handlePowerOffButtonClick.bind(this);
        this.handleHardResetButtonClick = this.handleHardResetButtonClick.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.pingServer = this.pingServer.bind(this);
        this.handleConnectionValidationOverlayRetryButtonClick = this.handleConnectionValidationOverlayRetryButtonClick.bind(this);
        this.setConnectionState = this.setConnectionState.bind(this);
        this.handleGroupCastChange = this.handleGroupCastChange.bind(this);
    }

    async componentDidMount() {
        document.addEventListener('visibilitychange', this.handleVisibilityChange, false)

        // Ping Server and Collect Data or notify of connection problem.
        let pingResult = await this.pingServer();
        if (pingResult === true) {
            // Connection is Good. Notify and Collect Data.
            this.setConnectionState(true);
            this.getData();
        }

        else {
            // Connection is Bad. Notify.
            this.setConnectionState(false);
        }
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <App 
                castMembers={this.state.castMembers}
                castGroups={this.state.castGroups}
                roles={this.state.roles}
                roleGroups={this.state.roleGroups}
                castChangeMap={this.state.castChangeMap}
                orchestraMembers={this.state.orchestraMembers}
                orchestraRoles={this.state.orchestraRoles}
                orchestraChangeMap={this.state.orchestraChangeMap}
                onUploadButtonClick={this.handleUploadButtonClick}
                onCastChange={this.handleCastChange}
                onPreviousSlideButtonClick={this.handlePreviousSlideButtonClick}
                onPauseButtonClick={this.handlePauseButtonClick}
                onPlayButtonClick={this.handlePlayButtonClick}
                onNextSlideButtonClick={this.handleNextSlideButtonClick}
                onRefreshButtonClick={this.handleRefreshButtonClick}
                onOrchestraChange={this.handleOrchestraChange}
                onSettingsButtonClick={this.handleSettingsButtonClick}
                isSettingsMenuOpen={this.state.isSettingsMenuOpen}
                onSettingsMenuBackArrowClick={this.handleSettingsMenuBackArrowClick}
                onGetDebugLogsButtonClick={this.handleGetDebugLogsButtonClick}
                logs={this.state.logs}
                isLogViewerOpen={this.state.isLogViewerOpen}
                onCopyLogsButtonClick={this.handleCopyLogsButtonClick}
                onLogViewerCloseButtonClick={this.handleLogViewerCloseButtonClick}
                onSoftResetButtonClick={this.handleSoftResetButtonClick}
                onFileUpload={this.handleFileUpload}
                onPowerOffButtonClick={this.handlePowerOffButtonClick}
                onHardResetButtonClick={this.handleHardResetButtonClick}
                isConnectionValidationOverlayOpen={this.state.isConnectionValidationOverlayOpen}
                isConnectionBad={this.state.isConnectionBad}
                isCheckingConnection={this.state.isCheckingConnection}
                onConnectionValidationOverlayRetryButtonClick={this.handleConnectionValidationOverlayRetryButtonClick}
                onGroupCastChange={this.handleGroupCastChange}/>
            </React.Fragment>
            
        )
    }

    async handleGroupCastChange(roleGroupId, castGroupId) {
        let castMembers = [...this.state.castMembers];
        let castChangeMap = {...this.state.castChangeMap};
        let roles = [...this.state.roles];

        let relatedCastMembers = castMembers.filter( item => {
            return item.groupId === castGroupId;
        })

        let relatedRoles = roles.filter( item => {
            return item.groupId === roleGroupId;
        })

        // Iterate through related Roles and Assign a Cast member from relatedCastMembers if such cast member exists.
        relatedRoles.map( (item, index) => {
            let castMember = relatedCastMembers[index];
            if (castMember !== undefined) {
                castChangeMap[item.uid] = CastChangeEntryFactory("group", castMember.uid, roleGroupId);
            }
        })

        this.setState({ castChangeMap: castChangeMap });

    }

    async handleConnectionValidationOverlayRetryButtonClick() {
        this.setState({ isCheckingConnection: true });
        let pingResult = await this.pingServer();
        this.setConnectionState(pingResult);
    }

    setConnectionState(isConnected) {
        if (isConnected) {
            this.setState({
                isCheckingConnection: false,
                isConnectionBad: false,
                isConnectionValidationOverlayOpen: false,
            })
        }

        else {
            this.setState({ 
                isCheckingConnection: false,
                isConnectionBad: true,
                isConnectionValidationOverlayOpen: true,
            })
        }
    }

    async handleVisibilityChange() {
        // Page has been brought back to Foreground.
        if (document.hidden === false) {
            this.setState({ 
                isCheckingConnection: true,
                isConnectionValidationOverlayOpen: true,
             })

            let result = await this.pingServer();
            this.setConnectionState(result);
        }   
    }

    async pingServer() {
        try {
            let response = await axios.get(formatPath('/ping'));
            if (response.data !== undefined && response.data.reply === "pong") {
                return true;
            }
        }

        catch(error) {
            return false;
        }
    }

    async handleHardResetButtonClick() {
            let data = {
                type: 'HARD_RESET'
            }
    
            await axios.post(formatPath('/control'), data);
    }

    async handlePowerOffButtonClick() {
        let data = {
            type: 'POWER_OFF'
        }

        await axios.post(formatPath('/control'), data);
    }

    async handleFileUpload(file) {
        if (file.type === "application/json") {
            let formData = new FormData();

            formData.append('showfile', file);

            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            await axios.post(formatPath('./showfile'), formData, config)
        }
    }

    async handleSoftResetButtonClick() {
        let data = {
            type: 'SOFT_RESET'
        }

        await axios.post(formatPath('/control'), data);
    }

    handleLogViewerCloseButtonClick() {
        this.setState({
            isLogViewerOpen: false,
            isSettingsMenuOpen: true,
        })
    }

    handleCopyLogsButtonClick() {
        let text = this.buildLogsIntoText(this.state.logs)
        copy(text);
    }

    buildLogsIntoText(logs) {
        let returnString = '';

        for (let line of logs) {
            returnString += line + '\n';
        }

        return returnString;
    }

    async handleGetDebugLogsButtonClick() {
        let response = await axios.get(formatPath('/logs'));
        let data = response.data;
        if (data !== undefined && data.logs !== undefined) {
            this.setState({ 
                logs: data.logs.split('\n').reverse(),
                isLogViewerOpen: true,
                isSettingsMenuOpen: false,
             });
        }
    }

    handleSettingsMenuBackArrowClick() {
        this.setState({ isSettingsMenuOpen: false });
    }

    handleSettingsButtonClick() {
        this.setState({ isSettingsMenuOpen: true });
    }

    handleRefreshButtonClick() {
        this.getData();
    }

    async handlePreviousSlideButtonClick() {
        await axios.post(formatPath('/playback/prev'));
    }

    async handlePauseButtonClick() {
        await axios.post(formatPath('/playback/pause'));
    }

    async handlePlayButtonClick() {
        await axios.post(formatPath('/playback/play'));
    }

    async handleNextSlideButtonClick() {
        await axios.post(formatPath('/playback/next'));
        
    }

    async handleUploadButtonClick() {
        let data = {
            castChangeMap: this.state.castChangeMap,
            orchestraChangeMap: this.state.orchestraChangeMap,
        }

        await axios.post(formatPath('/data'), data);
    }

    handleOrchestraChange(orchestraRoleId, orchestraMemberId) {
        let orchestraChangeMap = { ...this.state.orchestraChangeMap };

        orchestraChangeMap[orchestraRoleId] = orchestraMemberId;

        this.setState({ orchestraChangeMap: orchestraChangeMap });
    }

    handleCastChange(roleId, castMemberId) {
        let castChangeMap = { ...this.state.castChangeMap };

        castChangeMap[roleId] = CastChangeEntryFactory("individual", castMemberId, "-1");

        this.setState({ castChangeMap: castChangeMap });
    }

    async getData() {
        const response = await axios.get(formatPath('/data'));

        let data = response.data;

        if (data !== undefined) {
            this.setState({
                castMembers: data.castMembers,
                castGroups: data.castGroups,
                roles: data.roles,
                roleGroups: data.roleGroups,
                castChangeMap: data.castChangeMap,
                orchestraMembers: data.orchestraMembers,
                orchestraRoles: data.orchestraRoles,
                orchestraChangeMap: data.orchestraChangeMap,
            })
        }
    }
}

export default AppContainer;