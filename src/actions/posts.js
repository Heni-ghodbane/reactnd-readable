import * as PostsAPI from '../util/postsAPI'
import { ALL_CATEGORIES } from '../constants'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const SET_ORDER_BY_POSTS = 'SET_ORDER_BY_POSTS'
export const DELETED_POST = 'DELETED_POST'
export const VOTED_ON_POST = 'VOTED_ON_POST'
export const ADDED_POST = 'ADDED_POST'
export const NEW_POST = 'NEW_POST'
export const EDITED_POST = 'EDITED_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADDED_COMMENT = 'ADDED_COMMENT'
export const DELETED_COMMENT = 'DELETED_COMMENT'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const VOTED_ON_COMMENT = 'VOTED_ON_COMMENT'
export const EDITED_COMMENT = 'EDITED_COMMENT'
export const SET_ORDER_BY_COMMENTS = 'SET_ORDER_BY_COMMENTS'
export const SET_WORKING_POST = 'SET_WORKING_POST'
export const SET_WORKING_COMMENT = 'SET_WORKING_COMMENT'

export const receivePosts = (category, posts) => ({
  type: RECEIVE_POSTS,
  payload: {
    category,
    posts,
  },
})

export const fetchPostsByCategory = category => async dispatch => {
  let filterByCategory = null
  if (category !== ALL_CATEGORIES.path) {
    filterByCategory = category.toLowerCase()
  }
  const response = await PostsAPI.fetchPostsByCategory(filterByCategory)
  const posts = await response.json()
  dispatch(receivePosts(category, posts))
}

export const setOrderByPosts = orderBy => ({
  type: SET_ORDER_BY_POSTS,
  orderBy,
})

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
})

const deletedPost = post => ({
  type: DELETED_POST,
  post,
})

const voted = post => ({
  type: VOTED_ON_POST,
  post,
})

const added = post => ({
  type: ADDED_POST,
  post,
})

const edited = post => ({
  type: EDITED_POST,
  post,
})

const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments,
})

const addedComment = comment => ({
  type: ADDED_COMMENT,
  comment,
})

const deletedComment = comment => ({
  type: DELETED_COMMENT,
  comment,
})

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment,
})

const votedOnComment = comment => ({
  type: VOTED_ON_COMMENT,
  comment,
})

const editedComment = comment => ({
  type: EDITED_COMMENT,
  comment,
})

export const fetchPostById = id => async dispatch => {
  const response = await PostsAPI.fetchPostById(id)
  const post = await response.json()
  dispatch(receivePost(post))
}

export const deletePostById = id => async dispatch => {
  const response = await PostsAPI.deletePostById(id)
  const post = await response.json()
  dispatch(deletedPost(post))
}

export const voteOnPost = (id, option) => async dispatch => {
  const response = await PostsAPI.vote(id, { option })
  const post = await response.json()
  dispatch(voted(post))
}

export const addPost = post => async dispatch => {
  const response = await PostsAPI.add(post)
  const newPost = await response.json()
  dispatch(added(newPost))
}

export const editPost = post => async dispatch => {
  const response = await PostsAPI.edit(post)
  const updatedPost = await response.json()
  dispatch(edited(updatedPost))
}

export const fetchPostComments = postId => async dispatch => {
  const response = await PostsAPI.fetchComments(postId)
  const comments = await response.json()
  dispatch(receiveComments(comments))
}

export const addComment = comment => async dispatch => {
  const response = await PostsAPI.addComment(comment)
  const newComment = await response.json()
  dispatch(addedComment(newComment))
}

export const deleteComment = commentId => async dispatch => {
  const response = await PostsAPI.deleteComment(commentId)
  const comment = await response.json()
  dispatch(deletedComment(comment))
}

export const fetchComment = id => async dispatch => {
  const response = await PostsAPI.fetchComment(id)
  const comment = await response.json()
  dispatch(receiveComment(comment))
}

export const voteOnComment = (id, option) => async dispatch => {
  const response = await PostsAPI.voteOnComment(id, { option })
  const comments = await response.json()
  dispatch(votedOnComment(comments))
}

export const editComment = comment => async dispatch => {
  const response = await PostsAPI.editComment(comment)
  const updatedComment = await response.json()
  dispatch(editedComment(updatedComment))
}

export const setOrderByComments = orderBy => ({
  type: SET_ORDER_BY_COMMENTS,
  orderBy,
})

export const setWorkingPost = post => ({
  type: SET_WORKING_POST,
  post,
})
export const setWorkingComment = comment => ({
  type: SET_WORKING_COMMENT,
  comment,
})
