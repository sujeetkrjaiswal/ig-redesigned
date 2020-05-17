import React, { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { ProfileContextProvider } from './profile.context'
import Posts from './posts/posts.component'
import Comments from './comments/comments.component'
import ProfileHome from './profile-home/profile-home.component'
import InvalidRoute from 'src/routes/invalid-route/invalid-route.component'

const Profile: FC<{}> = () => {
  return (
    <ProfileContextProvider>
      <Switch>
        <Route path="/profile" exact>
          <Redirect to="/profile/natgeo" />
        </Route>
        <Route path="/profile/:id" exact>
          <ProfileHome />
        </Route>
        <Route path="/profile/:id/posts" exact>
          <Posts />
        </Route>
        <Route path="/profile/:id/post/:postId/comments" exact>
          <Comments />
        </Route>
        <Route path="**">
          <InvalidRoute />
        </Route>
      </Switch>
    </ProfileContextProvider>
  )
}

export default Profile
