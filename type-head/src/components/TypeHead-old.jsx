import {useState , useRef } from "react";

export default function TypeHead({getUrl , resultSuggestion , suggestionDisplay}){

    const [value, setValue] = useState("");
    const [suggestion, setSuggestion] = useState({});
    const ignoreBlurRef = useRef(false);

    const onChange = (e) => {
        const valueInput = e.target.value;
        setValue(valueInput);
        
        if(suggestion[valueInput] === undefined){
            suggestion[valueInput] = null
        }

        if(valueInput){
            const f = async () => {
                const urlApi = getUrl(valueInput);
                try{
                    const req = await fetch(urlApi , {
                        headers : { Accept : "application/json"}
                    })
                    const { drinks } = await req.json();
                    if(!drinks) return ;

                    let foundSuggestions ;
                    if(drinks.length){
                        //setSuggestion( drinks.map( drink => drink.strDrink  ) )
                        // foundSuggestions = drinks.map( drink => drink.strDrink)
                        // ajouter à chaque resultat une propriété display
                        drinks.forEach( el => {
                            el.display = el.strDrink
                        } )
                        foundSuggestions = {
                            selected : drinks[0],
                            rows : drinks 
                        }
                    } else {
                        // setSuggestion( [drinks.strDrink  ] )
                        //foundSuggestions = [drinks.strDrink  ]
                        drinks.display = drinks.strDrink
                        foundSuggestions = {
                            selected : drinks,
                            rows : [drinks],
                        }
                    
                    }
                    if(foundSuggestions) setSuggestion( function(prevSuggestion){
                        return { ...prevSuggestion , [valueInput] : foundSuggestions}
                    } )

                }catch(e){
                    console.log(e)
                    return
                }
            }
            f();
        }
    }

    const sugg = suggestion[value] ;

    const onKeyDown = (e) => {
        if (e.keyCode === 9 || e.key === "Tab") {
            ignoreBlurRef.current = false;
            return;
        }
        if(!sugg) return ;
        //const search = sugg.rows.find( item => item.strDrink === );
        let selectedIndex = sugg.rows.indexOf(sugg.selected)

        let newSelectedIndex =  selectedIndex ;
        if(e.keyCode === 38 || e.key === "ArrowUp"){
            newSelectedIndex -= 1;
            if(newSelectedIndex  < 0){
                newSelectedIndex = sugg.rows.length -1 ;
            }
            console.log("up" , newSelectedIndex)
        }
        if(e.keyCode === 40 || e.key === "ArrowDown"){
            newSelectedIndex += 1;
            if(newSelectedIndex  >=  sugg.rows.length){
                newSelectedIndex = 0 ;
            }
            console.log("down" , newSelectedIndex)
        }
        if(e.keyCode === 36 || e.key === "Home"){
                newSelectedIndex = 0 ;
        }
        if(e.keyCode === 35 || e.key === "End"){
            newSelectedIndex = sugg.rows.length -1 ;
        }
        if(e.key === "Enter"){
            setValue(sugg.selected.display);
            setSuggestion({});
        }

        if(newSelectedIndex !== selectedIndex){
            setSuggestion(function(prevSuggestion){
                return { 
                    ...prevSuggestion , 
                    [value] : {
                        rows : sugg.rows ,
                        selected : sugg.rows[newSelectedIndex]
                    }
                 }
            })
        }

    }

    const onBlur = e => {
        if(ignoreBlurRef.current) return ;
        if (sugg) {
            setValue(sugg.selected.display);
        }
        setSuggestion({}); 
    }

    const onMouseEnter = () => {
        ignoreBlurRef.current = true
    }

    const onMouseLeave = () => {
        ignoreBlurRef.current = false
    }

    const onClick = (s) => {
        setValue(s.display);
        setSuggestion({});
    }
 
    return <div className="typehead">
        <input type="text" value={value} onChange={onChange} onKeyDown={onKeyDown}  onBlur={onBlur} /> 
        {/**
         {suggestion.map((s, i) => {
            return <div key={i}>{s}</div>
        })}  
         */}
         <div className="suggestions">
            {sugg ? sugg.rows.map((s, i) => {
                return <div 
                    key={i} 
                    className={ s === sugg.selected ? "suggestion selected" : "suggestion" }
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onClick={ () => onClick(s)}
                    >{s.display} {/* {JSON.stringify(s)}{JSON.stringify(sugg.selected)} */}
                </div>
            }) : null }
         </div>
        

    </div>
}