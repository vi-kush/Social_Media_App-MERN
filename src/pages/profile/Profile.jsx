// import Navbar from '../../components/Navbar/Navbar'
import "./profile.css"
import {Button, Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap'
import {useState, useContext} from 'react'
import {useParams, Link, Navigate} from 'react-router-dom'
import { authContext } from '../../App'
import DropDown from '../../components/DropDown/DropDown' 

const Profile = ({section})=>{
    
    // const [loggedIn,setLoggedIn] = useState(localStorage.getItem('auth') ? true : false)
    const { loggedIn, setLoggedIn} = useContext(authContext)
    const [coverImage,setCoverImage] = useState(null);
    const [profileImage,setProfileImage] = useState(null);

    const navItems = [
        //add uri in section array too
        {
            title: "Personal Info",
            uri: "personalinfo",
            classname: "first",
        },
        {
            title: "Security",
            uri: "security",
        },
        {
            title: "All Posts",
            uri: "",
        },
        {
            title: "Notification Setting",
            uri: "",
        },
        {
            title: "Logout",
            uri: "",
            classname: "last",
            onclick: ()=>{localStorage.removeItem('auth'); setLoggedIn(false);},
        }
    ]

    const { Section } = useParams();
    if(Section){
        section = Section.toLowerCase();
        //section name should be same as uri
        if(!["personalinfo","security"].includes(section)) section="personalinfo";
    }

    if(!loggedIn) return (<Navigate to="/signup" replace={true}/>)

    return(
        <Container fluid className="add my-4">
            <Row className="" style={{gap:"10px"}}>
                <Col md="4" lg="3" className="d-none leftContainer flex-column d-md-flex align-items-end ">
                    <div className="title mt-2 mb-4 align-self-center">Update Profile</div>
                    <div className="sidemenu">
                        {   
                            navItems.map(({uri,classname,onclick,title},idx)=>(
                                <Link key={idx} to={`/profile/${uri}`}>
                                    <div className={`sideitem ${classname?classname:""} ${section === uri ? " active" : ""}`} onClick={onclick}>
                                    {title}
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </Col>
                
                <Col md="4" lg="8" className="d-flex w-10 d-md-none justify-content-end">
                    <DropDown mxw={160} section={section} optionObject={navItems} className="profile_setting_dropdown"/>
                </Col>
               
                <Col md="7" lg="8" className="d-flex rightContainer flex-column align-items-start">
                    {   
                        (section === "personalinfo") &&
                        <div className="Img my-3">
                            <label className="coverImgLabel" htmlFor="CoverImage">
                                <img src={coverImage ? URL.createObjectURL(coverImage) : "/images/uploads/users/noUserCoverImage.png"} alt="" className="coverImg" />
                            </label>
                            <label className="profileImgLabel" htmlFor="ProfileImage">    
                                <img src={profileImage ? URL.createObjectURL(profileImage) : "/images/uploads/users/noUserProfileImage.png"} alt="" className="profileImg" />
                            </label>
                        </div>
                    }
                    {
                        (section === "personalinfo") &&
                        <Form className="updateForm">
                            <Row className="mt-3 mb-3" >
                                <input type="file" onChange={(e)=>setCoverImage(e.target.files[0])} id="CoverImage" style={{display:"none"}} />
                                <input type="file" onChange={(e)=>setProfileImage(e.target.files[0])} id="ProfileImage" style={{display:"none"}} />
                            </Row>
                            <Form.Group >
                            <Row className="mb-3" >
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="First Name" >
                                        <Form.Control type="text" placeholder="First Name" />
                                    </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Last Name" >
                                        <Form.Control type="Ttext" placeholder="Last Name" />
                                    </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="mb-3" >
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="D O B" >
                                            <Form.Control type="Date" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Gender" >
                                            <Form.Select>
                                                <option>Select </option>
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
                                                <option value="3">Other</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group >
                            <Row className="mb-3" >
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Address" >
                                            <Form.Control type="text" placeholder="Address" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="mb-3" >
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="District" >
                                            <Form.Control type="text" placeholder="District" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Pin Code" >
                                            <Form.Control type="number" placeholder="Pin Code" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="mb-3" >
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="State" >
                                            <Form.Control type="text" placeholder="State" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Country" >
                                            <Form.Control type="text" placeholder="Country" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <div className="submitSection">
                                <Button onClick={e => {e.target.form.reset()}} className="clear">Clear</Button>
                                <Button className="submit">Submit</Button>
                            </div>
                        </Form>
                    }
                    {
                        (section === "security") &&
                        <Form className="updateForm my-3">
                            <Form.Group >
                                <Row className="mb-3" >
                                    <Col>
                                    <FloatingLabel controlId="floatingInput" label="Email" >
                                        <Form.Control type="email" placeholder="Email" />
                                    </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group >
                                <Row className="mb-3" >
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Password" >
                                            <Form.Control type="password" placeholder="Password" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="mb-3" >
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Conform password" >
                                            <Form.Control type="password" placeholder="Conform password" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="mb-3" >
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Mobile" >
                                            <Form.Control type="number" max="9999999999" min="1000000000" placeholder="Mobile" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Alt-Mobile" >
                                            <Form.Control type="number" max="9999999999" min="1000000000" placeholder="Alt-Mobile" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <div className="submitSection">
                                <Button onClick={e => {e.target.form.reset()}} className="clear">Clear</Button>
                                <Button className="submit">Submit</Button>
                            </div>
                        </Form>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;