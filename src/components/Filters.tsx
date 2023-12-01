import React from 'react'


interface Props {
  filterOne: boolean,
  filterTwo: boolean,
  toggleFilterOne: () => void,
  toggleFilterTwo: () => void,
}

const Filters = ({filterOne, filterTwo, toggleFilterOne, toggleFilterTwo}: Props) => {
  return (
    <div className='filters_wrapper'>
      <div className={`filter_btn ${filterOne ? 'active' : ''}`} onClick={toggleFilterOne}>Top 10 Revenue</div>
      <div className={`filter_btn ${filterTwo ? 'active' : ''}`} onClick={toggleFilterTwo}>Top 10 Revenue per Year</div>
    </div>
  )
}

export default Filters