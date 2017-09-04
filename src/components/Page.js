import React from 'react'

const styles = {
  page: {
  },
}

const Page = props =>
  <div style={styles.page}>
    {props.children}
  </div>

export default Page
