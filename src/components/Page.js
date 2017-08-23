import React from 'react'

const styles = {
  page: {
    paddingTop: '46px',
  }
}

const Page = props =>
  <div style={styles.page}>
    {props.children}
  </div>

export default Page
