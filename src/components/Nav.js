import React from 'react'

import Paper from 'material-ui/Paper'

const styles = {
  nav: {
    height: '46px',
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '500',
  },
  navContainer: {
    margin: '3px auto',
    maxWidth: '590px',
  },
  navInner: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
}

const Nav = props =>
  <Paper className='nav' style={styles.nav}>
    <div style={styles.navContainer}>
      <div style={styles.navInner}>
        <img alt='logo' height='40px' src='assets/logo.svg' />
      </div>
    </div>
  </Paper>

export default Nav
