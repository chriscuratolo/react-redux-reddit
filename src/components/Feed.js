import React from 'react'

import FeedItem from './FeedItem.js'
import Loading from './Loading.js'

const styles = {
  timeline: {
    display: 'inline-block',
    margin: 'auto',
    maxWidth: '590px',
    textAlign: 'left',
    width: '100%',
  },
}

const Feed = props =>
  <div style={styles.timeline}>
    {props.pageData.length > 0 ?
      props.pageData.map((listing, index) =>
        <FeedItem data={listing.data} key={index} />)
      : null}
    {props.isFetching || props.pageData.length === 0 ? <Loading /> : null}
  </div>

export default Feed
