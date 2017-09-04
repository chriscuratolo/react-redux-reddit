import React from 'react'

const styles = {
  pageContainer: {
    margin: '53px auto 16px',
    maxWidth: '590px',
  },
}

const PageContainer = props =>
  <div className='page-container' style={styles.pageContainer}>
    {props.children}
  </div>

export default PageContainer
