import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { FaThumbsDown, FaThumbsUp, FaEdit } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import { handleUpdateCommentVoteScore, handleDeleteComment } from '../actions/comments'

class Comment extends Component {

    handleDelete = (e) => {
        e.preventDefault()

        const { dispatch, id } = this.props

        dispatch(handleDeleteComment(id))
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

        dispatch(handleUpdateCommentVoteScore(id, option))
    }

    render () {

        const { author, timestamp, body, voteScore} = this.props.comment
        const { id } = this.props

        return (
            <div className='card card-border'>
                <div className='remove-button'>
                    <button 
                        className='icon-button'
                        onClick={this.handleDelete}>
                        <TiDelete />
                    </button> 
                </div>
                <div className='timestamp'>{formatDate(timestamp)}</div>
                <div className='author'>Author: @{author}</div>
                <p className='body'>{body}</p>
                <div className='card-footer'>
                    <Link to={`/edit-comment/${id}`}>
                        <FaEdit />
                    </Link>
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

function mapStateToProps({ comments }, { id }) {
    return {
        comment: comments[id]
    }
}

export default connect(mapStateToProps)(Comment)