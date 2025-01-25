import { Dispatch, SetStateAction } from 'react'

import './style.css'

interface Props {
    handleSearchJobs: () => void
    searchedJobs: string
    setSearchedJobs: Dispatch<SetStateAction<string>>
    handleClearSearchJobs: () => void
}

const SearchBar = ({ searchedJobs, setSearchedJobs, handleSearchJobs, handleClearSearchJobs }: Props) => {
    return (
        <div className='searchbar'>
            <input type='search' value={searchedJobs} 
            onChange={(e) => setSearchedJobs(e.target.value)} 
            placeholder='Search Jobs'
            />
            <div className='searchbar-buttons'>
                <button type='button' onClick={handleSearchJobs}>Search</button>
                <button type='reset' onClick={handleClearSearchJobs}>Clear</button>
            </div>
        </div>
    )
}

export default SearchBar
