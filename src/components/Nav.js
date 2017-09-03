import React from 'react'

import { CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'

const styles = {
  nav: {
    height: '46px',
    position: 'fixed',
    width: '100vw',
    top: '0px',
    zIndex: '500',
  },
  navInner: {
    margin: 'auto',
    maxWidth: '590px',
  },
  title: {
    fontSize: '24px',
    margin: '8px 16px',
    padding: '0px',
    verticalAlign: 'baseline',
  },
}

const Nav = props =>
  <Paper style={styles.nav}>
    <div style={styles.navInner}>
      <CardText style={styles.title}>reddit</CardText>
    </div>
  </Paper>

export default Nav
