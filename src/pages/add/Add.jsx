// import Navbar from '../../components/Navbar/Navbar'
import "./add.css"
import {Button, InputGroup, Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
const Add = ()=>{
 
    const [image,setImage] = useState(null);
    const [loggedIn] = useState(localStorage.getItem('auth') ? true : false)
    if(!loggedIn) return (<Navigate to="/signup" replace={true}/>)

    return(
        <Container fluid className="add mt-4">
            <Row className="" style={{gap:"10px"}}>
                <Col sm="4" lg="3" className="d-none leftContainer flex-column d-sm-flex align-items-end ">
                    <div className="title mt-2 mb-4 align-self-center">Create Post</div>
                    <div className="sidemenu">
                        <Link to=""><div className="sideitem first active">Create Post</div></Link>
                        <Link to=""><div className="sideitem last">View All Post</div></Link>
                    </div>
                </Col>
                {/* 
                <Col sm="3" className="d-flex d-sm-none justify-content-between">
                    menu
                </Col>
                */}
                <Col sm="7" lg="8" className="d-flex rightContainer flex-column align-items-start">
                    <div className="coverImg mb-3">
                        {image ?<img src={URL.createObjectURL(image)} alt="" width="100%" />:""}
                    </div>
                    <Form className="updateForm">
                        <Row className="mb-3" >
                            <InputGroup >
                                <FloatingLabel className="titleField" controlId="floatingInput" label="Title" >
                                    <Form.Control type="Text" placeholder="Title" />
                                </FloatingLabel>
                                <InputGroup.Text className="imgField">
                                    <label htmlFor="postCover">Cover <UploadFileIcon/> </label>
                                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} id="postCover" style={{display:"none"}} />
                                </InputGroup.Text>
                            </InputGroup>
                        </Row>
                        <Form.Group >
                            <Row className="mb-3" >
                                <Col>
                                <FloatingLabel controlId="floatingInput" label="Date" >
                                    <Form.Control type="Date" />
                                </FloatingLabel>
                                </Col>
                                <Col>
                                <FloatingLabel controlId="floatingInput" label="Location" >
                                    <Form.Control type="Text" placeholder="Location" />
                                </FloatingLabel>
                                </Col>
                            </Row>
                        </Form.Group>
                        <FloatingLabel controlId="floatingInput" label="Content" className="mb-3">
                            <Form.Control as="textarea" placeholder="Content" rows={4} style={{height: "200px", lineHeight: "40px"}}/>
                        </FloatingLabel>
                        <div className="submitSection">
                            <Button onClick={e => {setImage(null); e.target.form.reset()}} className="clear">Clear</Button>
                            <Button className="submit">Submit</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Add;