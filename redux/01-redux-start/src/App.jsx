import { Racine } from "./livre/Racine"
import MyHook from "./MyHook"
import MyRedux from "./MyRedux"

function App(){ 
  return (
    <div className="container mx-auto">
        <Racine />
        <hr />
        <MyHook />
        <hr />
        <MyRedux />
    </div>
  )
}

export default App
