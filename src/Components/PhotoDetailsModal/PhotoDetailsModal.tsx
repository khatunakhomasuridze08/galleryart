import { FC } from "react";
import { Photo } from "../../Types/Photo";
import classes from './PhotoDetailsModal.module.sass'

const PhotoDetailsModal: FC<{ photo: Photo, onClose: ()=> void }> = (props)=>{

  return <div className={classes.pDetailsModal}>
    <div className={classes.pDetailsModal_content}>
      <button className={classes.closeBtn} onClick={props.onClose}>Close</button>
      <img src={props.photo.urls.full} alt={props.photo.description} />
      <div className={classes.pDetailsModal_desc}>
        <p>Downloads: { props.photo.downloads }</p>
        <p>Views: { props.photo.views }</p>
        <p>Likes: { props.photo.likes }</p>
      </div>
      
    </div>
  </div>
}

export default PhotoDetailsModal;