import React from 'react'

const styles = {
  pageContainer: {
    bottom: '0',
    margin: 'auto',
    overflowX: 'hidden',
    overflowY: 'scroll',
    position: 'absolute',
    top: '46px',
    width: '100%',
    zIndex: '0',
  },
}

const PageContainer = props =>
  <div className='page-container' style={styles.pageContainer}>
    {props.children}
  </div>

export default PageContainer
