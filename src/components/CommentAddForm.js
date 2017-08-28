import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import uuidv4 from 'uuid/v4';

import { addComment, setWorkingComment } from '../actions';

class CommentAddForm extends Component {
  handleChange = event => {
    const { id, value } = event.target;
    this.props.setWorkingComment({ [id]: value });
  };

  handleCancel = () => {
    this.props.history.goBack();
  };

  handleSave = () => {
    const { workingComment } = this.props;
    const comment = {
      ...workingComment,
      id: uuidv4(),
      parentId: this.props.post.id,
      timestamp: Date.now(),
    };
    this.props.addComment(comment);
    this.props.history.goBack();
  };

  render() {
    const { workingComment } = this.props;
    return (
      <div>
        <PageHeader>Comment Add Form</PageHeader>
        <Form horizontal>
          <FormGroup controlId="title">
            <Col componentClass={ControlLabel} sm={2}>
              Title
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                value={workingComment.title}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
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
          <FormGroup controlId="author">
            <Col componentClass={ControlLabel} sm={2}>
              Author
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                value={workingComment.author}
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
                <Button bsSize="large" onClick={this.handleCancel}>
                  Cancel
                </Button>
                <Button
                  bsSize="large"
                  bsStyle="success"
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              </ButtonToolbar>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.posts.currentPost,
    workingComment: state.posts.workingComment,
  };
};

export default connect(mapStateToProps, { addComment, setWorkingComment })(
  CommentAddForm,
);
