import React from 'react'
import moment from 'moment'

import Card, { CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card'
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
  cardMedia: {
    display: 'inline-block',
  },
  cardText: {
    display: 'inline-block',
    fontSize: '16px',
    lineHeight: '150%',
    padding: '2px 16px 0px',
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

const subtitle = data => {
  let string = `${data.subredditNamePrefixed}`
  string += ` • ${moment.unix(data.createdUtc).fromNow(true)}`
  if (!data.media && data.domain) { string += ` • ${data.domain}` }
  return string
}

const FeedItem = props =>
  <Card style={styles.card}>
    <Divider />
    <CardHeader style={styles.cardHeader}
                subtitle={subtitle(props.data)}
                subtitleStyle={styles.cardHeaderSubtitle}
                textStyle={styles.cardHeaderText} />
    <CardText style={styles.cardText}>{props.data.title}</CardText>
    {props.data.media && props.data.media.oembed ?
      <CardMedia style={styles.cardMedia}
                 overlay={<CardText>{props.data.domain}</CardText>}>
        <img alt={props.data.media.oembed.thumbnailUrl}
             src={props.data.media.oembed.thumbnailUrl} />
      </CardMedia>
      : null}
    <CardActions style={styles.cardActions}>
      <div style={styles.buttonSection}>
        <FlatButton disableTouchRipple={true}
                    hoverColor='#FFFFFF'
                    icon={
                      <FontIcon className='material-icons'
                                style={styles.voteButtonIcon}>
                        arrow_upward
                      </FontIcon>
                    }
                    label={numberShortener(props.data.score)}
                    labelStyle={styles.voteButtonText}
                    style={styles.voteButton} />
        <FlatButton disableTouchRipple={true}
                    hoverColor='#FFFFFF'
                    icon={
                      <FontIcon className='material-icons'
                                style={styles.voteButtonIcon}>
                        arrow_downward
                      </FontIcon>
                    }
                    style={styles.voteButton} />
      </div>
      <div style={styles.buttonSection}>
        <FlatButton disableTouchRipple={true}
                    hoverColor='#FFFFFF'
                    icon={
                      <FontIcon className='material-icons'
                                style={styles.commentsButtonText}>
                        comment
                      </FontIcon>
                    }
                    label={numberShortener(props.data.numComments)}
                    labelStyle={styles.commentsButtonLabel}
                    style={styles.commentsButton} />
      </div>
    </CardActions>
  </Card>

export default FeedItem
