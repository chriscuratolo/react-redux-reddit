import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Authorize from './containers/Authorize'
import Home from './containers/Home'
import ProtectedRoute from './containers/ProtectedRoute'

export default (
  <Route path='/' component={App}>
    <Route component={ProtectedRoute}>
      <IndexRoute component={Home} />
    </Route>
    <Route path='authorize' component={Authorize} />
  </Route>
)
