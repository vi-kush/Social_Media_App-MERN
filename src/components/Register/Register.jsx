import './register.css'
import {Modal, Button, InputGroup, FormControl, Form} from 'react-bootstrap'
import {useState, useRef} from 'react'

const Register = (props) => {

    const [loginPage,switchSignupPage] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");

    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="title">
                    Let's learn, share & inspire each other with our passion for computer engineering. Sign up now 🤘🏼
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="headTitle">
                    {
                        loginPage ? "Sign In" :"Create Account"
                    }
                    <div>
                    {
                        loginPage ? 
                            <div>Don’t have an account yet?<span onClick={()=>switchSignupPage(false)}> Create new for free!</span></div>
                            :
                            <div>Already have an account?<span onClick={()=>switchSignupPage(true)}> Sign In</span></div>
                    }
                    </div>
                </div>
                <div className="formSection">
                    <Form className="form" action="">
                        <div className="fieldContainer">
                            {
                                !loginPage &&
                                <InputGroup className="">
                                    <FormControl className="input" placeHolder="First Name"  />
                                    <FormControl className="input" placeHolder="Last Name" />
                                </InputGroup>
                            }
                            <InputGroup className="">
                                <FormControl className="input" placeholder="Username" type="email"/>
                            </InputGroup>
                            <InputGroup className="">
                                <FormControl className="input" placeholder="Password" type="password"/>
                            </InputGroup>
                            {
                                !loginPage &&
                                <InputGroup className="">
                                    <FormControl className="input" placeholder="Confirm Password" type="password"/>
                                </InputGroup>
                            }
                        </div>
                        <Button className="register_btn">{loginPage ? "Sign In" :"Create Account"}</Button>
                        <Button className="register_btn social_media_btn"><img src="images/fbIcon.png" alt="" />Sign up with facebook</Button>
                        <Button className="register_btn social_media_btn"><img src="images/googleIcon.png" alt="" />Sign up with google</Button>
                    </Form>
                    <div className="register_right">
                        <img className="d-none d-lg-flex " onError={({target}) => target.classList.remove('d-lg-flex')} src="images/group.png" alt="" />
                        { !loginPage && 
                            <span className="terms">
                                By signing up, you agree to our Terms & conditions, Privacy policy
                            </span>
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Register;