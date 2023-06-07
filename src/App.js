import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"

function App() {
  const CLIENT_ID ="c30520d994c24430bca37afcd1dae228"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const [token, setToken] = useState("")

  useEffect(()=>{
    const hash =window.location.hash
    // let token =window.localStorage.getItem("token")
    let token=""
    console.log(token)
    console.log(hash)
    if(!token && hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      console.log("1")
      console.log(token)
      window.location.hash = ""
      window.localStorage.setItem("token",token)
      setToken(token)
    }
  },[])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ?
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        : <button onClick={logout}>Logout</button>}
      </header>
    </div>
  );
}

export default App;
