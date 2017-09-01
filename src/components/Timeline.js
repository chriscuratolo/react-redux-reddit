import React from 'react'
import moment from 'moment'

import Card, { CardActions, CardHeader, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

const lightGrey = 'rgba(0, 0, 0, 0.54)'

const styles = {
  buttonSection: {
    display: 'inline-block',
  },
  card: {
    borderRadius: '0',
  },
  cardActions: {
    padding: '2px 8px',
  },
  cardHeader: {
    padding: '10px 16px 2px',
  },
  cardHeaderIcon: {
    color: lightGrey,
  },
  cardHeaderSubtitle: {
    fontSize: '10pt',
  },
  cardHeaderText: {
    padding: '0px',
  },
  cardText: {
    display: 'inline-block',
    fontSize: '14px',
    lineHeight: '150%',
    padding: '2px 16px 0px',
  },
  commentsButton: {
    color: lightGrey,
  },
  commentsButtonLabel: {
    fontSize: '12px',
    textTransform: 'none',
  },
  commentsButtonText: {
    fontSize: '12pt'
  },
  timeline: {
    margin: '0px auto',
    maxWidth: '588px',
  },
  voteButton: {
    color: lightGrey,
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

const subtitle = (subreddit, timeAgo, domain) =>
  <div>
    <strong style={{color: 'black'}}>{subreddit}</strong>{` • ${timeAgo} • ${domain}`}
  </div>

const Timeline = props =>
  <div style={styles.timeline}>
    {props.pageData.map(listing =>
      <Card style={styles.card} key={listing.data.id}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          subtitle={subtitle(
            listing.data.subredditNamePrefixed,
            moment.unix(listing.data.createdUtc).fromNow(),
            listing.data.domain
          )}
          subtitleStyle={styles.cardHeaderSubtitle}
          textStyle={styles.cardHeaderText}
          style={styles.cardHeader}
          iconStyle={styles.cardHeaderIcon}
        />
        <CardText style={styles.cardText}>{listing.data.title}</CardText>
        <CardActions style={styles.cardActions}>
          <div style={styles.buttonSection}>
            <FlatButton
              disableTouchRipple={true}
              hoverColor='#FFFFFF'
              label={numberShortener(listing.data.score)}
              labelStyle={styles.voteButtonText}
              icon={
                <FontIcon
                  className='material-icons'
                  style={styles.voteButtonIcon}
                >
                  arrow_upward
                </FontIcon>
              }
              style={styles.voteButton}
            />
            <FlatButton
              disableTouchRipple={true}
              hoverColor='#FFFFFF'
              icon={
                <FontIcon
                  className='material-icons'
                  style={styles.voteButtonIcon}
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
              labelStyle={styles.commentsButtonLabel}
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
