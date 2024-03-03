import { FC, useState } from "react";
import { Photo } from "../../Types/Photo";
import classes from './PhotoListItem.module.sass'
import PhotoDetailsModal from "../PhotoDetailsModal/PhotoDetailsModal";
import axios from "axios";

const PhotoListItem: FC<{ photo: Photo }> = (props)=>{

  const [selectedPhoto, setSelectedPhoto] = useState<Photo>()

  const photoClickHandler = ()=>{
    axios.get<Photo>(`https://api.unsplash.com/photos/${props.photo.id}`, { 
      headers: {
        'Authorization': "Client-ID Lcj81L5UZH08V0e8xEG6lLlgp6Bq6Fid-VnD_RaHDd8"
      } 
    })
    .then(response => {
      setSelectedPhoto(response.data)
    })
    .catch((error) => {
      // Handle error
      console.log(error)
    });
  }

  return <li className={classes.item}>
    <img className={classes.itemImg} src={props.photo.urls.regular} alt={props.photo.description} onClick={photoClickHandler} />
    { selectedPhoto && <PhotoDetailsModal photo={selectedPhoto} onClose={()=> setSelectedPhoto(undefined) } /> }
  </li>
}

export default PhotoListItem;