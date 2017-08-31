import React from 'react'

const styles = {
  page: {
    margin: '0 auto',
    maxWidth: '890px',
    padding: '53px 0px 15px',
  }
}

const PageContainer = props =>
  <div style={styles.page}>
    {props.children}
  </div>

export default PageContainer
