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
import { fetchPostById } from '../actions';
import { formatTimestamp } from '../util/format';

class PostDetail extends Component {
  componentDidMount() {
    const { fetchPostById, match } = this.props;
    fetchPostById(match.params.id);
  }

  render() {
    const { post } = this.props;
    if (post) {
      return (
        <div>
          <PageHeader>Post Detail</PageHeader>
          <Form horizontal>
            <FormGroup controlId="fgTitle">
              <Col componentClass={ControlLabel} sm={2}>
                Title
              </Col>
              <Col sm={10}>
                <FormControl.Static>
                  {post.title}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="fgBody">
              <Col componentClass={ControlLabel} sm={2}>
                Body
              </Col>
              <Col sm={10}>
                <FormControl.Static>
                  {post.body}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="fgAuthor">
              <Col componentClass={ControlLabel} sm={2}>
                Author
              </Col>
              <Col sm={10}>
                <FormControl.Static>
                  {post.author}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="fgDate">
              <Col componentClass={ControlLabel} sm={2}>
                Date
              </Col>
              <Col sm={10}>
                <FormControl.Static>
                  {formatTimestamp(post.timestamp)}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="fbVoteScore">
              <Col componentClass={ControlLabel} sm={2}>
                Vote Score
              </Col>
              <Col sm={10}>
                <FormControl.Static>
                  {post.voteScore}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup controlId="fgCategory">
              <Col componentClass={ControlLabel} sm={2}>
                Category
              </Col>
              <Col sm={10}>
                <FormControl.Static>
                  {post.category}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <ButtonToolbar>
              <Link to="/">
                <Button bsSize="large">Go Back</Button>
              </Link>
              <Link to={`/postedit/${post.id}`}>
                <Button bsSize="large">Edit</Button>
              </Link>
            </ButtonToolbar>
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
  };
};

export default connect(mapStateToProps, { fetchPostById })(PostDetail);
