
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
          {data.map((item: Movie, index: number) => {
            return <div className='movie_row_item' key={item.id}>{index} {item.title} {item.id}</div>
          })}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Table