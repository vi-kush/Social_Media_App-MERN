import "./post.css"
import {Card, Button, Dropdown} from 'react-bootstrap'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'


const Post= ({postData})=>{

    return (
        <div className="post">
        {
            postData.map((post,idx)=>(
                <Card className="post_card" key={idx}>
                {
                    post.postCover &&
                    <Card.Img variant="top" src={`images/posts/${post.postCover}`} />
                }
                <Card.Body>
                    <div className="title">
                        {post.postIcon} {post.postCategory}
                    </div>
                    <div className="content">
                        <h2 className="title">
                            {post.postTitle}
                            <Dropdown>
                                <Dropdown.Toggle className="dropDown invisible" id={`dropdown-post_menu_${idx}`} style={{width:0,height:0,overflow:"hidden"}}>
                                </Dropdown.Toggle>
                                <label htmlFor={`dropdown-post_menu_${idx}`} style={{cursor:"pointer",position:"relative",top:"-25px"}}>
                                    <img src="images/dots.png" alt="" />
                                </label>
                                <Dropdown.Menu >
                                    <Dropdown.Item >Edit</Dropdown.Item>
                                    <Dropdown.Item >Report</Dropdown.Item>
                                    <Dropdown.Item >Save</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </h2>
                        {
                            post.postContent && <p>{post.postContent}</p>
                        }
                    </div>
                    {
                        post.date ? (
                            <div className="timeStamp">
                                <span className="date">
                                   <CalendarMonthIcon /> {post.date}
                                </span>  
                                <span className="time">
                                   <LocationOnOutlinedIcon /> {post.time}
                                </span>
                            </div>
                            ) : ''
                    }
                    {
                        (post.postCategory === 'Meetup' || post.postCategory === 'Job') 
                        &&
                        <Button className={`postbtn ${post.postCategory}`}>
                        {
                            (post.postCategory === 'Meetup') ? ("View Website") :""
                        }
                        {
                            (post.postCategory === 'Job') ? ("Apply to JobPost") : ""
                        }
                        </Button>    
                    }
                    <div className="footer">
                        <div className="userDetail">
                            <img src={post.userImg ? `images/${post.userImg}` : "images/Rectangle.png"} alt="" />
                            <span className="userName">{post.userName ? post.userName : "Vipul kumar"}</span>
                        </div>
                        <div className="postDetail">
                            <div className="view"><img src="images/views.png" alt="" /><span>12.5K</span></div>
                            <div className="share"><img src="images/share.png" alt="" /></div>
                        </div>
                    </div>
                </Card.Body>
                </Card>        
            ))
        }
        </div>
    )
}

export default Post;