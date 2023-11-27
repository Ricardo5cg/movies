
import InfiniteScroll from 'react-infinite-scroll-component'
import { Movie } from '../interfaces/interfaces'

interface Props {
  data: Movie[],
  fetchMoreData: () => void,
  hasMore: boolean
}


const Table = ({data, fetchMoreData, hasMore}: Props) => {

  //console.log(data)


  return (
    <div className='movies_table'>
      <div className='movies_table_header'>
        <p>Ranking</p>
        <p>Title</p>
        <p>Year</p>
        <p>Revenue</p>
      </div>
      <div className='movies_list_items'>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
        >
          {data.map((item: Movie) => {
            const revenue = item.revenue ? Math.trunc(item.revenue * 1000000).toLocaleString() : ''
            return (
              <div className='movie_row_item' key={item.id}>
                <p className='ranking_field'>{item.rank}</p>
                <p className='title_field'>{item.title}</p>
                <p className='year_field'>{item.year}</p>
                <p className='revenue_field'>{revenue && '$'}{revenue}</p>
                <div className='eye_icon_field'>
                  <div className='eye_icon_wrapper'>
                    <img src="src/assets/eye-icon.svg" />
                  </div>
                </div>
              </div>
            )
          })}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Table