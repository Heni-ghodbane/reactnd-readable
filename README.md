# Readable

## Project Overview
This is a content and comment web app. Users are able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users are also be able to edit and delete posts and comments.

This content and comment structure is common across a large number of websites and applications, from news sites to blogs to aggregators like Hacker News and Reddit. 

## Getting started
To run the application
```bash
yarn install
```

Start the server
```bash
yarn server
```

Start the application
```bash
yarn start
```

Finally, navigate to `http://localhost:3000/` in your browser.

## Usage
### Category View
The application has views for all post categories including an All Categories view.  Each view list all of the posts ordered by voteScore (highest score first) along with a control for changing the sort method for the list.  You can add a new post within each view.

### Post Detail View
This view show the details of a post and a list all of the comments for that post, ordered by voteScore (highest first), along with a control to reorder comments by score or date.  You can also edit or delete posts, and add comments.

### Comment Detail View
This view show the details of a comment.  You can also edit or delete the comment.

## Notes
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This project uses [React-Bootstrap](https://react-bootstrap.github.io/getting-started.html).

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
