import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Table from 'react-bootstrap/lib/Table';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Form from 'react-bootstrap/lib/Form';
import orderBy from 'lodash.orderby';

import { SORTBY_MOST_VOTES, SORTBY_MOST_RECENT } from '../constants';
import { setOrderByPosts } from '../actions';
import PostListItem from './PostListItem';

const tableHeadings = ['Title', 'Body', 'Author', 'Date', 'Vote', 'Actions'];

class PostsList extends Component {
  handleChange = event => {
    this.props.setOrderByPosts(event.target.value);
  };

  render() {
    const { posts } = this.props;

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} mdPush={8} md={4}>
              <Form inline>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Sort by</ControlLabel>
                  {'  '}
                  <FormControl
                    bsSize="sm"
                    componentClass="select"
                    placeholder="select"
                    onChange={this.handleChange}
                    value={this.props.orderBy}
                  >
                    <option value={SORTBY_MOST_VOTES}>Most votes</option>
                    <option value={SORTBY_MOST_RECENT}>Most recent</option>
                  </FormControl>
                </FormGroup>
                <Link to="/addpost">
                  <Button bsStyle="primary" className="add-post-button">
                    <Glyphicon glyph="plus" /> Add Post
                  </Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </Grid>
        <div />
        <div className="posts-table">
          <Table condensed bordered hover>
            <thead>
              <tr>
                {tableHeadings.map(th =>
                  <th key={th}>
                    {th}
                  </th>,
                )}
              </tr>
            </thead>
            <tbody>
              {posts.map(post => <PostListItem key={post.id} post={post} />)}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let posts;
  if (state.posts.orderBy === SORTBY_MOST_VOTES) {
    posts = orderBy(state.posts.data, [SORTBY_MOST_VOTES], ['desc']);
  } else {
    posts = orderBy(state.posts.data, [SORTBY_MOST_RECENT], ['desc']);
  }
  return {
    posts,
    orderBy: state.posts.orderBy,
  };
};

export default connect(mapStateToProps, {
  setOrderByPosts,
})(PostsList);
