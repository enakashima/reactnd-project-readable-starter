import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPost, handleUpdatePost } from '../actions/posts'
import { generateUID } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

class PostForm extends Component {

    state = {
        isEditing: false,
        name: '',
        post: '',
        category: '',
        title: '',
        redirect: false
    }

    componentDidMount() {
        const {postToEdit} = this.props
        if(postToEdit) {
            const { author, body, category, title } = postToEdit
            this.setState({
                isEditing: true,
                name: author,
                post: body,
                category,
                title
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if(this.state.isEditing) {
            const { postToEdit } = this.props
            const post = {
                 ...postToEdit,
                 title: this.state.title,
                 body: this.state.post,
                 author: this.state.name ? this.state.name : 'anonymous',
                 category: this.state.category
            }

            this.props.dispatch(handleUpdatePost(post))
        }else {
            const post = {
                id: generateUID(),
                timestamp: new Date().getTime(),
                title: this.state.title,
                body: this.state.post,
                author: this.state.name ? this.state.name : 'anonymous',
                category: this.state.category
            }
    
            this.props.dispatch(handleAddPost(post))
        }

        this.setState(() => ({
            name: '',
            post: '',
            category: '',
            title: '',
            redirect: true
        }))
    }

    handleCategoryChange = (e) => {
        const category = e.target.value;
        this.setState({
            category
        })
    }

    handleTitleChange = (e) => {
        const title = e.target.value;
        this.setState({
            title
        })
    }

    handleNameChange = (e) => {
        const name = e.target.value;
        this.setState({
            name
        })
    }

    handlePostChange = (e) => {
        const post = e.target.value;
        this.setState({
            post
        })
    }

    render () {
        const { name, post, category, title, redirect, isEditing } = this.state

        if(redirect) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <form className='form' onSubmit={this.handleSubmit}>
                    <h3 className='center'>
                        {isEditing ? 'Edit this Post' : 'Create a New Post'}
                    </h3>
                    <select 
                        className={category === '' ? 'input default-selected' : 'input'}
                        value={category}
                        onChange={this.handleCategoryChange}>
                        <option default >Select the Category</option>
                        {Object.keys(this.props.categories).map((key) => (
                            <option key={key} value={this.props.categories[key].name}>{this.props.categories[key].name}</option>
                        ))}
                    </select>
                    <input 
                        type='text' 
                        placeholder='Your name' 
                        className='input'
                        value={name}
                        onChange={this.handleNameChange}
                        maxLength={20} />
                    <input 
                        type='text' 
                        placeholder="What's that post about?" 
                        className='input'
                        value={title}
                        onChange={this.handleTitleChange}
                        maxLength={60} />
                    <textarea 
                        className='textarea'
                        placeholder="What's in your mind?"
                        maxLength={300} 
                        value={post}
                        onChange={this.handlePostChange}/>
                    <button 
                        type='submit' 
                        className='btn'
                        disabled={post === '' || category === '' || title === ''}>
                        SUBMIT
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ categories, posts }, props) {

    const { postId } = props.match.params
    
    return {
        categories,
        postToEdit: posts[postId]
    }
}
export default connect(mapStateToProps)(PostForm)