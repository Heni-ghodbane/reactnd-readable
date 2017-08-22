import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import App from './components/App';
import AddPostForm from './components/AddPostForm';
import store from './store';

ReactDOM.render(
  <Provider store={store()}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/addpost" component={AddPostForm} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
