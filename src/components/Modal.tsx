
import { MovieFull } from "../interfaces/interfaces"

interface Props {
  data: MovieFull | null,
  hideModal: () => void
}

const Modal = ({data, hideModal} : Props) => {


  const parseDataIntoJsx = (dataArr: (keyof MovieFull)[]) => {
    return (
      <>
        { data && dataArr.map((item: keyof MovieFull, index: number) => (
          <div className={`${item}_field modal_field`} key={`${data.id}_${item}_${index}`}>
            <p className="label">{item}</p>
            <p className="value">
              {item === 'revenue' ? (data[item] * 1000000).toLocaleString() : data[item]}
            </p>
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
              <img src="/close-24px.svg" alt="close button" />
              <p>Close</p>
            </div>
            <h2>{data.title}</h2>

            <>
              {parseDataIntoJsx(['year', 'genre', 'description'])}
              <div className="director_actors_wrapper">
                {parseDataIntoJsx(['director', 'actors'])}
              </div>
              {parseDataIntoJsx(['runtime', 'rating', 'votes', 'revenue', 'metascore'])}
            </>

          </div>
        </div>
      ) : null
      }
    </>
  )
}

export default Modal