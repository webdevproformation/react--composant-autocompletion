import { useState , useEffect } from "react"

function Liste(){
    const [articles , setArticles] = useState([])

    useEffect( function(){
        async function getAllArticles(){
           let reponse = await fetch('http://localhost:1234/all-articles');
           reponse = await reponse.json()
           setArticles(reponse);
        }
        getAllArticles()

    }, [])

    return <div className="row">
        {articles.map(function(article ){
            return <div className="col-3"  key={article._id}>
                    <div className="card">
                    <img src={`http://localhost:1234/img/${article.img}`} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p className="card-text">{article.description}</p>
                    </div>
                    </div>
            </div>
        })}
    </div>
}

export default Liste ;