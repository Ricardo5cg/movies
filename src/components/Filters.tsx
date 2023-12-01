import React from 'react'


interface Props {
  filterOne: boolean,
  filterTwo: boolean,
  toggleFilterOne: () => void,
  toggleFilterTwo: () => void,
}

const Filters = ({filterOne, filterTwo, toggleFilterOne, toggleFilterTwo}: Props) => {

  const yearsArray = [2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000]

  return (
    <div className='filters_wrapper'>
      <div className={`filter_btn ${filterOne ? 'active' : ''}`} onClick={toggleFilterOne}><p className='btn'>Top 10 Revenue</p></div>
      <div className={`filter_btn ${filterTwo ? 'active' : ''}`} onClick={toggleFilterTwo}>
        <p className='btn'>
          Top 10 Revenue per Year
        </p>
        <div className={`filter_dropdown ${filterTwo ? 'showDropdown' : ''}`}>
          <p className='label'>Select a year</p>
          <div className='years_wrapper'>
            {yearsArray.map((year: number) => (
              <p key={year}>{year}</p>
            )) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters