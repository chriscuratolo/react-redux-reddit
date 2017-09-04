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
  navInner: {
    margin: '5px auto',
    maxWidth: '590px',
    textAlign: 'center'
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
        <img alt='logo' height='36px' src='assets/logo.png' />
    </div>
  </Paper>

export default Nav
