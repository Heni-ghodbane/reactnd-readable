import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import { formatTimestamp } from '../util/format';
import { deletePostById, voteOnPost } from '../actions';

class PostListItem extends PureComponent {
  handleDelete = event => {
    const { post, deletePostById } = this.props;
    deletePostById(post.id);
  };

  handleUpVote = () => {
    const { post, voteOnPost } = this.props;
    voteOnPost(post.id, 'upVote');
  };

  handleDownVote = () => {
    const { post, voteOnPost } = this.props;
    voteOnPost(post.id, 'downVote');
  };

  render() {
    const { post } = this.props;

    return (
      <tr>
        <td>
          {post.title}
        </td>
        <td>
          {post.body}
        </td>
        <td>
          {post.author}
        </td>
        <td>
          {formatTimestamp(post.timestamp)}
        </td>
        <td>
          {post.voteScore}
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
              <Link to={`/postdetail/${post.id}`}>
                <Glyphicon glyph="info-sign" />
              </Link>
            </Button>
            <Button bsSize="xsmall">
              <Link to={`/postedit/${post.id}`}>
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

export default connect(null, { deletePostById, voteOnPost })(PostListItem);
