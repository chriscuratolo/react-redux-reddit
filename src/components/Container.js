import React from 'react'

const styles = {
  container: {
    margin: '0 auto',
    maxWidth: '800px',
  }
}

const Container = props =>
  <div style={styles.container}>
    {props.children}
  </div>

export default Container
