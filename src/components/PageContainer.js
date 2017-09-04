import React from 'react'

const styles = {
  pageContainer: {
    margin: '53px auto 8px auto',
  },
}

const PageContainer = props =>
  <div style={styles.pageContainer}>
    {props.children}
  </div>

export default PageContainer
