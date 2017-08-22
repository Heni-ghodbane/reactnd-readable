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

import { setOrderByPosts } from '../actions';
import Post from './Post';

const tableHeadings = [
  'Id',
  'Author',
  'Category',
  'Deleted',
  'Title',
  'Timestamp',
  'Vote Score',
  'Body',
];

class Posts extends Component {
  state = {
    value: 1,
  };

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
                  >
                    <option value="voteCount">Vote Count</option>
                    <option value="timestamp">Timestamp</option>
                  </FormControl>
                </FormGroup>
                <Link to="/addpost">
                  <Button bsStyle="primary" style={{ margin: 10 }}>
                    <Glyphicon glyph="plus" />
                    Add Post
                  </Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </Grid>
        <div />
        <div style={{ margin: 10 }}>
          <Table striped bordered hover>
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
              {posts.map(post => <Post key={post.id} post={post} />)}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let posts;
  if (state.posts.orderBy === 'voteCount') {
    posts = orderBy(state.posts.data, ['voteCount'], ['desc']);
  } else {
    posts = orderBy(state.posts.data, ['timestamp'], ['desc']);
  }
  return {
    posts,
  };
};

export default connect(mapStateToProps, {
  setOrderByPosts,
})(Posts);
