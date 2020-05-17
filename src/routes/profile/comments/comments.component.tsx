import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaChevronLeft } from 'react-icons/fa'
import ProfileContext from 'src/routes/profile/profile.context'
import { COLORS } from 'src/constants/color.constant'
import { message, Typography } from 'antd'
import { PostModel } from 'src/models/posts.model'
import Comment from './comment/comment.component'
import ActivityIndicator from 'src/components/activity-indicator/activity-indicator.component'
import UserName from 'src/components/user-name/user-name.component'
import styles from './comments.module.scss'
import TimeLapsed from 'src/components/time-lapsed/time-lapsed.component'
import CommentInput from 'src/routes/profile/comments/comment-input/comment-input.component'
import Tagging from 'src/components/tagging/tagging.component'

const iconProps = {
  color: COLORS.iconColor,
  size: 24,
}
const { Text, Paragraph } = Typography
const Comments: FC<{}> = () => {
  const [post, setPost] = useState<PostModel | null>(null)
  const params = useParams<{ id: string; postId: string }>()
  const { getPostById, isReady } = useContext(ProfileContext)
  const showReplies = useCallback(() => {
    message.warn('View Replies feature is not available')
  }, [])
  useEffect(() => {
    const loadData = async () => {
      const res = await getPostById(params.postId)
      setPost(res)
    }
    if (isReady) {
      loadData()
    }
  }, [getPostById, params.postId, isReady])
  useEffect(() => {
    console.log('post changes', post)
  }, [post])
  if (post === null) {
    return <ActivityIndicator />
  }
  return (
    <div>
      <Helmet>
        <title>Comments on post by {post?.author}</title>
        <meta name="description" content={post?.contents[0].caption} />
      </Helmet>
      <nav className={styles.nav}>
        <Link
          to={{ pathname: `/profile/${params.id}/posts`, hash: `postId_${params.postId}` }}
          className={styles.backIcon}
        >
          <FaChevronLeft {...iconProps} />
        </Link>
        <Text className={styles.title}>Comments</Text>
      </nav>
      <div className={styles.captionHeader}>
        <img src={post.authorImage} alt={post.author} className={styles.avatar} />
        <div>
          <div className={styles.caption}>
            <UserName userName={post.author} />
            <Tagging text={post.contents[0].caption} showFull />
          </div>
          <TimeLapsed timestamp={post.createdAt} />
        </div>
      </div>
      {post?.comments?.map((comment, idx) => (
        <Comment comment={comment} key={idx} postId={post.id} viewReplies={showReplies} />
      ))}
      <CommentInput postId={params.postId} className={styles.commentInput} focus />
    </div>
  )
}

export default Comments
