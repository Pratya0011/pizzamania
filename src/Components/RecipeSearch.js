import React,{useState,useEffect,lazy} from 'react'
import axios from 'axios'
import '../App.css'
import stateContext from './Context'
import Spinner from './Spinner'
const Recipe = lazy(()=> import('./Recipe.js'))


function RecipeSearch() {
  const APP_ID = "d9193dda"
  const APP_KEY = "b4ec0feeedc61db916152b480b0325f4"

  const [search,setSearch]=useState('')
  const [recipes,setRecipes]=useState([])
  const [query,setQuery]=useState('chicken')
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    getRecipe()
  },[query])
  const getRecipe= async()=>{
    try{
      
     await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
                    .then((res)=>{
                      
                      setRecipes(res.data.hits)
                      })
                      setIsLoading(true)
                    }
                    catch(err) {
                      
                      setIsLoading(false)
                    }
  }
  const updateQuery=(e)=>{
    e.preventDefault()
    search?setQuery(search.replaceAll("\\s+"," ")):setSearch('')
  }
 
  return (
    <div className='recipe-container'>
      <h1>Search Your Recipe</h1>
        <form onSubmit={updateQuery} className='form'>
            <input type='text' value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder={query}></input>
            <button type='submit'>Search</button>
        </form>
        <div className={isLoading?'recipe':'spinner-container'}>
        <stateContext.Provider value={recipes}>
          {isLoading?<Recipe/>:<Spinner/>}
        </stateContext.Provider>
        </div>
    </div>
  )
}

export default RecipeSearch