import {useState} from "react"

function Form(){
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };


  async function onSubmit(e){
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("description", description);
    try{
        const reponse = await fetch('http://localhost:1234/article', {
        method: 'POST',
        body: data
      })
      const infos = await reponse.json();
      setMessage(infos.msg)
    }catch(err){
      throw new Error(err)
    }
  }


  return(
    <div>
      <h1>Formulaire avec upload fichier et input text</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="mb-2">description</label>
          <input type="text" id="description" name="description" placeholder="description" className="form-control" value={description} onChange={function(e){
            setDescription(e.target.value)
          }} />
        </div>
        <div  className="mb-3">
          <label htmlFor="image" className="mb-2">image</label>
          <input type="file" id="image" name="image" className="form-control" onChange={handleFileChange}  />
        </div>
        <div>
          <input type="submit" className="btn btn-primary" />
        </div>
        <p className="text-center">{message}</p>
      </form>
    </div>
  ); 
}

export default Form;