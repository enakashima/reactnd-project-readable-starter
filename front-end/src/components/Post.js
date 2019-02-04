import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { FaComment, FaThumbsDown, FaThumbsUp, FaEdit } from 'react-icons/fa'
import { TiDelete} from 'react-icons/ti'

import { handleUpdatePostVoteScore, handleDeletePost } from '../actions/posts'

class Post extends Component {

    handleDelete = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        
        dispatch(handleDeletePost(this.props.id))
    }

    handleDislike = (e) => {
        e.preventDefault()
        this.handleVoteScoreChange('downVote')
    }

    handleLike = (e) => {
        e.preventDefault()
        this.handleVoteScoreChange('upVote')
    }

    handleVoteScoreChange(option) {
        const { dispatch, id } = this.props

        dispatch(handleUpdatePostVoteScore(id, option))
    }

    render () {
        
        const { id } = this.props

        const { author, body, category, commentCount, timestamp, title, voteScore } = this.props.post

        return (
            <div className='card card-border'>
                <div className='remove-button'>
                    <button 
                        className='icon-button'
                        onClick={this.handleDelete}>
                        <TiDelete />
                    </button> 
                </div>
                <span className='title'>{title}</span>
                <div className='timestamp'>{formatDate(timestamp)} - {category}</div>
                <div className='author'>Author: @{author}</div>
                <p className='body'>{body}</p>
                <div className='card-footer'>
                    <Link to={`/edit-post/${id}`} 
                        className='icon-button-thumbs-down'>
                        <FaEdit />
                    </Link>
                    <Link to={`/post/${id}`} >
                        <FaComment />
                    </Link>
                    <span>{commentCount}</span>
                    <button 
                        className='icon-button-thumbs-down'
                        onClick={this.handleDislike}>
                        <FaThumbsDown />
                    </button>
                    <button 
                        className='icon-button-thumbs-up'
                        onClick={this.handleLike}>
                        <FaThumbsUp />
                    </button>
                    <span className='vote-score'>{voteScore}</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps({posts}, {id}) {
    return {
        post: posts[id]
    }
}

export default withRouter(connect(mapStateToProps)(Post))