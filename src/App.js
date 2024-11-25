import { useEffect, useState } from "react";
import Wordle from './components/Wordle'

function App() {
  // const [solution , setSolution] = useState(null);
  // useEffect(() => {
  //   fetch('http://localhost:3001/solutions')
  //   .then(res => res.json())
  //   .then(json => {
  //     //random int between 0 and 24
  //       const  randomSolution = json[Math.floor(Math.random()*json.length)]
  //       setSolution(randomSolution.word)
  //   })
  // }, [setSolution])
  
  //
  const [solution , setSolution] = useState(null);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/coffeeSR/wordle-json/main/db.json')
    .then(res => res.json())
    .then(json => {
      //random int between 0 and 24
        const  randomSolution = json.solutions[Math.floor(Math.random()*json.solutions.length)]
        setSolution(randomSolution.word)
    })
  }, [setSolution])


  console.log({solution})
  return (
    <div className="App">
        <div className='nav'>
            <h1 className='header'>WORDLE</h1>
        </div>
        {solution && <Wordle solution={solution} />}
        
    </div>
  );
}

export default App;
