import { useState } from "react";
import propTypes from 'prop-types';


import styles from './searchbar.module.css';

function Searchbar ({onSubmit}) {
const [currentSearch, setCurrentSearch] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  if(currentSearch.trim() === ''){
    return alert ("Please enter image name for search")
  };
  onSubmit(currentSearch);
  setCurrentSearch('');
}
return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
      
  
            <input
              value={currentSearch}
              className={styles.SearchFormInput}
              onChange={(e) => setCurrentSearch(e.target.value)}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              name="inputForSearch"
              required    
        />
      </form>
    </header>
      )

}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};




