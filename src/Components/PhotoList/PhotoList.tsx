import { FC } from "react";
import { Photo } from "../../Types/Photo";
import PhotoListItem from "../PhotoListItem/PhotoListItem";
import classes from './PhotoList.module.sass'

const PhotoList: FC<{ photos: Photo[] }> = (props)=>{

  return <div>
    <ul className={classes.list}>
      {
        props.photos.map((photo, i) => <PhotoListItem key={photo.id+i} photo={photo} />)
      }
    </ul>
  </div>
}

export default PhotoList;