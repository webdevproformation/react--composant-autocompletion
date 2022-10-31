import {useState , useRef , useEffect } from "react";

export default function TypeHead({getUrl , resultSuggestion , suggestionDisplay , highlight}){

    /**
     * Valeur dans l'input
     */
    const [value, setValue] = useState("");
    /**
     * Liste des valeurs qui apparaissent dans les div en dessous de l'input
     * Object contienant l'historique des mots recherchés / saisie dans l'input
     * { 
     *  "m" : {
     *          selected : {},
     *          rows : [ {} , {} , {} ]
     *  },
     *  "mo" : {
     *          selected : {},
     *          rows : [ {} , {} , {} ]
     *  },
     *  "mot" : {
     *          selected : {},
     *          rows : [ {} , {} , {} ]
     *  },
     *  "motx" : {
     *          selected : undefined,
     *          rows : []
     *  },
     * }
     */
    const [suggestion, setSuggestion] = useState({});
    /**
     * Enregistrer le fait que la souris est sur la zone de suggestion (et bloquer le Blur de l'input) et ainsi pouvoir sélectionner une valeur au Click de souris 
     */
    const ignoreBlurRef = useRef(false);
    /**
     * Est ce que le mot dans l'input est bien issu de la liste de suggestion
     */
    const [error , setError] = useState(false)
    /**
     * Est ce que le contenu de l'input a été modifié depuis la dernière fois ? 
     */
    const [changed , setChanged] = useState(false)

    
    /**
     * stopper (abort) un fetch qui serait trop long si on unmount le composant
     */
    const abordControllerRef = useRef()

    /**
     * est ce que l'input a le focus 
     * est ce que retour du fetch a bien été jsonisé ??
     */
    const hasFocusRef = useRef(false)

    useEffect(() => {
        if(!abordControllerRef.current){
            abordControllerRef.current = new AbortController(); // ????
        }
        return function(){
            console.log("exec")
            hasFocusRef.current = false ;
            abordControllerRef.current.abort();
        }        
    }
    , []); 
   
    const onChange = (e) => {
        const valueInput = e.target.value;
        setChanged(true);
        setValue(valueInput);
        
        if(suggestion[valueInput] === undefined){
            suggestion[valueInput] = null
        }

        if(valueInput){
            const f = async () => {
                const urlApi = getUrl(valueInput);
                try{
                    const req = await fetch(urlApi , {
                        signal : abordControllerRef.current.signal,
                        headers : { Accept : "application/json"},
                    })
                    
                    const data = await req.json();
                    if( data === null ) return ;
                    if(!hasFocusRef.current) return ;
                    const rows = resultSuggestion(data);
                    rows.forEach( el => {
                        el.display = suggestionDisplay(el);
                        el.html = highlight( el , valueInput)
                    } )
                    setSuggestion( function(prevSuggestion){
                        return { 
                            ...prevSuggestion , 
                            [valueInput] : { 
                                selected : rows[0],
                                rows : rows 
                            }
                        }
                    })
                }catch(e){
                    if(e.name === "AbortError"){
                        return console.log( value + " Request was canceled via controller.abord")
                    }
                    return console.log(e)
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
        let selectedIndex = sugg.rows.indexOf(sugg.selected)

        let newSelectedIndex =  selectedIndex ;
        if(e.keyCode === 38 || e.key === "ArrowUp"){
            newSelectedIndex -= 1;
            if(newSelectedIndex  < 0){
                newSelectedIndex = sugg.rows.length -1 ;
            }
        }
        if(e.keyCode === 40 || e.key === "ArrowDown"){
            newSelectedIndex += 1;
            if(newSelectedIndex  >=  sugg.rows.length){
                newSelectedIndex = 0 ;
            }
        }
        if(e.keyCode === 36 || e.key === "Home"){
                newSelectedIndex = 0 ;
        }
        if(e.keyCode === 35 || e.key === "End"){
            newSelectedIndex = sugg.rows.length -1 ;
        }
        if(e.key === "Enter"){
            if(sugg.selected) setValue(sugg.selected.display);
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
        hasFocusRef.current = false ;

        abordControllerRef.current.abort();
        abordControllerRef.current = new AbortController(); 

        if(ignoreBlurRef.current) return ;

        if (sugg && sugg.selected) {
            setValue(sugg.selected.display);
            setChanged(false);
        } else {
            if(value && changed){
                setError(true)
            }
        }
       setSuggestion({}); 
    }

    const onFocus = () => {
        hasFocusRef.current = true ;
        setError(false)
    }

    const onMouseEnter = () => {
        ignoreBlurRef.current = true
    }

    const onMouseLeave = () => {
        ignoreBlurRef.current = false
    }

    const onClick = (s) => {
        setValue(s.display);
        setChanged(false)
        setSuggestion({});
    }
    
 
    return <div className="typehead">
        <input type="text" 
                value={value} 
                onChange={onChange} 
                onKeyDown={onKeyDown}  
                onBlur={onBlur}
                onFocus={onFocus}
                className={error ? "error" : null} />
         <div className="suggestions">
            {sugg ? sugg.rows.map((s, i) => {
                return <div 
                    key={i} 
                    className={ s === sugg.selected ? "suggestion selected" : "suggestion" }
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onClick={ () => onClick(s)}
                    >{s.html}
                </div>
            }) : null }
         </div>
    </div>
}