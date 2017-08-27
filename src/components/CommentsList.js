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

import CommentListItem from './CommentListItem';
import { fetchPostComments } from '../actions';

const tableHeadings = ['Body', 'Author', 'Date', 'Vote Score', 'Actions'];

class CommentsList extends Component {
  componentDidMount() {
    const { post, fetchPostComments } = this.props;
    fetchPostComments(post.id);
  }

  handleChange = event => {};

  render() {
    const { comments } = this.props;

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
                    <option value="timestamp">Date</option>
                  </FormControl>
                </FormGroup>
                <Link to="/addcomment">
                  <Button bsStyle="primary" style={{ margin: 10 }}>
                    <Glyphicon glyph="plus" />
                    Add Comment
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
  return {
    comments: state.posts.comments,
  };
};

export default connect(mapStateToProps, { fetchPostComments })(CommentsList);
