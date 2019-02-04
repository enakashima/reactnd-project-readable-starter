import React, { Component } from 'react'

class CategorySelection extends Component {
    
    handleCategoryChange = (e) => {
        const category = e.target.value;
        this.props.handleCategoryChange(category)
    }

    render () {
        const { selectedCategory } = this.props.selectedCategory
        return (
            <select 
                className={selectedCategory === '' ? 'input default-selected' : 'input'}
                value={selectedCategory}
                onChange={this.handleCategoryChange}>
                <option default value=''>Select the Category</option>
                {Object.keys(this.props.categories).map((key) => (
                    <option key={key} value={this.props.categories[key].name}>{this.props.categories[key].name}</option>
                ))}
            </select>
        )
    }
}

CategorySelection.defaultProps = {selectedCategory: ''};

export default CategorySelection