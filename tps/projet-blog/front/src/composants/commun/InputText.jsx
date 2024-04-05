function InputText(props){
    return (<div>
        <label htmlFor={ props.id }>{ props.label }</label>
        <input 
        type={ !props.type ? "text" : props.type }
        placeholder={ props.placeholder } 
        required
        minLength={2}
        maxLength={255}
        id={ props.id }
        name={ props.id }
        value={props.value}
        onChange={props.action}/>
    </div>)
}
export default InputText; 