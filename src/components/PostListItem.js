import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import { formatTimestamp } from '../util/formatters';
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
          <div className="vote-score">
            {post.voteScore}{' '}
            <span>
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
          <Link to={`/postdetail/${post.id}`}>View</Link>{' '}
          <Link to={`/postedit/${post.id}`}>Edit</Link>{' '}
          <a className="cursor-pointer" onClick={this.handleDelete}>
            Delete
          </a>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deletePostById, voteOnPost })(PostListItem);
