
import { MovieFull } from "../interfaces/interfaces"

interface Props {
  data: MovieFull | null,
  hideModal: () => void
}

const Modal = ({data, hideModal} : Props) => {

  console.log(data)

  return (
    <div className="modal_wrapper">
      <div className="modal">
        <h2>Title</h2>
        <div onClick={hideModal}>
          close
        </div>
        {data?.title}
      </div>
    </div>
  )
}

export default Modal