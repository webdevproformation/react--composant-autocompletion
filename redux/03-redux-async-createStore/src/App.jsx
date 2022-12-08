// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css' ;
import Article from "./composant/Article";
import Panneau from './composant/Panneau';
import Form from "./composant/Form";
import Menu from "./composant/Menu";

import { useSelector } from "react-redux";

function App() {
  // remplace le useState()
  // state = store
  const articles = useSelector((state) => state.articleReducer) ;
  return (
    <>
    <Menu />
    <div className="container">
      <div className="row">
        <main className="col-9 row">
            { !(Object.keys(articles).length === 0) && articles.map((article , index) => <Article key={index} article={article} />)}
        </main>
        <aside className="col-3 ">
          <div className="sticky-top">
            <Panneau />
            <Form />
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}

export default App;