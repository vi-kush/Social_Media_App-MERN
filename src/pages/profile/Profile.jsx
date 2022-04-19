// import Navbar from '../../components/Navbar/Navbar'
import "./profile.css"
import {Button, Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap'
import {useState} from 'react'
import {useParams, Link, Navigate} from 'react-router-dom'


const Profile = ({section})=>{
 
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem('auth') ? true : false)
    const [coverImage,setCoverImage] = useState(null);
    const [profileImage,setProfileImage] = useState(null);

    const { Section } = useParams();
    if(Section){
        section = Section.toLowerCase();
        if(!["personalinfo","security"].includes(section)) section="personalinfo";
    }

    if(!loggedIn) return (<Navigate to="/signup" replace={true}/>)

    return(
        <Container fluid className="add my-4">
            <Row className="" style={{gap:"10px"}}>
                <Col sm="4" lg="3" className="d-none leftContainer flex-column d-sm-flex align-items-end ">
                    <div className="title mt-2 mb-4 align-self-center">Update Profile</div>
                    <div className="sidemenu">
                        <Link to="/profile/personalinfo">
                            <div className={"sideitem first " + (section === "personalinfo" ? "active" : "")}>
                                Personal Info
                            </div>
                        </Link>
                        <Link to="/profile/security">
                            <div className={"sideitem " + (section === "security" ? "active" : "")}>
                                Security
                            </div>
                        </Link>
                        <Link to="">
                            <div className="sideitem">
                                View all Posts
                            </div>
                        </Link>
                        <Link to="">
                            <div className="sideitem">
                                Notification Setting
                            </div>
                        </Link>
                        <Link to="">
                            <div className="sideitem last" onClick={()=>{localStorage.removeItem('auth'); setLoggedIn(false); }}>
                                Logout
                            </div>
                        </Link>
                    </div>
                </Col>
                {/* 
                <Col sm="3" className="d-flex d-sm-none justify-content-between">
                    menu
                </Col>
                */}
                <Col sm="7" lg="8" className="d-flex rightContainer flex-column align-items-start">
                    {   
                        (section === "personalinfo") &&
                        <div className="Img mb-3">
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
                        <Form className="updateForm">
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