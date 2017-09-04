import React from 'react'

const styles = {
  page: {
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
  },
  pageContainer: {
    margin: '53px auto 8px auto',
  }
}

const Page = props =>
  <div className='page' style={styles.page}>
    <div style={styles.pageContainer}>
      {props.children}
    </div>
  </div>

export default Page
