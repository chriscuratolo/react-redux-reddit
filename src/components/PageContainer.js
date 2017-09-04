import React from 'react'

const styles = {
  pageContainer: {
    margin: '0 auto',
    maxWidth: '590px',
    padding: '53px 14px 15px',
  },
}

const PageContainer = props =>
  <div className='page-container' style={styles.pageContainer}>
    {props.children}
  </div>

export default PageContainer
