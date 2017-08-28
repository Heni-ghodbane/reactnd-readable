import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import { formatTimestamp } from '../util/format';
import { deleteComment, voteOnComment } from '../actions';

class CommentListItem extends PureComponent {
  handleDelete = () => {
    const { comment, deleteComment } = this.props;
    deleteComment(comment.id);
  };

  handleUpVote = () => {
    const { comment, voteOnComment } = this.props;
    voteOnComment(comment.id, 'upVote');
  };

  handleDownVote = () => {
    const { comment, voteOnComment } = this.props;
    voteOnComment(comment.id, 'downVote');
  };

  render() {
    const { comment } = this.props;

    return (
      <tr>
        <td>
          {comment.body}
        </td>
        <td>
          {comment.author}
        </td>
        <td>
          {formatTimestamp(comment.timestamp)}
        </td>
        <td>
          <div style={{ textAlign: 'center' }}>
            {comment.voteScore}{' '}
            <span
              style={{
                float: 'right',
                margin: 5,
              }}
            >
              <Button
                bsSize="xsmall"
                bsStyle="success"
                onClick={this.handleUpVote}
              >
                <Glyphicon glyph="thumbs-up" />
              </Button>{' '}
              <Button
                bsSize="xsmall"
                bsStyle="danger"
                onClick={this.handleDownVote}
              >
                <Glyphicon glyph="thumbs-down" />
              </Button>
            </span>
          </div>
        </td>
        <td>
          <Link to={`/commentdetail/${comment.id}`}>View</Link>{' '}
          <Link to={`/commentedit/${comment.id}`}>Edit </Link>{' '}
          <a style={{ cursor: 'pointer' }} onClick={this.handleDelete}>
            Delete
          </a>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteComment, voteOnComment })(CommentListItem);
