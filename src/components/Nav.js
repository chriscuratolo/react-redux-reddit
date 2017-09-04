import React from 'react'

import { CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'

const styles = {
  nav: {
    height: '46px',
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '500',
  },
  navInner: {
    margin: '0 auto',
    maxWidth: '590px',
  },
  title: {
    fontSize: '24px',
    margin: '13px 16px',
    padding: '0px',
  },
}

const Nav = props =>
  <Paper className='nav' style={styles.nav}>
    <div style={styles.navInner}>
      <CardText style={styles.title}>reddit</CardText>
    </div>
  </Paper>

export default Nav
