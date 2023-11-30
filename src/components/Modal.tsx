
import { MovieFull } from "../interfaces/interfaces"

interface Props {
  data: MovieFull | null,
  hideModal: () => void
}

const Modal = ({data, hideModal} : Props) => {

  console.log(data)

  const parseDataIntoJsx = (dataArr: (keyof MovieFull)[]) => {
    return (
      <>
        { dataArr.map((item: keyof MovieFull) => (
          <div className={`${item}_field`} key={data && data['id']}>
            <p>{item}</p>
            <p>{data && data[item]}</p>
          </div>  
        ))}
      </>
    )
  }

  return (
    <>
      {data ? (
        <div className="modal_wrapper">
          <div className="modal">
            <div onClick={hideModal} className="close_btn">
              <img src="src/assets/close-24px.svg" alt="close button" />
              <p>Close</p>
            </div>
            <h2>{data.title}</h2>

            {parseDataIntoJsx(['year', 'rank', 'revenue', 'genre', 'description'])}
            <div className="director_actors_wrapper">
              {parseDataIntoJsx(['director', 'actors'])}
            </div>
            {parseDataIntoJsx(['runtime', 'rating', 'votes', 'metascore'])}
          </div>
        </div>
      ) : null
      }
    </>
  )
}

export default Modal