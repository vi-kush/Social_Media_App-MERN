import './dropdown.css'
import {Link} from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useState, useRef} from 'react'

const DropDown = (props) => {

    const {navDropDown, linkOptions, options, optionObject, title, mxw} = props 
    
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);
    const [dropdownInput, setDropdownInput] = useState((options && options[0]) || (optionObject && optionObject.filter(v => v.uri === props.section)[0].title.toLowerCase()) || "");
    const dropdownRef = useRef();

    const handleClick = (e,update) => {

        setShowDropDownMenu(!showDropDownMenu);
        if(update) {

            let val=e.currentTarget.innerText.toLowerCase()
            props.change && props.change(val)
            setDropdownInput(val)
        } 
    }   

    return (
        <div className={`dropdown ${props.className ? props.className : ""}`} style={{...props.style}}>
            <button className="dropdown_btn" onClick={(e)=>handleClick(e,false)} style={{...props.btnStyle}}>
                {title}
                {   
                    !navDropDown &&
                    <input type="text" className="dropdown_text" readOnly value={dropdownInput} style={{maxWidth: `${mxw}px`, ...props.inputStyle}}/>
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
               {
                   optionObject && optionObject.filter(val=> val.title.toLowerCase() !== dropdownInput).map((obj,idx) => (
                                                                                                                <Link to={`/profile/${obj.uri}`} key={idx} onClick={obj.onclick}>
                                                                                                                    <div onClick={(e)=>handleClick(e,true)} className="item" >
                                                                                                                        {obj.title}
                                                                                                                    </div>
                                                                                                                </Link>
                                                                                                            ))
               }
            </div>
        </div>
    )
}

export default DropDown