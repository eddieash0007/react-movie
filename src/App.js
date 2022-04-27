import {useEffect, useState} from "react";

import './App.css'
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=15828daf'


const App = () => {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('transformers')
  
  }, [])    /* the dependency array is empty because we want the code in the hook to run from when the page loads */
  return(
    <div className="app">
      <h1> Ed's Movie Land</h1>

      <div className="search">
        <input 
        placeholder="Search for your movies" 
        value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value )}} />
        <img src={SearchIcon} alt="search" onClick={() => {searchMovies(searchTerm)}}/>

      </div>
      {
        movies?.length > 0 ? (<div className="container">
                              {movies.map((movie) => (
                                <MovieCard movie={movie}/>
                              ))}
                             </div>
        ): (<div className="empty">
              <h2>No movies found</h2>
          </div>
          )
      }

      
    </div>
  )
}

export default App