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

import CommentListItem from './CommentListItem';
import { fetchPostComments, setOrderByComments } from '../actions';

const tableHeadings = ['Body', 'Author', 'Date', 'Vote', 'Actions'];

class CommentsList extends Component {
  componentDidMount() {
    const { post, fetchPostComments } = this.props;
    fetchPostComments(post.id);
  }

  handleChange = event => {
    this.props.setOrderByComments(event.target.value);
  };

  render() {
    const { comments } = this.props;

    return (
      <div>
        <h3>
          There are {comments.length} Comments
        </h3>
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
                    <option value="voteCount">Vote Count</option>
                    <option value="timestamp">Date</option>
                  </FormControl>
                </FormGroup>
                <Link to="/addcomment">
                  <Button bsStyle="primary" style={{ margin: 10 }}>
                    <Glyphicon glyph="plus" /> Add Comment
                  </Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </Grid>
        <div />
        <div style={{ margin: 10 }}>
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
              {comments.map(comment =>
                <CommentListItem key={comment.id} comment={comment} />,
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let comments;
  if (state.posts.commentsOrderBy === 'voteCount') {
    comments = orderBy(state.posts.comments, ['voteCount'], ['desc']);
  } else {
    comments = orderBy(state.posts.comments, ['timestamp'], ['desc']);
  }
  return {
    comments,
    orderBy: state.posts.commentsOrderBy,
  };
};

export default connect(mapStateToProps, {
  fetchPostComments,
  setOrderByComments,
})(CommentsList);
