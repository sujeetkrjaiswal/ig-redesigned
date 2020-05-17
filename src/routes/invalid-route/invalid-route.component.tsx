import React, { FC } from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const InvalidRoute: FC<{}> = () => (
  <>
    <Helmet>
      <title>Page Not Found</title>
      <meta name="description" content="Requested page does not exists" />
    </Helmet>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/profile">
          <Button type="primary">Open Profile</Button>
        </Link>
      }
    />
  </>
)

export default InvalidRoute
