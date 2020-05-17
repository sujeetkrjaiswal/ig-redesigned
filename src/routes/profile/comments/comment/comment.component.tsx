import React, { FC, useCallback, useContext } from 'react'
import { PostCommentModel } from 'src/models/posts.model'
import { Button, Divider } from 'antd'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { COLORS } from 'src/constants/color.constant'
import TimeLapsed from 'src/components/time-lapsed/time-lapsed.component'
import styles from './comment.module.scss'
import ProfileContext from 'src/routes/profile/profile.context'
import UserName from 'src/components/user-name/user-name.component'
import Tagging from 'src/components/tagging/tagging.component'

const iconProps = {
  color: COLORS.iconColor,
  size: 12,
}

const Comment: FC<{ comment: PostCommentModel; postId: string; viewReplies: () => void }> = ({
  comment,
  postId,
  viewReplies,
}) => {
  const { likeComment, replyOnComment } = useContext(ProfileContext)
  const like = useCallback(() => {
    likeComment(postId, comment.id)
  }, [comment.id, likeComment, postId])
  return (
    <div className={styles.commentContainer}>
      <img src={comment.authorImage} alt={comment.author} className={styles.avatar} />
      <div className={styles.comment}>
        <UserName userName={comment.author} />
        <Tagging text={comment.commentText} showFull />
      </div>
      <Button
        onClick={like}
        className={styles.like}
        type="link"
        icon={comment.viewerHasLiked ? <FaHeart {...iconProps} /> : <FaRegHeart {...iconProps} />}
      />
      <div className={styles.actions}>
        <TimeLapsed timestamp={comment.createdAt} />
        <span className={styles.actionBtn}>{comment.likeCount} likes</span>
        <span className={styles.actionBtn} onClick={replyOnComment}>
          Reply
        </span>
      </div>
      <div className={styles.dividerContainer} onClick={viewReplies}>
        <Divider orientation="right" className={styles.divider}>
          {comment.replyCount ? `View replies (${comment.replyCount})` : ''}
        </Divider>
      </div>
    </div>
  )
}

export default Comment
