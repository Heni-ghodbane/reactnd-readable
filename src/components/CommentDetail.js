import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { fetchComment, deleteComment } from '../actions';
import { formatTimestamp } from '../util/formatters';

class CommentDetail extends Component {
  componentDidMount() {
    const { fetchComment, match } = this.props;
    fetchComment(match.params.id);
  }

  handleDelete = () => {
    const { comment, deleteComment, history } = this.props;
    deleteComment(comment.id);
    history.goBack();
  };

  render() {
    const { comment } = this.props;
    if (comment) {
      return (
        <div>
          <PageHeader>Comment Detail</PageHeader>
          <Form horizontal>
            <FormGroup controlId="fgBody">
              <Col componentClass={ControlLabel} sm={2}>
                Body
              </Col>
              <Col sm={10}>
                <FormControl.Static>
                  {comment.body}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="fgAuthor">
              <Col componentClass={ControlLabel} sm={2}>
                Author
              </Col>
              <Col sm={10}>
                <FormControl.Static>
                  {comment.author}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="fgDate">
              <Col componentClass={ControlLabel} sm={2}>
                Date
              </Col>
              <Col sm={10}>
                <FormControl.Static>
                  {formatTimestamp(comment.timestamp)}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="fbVoteScore">
              <Col componentClass={ControlLabel} sm={2}>
                Vote Score
              </Col>
              <Col sm={10}>
                <FormControl.Static>
                  {comment.voteScore}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="fgButtons">
              <Col componentClass={ControlLabel} sm={2}>
                {' '}
              </Col>
              <Col>
                <ButtonToolbar>
                  <Link to={`/postdetail/${comment.parentId}`}>
                    <Button>Go Back</Button>
                  </Link>
                  <Link to={`/commentedit/${comment.id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button bsStyle="danger" onClick={this.handleDelete}>
                    Delete
                  </Button>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    comment: state.posts.currentComment,
  };
};

export default connect(mapStateToProps, { fetchComment, deleteComment })(
  CommentDetail,
);
