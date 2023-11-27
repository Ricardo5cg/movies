
import { useState, useEffect } from "react"
import Table from "./Table"
import { Movie } from "../interfaces/interfaces"


const Main = () => {

  const pageSize = 15
  const [moviesData, setMoviesData] = useState<Movie[]>([])
  const [numberOfMovies, setNumberOfMovies] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const fetchMoreData = () => {
    console.log((currentPage + 1) * pageSize)
    if (((currentPage + 1) * pageSize) <= numberOfMovies) {
      setCurrentPage(prev => prev + 1)
    } else {
      setHasMore(false) // No more movies to load
    }
  }

  useEffect(() => {
    const numberOfElements = async () => {
      const response = await fetch(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies`)
      const json = await response.json()
      setNumberOfMovies(json.totalElements)
    }
    numberOfElements()
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${currentPage}&size=${pageSize}`)
      const data = await response.json()

      setMoviesData(prevItems => {
        if (currentPage === 0) {
          return [...data.content];
        } else {
          return [...prevItems, ...data.content]
        }
      })
    }
    fetchData()
  }, [currentPage])


  return (
    <div className='main_content'>
      <h1>Movie Ranking</h1>
      <Table data={moviesData} fetchMoreData={fetchMoreData} hasMore={hasMore} />
    </div>
  )
}

export default Main