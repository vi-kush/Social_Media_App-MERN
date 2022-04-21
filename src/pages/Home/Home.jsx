// import Navbar from "../../components/Navbar/Navbar"
import Post from '../../components/Post/Post'
import DropDown from '../../components/DropDown/DropDown'
import "./home.css"
import {Button, Container, Row, Col} from 'react-bootstrap'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';    
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import postData from '../../postData.js'
import { authContext } from '../../App'
import { useContext } from 'react'
 
const Home= ()=>{

    const { loggedIn } = useContext(authContext)

    return (
        <div className="home">
            {/* <Navbar/> */}
            <div className="homeContainer">
                <div className="banner">
                    <img src="images/background.png" alt="" />
                    <div className="head">
                        <h2>Computer Engineering</h2>
                        <p>142,765 Computer Engineers follow this</p>
                    </div>
                </div>
            </div>
            <Container fluid="md" className="main">
                <Container fluid="md" className="nav">
                    <div className="left d-none d-md-flex ">
                        <span>All&nbsp;Posts(32) </span>
                        <span>Article</span>
                        <span>Event</span>
                        <span>Education</span>
                        <span>Job</span>
                    </div>
                    <div className="left d-flex w-100 d-md-none justify-content-between align-items-center">
                    <span> Posts(32) </span>
                    <DropDown title="Filter :" options={["all","article","meetup","event","job"]}/>                   
                    </div>
                    <div className={`right d-none `+ (loggedIn ? "d-md-flex" : "")}>
                        <Button className="add btn"> 
                            Write a Post
                            <ArrowDropDownIcon />
                        </Button>
                        <Button className="btn">
                            <GroupAddIcon fontSize="small" className="icon"/>
                            Join Group
                        </Button>
                    </div>
                </Container>
                <Container fluid="md" className="main left">
                    <Row >
                        <Col lg={7} sm={12} className="posts">
                            <Post postData={postData}/>
                        </Col>
                        <Col lg={4}  className="details d-none d-lg-flex">
                            <div className="loc">
                                <div className="group">
                                <LocationOnOutlinedIcon/>
                                Noida, India
                                </div>
                                <ModeEditIcon />
                            </div>
                            <div className="locDown">

                                <ErrorOutlineOutlinedIcon />
                                <p>Your location will help us serve better and extend a personalised experience.</p>
                            </div>
                        </Col>    
                    </Row>    
                </Container>
            </Container>
        </div>
    )
}

export default Home;