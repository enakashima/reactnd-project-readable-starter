import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import { loadingBarReducer as loadingBar } from 'react-redux-loading'
import { reducer as flash } from 'redux-flash'

export default combineReducers ({
    categories,
    posts,
    comments,
    loadingBar,
    flash,
})