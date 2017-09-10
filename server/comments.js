const clone = require('clone')

let db = {}

const defaultData = {
  '90ad2f29-c436-4505-bd70-d5ef2f7d463b': {
    id: '90ad2f29-c436-4505-bd70-d5ef2f7d463b',
    parentId: '2b90a02c-5a46-4702-8373-6ea2ac94bba8',
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false,
  },
  '23b8e00e-cee6-407d-baf9-d34128d325bd': {
    id: '23b8e00e-cee6-407d-baf9-d34128d325bd',
    parentId: '2b90a02c-5a46-4702-8373-6ea2ac94bba8',
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false,
  },
  '81103820-df0e-450a-b874-993984de876c': {
    id: '81103820-df0e-450a-b874-993984de876c',
    parentId: 'b2b6df97-dfad-48f6-a040-18837cda5548',
    timestamp: 1469479767190,
    body: 'Thank you!',
    author: 'Joe Frazier',
    voteScore: 7,
    deleted: false,
    parentDeleted: false,
  },
}

function getData(token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent(token, parentId) {
  return new Promise(res => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    const filtered_keys = keys.filter(
      key => comments[key].parentId === parentId && !comments[key].deleted,
    )
    res(filtered_keys.map(key => comments[key]))
  })
}

function get(token, id) {
  return new Promise(res => {
    const comments = getData(token)
    res(comments[id].deleted || comments[id].parentDeleted ? {} : comments[id])
  })
}

function add(token, comment) {
  return new Promise(res => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false,
    }

    res(comments[comment.id])
  })
}

function vote(token, id, option) {
  return new Promise(res => {
    let comments = getData(token)
    const comment = comments[id]
    switch (option) {
      case 'upVote':
        comment.voteScore = comment.voteScore + 1
        break
      case 'downVote':
        comment.voteScore = comment.voteScore - 1
        break
      default:
        console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent(token, post) {
  return new Promise(res => {
    let comments = getData(token)
    const keys = Object.keys(comments)
    const filtered_keys = keys.filter(key => comments[key].parentId === post.id)
    filtered_keys.forEach(key => (comments[key].parentDeleted = true))
    res(post)
  })
}

function disable(token, id) {
  return new Promise(res => {
    let comments = getData(token)
    comments[id].deleted = true
    res(comments[id])
  })
}

function edit(token, id, comment) {
  return new Promise(res => {
    let comments = getData(token)
    for (let prop in comment) {
      comments[id][prop] = comment[prop]
    }
    res(comments[id])
  })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit,
}
