import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch]= useState("")

    const API = "https://pokeapi.co/api/v2/pokemon?limit=500";

    const fetchPokemon = async() =>{
        try{
            const res= await fetch(API)
            const data = await res.json()
            // console.log(data)

            const pokemonDetails = data.results.map(async (curPokemon)=>{
                const res = await fetch(curPokemon.url)
                const data = await res.json()
                return data
            })

            // console.log(pokemonDetails)

            const detailedReponses = await Promise.all(pokemonDetails)
            // console.log(detailedReponses)
            setPokemon(detailedReponses)
            setLoading(false)
        }
        catch(err){
            console.log(err)
            setLoading(false)
            setError(err)
        }
    }

    useEffect(()=>{
        fetchPokemon()
    }, [])

    // Search Function

    const searchData = pokemon.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(search.toLowerCase()))

    if(loading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }

    return(
        <>
            <section>
                <header>
                    <h1>Lets Catch Pokemon</h1>
                </header>

                <div className="pokemon-search">
                    <input type="text" name="" id="" placeholder="Search Pokemon" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </div>

                <div>
                    <ul className="cards">
                        {
                          searchData.map((currPokemon)=>{
                            return <PokemonCards key={currPokemon.id} pokemon={currPokemon}/>
                          })  
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}