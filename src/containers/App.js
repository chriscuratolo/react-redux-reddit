import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import theme from '../theme'
import './App.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

let App = props =>
  <MuiThemeProvider muiTheme={theme}>
    <div>
      {props.children}
    </div>
  </MuiThemeProvider>

export default App
