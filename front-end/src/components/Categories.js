import React, { Component } from 'react'
import { connect } from 'react-redux'

class Categories extends Component {

    render() {
        const { categories } = this.props

        return (
            <ul>
                    {Object.keys(categories).map((key) => 
                    <li key={key}>
                        {categories[key].name}
                    </li>
                )}
            </ul>
        )
    }
}

function mapStateToProperties({categories}) {
    return {
        categories
    }
}

export default connect(mapStateToProperties)(Categories)