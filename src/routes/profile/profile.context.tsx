import React, { createContext, FC, useCallback, useContext, useEffect, useState } from 'react'
import {
  apiAddComment,
  apiBookmarkPost,
  apiConfigure,
  apiGetAllPosts,
  apiGetPostById,
  apiLikeComment,
  apiLikePost,
} from 'src/routes/profile/profile.api'
import { PostModel } from 'src/models/posts.model'
import AuthContext from 'src/contexts/Auth.context'
import { v4 } from 'uuid'
import { message } from 'antd'

export type ProfileContextValue = {
  posts: PostModel[]
  isReady: boolean
  likePost: (postId: string) => void
  bookmarkPost: (postId: string) => void
  addComment: (postId: string, text: string) => void
  getPostById: (postId: string) => Promise<PostModel | null>
  refreshData: (force: boolean) => void
  likeComment: (postId: string, commentId: string) => void
  replyOnComment: () => void
}

const ProfileContext = createContext<ProfileContextValue>({
  posts: [],
  isReady: false,
  likePost: () => {},
  bookmarkPost: () => {},
  addComment: () => {},
  getPostById: () => Promise.resolve(null),
  refreshData: () => {},
  likeComment: () => {},
  replyOnComment: () => {},
})

export const ProfileContextProvider: FC<{}> = ({ children }) => {
  const user = useContext(AuthContext)
  const [posts, setPosts] = useState<PostModel[]>([])
  const [isReady, setIsReady] = useState(false)
  const updatePosts = useCallback((updatedPost: PostModel) => {
    setPosts((prePosts) =>
      prePosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    )
  }, [])
  const refreshAllData = useCallback(async (force = false) => {
    apiConfigure()
    const allPosts = await apiGetAllPosts(force)
    setPosts(allPosts)
    setIsReady(true)
  }, [])
  const likePost = useCallback(
    async (postId: string) => {
      const post = await apiLikePost(postId)
      updatePosts(post)
    },
    [updatePosts]
  )
  const likeComment = useCallback(
    async (postId: string, commentId: string) => {
      const post = await apiLikeComment(postId, commentId)
      updatePosts(post)
    },
    [updatePosts]
  )
  const bookmarkPost = useCallback(
    async (postId: string) => {
      const post = await apiBookmarkPost(postId)
      updatePosts(post)
    },
    [updatePosts]
  )
  const addComment = useCallback(
    async (postId: string, text: string) => {
      if (!user) return
      const post = await apiAddComment(postId, {
        id: v4(),
        likeCount: 0,
        replyCount: 0,
        viewerHasLiked: false,
        createdAt: Math.round(Date.now() / 1000),
        commentText: text,
        authorImage: user.profileImage,
        author: user.userName,
      })
      updatePosts(post)
    },
    [updatePosts, user]
  )
  const replyOnComment = useCallback(() => {
    message.warn('Reply on comment feature is not available')
  }, [])
  const getPostById = useCallback(
    async (postId: string) => {
      if (posts.length === 0) {
        await refreshAllData()
      }
      const localPost = posts.find((post) => post.id === postId)
      if (localPost) {
        return localPost
      }
      const post = await apiGetPostById(postId)
      updatePosts(post)
      return post
    },
    [refreshAllData, updatePosts, posts]
  )
  useEffect(() => {
    refreshAllData()
  }, [refreshAllData])
  return (
    <ProfileContext.Provider
      value={{
        posts,
        isReady,
        getPostById,
        addComment,
        likePost,
        likeComment,
        bookmarkPost,
        replyOnComment,
        refreshData: refreshAllData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext
