import React, { FC, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProfileContext from 'src/routes/profile/profile.context'

import styles from './post-grid.module.scss'
import { PostModel } from 'src/models/posts.model'
import { IoMdPhotos } from 'react-icons/io'
import { Link } from 'react-router-dom'
import ActivityIndicator from 'src/components/activity-indicator/activity-indicator.component'
import ResponsiveImage from 'src/components/responsive-image/responsive-image.component'

const PostGrid: FC<{}> = () => {
  const { posts } = useContext(ProfileContext)
  const params = useParams<{ id: string }>()
  if (posts.length === 0) {
    return <ActivityIndicator />
  }
  return (
    <section className={styles.postGrid}>
      {posts.map((post: PostModel) => (
        <Link
          key={post.id}
          to={{ pathname: `/profile/${params.id}/posts`, hash: `postId_${post.id}` }}
        >
          <div className={styles.thumbnailContainer}>
            <ResponsiveImage
              images={post.contents[0].thumbNails}
              alt={post.contents[0].caption}
              baseWidth={200}
            />
            {post.contents.length > 1 ? (
              <IoMdPhotos className={styles.multiIcon} size={16} color="#ffffff" />
            ) : null}
          </div>
        </Link>
      ))}
    </section>
  )
}

export default PostGrid
