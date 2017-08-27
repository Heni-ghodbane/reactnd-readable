import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import App from './components/App';
import PostDetail from './components/PostDetail';
import PostAddForm from './components/PostAddForm';
import PostEditForm from './components/PostEditForm';
import CommentDetail from './components/CommentDetail';
import CommentAddForm from './components/CommentAddForm';
import CommentEditForm from './components/CommentEditForm';
import store from './store';

ReactDOM.render(
  <Provider store={store()}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/addpost" component={PostAddForm} />
        <Route path="/postdetail/:id" component={PostDetail} />
        <Route path="/postedit/:id" component={PostEditForm} />
        <Route path="/addcomment" component={CommentAddForm} />
        <Route path="/commentdetail/:id" component={CommentDetail} />
        <Route path="/commentedit/:id" component={CommentEditForm} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
