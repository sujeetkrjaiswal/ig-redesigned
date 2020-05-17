# Instagram Redesigned

This is an attempt to redesign Instagram app using mock data for learning purposes. (this is a work in progress project)


## You can access the hosted app at

- https://ig-redesigned.web.app/profile/natgeo
- https://ig-redesigned.firebaseapp.com/profile/natgeo
- https://ig.sujeetjaiswal.com/

## Things that are implemented

- Configured with Travis, for auto-deployment to firebase hosting
- A command-line utility to parse Instagram Response (saved as sample.json), and download all the images, thumbnails, etc and creates a JSON format (as data.json) to be used for the application.
- All the data are stored in IndexedDB and all the operations are done assuming this as the data source
- User can `comment`, only last 2 comments are shown with posts
- User can `like a post` (increases the like counter)
- User can `like a comment` (in the comment page)
- Use can `bookmark` a post (on the posts page)
- `Loaders` are displayed corresponding to each micro-actions
- All the images are loaded in a `responsive` way (using srcset etc) and in `lazy mode`
- All the comments/captions are parsed to support `tagging` and `hashtags`
- X time ago, format for showing time elapsed
- Skelton for all the pages
- `Hash Tags`, `User`, and `mentions` are linked to actual accounts
- For multiple images in a post, `carousel` is implemented, when seeing in the post view
- In the post grid view in the profile page, white `multi-image` icon is used, to distinguish with the post with one entry
- When you navigate from comment to post, the page is `auto-scrolled` to the given post
- When you click on the `thumbnail` of a post in the `profile` page, you will be scrolled to the corresponding post in the `post` page.
- For SEO, all the pages use the helmet library to update metadata.
- Website is responsive and is blocked at max-width of 600px to keep the experience similar to that of mobile view
- Additionally, images can be interlaced (using gm).

## Starting local - For View

This will build it for local and then will start a local serve at port 500.
You can then access it at [localhost:5000](http://localhost:5000)

```shell
npm install
npm run build
npm run serve
```

## Starting local - For development

```bash
npm install
npm start
```

## Building to deploy

Auto deployment is set using travis. It will automatically deploy to firebase when pushed to master.


### Privacy concerns

The project downloads data and images of actual users for generating mock data. This is only for demostration purposes.
The images, names, usernames are planned to be anonymized.
