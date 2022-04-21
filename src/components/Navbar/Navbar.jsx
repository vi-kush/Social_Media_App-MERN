import "./navbar.css"
import DropDown from './../DropDown/DropDown'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useState, useContext } from "react";
import Register from "../Register/Register";
import { useParams } from 'react-router-dom'
import { authContext } from '../../App'

const Navigation= ()=>{

    const {register} = useParams();
    const [modalShow, setModalShow] = useState(register ? true : false);

    const { loggedIn, setLoggedIn} = useContext(authContext)

    return (
        <div className="navbar">
            <div className="logo">
                <img src="/images/titleLogo.png" alt="" />
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
                        <DropDown navDropDown title={
                            <div className="menuItem">
                                <img src="/images/Rectangle.png" alt="" />
                                <span className="userName">Vipul Kumar</span>
                            </div>
                        } linkOptions={["profile","create"]}/>
                    )
                    :
                    (<div className="menuItem" onClick={() => setModalShow(true)} >
                        Create account. <span>It's free</span>
                    </div>
                    )
                }
            </div>
            {
                !loggedIn &&
                <Register
                setLoggedIn={setLoggedIn}
                show={modalShow}
                setModalShow={setModalShow}
                register={register}
                onHide={() => setModalShow(false)}
                />
            }
        </div>
    )
}

export default Navigation;