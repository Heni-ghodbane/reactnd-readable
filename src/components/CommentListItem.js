import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
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
          {comment.voteScore}
          <ButtonToolbar>
            <Button
              bsSize="xsmall"
              bsStyle="success"
              onClick={this.handleUpVote}
            >
              <Glyphicon glyph="plus" />
            </Button>
            <Button
              bsSize="xsmall"
              bsStyle="danger"
              onClick={this.handleDownVote}
            >
              <Glyphicon glyph="minus" />
            </Button>
          </ButtonToolbar>
        </td>
        <td>
          <ButtonToolbar>
            <Button bsSize="xsmall">
              <Link to={`/commentdetail/${comment.id}`}>
                <Glyphicon glyph="info-sign" />
              </Link>
            </Button>
            <Button bsSize="xsmall">
              <Link to={`/commentedit/${comment.id}`}>
                <Glyphicon glyph="edit" />
              </Link>
            </Button>
            <Button
              bsSize="xsmall"
              bsStyle="danger"
              onClick={this.handleDelete}
            >
              <Glyphicon glyph="trash" />
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteComment, voteOnComment })(CommentListItem);
