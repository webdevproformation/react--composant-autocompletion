import Article from "../commun/Article";
import { useState , useEffect } from "react"
import { getFirstFiveOrderByDate } from "../../services/article.js"
import Pagination from "../commun/Pagination";
import { pagination } from "../../utils/functions.js";

function Accueil(){
    const [articles, setArticles] = useState([]);
    const [pageSize] = useState(9);
    const [pageEncours, setPageEncours] = useState(1);

    const changementPage = (event, pageId) => {
        event.preventDefault();
        setPageEncours(pageId)
    };

    useEffect( function(){
        async function init(){
            const articles = await getFirstFiveOrderByDate()
            setArticles(articles)
        }
        init();
    } , [])

    const posts = pagination(
        articles,
        pageEncours,
        pageSize
      );
    
    return (
    <div className="home">
        <h1>Home</h1>
        <p>Bienvenue sur mon blog, vous trouverez ici tous mes articles sur la Laponie !!!</p>
        <section className="grille">
            { posts.map(function(valeur, index){
                return <Article valeur={valeur} key={index} />
            }) }
        </section>
        
        <Pagination
            totalArticles={articles.length}
            nbArticleParPage={pageSize}
            pageEncours={pageEncours}
            onPageChange={changementPage}
        />
    </div>
    ); 
}
export default Accueil