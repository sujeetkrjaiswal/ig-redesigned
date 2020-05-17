import { ImageResource } from '../src/models/posts.model'

export interface Edge<T> {
  node: T
}

export interface Edges<T> {
  edges: Edge<T>[]
}

export interface EdgesWithCount<T> extends Edges<T> {
  count: number
}

export interface EdgesWithPageAndCount<T> extends EdgesWithCount<T> {
  page_info: PageInfo
}

export interface UserBase {
  id: string
  username: string
}
export interface UserWithProfile extends UserBase {
  profile_pic_url: string
}
export interface UserWithProfileAndIfVerified extends UserWithProfile {
  is_verified: boolean
}

export interface PageInfo {
  has_next_page: boolean
  end_cursor: string
}

export interface Dimensions {
  height: number
  width: number
}

export interface DashInfo {
  is_dash_eligible: boolean
  video_dash_manifest: string
  number_of_qualities: number
}

export interface NodeCaption {
  text: string
}

export interface NodeComment {
  id: string
  text: string
  created_at: number
  did_report_as_spam: boolean
  owner: UserWithProfileAndIfVerified
  viewer_has_liked: boolean
}

export interface NodeSidecar {
  __typename: string
  id: string
  gating_info?: any
  fact_check_overall_rating?: any
  fact_check_information?: any
  media_overlay_info?: any
  dimensions: Dimensions
  display_url: string
  display_resources: ImageResource[]
  is_video: boolean
  media_preview: string
  tracking_token: string
  edge_media_to_tagged_user: Edge<any>[]
  accessibility_caption?: any
}

export interface NodeTimeLine {
  __typename: string
  id: string
  gating_info?: any
  fact_check_overall_rating?: any
  fact_check_information?: any
  media_overlay_info?: any
  dimensions: Dimensions
  display_url: string
  display_resources: ImageResource[]
  is_video: boolean
  media_preview: string
  tracking_token: string
  edge_media_to_tagged_user: Edges<any>
  accessibility_caption?: any
  edge_media_to_caption: Edges<NodeCaption>
  shortcode: string
  edge_media_to_comment: EdgesWithPageAndCount<NodeComment>
  edge_media_to_sponsor_user: Edges<any>
  comments_disabled: boolean
  taken_at_timestamp: number
  edge_media_preview_like: EdgesWithCount<UserWithProfile>
  owner: UserBase
  location?: any
  viewer_has_liked: boolean
  viewer_has_saved: boolean
  viewer_has_saved_to_collection: boolean
  viewer_in_photo_of_you: boolean
  viewer_can_reshare: boolean
  thumbnail_src: string
  thumbnail_resources: ImageResource[]
  edge_sidecar_to_children: Edges<NodeSidecar>
  dash_info: DashInfo
  video_url: string
  video_view_count?: number
}

export interface User {
  edge_owner_to_timeline_media: EdgesWithPageAndCount<NodeTimeLine>
}

export interface Data {
  user: User
}

export interface IGResponse {
  data: Data
  status: string
}
