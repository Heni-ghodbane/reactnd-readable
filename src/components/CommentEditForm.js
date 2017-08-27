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

import { fetchComment, editComment } from '../actions';

class CommentEditForm extends Component {
  state = {
    body: '',
  };

  componentDidMount() {
    const { fetchComment, match } = this.props;
    fetchComment(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { comment } = nextProps;
    this.setState({
      body: comment.body,
    });
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSave = () => {
    const { comment, editComment, history } = this.props;
    const updatedComment = {
      ...comment,
      ...this.state,
    };
    editComment(updatedComment);
    history.goBack();
  };

  render() {
    const { comment } = this.props;
    if (comment) {
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
                  value={this.state.body}
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
  };
};
export default connect(mapStateToProps, { fetchComment, editComment })(
  CommentEditForm,
);
