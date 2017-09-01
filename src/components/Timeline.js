import React from 'react'
import moment from 'moment'

import Card, { CardActions, CardHeader, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

const styles = {
  buttonSection: {
    display: 'inline-block',
  },
  card: {
    borderRadius: '0',
  },
  cardHeader: {
    padding: '12px 16px 2px',
  },
  cardHeaderSubtitle: {
    fontSize: '12',
  },
  cardHeaderText: {
    padding: '0px',
  },
  cardText: {
    display: 'inline-block',
    lineHeight: '18px',
    padding: '2px 16px',
    flexGrow: '100',
  },
  commentsButton: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  commentsButtonText: {
    fontSize: '14'
  },
  timeline: {
    margin: '0px auto',
    maxWidth: '588px',
  },
  scoreText: {
    color: 'rgba(0, 0, 0, 0.54)',
    display: 'inline-block',
    fontSize: '14',
    padding: '0px',
  },
  voteButton: {
    color: 'rgba(0, 0, 0, 0.54)',
    minWidth: '30px',
  },
  voteButtonText: {
    fontSize: '14',
  },
}

const numberShortener = value => {
  const number = Number(value)
  return number >= 1000
    ? `${(number/1000).toFixed(1)}k`
    : `${number}`
}

const subtitle = (subreddit, timeAgo, domain) =>
  `${subreddit} • ${timeAgo} • ${domain}`

const Timeline = props =>
  <div style={styles.timeline}>
    {props.pageData.map(listing =>
      <Card style={styles.card} key={listing.data.id}>
        <CardHeader
          subtitle={subtitle(
            listing.data.subredditNamePrefixed,
            moment.unix(listing.data.createdUtc).fromNow(true),
            listing.data.domain
          )}
          subtitleStyle={styles.cardHeaderSubtitle}
          textStyle={styles.cardHeaderText}
          style={styles.cardHeader}
        />
        <CardText style={styles.cardText}>{listing.data.title}</CardText>
        <CardActions>
          <div style={styles.buttonSection}>
            <FlatButton
              disableTouchRipple={true}
              hoverColor='#FFFFFF'
              icon={
                <FontIcon
                  className='material-icons'
                  style={styles.voteButtonText}
                >
                  arrow_upward
                </FontIcon>
              }
              style={styles.voteButton}
            />
            <CardText style={styles.scoreText}>{numberShortener(listing.data.score)}</CardText>
            <FlatButton
              disableTouchRipple={true}
              hoverColor='#FFFFFF'
              icon={
                <FontIcon
                  className='material-icons'
                  style={styles.voteButtonText}
                >
                  arrow_downward
                </FontIcon>
              }
              style={styles.voteButton}
            />
          </div>
          <div style={styles.buttonSection}>
            <FlatButton
              disableTouchRipple={true}
              hoverColor='#FFFFFF'
              label={numberShortener(listing.data.numComments)}
              icon={
                <FontIcon
                  className='material-icons'
                  style={styles.commentsButtonText}
                >
                  comment
                </FontIcon>
              }
              style={styles.commentsButton}
            />
          </div>
        </CardActions>
        <Divider />
      </Card>
    )}
  </div>

export default Timeline
