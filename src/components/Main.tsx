
import { useState, useEffect } from "react"
import Table from "./Table"
import { Movie, MovieFull } from "../interfaces/interfaces"
import Modal from "./Modal"


const Main = () => {

  const pageSize = 15
  const [moviesData, setMoviesData] = useState<Movie[]>([])
  const [numberOfMovies, setNumberOfMovies] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const [selectedMovieID, setSelectedMovieID] = useState<string>("")
  const [selectedMovieData, setSelectedMovieData] = useState<MovieFull | null>(null)
  const [modalState, setModalState] = useState<boolean>(false)

  const fetchMoreData = () => {
    console.log((currentPage + 1) * pageSize)
    if (((currentPage + 1) * pageSize) <= numberOfMovies) {
      setCurrentPage(prev => prev + 1)
    } else {
      setHasMore(false) //No more movies to load
    }
  }

  useEffect(() => {
    const numberOfElements = async () => {
      const response = await fetch(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies`)
      const data = await response.json()
      setNumberOfMovies(data.totalElements)
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


  //fetch full movie
  useEffect(() => {
    const retrieveMovieData = async () => {
      const response = await fetch(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${selectedMovieID}`)
      const data = await response.json()
      setSelectedMovieData(data)
    }
    retrieveMovieData()
  }, [selectedMovieID])


  const showModal = (id: string) => {
    setSelectedMovieID(id)
    setModalState(true)
  } 

  const hideModal = () => {
    setModalState(false)
  }


  return (
    <div className='main_content'>
      <h1>Movie Ranking</h1>
      <Table data={moviesData} fetchMoreData={fetchMoreData} hasMore={hasMore} showModal={showModal} />
      {modalState && <Modal data={selectedMovieData} hideModal={hideModal} />}
    </div>
  )
}

export default Main