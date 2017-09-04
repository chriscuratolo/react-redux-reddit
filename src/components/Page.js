import React from 'react'

const styles = {
  page: {
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'scroll',
    webkitOverflowScrolling: 'touch',
  }
}

const Page = props =>
  <div className='page' style={styles.page}>
    {props.children}
  </div>

export default Page
