import React, { FC } from 'react'
import { Typography } from 'antd'
import moment from 'moment'

const { Text } = Typography
const TimeLapsed: FC<{ timestamp: number }> = ({ timestamp }) => {
  return <Text type="secondary">{moment(timestamp * 1000).fromNow()}</Text>
}

export default TimeLapsed
