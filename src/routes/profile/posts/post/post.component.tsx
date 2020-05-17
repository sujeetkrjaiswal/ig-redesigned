import React, { FC, useCallback, useContext, useState } from 'react'
import { PostModel } from 'src/models/posts.model'
import { Avatar, Button, Carousel, Typography } from 'antd'
import styles from './post.module.scss'
import { MdMoreVert } from 'react-icons/md'
import { FaBookmark, FaRegBookmark, FaRegComment, FaHeart, FaRegHeart } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ProfileContext from 'src/routes/profile/profile.context'
import { COLORS } from 'src/constants/color.constant'
import CommentInput from 'src/routes/profile/comments/comment-input/comment-input.component'
import TimeLapsed from 'src/components/time-lapsed/time-lapsed.component'
import ResponsiveImage from 'src/components/responsive-image/responsive-image.component'
import UserName from 'src/components/user-name/user-name.component'
import Tagging from 'src/components/tagging/tagging.component'

const { Text, Paragraph } = Typography
const iconProps = {
  color: COLORS.iconColor,
  size: 24,
}
const Post: FC<{
  post: PostModel
  profileId: string
  setMenuPostId: (postId: string) => void
  sendMessage: () => void
}> = ({ post, profileId, sendMessage, setMenuPostId }) => {
  const [likeInProgress, setLikeInProgress] = useState(false)
  const [bookmarkInProgress, setBookmarkInProgress] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { likePost, bookmarkPost } = useContext(ProfileContext)
  const like = useCallback(async () => {
    setLikeInProgress(true)
    await likePost(post.id)
    setLikeInProgress(false)
  }, [likePost, post.id])
  const bookmark = useCallback(async () => {
    setBookmarkInProgress(true)
    await bookmarkPost(post.id)
    setBookmarkInProgress(false)
  }, [bookmarkPost, post.id])
  const showMenu = useCallback(() => {
    setMenuPostId(post.id)
  }, [setMenuPostId, post.id])
  return (
    <div className={styles.postCard} id={`postId_${post.id}`}>
      <div className={styles.header}>
        <Avatar src={post.authorImage} alt={post.author} className={styles.avatar} />
        <UserName userName={post.author} />
        <span className={styles.spacer} />
        <Button icon={<MdMoreVert {...iconProps} />} type="link" onClick={showMenu} />
      </div>

      {post.contents.length === 1 ? (
        <ResponsiveImage
          images={post.contents[0].images}
          alt={post.contents[0].caption}
          baseWidth={600}
        />
      ) : (
        <div className={styles.carouselContainer}>
          <Carousel afterChange={setCurrentIndex}>
            {post.contents.map((content) => (
              <ResponsiveImage
                key={content.images[0].src}
                images={content.images}
                alt={content.caption}
                baseWidth={600}
              />
            ))}
          </Carousel>
          <span className={styles.imageIdx}>
            {currentIndex + 1} / {post.contents.length}
          </span>
        </div>
      )}
      <div className={styles.actionIcon}>
        <Button
          onClick={like}
          type="link"
          disabled={likeInProgress}
          loading={likeInProgress}
          icon={post.viewerHasLiked ? <FaHeart {...iconProps} /> : <FaRegHeart {...iconProps} />}
        />
        <Link to={`/profile/${profileId}/post/${post.id}/comments`}>
          <Button type="link" icon={<FaRegComment {...iconProps} />} />
        </Link>
        <Button onClick={sendMessage} type="link" icon={<FiSend {...iconProps} />} />
        <span className={styles.spacer} />
        <Button
          onClick={bookmark}
          type="link"
          disabled={bookmarkInProgress}
          loading={bookmarkInProgress}
          icon={
            post.viewerHasSaved ? <FaBookmark {...iconProps} /> : <FaRegBookmark {...iconProps} />
          }
        />
      </div>
      <div className={styles.body}>
        <Text strong>{post.likeCount} likes</Text>
        <div className={styles.caption}>
          <UserName userName={post.author} />
          <Tagging text={post.contents[0].caption} />
        </div>
        {post.comments.length > 2 ? (
          <Link to={`/profile/${profileId}/post/${post.id}/comments`}>
            View all {post.comments.length} comments
          </Link>
        ) : null}
        {post.comments.slice(-2).map((comment) => (
          <div className={styles.comment} key={comment.id}>
            <UserName userName={comment.author} />
            <Tagging text={comment.commentText} />
          </div>
        ))}
        <TimeLapsed timestamp={post.createdAt} />
      </div>
      <CommentInput postId={post.id} />
    </div>
  )
}

export default Post
