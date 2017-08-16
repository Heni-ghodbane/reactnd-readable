import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Panel from 'react-bootstrap/lib/Panel';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import { fetchCategories, selectedCategory } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  handleSelect = selectedKey => {
    this.props.selectedCategory(selectedKey);
  };

  renderCategories() {
    const { categories: { data, selectedCategory } } = this.props;
    const ALL_EVENT_KEY = 'All';
    return (
      <Nav
        bsStyle="pills"
        activeKey={selectedCategory ? selectedCategory : ALL_EVENT_KEY}
        onSelect={this.handleSelect}
      >
        <NavItem eventKey={ALL_EVENT_KEY}>All Categories</NavItem>
        {data &&
          data.map(category =>
            <NavItem eventKey={category.name} key={category.name}>
              {category.name}
            </NavItem>,
          )}
      </Nav>
    );
  }

  render() {
    return (
      <Panel>
        <PageHeader>
          Readable <small>A Content and Comment Web App</small>
        </PageHeader>
        {this.renderCategories()}
      </Panel>
    );
  }
}

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps, {
  fetchCategories,
  selectedCategory,
})(App);
