import Projet1 from "./projet1/Projet1";
import Projet2 from "./projet2/Projet2";
import { TimerRacine } from "./timer/TimerRacine";

function App(){
  return (
    <div className="container mx-auto">
      <Projet1 />
      <hr className="my-3"/>
      <Projet2 />
      <hr className="my-3"/>
      <TimerRacine />
    </div>
  )
}

export default App ;