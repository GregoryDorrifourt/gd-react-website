import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from './app/App';
import './index.scss';
import thunk from 'redux-thunk';
import reducers from "./app/reducers";


ReactDOM.render(
  <Provider
    store={applyMiddleware(thunk)(createStore)(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);
