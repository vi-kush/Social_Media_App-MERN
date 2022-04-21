import './dropdown.css'
import {Link} from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useState, useRef} from 'react'

const DropDown = (props) => {

    const {navDropDown, linkOptions, options, title} = props 
    
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);
    const [dropdownInput, setDropdownInput] = useState((options && options[0]) || "");
    const dropdownRef = useRef();

    const handleClick = (e,update) => {
        setShowDropDownMenu(!showDropDownMenu);
        update && setDropdownInput(e.currentTarget.innerText.toLowerCase());
        // console.log(e.currentTarget);
    }   
   
    return (
        <div className="dropdown">
            <button className="dropdown_btn" onClick={(e)=>handleClick(e,false)}>
                {title}
                {   
                    !navDropDown &&
                    <input type="text" className="dropdown_text" readOnly value={dropdownInput}/>
                }
                <ArrowDropDownIcon style={(showDropDownMenu ? {transform:"rotate(180deg) translateY(-2px)",transition: "transform 0.3s" } : {transition: "transform 0.3s"})}/>
            </button>
            <div className={`dropdown_menu ${ showDropDownMenu ? "show" : ""}`} ref={dropdownRef}>
               {
                    linkOptions && linkOptions.map((opt,idx) => (<Link onClick={(e)=>handleClick(e,true)} className="item" key={idx} to={`/${opt}`}>{opt}</Link>))
               }
               {
                    options && options.filter(val=>val !== dropdownInput).map((opt,idx) => (<div onClick={(e)=>handleClick(e,true)} className="item" key={idx} >{opt}</div>))
               }
            </div>
        </div>
    )
}

export default DropDown