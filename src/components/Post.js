import React, { PureComponent } from 'react';

class Post extends PureComponent {
  render() {
    const { post } = this.props;

    return (
      <tr>
        <td>
          {post.id}
        </td>
        <td>
          {post.author}
        </td>
        <td>
          {post.category}
        </td>
        <td>
          {post.deleted.toString()}
        </td>
        <td>
          {post.title}
        </td>
        <td>
          {post.timestamp}
        </td>
        <td>
          {post.voteScore}
        </td>
        <td>
          {post.body}
        </td>
      </tr>
    );
  }
}

export default Post;
