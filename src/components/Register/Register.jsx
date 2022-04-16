import './register.css'
import {Modal, Button, InputGroup, FormControl, Form} from 'react-bootstrap'
import {useState, useRef, useEffect} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = (props) => {

    const [loginPage,switchSignupPage] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [conformPassword,setConformPassword] = useState("");
    const [email,setEmail] = useState("");

    const passwordField = useRef(null);
    
    useEffect(() => {
        // console.log(passwordField)
        if(passwordField.current)
            if(showPassword) passwordField.current.type="text"
            else passwordField.current.type="password"

    },[showPassword])

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
                    <Form className="form" name="registerPage" action="">
                        <div className="fieldContainer">
                            {
                                !loginPage &&
                                <InputGroup className="">
                                    <FormControl value={firstName} onChange={e => setFirstName(e.target.value)} className="input" placeholder="First Name" required name="firstname" />
                                    <FormControl value={lastName} onChange={e => setLastName(e.target.value)} className="input" placeholder="Last Name" required name="lastname" />
                                </InputGroup>
                            }
                            <InputGroup className="">
                                <FormControl value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="Username" required name="username" type="email"/>
                            </InputGroup>
                            <InputGroup className="">
                                <FormControl value={password} onChange={e => setPassword(e.target.value)} ref={passwordField} className="input inputPassword" required name="password" placeholder="Password" type="password"/>
                                <InputGroup.Text className="iconPassword">
                                {
                                    showPassword ? <VisibilityOffIcon sx={{fontSize: 20}} onClick={e=>setShowPassword(false)}/> : <VisibilityIcon sx={{fontSize: 20}} onClick={e=>setShowPassword(true)}/>
                                }   
                                </InputGroup.Text>
                            </InputGroup>
                            {
                                !loginPage &&
                                <InputGroup className="">
                                    <FormControl value={conformPassword} onBlur={() => {(password === conformPassword) ? alert("same") : alert("not same")} } onChange={e => setConformPassword(e.target.value)} className="input" required name="conformPassword" placeholder="Confirm Password" type="password"/>
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