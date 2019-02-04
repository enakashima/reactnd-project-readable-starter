import React, { Component, Fragment } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import CommentsPage from './PostCommentsPage'
import Nav from './Nav'
import PostForm from './PostForm'
import CommentForm from './CommentForm'
import Messages from './Messages'

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          <Messages />
          {this.props.stillLoading ? null
          :  <div className='container'>
                <Nav />
                <Route  path='/' exact component={Dashboard}/>
                <Route  path='/post/:postId' exact component={CommentsPage}/>
                <Route  path='/new-post' exact component={PostForm}/>
                <Route  path='/edit-post/:postId' exact component={PostForm}/>
                <Route  path='/edit-comment/:commentId' exact component={CommentForm}/>
              </div>
          }
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({categories}) {
  return {
    stillLoading: Object.keys(categories).length === 0
  }
}

export default connect(mapStateToProps)(App);
