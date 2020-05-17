# Instagram Redesigned

Things that are implemented

- A command-line utility to parse Instagram Response (saved as sample.json), and download all the images, thumnails etc and creates an JSON format (as data.json) to be used for the applicstion.
- All the data are stored in IndexedDB and all the operations are done assuming this as the data source
- User can `comment`, only last 2 comments are shown with posts
- User can `like a post` (increases the like counter)
- User can `like a comment` (in the comment page)
- Use can `bookmark` a post (on the posts page)
- `Loaders` are displayed corresponding to each micro actions
- All the images are loaded in a `responsive` way (using srcset etc) and in `lazy mode`
- All the comments/captions are parsed to support `tagging` and `hash tags`
- X time ago, format for showing time elapsed
- Skelton for all the pages
- `Hash Tags`, `User`, and `mentions` are linked to actual accounts
- For multiple images in a post, `carousel` are implmented, when seeing in the post view
- In the post grid view in profile page, white `multi-image` icon is used, to distinguish with the post with one entry
- When you navigate from comment to post, page is `auto-scrolled` to the given post
- When you click on the `thumbnail` of a post in `profile` page, you will be scrolled to corresponding post in the `post` page.
- For SEO, all the pages uses helmet to upate meta data.
- Entire website is responsive and is blocked at max width of 600px to keep the experience similar to that of mobile view
- Additionally, images can be interlaced (using gm).

## Starting local - For View

This will build it for local and then will start a local serve at port 500.
You can then access it at [localhost:5000](http://localhost:5000)

```shell
npm run serve
```

## Starting local - For development

```bash
npm start
```

## Building to host in github pages

This command will build the application in the `pre` phase and then deploy to gh-pages branch of the repo

```bash
npm run deploy
```
