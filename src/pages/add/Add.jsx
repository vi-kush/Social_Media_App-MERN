// import Navbar from '../../components/Navbar/Navbar'
import "./add.css"
import DropDown from './../../components/DropDown/DropDown'
import {Button, InputGroup, Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import {useState, useContext, useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom'
import { authContext } from '../../App'

const Add = ()=>{
    
    const [image,setImage] = useState(undefined);
    const [jobCategory,setJobCategory] = useState("article");
    const { loggedIn } = useContext(authContext)
    // const [loggedIn] = useState(localStorage.getItem('auth') ? true : false)
    

    if(!loggedIn) return (<Navigate to="/signup" replace={true}/>)

    return(
        <Container fluid className="add mt-4">
            <Row className="" style={{gap:"10px"}}>
                <Col xs="12" md="4" lg="3" className="leftContainer flex-column d-md-flex align-items-end ">
                    <div className="title px-3 mt-2 mb-4 align-self-center">Create Post</div>
                    <div className="sidemenu d-flex d-md-block">
                        <Link to=""><div className="sideitem first active">Create Post</div></Link>
                        <Link to=""><div className="sideitem last">View All Post</div></Link>
                    </div>
                </Col>
                
                <Col xs="12" md="7" lg="8" className="d-flex rightContainer flex-column align-items-start">

                    <div className="job_category mt-1 mb-3">
                        <DropDown 
                        title="Category :" 
                        mxw={200} 
                        options={["article","education","meetup","job"]}
                        btnStyle={{border:"1px solid rgba(0,0,0,0.2)",borderRadius:"5px",padding:"10px",background:"rgba(0,0,0,0.025)"}}
                        inputStyle={{paddingLeft:"20px"}}
                        change={setJobCategory}
                        />
                    </div>
                    {jobCategory !== "job" && image ?
                        <div className="coverImg mb-3">
                            <img src={URL.createObjectURL(image)} alt="" width="100%" />
                        </div>: "" 
                    }
                    <Form className="updateForm" name="createPost">
                        <Row className="mb-3" >
                            <input type="text" value={jobCategory} name="jobCategory" readOnly style={{display:"none"}}/>
                            <InputGroup >
                                <FloatingLabel className="titleField" controlId="floatingInput" label="Title" >
                                    <Form.Control type="Text" placeholder="Title" />
                                </FloatingLabel>
                                <InputGroup.Text className="imgField">
                                    <label htmlFor="postCover">Cover <UploadFileIcon/> </label>
                                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} id="postCover" name="postCover" style={{display:"none"}} />
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