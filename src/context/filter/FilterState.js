import { useState} from 'react';
import FilterContext from './filterContext';

const FilterState = ({children}) => {
    const [priceRange, setPriceRange] = useState(10000);
    const [ratingRange, setRatingRange] = useState();
    const [sortRange, setSortRange] = useState();
    const [categoryRange, setCategoryRange] = useState('all');
    const filterHandler = (stateFn) => (e) => {
        stateFn(e.target.value)
    }
  return (
    <FilterContext.Provider value={{
        priceRange,
        ratingRange,
        sortRange,
        categoryRange,
        filterHandler,
        setPriceRange,
        setRatingRange,
        setSortRange,
        setCategoryRange
    }}>
        {children}
    </FilterContext.Provider>
  )
}

export default FilterState