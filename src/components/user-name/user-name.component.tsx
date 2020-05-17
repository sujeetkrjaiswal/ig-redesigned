import React, { FC } from 'react'

import styles from './user-name.module.scss'

const UserName: FC<{ userName: string }> = ({ userName }) => (
  <a
    href={`https://www.instagram.com/${userName}/`}
    target="_blank"
    rel="noreferrer noopener"
    className={styles.userName}
  >
    {userName}
  </a>
)

export default UserName
