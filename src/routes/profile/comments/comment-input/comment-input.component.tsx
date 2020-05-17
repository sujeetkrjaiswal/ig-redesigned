import React, { FC, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Button, Input, notification, Spin } from 'antd'
import { FiSend } from 'react-icons/fi'

import ProfileContext from '../../profile.context'
import styles from './comment-input.module.scss'
import { COLORS } from 'src/constants/color.constant'

const CommentInput: FC<{ postId: string; className?: string; focus?: boolean }> = ({
  postId,
  className,
  focus,
}) => {
  const { addComment } = useContext(ProfileContext)
  const [comment, setComment] = useState('')
  const [commentInProgress, setCommentInProgress] = useState(false)
  const inputRef = useRef(null) as RefObject<Input>

  const saveComment = useCallback(async () => {
    if (comment.trim().length) {
      try {
        setCommentInProgress(true)
        await addComment(postId, comment)
        setComment('')
      } catch (e) {
        notification.error({
          message: 'Could not save comment',
          description: e.message || '',
        })
      } finally {
        setCommentInProgress(false)
      }
    }
  }, [addComment, comment, postId])
  const handleCommentChange = useCallback(({ target: { value } }) => {
    setComment(value)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }, [inputRef])
  return (
    <div className={`${styles.commentInputContainer} ${className}`}>
      <Input
        placeholder="Add a comment"
        value={comment}
        prefix={commentInProgress ? <Spin /> : <FiSend size={24} color={COLORS.iconColor} />}
        onChange={handleCommentChange}
        className={styles.commentInput}
        onPressEnter={saveComment}
        readOnly={commentInProgress}
        ref={inputRef}
      />
      <Button type="link" disabled={!comment.trim().length} onClick={saveComment}>
        Post
      </Button>
    </div>
  )
}

CommentInput.defaultProps = {
  className: '',
}

export default CommentInput
