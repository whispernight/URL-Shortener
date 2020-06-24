import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from 'views/Home';
import RedirectC from 'views/RedirectC';
import NotFound from 'views/NotFound';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "assets/scss/material-kit-react.scss?v=1.9.0";


const hist = createBrowserHistory();


ReactDOM.render(
  <Router history={hist}>
    <Switch>
    <Route path="/:shortenedId" component={RedirectC} />
    <Route path="/" component={Home} />
    <Route path="*" component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
