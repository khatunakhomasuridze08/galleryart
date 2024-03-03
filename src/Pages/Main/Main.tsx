import { FC } from "react"
import { Photo } from "../../Types/Photo";
import classes from './Main.module.sass';
import PhotoList from "../../Components/PhotoList/PhotoList";


const Main: FC<{ photos?: Photo[], onInputChange: (value: string)=> void, defaultInputV?: string }> = (props)=>{

  return <div className={classes.component}>
    <input className={classes.input} placeholder="Search..." type="text" value={props.defaultInputV} onChange={(e) => props.onInputChange(e.target.value)} />
    { props.photos && <PhotoList photos={props.photos} /> }
  </div>
}

export default Main;