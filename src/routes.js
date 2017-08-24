import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Authorize from './containers/Authorize'
import Listings from './containers/Listings'
import ProtectedRoute from './containers/ProtectedRoute'

export default (
  <Route path='/' component={App}>
    <Route component={ProtectedRoute}>
      <IndexRoute component={Listings} />
      <Route path=':sorting' component={Listings} />
      <Route path='r/:subreddit(/:sorting)' component={Listings} />
    </Route>
    <Route path='authorize' component={Authorize} />
  </Route>
)
