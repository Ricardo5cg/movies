
import { useState, useEffect } from "react"
import Table from "./Table"
import { Movie, MovieFull } from "../interfaces/interfaces"
import Modal from "./Modal"
import Filters from "./Filters"


const Main = () => {

  const pageSize = 15
  const [moviesData, setMoviesData] = useState<Movie[]>([])
  const [filteredMoviesData, setFilteredMoviesData] = useState<Movie[]>([])
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [numberOfMovies, setNumberOfMovies] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const [selectedMovieID, setSelectedMovieID] = useState<string>("")
  const [selectedMovieData, setSelectedMovieData] = useState<MovieFull | null>(null)
  const [modalState, setModalState] = useState<boolean>(false)

  const [filterOneState, setFilterOneState] = useState<boolean>(false)
  const [filterTwoState, setFilterTwoState] = useState<boolean>(false)
  const [selectedFilterYear, setSelectedFilterYear] = useState<number | null>(null)

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
      setAllMovies(data.content)
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
    
  }, [currentPage, allMovies])


  useEffect(() => {
  
    const top10Movies = () => {
      const sortAllMovies = allMovies.sort((a, b) => b.revenue - a.revenue)
      return sortAllMovies.slice(0, 10)
    }

    const top10MoviesPerYear = (year: number) => {
      const filterMovies = [...allMovies].filter(movie => movie.year === year)
      const sortAllMovies = filterMovies.sort((a, b) => b.revenue - a.revenue)
      return sortAllMovies.slice(0, 10)
    }
    

    if (filterTwoState && selectedFilterYear) {
      setFilteredMoviesData(() => top10MoviesPerYear(selectedFilterYear))
    } else if (filterOneState) {
      setFilteredMoviesData(top10Movies)
    }

  }, [allMovies, filterOneState, filterTwoState, selectedFilterYear])

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
    setSelectedMovieData(null)
  }


  //toggle filters state
  const toggleFilterOne = () => {
    setFilterOneState(prev => !prev)
  }

  const toggleFilterTwo = () => {
    setFilterTwoState(prev => !prev)
  }


  return (
    <div className='main_content'>
      <h1>Movie Ranking</h1>
      <Filters
        filterOne={filterOneState}
        filterTwo={filterTwoState}
        toggleFilterOne={toggleFilterOne}
        toggleFilterTwo={toggleFilterTwo}
        selectedFilterYear={selectedFilterYear}
        setSelectedFilterYear={setSelectedFilterYear}
      />
      <Table data={(!filterOneState && !filterTwoState) ? moviesData : filteredMoviesData} fetchMoreData={fetchMoreData} hasMore={hasMore} showModal={showModal} />
      {modalState && <Modal data={selectedMovieData} hideModal={hideModal} />}
    </div>
  )
}

export default Main