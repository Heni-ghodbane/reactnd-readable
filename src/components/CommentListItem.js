import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

import { formatTimestamp } from '../util/formatters'
import * as actions from '../actions'

class CommentListItem extends PureComponent {
  handleDelete = () => {
    const { comment, deleteComment } = this.props
    deleteComment(comment.id)
  }

  handleUpVote = () => {
    const { comment, voteOnComment } = this.props
    voteOnComment(comment.id, 'upVote')
  }

  handleDownVote = () => {
    const { comment, voteOnComment } = this.props
    voteOnComment(comment.id, 'downVote')
  }

  render() {
    const { comment } = this.props

    return (
      <tr>
        <td>{comment.body}</td>
        <td>{comment.author}</td>
        <td>{formatTimestamp(comment.timestamp)}</td>
        <td>
          <div className="vote-score">
            {comment.voteScore}{' '}
            <span>
              <Glyphicon
                className="cursor-pointer"
                glyph="thumbs-up"
                onClick={this.handleUpVote}
              />{' '}
              <Glyphicon
                className="cursor-pointer"
                glyph="thumbs-down"
                onClick={this.handleDownVote}
              />
            </span>
          </div>
        </td>
        <td>
          <Link to={`/commentdetail/${comment.id}`}>View</Link>{' '}
          <Link to={`/commentedit/${comment.id}`}>Edit </Link>{' '}
          <a className="cursor-pointer" onClick={this.handleDelete}>
            Delete
          </a>
        </td>
      </tr>
    )
  }
}

export default connect(null, actions)(CommentListItem)
