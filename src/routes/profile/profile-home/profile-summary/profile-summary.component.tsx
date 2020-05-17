import { Typography } from 'antd'
import React, { FC, useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { GoVerified } from 'react-icons/go'

import AuthContext from 'src/contexts/Auth.context'
import { formatNumber } from 'src/utilities/format-number.utility'

import styles from './profile-summary.module.scss'
import { Helmet } from 'react-helmet-async'

const { Text, Title } = Typography
const ProfileSummary: FC<{}> = () => {
  const user = useContext(AuthContext)
  const [postCount, followerCount, followingCount] = useMemo(
    () => [
      formatNumber(user?.postCount || 0),
      formatNumber(user?.followerCount || 0),
      formatNumber(user?.followingCount || 0),
    ],
    [user]
  )
  if (!user) {
    return null
  }
  return (
    <section className={styles.summaryContainer}>
      <Helmet>
        <title>{`${user?.userName}'s Profile`}</title>
        <meta name="description" content={`Redesigned User Profile of ${user?.userName}`} />
      </Helmet>
      <div className={styles.profileImageContainer}>
        <img
          src={user.profileImage}
          alt={user.name}
          className={styles.profileImage}
          width={320}
          height={320}
          loading="eager"
        />
      </div>
      <Title level={3} className={styles.profileTitle}>
        {user.userName} {user.isVerified ? <GoVerified color="#3896f0" size={16} /> : null}
      </Title>
      <Text className={styles.postCount}>
        <span className={styles.bold}>{postCount}</span>
        Posts
      </Text>
      <Text className={styles.followerCount}>
        <span className={styles.bold}>{followerCount}</span> Followers
      </Text>
      <Text className={styles.followingCount}>
        <span className={styles.bold}>{followingCount}</span> Following
      </Text>
      <div className={styles.profileContent}>
        <Text className={styles.bold}>{user.name}</Text>
        <Text type="secondary">{user.subText}</Text>
        <Text>{user.description}</Text>
        <Link to={user.link} target="_blank" className={styles.bold} rel="noreferrer noopener">
          {user.link}
        </Link>
      </div>
    </section>
  )
}

export default ProfileSummary
