import "./navbar.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import Register from "../Register/Register";

const Navigation= ()=>{

    const [modalShow, setModalShow] = useState(false);
    const [loggedIn,setLoggedIn] = useState(false);

    return (
        <div className="navbar">
            <div className="logo">
                <img src="images/titleLogo.png" alt="" />
            </div>
            <div className="search">
                <label htmlFor="search">
                    <SearchOutlinedIcon className="icon"/>
                </label>
                <input type="text" id="search" placeholder="Search for your favorite groups in ATG"/>
            </div>
            <div className="menu">
                {
                    loggedIn ? (
                        <div className="menuItem">
                            <img src="images/Rectangle.png" alt="" />
                            <span className="userName">Vipul Kumar</span>
                        </div>
                    )
                    :
                    (<div className="menuItem" onClick={() => setModalShow(true)} >
                        {/*onClick={()=>{setLoggedIn(true)}}*/}
                        Create account. <span>It's free</span>
                    </div>
                    )
                }
                <ArrowDropDownIcon/>
            </div>
            <Register
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default Navigation;