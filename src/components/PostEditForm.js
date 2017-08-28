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

import { fetchPostById, editPost, setWorkingPost } from '../actions';

class PostEditForm extends Component {
  componentDidMount() {
    const { fetchPostById, match } = this.props;
    fetchPostById(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { post, workingPost, isEditing } = nextProps;
    if (!isEditing) {
      workingPost.title = post.title;
      workingPost.body = post.body;
    }
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.props.setWorkingPost({ [id]: value });
  };

  handleSave = () => {
    const { post, editPost, history, workingPost } = this.props;
    const updatedPost = {
      ...post,
      ...workingPost,
    };
    editPost(updatedPost);
    history.replace('/');
  };

  render() {
    const { workingPost } = this.props;
    if (workingPost) {
      return (
        <div>
          <PageHeader>Post Edit Form</PageHeader>
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
            <FormGroup controlId="fgButtons">
              <Col componentClass={ControlLabel} sm={2}>
                {' '}
              </Col>
              <Col>
                <ButtonToolbar>
                  <Link to="/">
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
    post: state.posts.currentPost,
    workingPost: state.posts.workingPost,
    isEditing: state.posts.isEditing,
  };
};

export default connect(mapStateToProps, {
  fetchPostById,
  editPost,
  setWorkingPost,
})(PostEditForm);
