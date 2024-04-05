function Textarea(props){
    return(
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <textarea name={props.id} id={props.id} rows="10" placeholder={props.placeholder}
            value={props.value}
            onChange={ props.action }
            required
            minLength={2}
            maxLength={10_000}
            ></textarea>
        </div>
    )
}
export default Textarea