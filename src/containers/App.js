import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import theme from '../theme'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const styles = {
  app: {
    fontFamily: 'Fira Sans, sans-serif',
    height: '100vh',
  }
}

let App = props =>
  <MuiThemeProvider muiTheme={theme}>
    <div style={styles.app}>
      {props.children}
    </div>
  </MuiThemeProvider>

export default App
