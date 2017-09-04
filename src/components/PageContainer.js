import React from 'react'

const styles = {
  pageContainer: {
    margin: '53px auto',
    maxWidth: '890px',
    zIndex: '-1',
  }
}

const PageContainer = props =>
  <div style={styles.pageContainer}>
    {props.children}
  </div>

export default PageContainer
