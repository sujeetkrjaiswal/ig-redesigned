import { message, Typography } from 'antd'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaChevronLeft } from 'react-icons/fa'

import ProfileContext from '../profile.context'
import Post from './post/post.component'
import styles from './posts.module.scss'
import { COLORS } from 'src/constants/color.constant'
import ActivityIndicator from 'src/components/activity-indicator/activity-indicator.component'
import { moveToId } from 'src/utilities/scroll-into-view'
import PostMenu from 'src/routes/profile/posts/post-menu/post-menu.component'
import AuthContext from 'src/contexts/Auth.context'
const { Text } = Typography
const iconProps = {
  color: COLORS.iconColor,
  size: 24,
}
const Posts: FC<{}> = () => {
  const params = useParams<{ id: string }>()
  const [menuPostId, setMenuPostId] = useState<string | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { hash } = useLocation()
  const { posts } = useContext(ProfileContext)
  const user = useContext(AuthContext)
  const sendMessage = useCallback(() => {
    message.warn('Sending Private messages is not available')
  }, [])
  const hideMenu = useCallback(() => {
    setMenuPostId(null)
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      if (posts.length && !hasScrolled) {
        moveToId(hash)
        setHasScrolled(true)
        console.log('hasScrolled => ', hash)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [hasScrolled, hash, posts.length])
  return (
    <section>
      <Helmet>
        <title>{`Posts by ${user?.userName}`}</title>
        <meta name="description" content={`Posts by ${user?.userName}`} />
      </Helmet>
      <nav className={styles.postsNav}>
        <Link to={`/profile/${params.id}`} className={styles.backIcon}>
          <FaChevronLeft {...iconProps} />
        </Link>
        <Text className={styles.title}>Posts</Text>
      </nav>
      {posts.length === 0 ? <ActivityIndicator /> : null}
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <Post
            post={post}
            key={post.id}
            profileId={params.id}
            sendMessage={sendMessage}
            setMenuPostId={setMenuPostId}
          />
        ))}
      </div>
      <PostMenu postId={menuPostId} onClose={hideMenu} />
    </section>
  )
}

export default Posts
