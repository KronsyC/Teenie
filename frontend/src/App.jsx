
import { useState } from "react"
import Option from "./components/Option"
import axios from "axios"
function App() {

  const [ url, setUrl ] = useState("")
  const [ showOptions, setShowOptions ] = useState(false)
  const [ uses, setUses ] = useState(-1)
  const [ tracking, setTracking ] = useState(false)
  const [ output, setOutput ] = useState("")
  const handleSubmit = e => {
    e.preventDefault()
    axios.post("/api/links", { maxUses:uses, tracking,url }, { withCredentials: true })
    .then( data => {
      console.log(data);
      setOutput( `https://${window.location.host}/${data.data.url}` )
    } )
  }
  const hsetTracking = e => {
    setTracking(e.target.checked)
  }
  const hsetUses = e => {
    setUses(e.target.value)
  }

  return (
    <div className="app">
      <h1 className="title">Teenie</h1>
      {
        output !== "" && 
        <div className="outputContainer">
          <h3 className="outputTitle">Click to Copy</h3>
          <h4 onClick={() => {navigator.clipboard.writeText(output)}} className="output">{output}</h4>
        </div>
        
      }
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" className="input" placeholder="Enter URL to shorten" onChange={ e => setUrl(e.target.value) } />
        <input className="shorten" type="submit" value="Shorten!" />
        <div className="optsContainer">
          {
            showOptions ?
            <p onClick={ () => setShowOptions( d => !d) } className="toggleOpts">Advanced▲</p> :
            <p onClick={ () => setShowOptions( d => !d) } className="toggleOpts">Advanced▼</p>
          }
          {
            showOptions && <div className="options">
              <Option title="Uses" type="number" onChange={hsetUses} />
              <Option title="Logging" type="toggle" onChange={hsetTracking} />

            </div>
          }         
        </div>
      </form>
      <footer>
        A Project by <a href="https://github.com/KronsyC" target="_blank" rel="noreferrer">KronsyC</a>

      </footer>
    </div>
  );
}

export default App;
