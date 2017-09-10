const clone = require('clone')

let db = {}

const defaultData = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'Winston Churchill',
    category: 'react',
    voteScore: 99,
    deleted: false,
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'Mortimer Blackstone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
  },
  '6ni6ok2ym7mf1p33labc': {
    id: '6ni6ok2ym7mf1p33labc',
    timestamp: 1468479767180,
    title: 'GraphQL and Relay',
    body: 'Here we look into the basics of GraphQL and Relay',
    author: 'Fred Flintstone',
    category: 'graphql',
    voteScore: 10,
    deleted: false,
  },
  '4ni6ko2ym6mf1p33la13': {
    id: '4ni6ko2ym6mf1p33la13',
    timestamp: 1468479767190,
    title: 'ES6 Arrow Functions',
    body: `Let's dive into Es6 arrow functions and see what they are all about.`,
    author: 'Red Robin',
    category: 'javascript',
    voteScore: 23,
    deleted: false,
  },
  '5ni6ok2ym7fm1p33labc': {
    id: '5ni6ok2ym7fm1p33labc',
    timestamp: 1468479764190,
    title: 'Apollo Tools',
    body: 'Awesome tools for working with GraphQL',
    author: 'Floyd Mayweather',
    category: 'graphql',
    voteScore: 67,
    deleted: false,
  },
  '5ni6ok2ym7fm1a87labc': {
    id: '5ni6ok2ym7fm1a87labc',
    timestamp: 1468479764789,
    title: 'Getting started with ES6 and React',
    body:
      'Building a minimal todo app to explore the concepts of ES6 and React',
    author: 'Sai Komanduri',
    category: 'react',
    voteScore: 25,
    deleted: false,
  },
}

function getData(token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory(token, category) {
  return new Promise(res => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(
      key => posts[key].category === category && !posts[key].deleted,
    )
    res(filtered_keys.map(key => posts[key]))
  })
}

function get(token, id) {
  return new Promise(res => {
    const posts = getData(token)
    res(posts[id].deleted ? {} : posts[id])
  })
}

function getAll(token) {
  return new Promise(res => {
    const posts = getData(token)
    const keys = Object.keys(posts)
    const filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add(token, post) {
  return new Promise(res => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
    }

    res(posts[post.id])
  })
}

function vote(token, id, option) {
  return new Promise(res => {
    let posts = getData(token)
    const post = posts[id]
    switch (option) {
      case 'upVote':
        post.voteScore = post.voteScore + 1
        break
      case 'downVote':
        post.voteScore = post.voteScore - 1
        break
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable(token, id) {
  return new Promise(res => {
    let posts = getData(token)
    posts[id].deleted = true
    res(posts[id])
  })
}

function edit(token, id, post) {
  return new Promise(res => {
    let posts = getData(token)
    for (let prop in post) {
      posts[id][prop] = post[prop]
    }
    res(posts[id])
  })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
}
