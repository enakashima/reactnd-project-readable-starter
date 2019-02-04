import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialData } from '../api/ReadableAPI'
import { receiveCategories } from '../actions/categories'
import { receivePosts } from '../actions/posts'
import { flashErrorMessage } from 'redux-flash'

export function handleInitialData () {
    return (dispatch) => {

        dispatch(showLoading())

        return getInitialData()
                .then((data) => {
                    dispatch(receivePosts(data.posts))
                    dispatch(receiveCategories(data.categories))
                })
                .catch(() => dispatch(flashErrorMessage('Error while getting initial data!')))
                .finally(() => dispatch(hideLoading()))
    }
}