import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import App from './components/App';
import PostDetail from './components/PostDetail';
import PostAddForm from './components/PostAddForm';
import PostEditForm from './components/PostEditForm';
import store from './store';

ReactDOM.render(
  <Provider store={store()}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/addpost" component={PostAddForm} />
        <Route path="/postdetail/:id" component={PostDetail} />
        <Route path="/postedit/:id" component={PostEditForm} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
