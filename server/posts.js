const clone = require('clone')

let db = {}

const defaultData = {
  '2b90a02c-5a46-4702-8373-6ea2ac94bba8': {
    id: '2b90a02c-5a46-4702-8373-6ea2ac94bba8',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'Winston Churchill',
    category: 'react',
    voteScore: 99,
    deleted: false,
  },
  'b2b6df97-dfad-48f6-a040-18837cda5548': {
    id: 'b2b6df97-dfad-48f6-a040-18837cda5548',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'Mortimer Knucklehead',
    category: 'redux',
    voteScore: -5,
    deleted: false,
  },
  'b7e00ff4-aee9-4875-91a3-67bade1915f6': {
    id: 'b7e00ff4-aee9-4875-91a3-67bade1915f6',
    timestamp: 1468479767180,
    title: 'GraphQL and Relay',
    body: 'Here we look into the basics of GraphQL and Relay',
    author: 'Fred Flintstone',
    category: 'graphql',
    voteScore: 10,
    deleted: false,
  },
  'c6abb54d-bed3-4219-a4e3-3cce83fc4175': {
    id: 'c6abb54d-bed3-4219-a4e3-3cce83fc4175',
    timestamp: 1468479767190,
    title: 'ES6 Arrow Functions',
    body: `Let's dive into Es6 arrow functions and see what they are all about.`,
    author: 'Red Robin',
    category: 'javascript',
    voteScore: 23,
    deleted: false,
  },
  '1fda31cb-431e-446c-9428-63dfd7c4199a': {
    id: '1fda31cb-431e-446c-9428-63dfd7c4199a',
    timestamp: 1468479764190,
    title: 'Apollo Tools',
    body: 'Awesome tools for working with GraphQL',
    author: 'Floyd Mayweather',
    category: 'graphql',
    voteScore: 67,
    deleted: false,
  },
  '6b1127a0-8f06-4ced-ab68-9aa61eec3a64': {
    id: '6b1127a0-8f06-4ced-ab68-9aa61eec3a64',
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
