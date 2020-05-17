import React, { FC } from 'react'
import { Spin } from 'antd'
import styles from './activity-indicator.module.scss'

const ActivityIndicator: FC<{}> = () => (
  <div className={styles.activityIndicator}>
    <Spin size="large" />
  </div>
)

export default ActivityIndicator
