import axios, { AxiosResponse } from 'axios'
import * as fs from 'fs'
import { resolve, extname } from 'path'
import { promisify } from 'util'
import { v4 } from 'uuid'

import { Edge, IGResponse, NodeComment } from './ig-response.models'
import { PostModel, PostCommentModel, PostContentModel } from '../src/models/posts.model'

processData()
  .then(() => {
    console.log('Process completed without major error')
  })
  .catch(() => {
    console.log(`Process didn't completed successfully. Try again`)
  })

async function processData() {
  const sampleJson = readFile<IGResponse>('sample.json')
  await emptyFolders()
  const posts: PostModel[] = []

  for (const edge of sampleJson.data.user.edge_owner_to_timeline_media.edges) {
    try {
      const node = edge.node
      const contents = await processContent([
        {
          caption: node.edge_media_to_caption.edges[0]?.node.text,
          thumbNails: node.thumbnail_resources,
          images: node.display_resources,
          isVideo: node.is_video,
        },
        ...(Array.isArray(node.edge_sidecar_to_children?.edges)
          ? node.edge_sidecar_to_children.edges.map((e) => ({
              caption: node.edge_media_to_caption.edges[0]?.node.text,
              thumbNails: [],
              images: e.node.display_resources,
              isVideo: e.node.is_video,
            }))
          : []),
      ])
      const comments = await processImages(
        node.edge_media_to_comment.edges.map(
          ({ node: nComment }: Edge<NodeComment>): PostCommentModel => ({
            id: v4(),
            likeCount: Math.round(Math.random() * 20),
            replyCount: Math.round(Math.random() * 10),
            author: nComment.owner.username,
            authorImage: nComment.owner.profile_pic_url,
            commentText: nComment.text,
            createdAt: nComment.created_at,
            viewerHasLiked: nComment.viewer_has_liked,
          })
        ),
        'users',
        'authorImage'
      )

      const post: PostModel = {
        contents,
        comments,
        author: node.owner.username,
        authorImage: '/assets/user.jpg',
        commentsDisabled: node.comments_disabled,
        createdAt: node.taken_at_timestamp,
        id: node.id,
        viewerCanReShare: node.viewer_can_reshare,
        viewerHasLiked: node.viewer_has_liked,
        viewerHasSaved: node.viewer_has_saved,
        viewerInPhoto: node.viewer_in_photo_of_you,
        likeCount: node.edge_media_preview_like.count,
      }
      posts.push(post)
      console.log(
        `Processed posts with ${post.contents.length} images: ${posts.length}/${sampleJson.data.user.edge_owner_to_timeline_media.edges.length}`
      )
    } catch (e) {
      console.log(`Error processing a post, ignoring`, e)
    }
  }
  saveFile('data.json', posts)
}

async function processContent(contents: PostContentModel[]): Promise<PostContentModel[]> {
  const processedContents: PostContentModel[] = []
  for (const content of contents) {
    const thumbNails = await processImages(content.thumbNails, 'thumbnails', 'src')
    const images = await processImages(content.images, 'posts', 'src')
    processedContents.push({
      ...content,
      thumbNails,
      images,
    })
  }
  return processedContents
}

async function processImages<T>(images: T[], folder: string, key: keyof T): Promise<T[]> {
  const res: T[] = []
  const processedUrls = await Promise.all(
    images.map((image) => getLocalImageResource((image as any)[key] as string, folder))
  )
  images.forEach((imageObj, idx) => {
    if (processedUrls[idx]) {
      res.push({
        ...imageObj,
        [key]: processedUrls[idx],
      })
    }
  })
  return res
}

async function getLocalImageResource(imageSrc: string, type: string): Promise<string> {
  try {
    const res = await axios.get(imageSrc, { responseType: 'stream' })
    const fileName = `${v4()}${extname(new URL(imageSrc).pathname)}`
    const filePath = resolve(__dirname, '../public/assets', type, fileName)
    await saveImgFile(res, filePath)
    return `/assets/${type}/${fileName}`
  } catch (e) {
    console.log('Failed to get images')
    return ''
  }
}

async function saveImgFile(response: AxiosResponse, filePath: string) {
  console.log('saving file : ' + filePath)
  new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filePath))
      .on('finish', () => resolve())
      .on('error', (e: any) => reject(e))
  })
}

function saveFile(fileName: string, data: any) {
  const filePath = resolve(__dirname, '../public/assets', fileName)
  fs.writeFile(filePath, JSON.stringify(data), (e) => {
    console.log('File written', e)
  })
}

function readFile<T>(fileName: string): T {
  const filePath = resolve(__dirname, '../public/assets', fileName)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

async function emptyFolders() {
  const dirs = ['posts', 'thumbnails', 'users'].map((u) =>
    resolve(__dirname, '../public/assets', u)
  )
  const readdir = promisify(fs.readdir)
  const unlink = promisify(fs.unlink)

  for (const directory of dirs) {
    const files = await readdir(directory)
    const unlinkPromises = files.map((filename) =>
      unlink(`${directory}/${filename}`).catch((e) => console.log(e))
    )
    return Promise.all(unlinkPromises)
  }
}
