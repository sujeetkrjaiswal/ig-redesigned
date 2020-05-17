import React, { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import NotImplemented from '../components/not-implemented/not-implemented.component'
import InvalidRoute from './invalid-route/invalid-route.component'
import Profile from './profile/profile.index'

const Routes: FC<{}> = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/profile" />
      </Route>
      <Route path="/home" exact>
        <NotImplemented feature="Home Feed" />
      </Route>
      <Route path="/search" exact>
        <NotImplemented feature="Explore" />
      </Route>
      <Route path="/add" exact>
        <NotImplemented feature="Post Content" />
      </Route>
      <Route path="/activity" exact>
        <NotImplemented feature="Activity" />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="**">
        <InvalidRoute />
      </Route>
    </Switch>
  )
}

export default Routes
