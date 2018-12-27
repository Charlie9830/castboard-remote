import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import { Grid, AppBar, Toolbar, IconButton, Typography, SvgIcon } from '@material-ui/core';

let CopyContentIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24" width="24" height="24">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
        </SvgIcon>
    )
    
}

let LogLine = (props) => {
    let style = {
        color: 'black'
    }

    if (props.text.includes('[error]')) {
        style = {
            ...style,
            color: 'red',
            fontWeight: '700',
        }
    }

    if (props.text.includes('[warning]')) {
        style = {
            ...style,
            color: 'orange',
            fontWeight: '500',
        }
    }

    if (props.text.includes('Main Process Started')) {
        style = {
            ...style,
            borderTop: '4px blue solid',
            marginTop: '32px',
            paddingTop: '32px'
        }
    }

    return (
        <div style={style}>
            {props.text};
        </div>
    )
}

class LogViewer extends React.Component {
    render() {
        return (
            <React.Fragment>
                        <AppBar position="sticky">
                            <Toolbar>
                                <IconButton onClick={this.props.onCloseButtonClick}>
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6"> Logs </Typography>
                                <Grid container
                                direction="row-reverse"
                                justify="flex-start"
                                alignItems="center">
                                    <IconButton onClick={this.props.onCopyLogsButtonClick}>
                                        <CopyContentIcon/>
                                    </IconButton>
                                </Grid>
                            </Toolbar>
                        </AppBar>

                        <div style={{maxWidth: '100vw', paddingLeft: '8px', paddingRight: '8px'}}>
                            {this.props.logs.map( (text, index) => {
                                return <LogLine key={index} text={text}/>
                            })}
                        </div>

            </React.Fragment>
        )
    }
}

export default LogViewer;