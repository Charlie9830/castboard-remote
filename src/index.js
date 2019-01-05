import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';

import { createMuiTheme, MuiThemeProvider }  from '@material-ui/core/styles';
import PrimaryColor from '@material-ui/core/colors/indigo';
import SecondaryColor from '@material-ui/core/colors/grey';

let theme = createMuiTheme({
    'palette': {
        'primary': PrimaryColor,
        'secondary': SecondaryColor,
        'type': 'light',
    }
})

ReactDOM.render(<MuiThemeProvider theme={theme}> <AppContainer /> </MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
