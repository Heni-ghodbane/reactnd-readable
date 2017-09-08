import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

import { ALL_CATEGORIES } from '../constants'
import { fetchCategories, fetchPostsByCategory } from '../actions'
import PostsList from './PostsList'

class App extends Component {
  componentDidMount() {
    const { fetchCategories, selectedCategory } = this.props
    fetchCategories()
    this.handleSelect(selectedCategory)
  }

  handleSelect = selectedKey => {
    const category = selectedKey ? selectedKey : ALL_CATEGORIES.path
    this.props.fetchPostsByCategory(category)
  }

  renderCategories() {
    const { categories, selectedCategory } = this.props
    return (
      <Nav
        bsStyle="pills"
        activeKey={selectedCategory ? selectedCategory : ALL_CATEGORIES.path}
        onSelect={this.handleSelect}
      >
        <NavItem eventKey={ALL_CATEGORIES.path}>{ALL_CATEGORIES.name}</NavItem>
        {categories &&
          categories.map(category => (
            <NavItem eventKey={category.path} key={category.path}>
              {category.name}
            </NavItem>
          ))}
      </Nav>
    )
  }

  render() {
    return (
      <div>
        <PageHeader>
          Readable <small>A Content and Comment Web App</small>
        </PageHeader>
        {this.renderCategories()}
        <PostsList />
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories,
    selectedCategory: posts.category,
  }
}

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPostsByCategory,
})(App)
