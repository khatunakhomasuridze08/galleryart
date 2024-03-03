import { FC, useEffect, useState } from "react"
import { CachedPhotoType } from "../../Types/CachedPhotoType"
import { Photo } from "../../Types/Photo"
import PhotoList from "../../Components/PhotoList/PhotoList"
import classes from './History.module.sass'

const History: FC<{ cachedPhotos: CachedPhotoType[], photos?: Photo[], onInputChange: (value: string)=> void }> = (props)=>{

  const [selectedWord, setSelectedWord] = useState<string>()

  useEffect(()=>{
    return ()=> {
      props.onInputChange("")
      setSelectedWord(undefined)
    }
  }, [])

  return <>
    <ul className={classes.list}>
      {
        props.cachedPhotos.map((p, i) => <li key={i} className={classes.item}>
          <button className={classes.btn} onClick={()=> { props.onInputChange(p.searchText); setSelectedWord(p.searchText) }}>{p.searchText}</button>
        </li>)
      }
    </ul>
    { props.photos && selectedWord &&  <PhotoList photos={props.photos} /> }
  </>
}

export default History;