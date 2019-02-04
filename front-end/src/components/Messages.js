import React, { Component } from 'react'
import { connect } from 'react-redux'

class Messages extends Component {
    render () {

        const {messages} = this.props

        return (
            <div className='message-container'>
                <ul className='messages'>
                    {messages.map(message => (
                        <li 
                            className={message.isError ? 'error-message' : 'info-message'}
                            key={message.id}>{message.message}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({flash}) {
    console.log('flash', flash)

    return {
        messages: flash.messages
    }
}

export default connect(mapStateToProps)(Messages)