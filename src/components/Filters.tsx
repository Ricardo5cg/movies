
interface Props {
  filterOne: boolean,
  filterTwo: boolean,
  toggleFilterOne: () => void,
  toggleFilterTwo: () => void,
  dropdownState: boolean,
  setDropdownState: (state: boolean) => void,
  selectedFilterYear: number | null,
  setSelectedFilterYear: (year: number) => void,
  clearFilters: () => void,
}

const Filters = ({
  filterOne,
  filterTwo,
  toggleFilterOne,
  toggleFilterTwo,
  selectedFilterYear,
  setSelectedFilterYear,
  clearFilters,
  dropdownState,
  setDropdownState
}: Props) => {

  const yearsArray = [2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000]

  const clickOnDropdownItem = (year: number) => {
    setSelectedFilterYear(year)
 
    setTimeout(() => {
      setDropdownState(false)
    }, 100)
  }

  
  return (
    <div className='filters_wrapper'>
      <div className={`filter_btn ${filterOne ? 'active' : ''}`} onClick={toggleFilterOne}><p className='btn'>Top 10 Revenue</p></div>
      <div className={`filter_btn ${filterTwo ? 'active' : ''}`}>
        <p className='btn' onClick={toggleFilterTwo}>
          Top 10 Revenue {selectedFilterYear ? selectedFilterYear : `per Year`}
        </p>
        <div className={`filter_dropdown ${(filterTwo && dropdownState) ? 'showDropdown' : ''}`}>
          <p className='label'>Select a year</p>
          <div className='years_wrapper'>
            {yearsArray.map((year: number) => (
              <p
                key={year}
                className={selectedFilterYear === year ? 'selected_year' : ''}
                onClick={() => clickOnDropdownItem(year)}
                >
                  {year}
              </p>
            )) }
          </div>
        </div>
      </div>
      {(filterOne || filterTwo) ? (
        <div className='clear_filters' onClick={clearFilters}>
          <img src="src/assets/clear_btn.svg" alt='clear filters button' />
        </div>
      ) : null}
    </div>
  )
}

export default Filters