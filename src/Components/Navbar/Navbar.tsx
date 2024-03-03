import { FC } from "react";
import { NavLink } from "react-router-dom";
import classes from './Navbar.module.sass'

const Navbar: FC = ()=>{
  return <nav className={classes.nav}>
    <NavLink className={classes.navItem} to={"/"} >Main</NavLink>
    <NavLink className={classes.navItem} to={"/history"} >History</NavLink>
  </nav>
}

export default Navbar;