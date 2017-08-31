import React from 'react'
import moment from 'moment'

import Card, { CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  timeline: {
    margin: '0 auto',
    maxWidth: '588px',
  },
  voteButton: {
    minWidth: '30px',
  }
}

const subtitle = (subreddit, timeAgo, domain) => {
  let string = `${subreddit} • ${timeAgo}`
  if (domain) {
    string += ` • ${domain}`
  }
  return string
}

const Timeline = props =>
  <Card style={styles.timeline}>
    {
      props.pageData.map(listing =>
        <div key={listing.data.id}>
          <CardHeader subtitle={subtitle(listing.data.subredditNamePrefixed, moment.unix(listing.data.createdUtc).fromNow(true), listing.data.domain)} />
          <CardTitle
            title={listing.data.title}
            titleStyle={{fontSize: '18px', lineHeight: '27px'}}
            style={{paddingBottom: '24px', paddingTop: '0px'}}
          />
          <CardActions>
            <div style={{display: 'inline-block', textAlign: 'center', width: '33%'}}>
              <FlatButton
                icon={<FontIcon className='material-icons'>arrow_upward</FontIcon>}
                style={styles.voteButton}
              />
              <CardText style={{display: 'inline-block', padding: '8px'}}>{listing.data.score}</CardText>
              <FlatButton
                icon={<FontIcon className='material-icons'>arrow_downward</FontIcon>}
                style={styles.voteButton}
              />
            </div>
            <div style={{display: 'inline-block', textAlign: 'center', width: '33%'}}>
              <FlatButton
                label={String(listing.data.numComments)}
                icon={<FontIcon className='material-icons'>comment</FontIcon>}
              />
            </div>
          </CardActions>
          <Divider />
        </div>
      )
    }
  </Card>

    export default Timeline
