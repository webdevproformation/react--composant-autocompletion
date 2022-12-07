import './App.css';
import Typehead from "./components/Typehead"
import {useState} from "react";

const resultSuggestion = (resultat) => {
  let foundSuggestions = [];
  if(resultat.drinks && resultat.drinks.length){
      foundSuggestions = resultat.drinks
  } else if(resultat.drinks && resultat.drinks.length === 1) {
      foundSuggestions = [resultat.drinks]
  }
  return foundSuggestions;
}

const result2Suggestion = (resultat) => {
  let foundSuggestions = [] ;
  if(resultat && resultat.length){
      foundSuggestions = resultat
  } else if(resultat && resultat.length === 1){
      foundSuggestions = [resultat]
  } 
  return foundSuggestions;
}

const suggestionDisplay = (el) => {
  return el.strDrink
}

const highlight = (el , search) => {
  const f = [];
  let j = -1 ;
  let i = el.display.toUpperCase().indexOf(search.toUpperCase())
  while(j < el.display.length){
      if(i === -1){
          f.push(<span key={j + 1}>{el.display.slice(j + 1)}</span>);
          j = el.display.length ;
      } else {
          if(i > j + 1){
              f.push(<span key={j + 1}>{el.display.slice(j + 1 , i)}</span>);
          }
          f.push(<b key={i}>{el.display.slice(i , i + search.length)}</b>);
          j = i + search.length - 1;
          i = el.display.toUpperCase().indexOf(search.toUpperCase() , j + 1)
      }
  }
  return f ;
}

const highlightWithImg = (el , search) => {
  const f = [];
  let j = -1 ;
  let i = el.display.toUpperCase().indexOf(search.toUpperCase())
  let display = true ;
  while(j < el.display.length){
    if(display){
      f.push(<img key={`${Math.random() *10000}`} src={el.strDrinkThumb} alt="" width="60" style={{marginRight:"20px"}}/>)
      display = false ;
    }
      if(i === -1){
          f.push(<span key={j + 1}>{el.display.slice(j + 1)}</span>);
          j = el.display.length ;
      } else {
          if(i > j + 1){
            f.push(<span key={j + 1}>{el.display.slice(j + 1 , i)}</span>); 
          }
          
          f.push(<b key={i}>{el.display.slice(i , i + search.length)}</b>);
          j = i + search.length - 1;
          i = el.display.toUpperCase().indexOf(search.toUpperCase() , j + 1)
      }
  }
  return f ;
}


// 
// https://github.com/frfancha/Typeahead

function App() {
 const [show , setShow] = useState(true)

  const onClick = () => {
    setTimeout( () => {
      setShow((prevShow) => !prevShow)
    } , 500 );
  }

  return (
    <div className="App">
      <button onClick={onClick}>show</button> 
    {show &&  
    <>
      <p>Element 1</p>
       <Typehead 
        getUrl={ textRecherche => `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(textRecherche)}` }
        resultSuggestion={resultSuggestion}
        suggestionDisplay={suggestionDisplay}
        highlight = {highlightWithImg}
        />
      <p>Element 2</p>
      <Typehead 
        getUrl={ textRecherche => `https://jsonplaceholder.typicode.com/posts/?title_like=${encodeURIComponent(textRecherche)}` }
        resultSuggestion={result2Suggestion}
        suggestionDisplay={(el) => {
          return el.title + " - " + el.body
        }}
        highlight = {highlight}
      /> 

    </>
    } 
    
    </div>
  );
}

export default App;
