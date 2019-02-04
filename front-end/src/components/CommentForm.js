import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddComment, handleUpdateComment } from '../actions/comments'
import { generateUID } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

class CommentForm extends Component {

    state = {
        name: '',
        comment: '',
        isEditing: false,
        redirect: false,
    }

    componentDidMount() {
        const { commentToEdit } = this.props
        if(commentToEdit) {
            const {author, body} = commentToEdit
            this.setState({
                isEditing: true,
                name: author,
                comment: body,
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {isEditing} = this.state

        if(isEditing) {
            const { commentToEdit } = this.props
            const comment = {
                ...commentToEdit,
                body: this.state.comment,
                author: this.state.name ? this.state.name : 'anonymous',
            }

            this.props.dispatch(handleUpdateComment(comment))
        }else {
            const comment = {
                id: generateUID(),
                timestamp: new Date().getTime(),
                body: this.state.comment,
                author: this.state.name ? this.state.name : 'anonymous',
                parentId: this.props.postId
            }
    
            this.props.dispatch(handleAddComment(comment))
        }

        this.setState(() => ({
            name: '',
            comment: '',
            redirect: isEditing
        }))
    }

    handleNameChange = (e) => {
        const name = e.target.value;

        this.setState({
            name
        })
    }

    handleCommentChange = (e) => {
        const comment = e.target.value;

        this.setState({
            comment
        })
    }

    render () {
        const { name, comment, redirect } = this.state
        const { commentToEdit } = this.props
        if(redirect) {
            return <Redirect to={`/post/${commentToEdit.parentId}`} />
        }

        return (
            <div>
                <form className='form' onSubmit={this.handleSubmit}>
                    <input 
                        type='text' 
                        placeholder='Your name' 
                        className='input'
                        value={name}
                        onChange={this.handleNameChange}
                        maxLength={20} />
                    <textarea 
                        className='textarea'
                        placeholder="What's in your mind?"
                        maxLength={300} 
                        value={comment}
                        onChange={this.handleCommentChange}/>
                    <button 
                        type='submit' 
                        className='btn'
                        disabled={'' === comment}>
                        SUBMIT
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({comments}, props) {
    let mappedProps = {}

    if(props.match) {
        const {commentId} = props.match.params
        
        mappedProps['commentToEdit'] = comments[commentId]
    }

    return mappedProps
}

export default connect(mapStateToProps)(CommentForm)