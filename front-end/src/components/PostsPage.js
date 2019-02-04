import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import CategorySelection from './CategorySelection'
import Message from './Message'

class PostsPage extends Component {

    state = {
        selectedCategory: ''
    }

    handleCategoryChange = (selectedCategory) => {
        this.setState({
            selectedCategory
        })
    }
    
    render () {
        let { posts, categories } = this.props
        const { selectedCategory } = this.state

        if (selectedCategory !== '') {
            posts = posts.filter(post => post.category === selectedCategory)
        }

        console.log('postcount', posts)
        return (
            <ul>
                <li className='card'>
                    <CategorySelection 
                        categories={categories}
                        selectedCategory={this.state.selectedCategory}
                        handleCategoryChange={this.handleCategoryChange}/>
                </li>
                { posts.length !== 0 ? posts.map((post) => (
                    <li key={post.id}>
                        <Post id={post.id} />
                    </li>
                    ))
                    :
                    <li className='center'>
                        <Message message='No posts yet!' />    
                    </li>
                }
            </ul>
        )
    }
}

function mapStateToProps ({posts, categories}) {
    const orderedPosts = Object.values(posts)
                    .sort((a,b) => b.timestamp - a.timestamp)
    return {
        posts: orderedPosts,
        categories
    }
}

export default connect(mapStateToProps)(PostsPage)