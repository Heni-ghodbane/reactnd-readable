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

import { addComment } from '../actions';

class CommentAddForm extends Component {
  state = {
    title: '',
    body: '',
    author: '',
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleCancel = () => {
    this.props.history.goBack();
  };

  handleSave = () => {
    const comment = {
      ...this.state,
      id: uuidv4(),
      parentId: this.props.post.id,
      timestamp: Date.now(),
    };
    this.props.addComment(comment);
    this.props.history.goBack();
  };

  render() {
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
                value={this.state.title}
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
                value={this.state.body}
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
                value={this.state.author}
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
  console.log(state);
  return {
    post: state.posts.currentPost,
  };
};

export default connect(mapStateToProps, { addComment })(CommentAddForm);
