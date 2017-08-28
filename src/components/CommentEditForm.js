import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import { fetchComment, editComment, setWorkingComment } from '../actions';

class CommentEditForm extends Component {
  componentDidMount() {
    const { fetchComment, match } = this.props;
    fetchComment(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { comment, isEditing, workingComment } = nextProps;
    if (!isEditing) {
      workingComment.body = comment.body;
    }
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.props.setWorkingComment({ [id]: value });
  };

  handleSave = () => {
    const { comment, editComment, history, workingComment } = this.props;
    const updatedComment = {
      ...comment,
      ...workingComment,
    };
    editComment(updatedComment);
    history.goBack();
  };

  render() {
    const { comment, workingComment } = this.props;
    if (workingComment) {
      return (
        <div>
          <PageHeader>Comment Edit Form</PageHeader>
          <Form horizontal>
            <FormGroup controlId="body">
              <Col componentClass={ControlLabel} sm={2}>
                Body
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="textarea"
                  value={workingComment.body}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="fgButtons">
              <Col componentClass={ControlLabel} sm={2}>
                {' '}
              </Col>
              <Col>
                <ButtonToolbar>
                  <Link to={`/postdetail/${comment.parentId}`}>
                    <Button>Cancel</Button>
                  </Link>
                  <Button bsStyle="success" onClick={this.handleSave}>
                    Save
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
    workingComment: state.posts.workingComment,
    isEditing: state.posts.isEditing,
  };
};
export default connect(mapStateToProps, {
  fetchComment,
  editComment,
  setWorkingComment,
})(CommentEditForm);
