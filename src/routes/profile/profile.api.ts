import axios from 'axios'
import localForage from 'localforage'
import { PostModel, PostCommentModel } from 'src/models/posts.model'

export const apiConfigure = () =>
  localForage.config({
    name: 'Instagram-Redesign-App',
  })

export const apiGetAllPosts = async (force = false): Promise<PostModel[]> => {
  await localForage.ready()
  const postCount = await localForage.length()
  if (postCount === 0 || force) {
    const res = await axios.get<PostModel[]>('/assets/data.json')
    const posts = res.data
    sortByDate(posts)
    await storePosts(posts)
    return posts
  }
  const posts = await getAllStoredPosts()
  sortByDate(posts)
  return posts
}

export const apiGetPostById = async (postId: string): Promise<PostModel> => {
  const post = await localForage.getItem<PostModel>(postId)
  return post
}

export const hasAnyContent = async (): Promise<boolean> => {
  const len = await localForage.length()
  return Boolean(len)
}
export const apiLikePost = async (postId: string): Promise<PostModel> => {
  const post = await localForage.getItem<PostModel>(postId)
  const updatedPost = { ...post, viewerHasLiked: !post.viewerHasLiked }
  if (updatedPost.viewerHasLiked) {
    updatedPost.likeCount += 1
  } else {
    updatedPost.likeCount -= 1
  }
  await localForage.setItem<PostModel>(postId, updatedPost)
  return updatedPost
}
export const apiLikeComment = async (postId: string, commentId: string): Promise<PostModel> => {
  const post = await localForage.getItem<PostModel>(postId)
  const updatedPost = {
    ...post,
    comments: post.comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedComment = { ...comment, viewerHasLiked: !comment.viewerHasLiked }
        if (updatedComment.viewerHasLiked) {
          updatedComment.likeCount += 1
        } else {
          updatedComment.likeCount -= 1
        }
        return updatedComment
      }
      return comment
    }),
  }
  await localForage.setItem<PostModel>(postId, updatedPost)
  return updatedPost
}
export const apiBookmarkPost = async (postId: string): Promise<PostModel> => {
  const post = await localForage.getItem<PostModel>(postId)
  const updatedPost = { ...post, viewerHasSaved: !post.viewerHasSaved }
  await localForage.setItem<PostModel>(postId, updatedPost)
  return updatedPost
}

export const apiAddComment = async (
  postId: string,
  comment: PostCommentModel
): Promise<PostModel> => {
  const post = await localForage.getItem<PostModel>(postId)
  const updatedPost = { ...post, comments: [...post.comments, comment] }
  await localForage.setItem<PostModel>(postId, updatedPost)
  return updatedPost
}

// DB Utility

async function getAllStoredPosts(): Promise<PostModel[]> {
  return new Promise(async (resolve) => {
    const posts: PostModel[] = []
    try {
      await localForage.iterate<PostModel, unknown>((value) => {
        posts.push({ ...value })
      })
    } catch (error) {
      console.error('Error while iterating over the saved values')
    } finally {
      resolve(posts)
    }
  })
}

async function storePosts(posts: PostModel[]) {
  const allSavedPosts = await Promise.all(
    posts.map((post) => localForage.setItem(post.id, post).catch(() => null))
  )
  return allSavedPosts.filter(Boolean)
}

function sortByDate(posts: PostModel[]) {
  posts.sort((a, b) => b.createdAt - a.createdAt)
}
