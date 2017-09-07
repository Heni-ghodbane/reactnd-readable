import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from '../reducers'

const store = initialState =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  )

export default store