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
import uuidv4 from 'uuid/v4';

import { addPost, setWorkingPost } from '../actions';

class PostAddForm extends Component {
  handleChange = event => {
    const { id, value } = event.target;
    this.props.setWorkingPost({ [id]: value });
  };

  handleSave = () => {
    const { workingPost } = this.props;
    const post = {
      ...workingPost,
      id: uuidv4(),
      timestamp: Date.now(),
      category: workingPost.category.toLowerCase(),
    };
    this.props.addPost(post);
    this.props.history.replace('/');
  };

  render() {
    const { categories, workingPost } = this.props;
    return (
      <div>
        <PageHeader>Post Add Form</PageHeader>
        <Form horizontal>
          <FormGroup controlId="title">
            <Col componentClass={ControlLabel} sm={2}>
              Title
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                value={workingPost.title}
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
                value={workingPost.body}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="category">
            <Col componentClass={ControlLabel} sm={2}>
              Category
            </Col>
            <Col sm={5}>
              <FormControl
                componentClass="select"
                placeholder="Category"
                value={workingPost.category}
                onChange={this.handleChange}
              >
                {categories.map(category =>
                  <option key={category.path} value={category.path}>
                    {category.name}
                  </option>,
                )}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="author">
            <Col componentClass={ControlLabel} sm={2}>
              Author
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                value={workingPost.author}
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
                <Link to="/">
                  <Button bsSize="large">Cancel</Button>
                </Link>
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
    categories: state.categories,
    workingPost: state.posts.workingPost,
  };
};

export default connect(mapStateToProps, { addPost, setWorkingPost })(
  PostAddForm,
);
