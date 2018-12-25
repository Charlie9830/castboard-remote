import React from 'react';
import App from '../components/App';
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import url from 'url';

import CastChangeEntryFactory from '../factories/CastChangeEntryFactory';

const baseURL = process.env.NODE_ENV === "development" ? 'http://localhost:8081' : window.location.href;

let formatPath = (path) => {
    return url.resolve(baseURL, path);
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

    }

    componentDidMount() {
        this.getData();
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
                onOrchestraChange={this.handleOrchestraChange}/>
            </React.Fragment>
            
        )
    }

    handleRefreshButtonClick() {
        this.getData();
    }

    async handlePreviousSlideButtonClick() {
        let response = await axios.post(formatPath('/playback/prev'));
        console.log(response);
    }

    async handlePauseButtonClick() {
        let response = await axios.post(formatPath('/playback/pause'));
        console.log(response);
    }

    async handlePlayButtonClick() {
        let response = await axios.post(formatPath('/playback/play'));
        console.log(response);
    }

    async handleNextSlideButtonClick() {
        let response = await axios.post(formatPath('/playback/next'));
        console.log(response);
    }

    async handleUploadButtonClick() {
        let data = {
            castChangeMap: this.state.castChangeMap,
            orchestraChangeMap: this.state.orchestraChangeMap,
        }

        let response = await axios.post(formatPath('/data'), data);
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
                castChangeMap: data.castChangeMap,
                orchestraMembers: data.orchestraMembers,
                orchestraRoles: data.orchestraRoles,
                orchestraChangeMap: data.orchestraChangeMap,
            })
        }
    }
}

export default AppContainer;