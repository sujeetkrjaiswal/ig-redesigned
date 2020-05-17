import React, { FC } from 'react'
import { ImageResource } from 'src/models/posts.model'
import styles from './responsive-image.module.scss'

const ResponsiveImage: FC<{
  images: ImageResource[]
  baseWidth: number
  alt: string
}> = ({ images, alt, baseWidth }) => {
  const srcSet = images
    .map((imgRes) => `${imgRes.src} ${imgRes.config_width / baseWidth}x`)
    .join(', ')
  const lastImg = images[images.length - 1]
  return (
    <img
      src={lastImg.src}
      srcSet={srcSet}
      alt={alt}
      className={`${styles.image}`}
      loading="lazy"
      height={lastImg.config_height}
      width={lastImg.config_width}
    />
  )
}
ResponsiveImage.defaultProps = {
  baseWidth: 600,
}
export default ResponsiveImage
