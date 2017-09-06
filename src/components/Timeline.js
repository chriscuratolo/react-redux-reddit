import React from 'react'
import moment from 'moment'

import Card, { CardActions, CardHeader, CardText } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { grey600 } from 'material-ui/styles/colors'

const styles = {
  buttonSection: {
    display: 'inline-block',
  },
  card: {
    borderRadius: '0',
    boxShadow: '0',
  },
  cardActions: {
    padding: '2px 8px',
  },
  cardHeader: {
    padding: '10px 16px 2px',
  },
  cardHeaderSubtitle: {
    fontSize: '10pt',
  },
  cardHeaderText: {
    padding: '0px',
  },
  cardText: {
    fontSize: '16px',
    lineHeight: '150%',
    padding: '2px 16px 0px',
  },
  circularProgress: {
    padding: '16px',
    textAlign: 'center',
  },
  commentsButton: {
    color: grey600,
  },
  commentsButtonLabel: {
    fontSize: '12px',
    textTransform: 'none',
  },
  commentsButtonText: {
    fontSize: '12pt'
  },
  timeline: {
    display: 'inline-block',
    margin: 'auto',
    maxWidth: '590px',
    textAlign: 'left',
    width: '100%',
  },
  voteButton: {
    color: grey600,
    minWidth: '30px',
  },
  voteButtonIcon: {
    fontSize: '12pt',
  },
  voteButtonText: {
    fontSize: '12px',
    padding: '0px 0px 0px 8px',
  },
}

const numberShortener = value => {
  const number = Number(value)
  return number >= 1000
    ? `${(number/1000).toFixed(1)}k`
    : `${number}`
}

const loading =
  <div style={styles.circularProgress}>
    <CircularProgress color='#FF4500' size={30} />
  </div>

  const subtitle = (subreddit, timeAgo) => `${subreddit} • ${timeAgo}`

const Timeline = props =>
  <div style={styles.timeline}>
    {props.pageData ? props.pageData.map((listing, index) =>
      <Card key={index} style={styles.card}>
        <Divider />
        <CardHeader
          style={styles.cardHeader}
          subtitle={subtitle(
            listing.data.subredditNamePrefixed,
            moment.unix(listing.data.createdUtc).fromNow(true),
          )}
          subtitleStyle={styles.cardHeaderSubtitle}
          textStyle={styles.cardHeaderText}
        />
        <CardText style={styles.cardText}>{listing.data.title}</CardText>
        <CardActions style={styles.cardActions}>
          <div style={styles.buttonSection}>
            <FlatButton
              disableTouchRipple={true}
              hoverColor='#FFFFFF'
              icon={
                <FontIcon className='material-icons' style={styles.voteButtonIcon}>
                  arrow_upward
                </FontIcon>
              }
              label={numberShortener(listing.data.score)}
              labelStyle={styles.voteButtonText}
              style={styles.voteButton}
            />
            <FlatButton
              disableTouchRipple={true}
              hoverColor='#FFFFFF'
              icon={
                <FontIcon className='material-icons' style={styles.voteButtonIcon}>
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
              icon={
                <FontIcon className='material-icons' style={styles.commentsButtonText}>
                  comment
                </FontIcon>
              }
              label={numberShortener(listing.data.numComments)}
              labelStyle={styles.commentsButtonLabel}
              style={styles.commentsButton}
            />
          </div>
        </CardActions>
      </Card>
    ) : null}
    {props.isFetching ?
        <Card style={styles.card}>
          <Divider />
          {loading}
        </Card> : null}
  </div>

export default Timeline
