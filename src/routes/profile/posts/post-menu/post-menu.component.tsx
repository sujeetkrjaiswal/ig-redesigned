import React, { FC, useCallback } from 'react'
import { Button, message, Modal } from 'antd'
import styles from './post-menu.module.scss'

const PostMenu: FC<{ postId: string | null; onClose: () => void }> = ({ postId, onClose }) => {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])
  const feature = useCallback(() => {
    message.warn('Post menu features are not available')
  }, [])

  return (
    <Modal
      visible={Boolean(postId)}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
      closable={false}
      bodyStyle={{ padding: 0 }}
      width={250}
    >
      <Button type="link" className={styles.feature} block onClick={feature}>
        Report...
      </Button>
      <Button type="link" className={styles.feature} block onClick={feature}>
        Turn On Post Notifications
      </Button>
      <Button type="link" className={styles.feature} block onClick={feature}>
        Copy Link
      </Button>
      <Button type="link" className={styles.feature} block onClick={feature}>
        Share to...
      </Button>
      <Button type="link" className={styles.feature} block onClick={feature}>
        Unfollow
      </Button>
      <Button type="link" className={styles.feature} block onClick={feature}>
        Mute
      </Button>
    </Modal>
  )
}

export default PostMenu
