export interface ImageResource {
  src: string
  config_width: number
  config_height: number
}

export interface PostCommentModel {
  author: string
  authorImage: string
  commentText: string
  createdAt: number
  viewerHasLiked: boolean
  likeCount: number
  replyCount: number
  id: string
}
export interface PostContentModel {
  images: ImageResource[]
  thumbNails: ImageResource[]
  caption: string
  isVideo: boolean
}
export interface PostModel {
  id: string
  author: string
  authorImage: string

  createdAt: number

  contents: PostContentModel[]

  comments: PostCommentModel[]
  commentsDisabled: boolean
  likeCount: number

  viewerHasLiked: boolean
  viewerHasSaved: boolean
  viewerInPhoto: boolean
  viewerCanReShare: boolean
}
