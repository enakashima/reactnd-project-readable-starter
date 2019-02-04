import { showLoading, hideLoading } from "react-redux-loading"
import { votePost, savePost, removePost, editPost } from '../api/ReadableAPI'
import { flashMessage, flashErrorMessage } from 'redux-flash'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const UPDATE_POST_COMMENTS_COUNT = 'UPDATE_POST_COMMENTS_COUNT'
export const UPDATE_POST_VOTE_SCORE = 'UPDATE_POST_VOTE_SCORE'
export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'

export function receivePosts (posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function updatePostCommentsCount (postId, commentCount) {
    return {
        type: UPDATE_POST_COMMENTS_COUNT,
        postId,
        commentCount
    }
}

function updatePostVoteScore(postId, voteScore) {
    return {
        type: UPDATE_POST_VOTE_SCORE,
        postId,
        voteScore
    }
}

export function handleUpdatePostVoteScore(postId, option) {
    return (dispatch) => {
        dispatch(showLoading())
        return votePost(postId, option)
            .then(res => dispatch(updatePostVoteScore(postId, res.voteScore)))
            .catch(() => dispatch(flashErrorMessage('An error occurred while voting in this post!')))
            .finally(dispatch(hideLoading()))
    }
}

function deletePost(postId) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function handleDeletePost(postId) {
    return (dispatch, getState) => {
        
        dispatch(showLoading())

        const post = getState().posts[postId]

        dispatch(deletePost(postId))

        return removePost(postId)
            .then(() => dispatch(flashMessage('Post deleted!')))
            .then(() => dispatch(hideLoading()))
            .catch(() => {
                dispatch(addPost(post))
                dispatch(flashErrorMessage('An error occurred while deleting the post!'))
            })
            .finally(() => dispatch(hideLoading()))
    }
}

function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function handleAddPost(post) {
    return (dispatch) => {
        dispatch(showLoading())
        return savePost(post)
            .then(res => dispatch(addPost(res)))
            .then(() => dispatch(flashMessage('Post added!')))
            .catch(() => dispatch(flashMessage('An error occurred while adding post!')))
            .finally(() => dispatch(hideLoading()))
    }
}

export function handleUpdatePost(post) {
    return (dispatch, getState) => {

        const originalPost = getState().posts[post.id]

        dispatch(showLoading())
        dispatch(addPost(post))

        return editPost(post)
            .then(() => dispatch(flashMessage('Post updated!')))
            .catch(() => {
                dispatch(addPost(originalPost))
                dispatch(flashMessage('An error occurred while updating the post!'))
            })
            .finally(() => dispatch(hideLoading()))
    }
}