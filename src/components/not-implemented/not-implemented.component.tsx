import React, { FC } from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export type NotImplementedProps = {
  feature: string
}

const NotImplemented: FC<NotImplementedProps> = ({ feature }) => {
  return (
    <>
      <Helmet>
        <title>{feature}</title>
        <meta name="description" content={`Redesigned ${feature} - Not available yet.`} />
      </Helmet>
      <Result
        status="403"
        title={feature}
        subTitle="Sorry, This page is not available"
        extra={
          <Link to="/profile">
            <Button type="primary">View User Profile</Button>
          </Link>
        }
      />
    </>
  )
}

export default NotImplemented
