import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//redux
import { Provider } from "react-redux";
import { applyMiddleware , createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension" ;
import thunk from "redux-thunk";
import reducer from "./reducers"
import { getArticles } from './action/post.action';
import { getUsers } from './action/user.action';

const store= createStore(
  reducer ,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getArticles())
store.dispatch(getUsers())


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
