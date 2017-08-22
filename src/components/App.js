import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import { fetchCategories, fetchPostsByCategory } from '../actions';
import Posts from './Posts';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.handleSelect('All');
  }

  handleSelect = selectedKey => {
    this.props.fetchPostsByCategory(selectedKey);
  };

  renderCategories() {
    const { categories, selectedCategory } = this.props;
    return (
      <Nav
        bsStyle="pills"
        activeKey={selectedCategory ? selectedCategory : 'All'}
        onSelect={this.handleSelect}
      >
        <NavItem eventKey="All">All Categories</NavItem>
        {categories &&
          categories.map(category =>
            <NavItem eventKey={category.name} key={category.name}>
              {category.name}
            </NavItem>,
          )}
      </Nav>
    );
  }

  render() {
    return (
      <div>
        <PageHeader>
          Readable <small>A Content and Comment Web App</small>
        </PageHeader>
        {this.renderCategories()}
        <Posts />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    selectedCategory: state.posts.category,
  };
};

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPostsByCategory,
})(App);
