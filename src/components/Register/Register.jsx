import './register.css'
import axios from 'axios'
import {Modal, Button, InputGroup, FormControl, Form} from 'react-bootstrap'
import {useState, useRef, useEffect} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = (props) => {

    const { register, setModalShow, setLoggedIn } = props;
    const [loginPage,switchSignupPage] = useState((register==="login" || register==="signin")? true : false);
    const [showPassword,setShowPassword] = useState(false);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [conformPassword,setConformPassword] = useState("");
    const [email,setEmail] = useState("");

    const passwordField = useRef(null);
    const errorBox = useRef(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!loginPage)
            if(!firstName) errorBox.current.textContent="Please Fill First Name"
            else if(!lastName) errorBox.current.textContent="Please Fill Last Name"
            else if(!email) errorBox.current.textContent="Please Fill Email"
            else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) errorBox.current.textContent="Invalid Email"
            else if(!password || !conformPassword) errorBox.current.textContent="Please Fill Password"
            else if(password.length<8) errorBox.current.textContent="Password Should Contain 8 char"
            else if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password)) errorBox.current.textContent="Password Should Contain UpperCase, LowerCase, Digit, Special Char"
            else if(password !== conformPassword) errorBox.current.textContent="Password Mismatch"
            else {
                errorBox.current.textContent="";

                try{
                    const {data} = await axios.post("api/auth/register",
                                    {firstName, lastName, email, password},
                                    {header:{'content-type':'application/json'}}
                                );
                    console.log(data);
                    localStorage.setItem('auth',data.token);
                    setLoggedIn(true);
                    setModalShow(false);
                }catch(error){
                    console.log(error)
                }
            }
        else{
            if(!email) errorBox.current.textContent="Please Fill Email"
            else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) errorBox.current.textContent="Invalid Email"
            else{
                errorBox.current.textContent="";

                try{
                    const {data} = await axios.post("api/auth/login",
                                    {email, password},
                                    {header:{'content-type':'application/json'}}
                                );
                    console.log(data);
                    localStorage.setItem('auth',data.token);
                    setLoggedIn(true);
                    setModalShow(false);
                }catch(error){
                    console.log(error)
                }
            }
        }
    }

    useEffect(() => {
        // console.log(passwordField)
        if(passwordField.current)
            if(showPassword) {
                passwordField.current.type="text"
                setTimeout(()=>{passwordField.current.type="password";setShowPassword(false)},5000)
            }else 
                passwordField.current.type="password"
    },[showPassword])

    return (
        <Modal
            show={props.show} 
            onHide={props.onHide}
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
                                <FormControl value={password} minLength={8} onChange={e => setPassword(e.target.value)} ref={passwordField} className="input inputPassword" required name="password" placeholder="Password" type="password"/>
                                <InputGroup.Text className="iconPassword">
                                {
                                    showPassword ? <VisibilityOffIcon sx={{fontSize: 20}} onClick={e=>setShowPassword(false)}/> : <VisibilityIcon sx={{fontSize: 20}} onClick={e=>setShowPassword(true)}/>
                                }   
                                </InputGroup.Text>
                            </InputGroup>
                            {
                                !loginPage &&
                                <InputGroup className="">
                                    <FormControl value={conformPassword} onChange={e => setConformPassword(e.target.value)} className="input" required name="conformPassword" placeholder="Confirm Password" type="password"/>
                                </InputGroup>                        
                            }
                        </div>
                        <div className="error" ref={errorBox}></div>
                        <Button onClick={handleSubmit} className="register_btn">{loginPage ? "Sign In" :"Create Account"}</Button>
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