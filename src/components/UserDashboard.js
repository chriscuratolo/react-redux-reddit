import React from 'react'

import Card, { CardTitle } from 'material-ui/Card'

const styles = {
  userDashboard: {
    display: 'inline-block',
    margin: '8px auto',
    maxWidth: '290px',
    textAlign: 'left',
    width: '100%',
  }
}

const UserDashboard = props =>
  <Card style={styles.userDashboard}>
    <CardTitle title='User Data' />
  </Card>

export default UserDashboard
