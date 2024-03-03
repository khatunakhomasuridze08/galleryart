import { useEffect, useState } from 'react';
import classes from './App.module.sass';
import axios from 'axios';
import { Photo } from './Types/Photo';
import { NavLink, Route, Routes } from 'react-router-dom';
import History from './Pages/History/History';
import Main from './Pages/Main/Main';
import { SearchPhoto } from './Types/SearchPhoto';
import { CachedPhotoType } from './Types/CachedPhotoType';
import Navbar from './Components/Navbar/Navbar';


const App = () => {

  const [inputValue, setInputValue] = useState("")
  const [cachedPhotos, setCachedPhotos] = useState<CachedPhotoType[]>([])
  
  const getPopularPhotos = (inputVal: string) => {
    axios.get<Photo[]>(`https://api.unsplash.com/photos?page=1&per_page=20&order_by=popular`, { 
      headers: {
        'Authorization': "Client-ID Lcj81L5UZH08V0e8xEG6lLlgp6Bq6Fid-VnD_RaHDd8"
      } 
    })
    .then(response => {
      setCachedPhotos(prev => [...prev, { searchText: inputVal, photos: response.data }])
    })
    .catch((error) => {
      console.log(error)
    });
  }

  const getPopularPhotosForScroll = (pageNumber: number, inputVal: string) => {
    axios.get<Photo[]>(`https://api.unsplash.com/photos?page=${pageNumber}&per_page=20&order_by=popular`, { 
      headers: {
        'Authorization': "Client-ID Lcj81L5UZH08V0e8xEG6lLlgp6Bq6Fid-VnD_RaHDd8"
      } 
    })
    .then(response => {
      setCachedPhotos(prev => prev.map(p => {
        if(p.searchText === inputVal){
          p.photos = [...p.photos, ...response.data]
        }
        return p;
      }))
    })
    .catch((error) => {
      console.log(error)
    });
  }

  const searchPhotos = (inputVal: string)=>{

    axios.get<SearchPhoto>(`https://api.unsplash.com/search/photos?page=1&per_page=20&order_by=popular&query=${inputVal}`, { 
      headers: {
        'Authorization': "Client-ID Lcj81L5UZH08V0e8xEG6lLlgp6Bq6Fid-VnD_RaHDd8"
      } 
    })
    .then(response => {
        setCachedPhotos(prev => [...prev, { searchText: inputVal, photos: response.data.results }])
    })
    .catch((error) => {
      // Handle error
      console.log(error)
    });
  }

  const searchPhotosForScroll = (pageNumber: number, inputVal: string)=>{

    axios.get<SearchPhoto>(`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=20&order_by=popular&query=${inputVal}`, { 
      headers: {
        'Authorization': "Client-ID Lcj81L5UZH08V0e8xEG6lLlgp6Bq6Fid-VnD_RaHDd8"
      } 
    })
    .then(response => {
        setCachedPhotos(prev => prev.map(p => {
          if(p.searchText === inputVal){
            p.photos = [...p.photos, ...response.data.results]
          }
          return p;
        }))
    })
    .catch((error) => {
      // Handle error
      console.log(error)
    });
  }

  useEffect(()=>{

    const getPhotos = setTimeout(() => {

      const inputVal = inputValue.trim().toLowerCase();
      const dataFromCache = cachedPhotos.find(p => p.searchText === inputVal)

      if(dataFromCache){
        return;
      }

      if(inputVal){
        searchPhotos(inputVal);
      }
      else {
        getPopularPhotos(inputVal);
      }
    }, 500) 

    return ()=>{
      clearTimeout(getPhotos);
    }
  }, [inputValue, ])



  const handleBottomScroll = ()=>{

    const inputVal = inputValue.trim().toLocaleLowerCase();
    const dataFromCache = cachedPhotos.find(p => p.searchText === inputVal)

    if(dataFromCache === undefined || dataFromCache.photos.length%20 !== 0){
      return;
    }

    const nextPageNumber = dataFromCache.photos.length/20+1

    if(inputVal){
      searchPhotosForScroll(nextPageNumber, inputVal);
    }
    else {
      getPopularPhotosForScroll(nextPageNumber, inputVal);
    }
  }



  useEffect(()=>{
    const handleScroll = (e: any) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        handleBottomScroll()  
      }
    };
    window.addEventListener("scroll",  handleScroll);

    return ()=>{
      window.removeEventListener("scroll", handleScroll)
    }
  }, [cachedPhotos, inputValue])


  const photos = cachedPhotos.find(p => p.searchText === inputValue.trim().toLocaleLowerCase())?.photos

  return (
    <div className="App">

     <Navbar />

      <div className={classes.content}>
        <Routes>
          <Route path='/' element={<Main photos={photos} defaultInputV={inputValue} onInputChange={(inputValue)=> setInputValue(inputValue)}  />} />
          <Route path='/history' element={<History photos={photos} cachedPhotos={cachedPhotos.filter(p => p.searchText !== "")} onInputChange={(inputValue)=> setInputValue(inputValue)} />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
