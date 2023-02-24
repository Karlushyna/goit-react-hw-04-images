import { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal  from './Modal/Modal';
import { searchImage } from '../services/searchImage-api';

import styles from './styles.module.css'; 

function App() {

const [images, setImages] = useState([]);
const [loading, setLoading] = useState(false);
const [currentSearch, setCurrentSearch] = useState('');
const [page, setPage] = useState(1);
const [modalOpen, setModalOpen] = useState(false);
const [modalImg, setModalImg] = useState('');
const [modalAlt, setModalAlt] = useState('');
const [error, setError] = useState(null);
const [total, setTotal] = useState(0);

const handleImageClick = (modalImg, modalAlt) => {
  setModalOpen(prev => !prev);
  setModalImg(modalImg);
  setModalAlt(modalAlt);
}


  const handleClose = e => {
    if (e.code === "Escape" || e.currentTarget === e.target )  {
    setModalOpen(prev => ! prev);
    setModalImg('');
    setModalAlt('');
  }
};

  const inputSearch = name => {
    if (name === currentSearch) {
      return; 
    }
    setCurrentSearch(name);
    setImages([]);
    setPage(1);
  };
  const loadMore = () => {
    setPage(prevState => prevState + 1);
      }

  useEffect(() => {
    if (currentSearch) {
      const fetchPosts = async () => {
        try {
          setLoading(true);
          const data = await searchImage(currentSearch, page);
          
          setImages(images => [...images, ...data.hits]);
          setTotal(data.totalHits);
          
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [currentSearch, page]);

  const totalPage = Math.ceil(total / 12);

  return (
          <div>
            
            <Searchbar onSubmit={inputSearch} />
            <ImageGallery onClick={handleImageClick} images={images} />
    
            {error && <h2 className={styles.errorMessage}>{error}</h2>}
            {loading && <Loader text="Loading..." />}
    
            {(Boolean(images.length) && page < totalPage)
            && <Button onClick={loadMore} type="button" />}
            
            {modalOpen && (
              <Modal handleModalClose = {handleClose}>
                <img src={modalImg} alt={modalAlt} />
              </Modal>
            )}  
          </div>
        )

}

  

  



export default App;

