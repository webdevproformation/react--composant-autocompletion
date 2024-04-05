import {useState} from "react"
import { ReactMixitup } from "react-mixitup";
import "./index.css"
import mario from "./assets/mario.jpg"

function Menu() {
    const menu = [
        { 
            id : 1 ,
            titre : "salade verte",
            img : mario,
            categorie : "entree"
        },
        { 
            id : 2 ,
            titre : "salade rouge",
            img : "https://picsum.photos/id/21/400/200",
            categorie : "entree"
        },
        { 
            id : 3 ,
            titre : "tacos",
            img : "https://picsum.photos/id/22/400/200" ,
            categorie : "plat"
        },
        { 
            id : 4 ,
            titre : "tarte",
            img : "https://picsum.photos/id/23/400/200" ,
            categorie : "plat"
        }
    ]

    const [ plat , setPlat ] = useState(menu)
    const [ currentValue , setCurrentValue ] = useState("all")

    const ids = plat.map(plat => plat.id)
    const dictionnaire = Object.fromEntries(menu.map(plat => [plat.id, plat]));
    console.log(dictionnaire);
    function onClick(value){
        setCurrentValue(value);
        if(value === "all"){
            setPlat(menu); // [{},{},{},{}]
            return 
        }
        const result = menu.filter(function(item){
            return item.categorie === value ; 
        })
        setPlat(result);  // [{},{}]
    }

    return (<div>
            <button onClick={() => onClick("all")} className={currentValue === "all" ? "is-active" : ""}>all</button>
            &nbsp;
            <button onClick={() => onClick("entree")} className={currentValue === "entree" ?  "is-active" : ""}>entree</button>
            &nbsp;
            <button onClick={() => onClick("plat")} className={currentValue === "plat" ? "is-active" : ""}>plat</button>
            <ReactMixitup 
                keys={ids}
                renderCell={function(key, style, ref){
                    const plat = dictionnaire[key];
                    return <div
                    key={key}
                    ref={ref}
                    style={{
                        // You must set the transition property here!
                        transition: 'transform 300ms linear',
                        ...style
                    }}
                    >
                        <h2>{plat.titre}</h2>
                        <img src={plat.img} alt={plat.titre} className="img-fluid"/>
                       {/*  <pre>{JSON.stringify(ref)}</pre>
                        <pre>{JSON.stringify(style)}</pre> 
                        <pre>{JSON.stringify(plat , null, " " )}</pre> */}
                    </div>
                }}
                renderWrapper={function(style, ref, cells){
                    return   <div className="toto"
                    style={{
                      transition: 'height 300ms ease',
                      display: 'grid',
                      gridTemplateColumns : "repeat(3,400px)",
                      gap : "20px",
                      width: "calc(400px * 3 + 20px * 2)",
                      margin : "0 auto",
                      ...style
                    }}
                    ref={ref}
                  >
                    {cells}
                  </div>
                }}
                dynamicDirection="horizontal"
                transitionDuration={300}
            />
    </div>
      );
}

export default Menu;