import React from 'react'

import Card from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'

const styles = {
  card: {
    borderRadius: '0',
    boxShadow: '0',
  },
  circularProgress: {
    padding: '16px',
    textAlign: 'center',
  },
}

const Loading = props =>
  <Card style={styles.card}>
    <Divider />
    <div style={styles.circularProgress}>
      <CircularProgress color='#FF4500' size={30} />
    </div>
  </Card>

export default Loading
