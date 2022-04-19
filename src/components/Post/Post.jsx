import "./post.css"
import {Card, Button, Dropdown} from 'react-bootstrap'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'


const Post= ({postData})=>{
    
    const postCategories = {1:"✍️ Article",2:"🔬️ Education",3:"🗓️ Meetup",4:"💼️ Job"};
    
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
                    <div className="posttitle">
                        {postCategories[post.postCategory]}
                    </div>
                    <div className="content">
                        <h2 className="posttitle">
                            {post.postTitle}
                            
                            <Dropdown>
                                <Dropdown.Toggle className="dropDown btn" id={`dropdown-post_menu_${idx}`}>
                                    <img src="images/dots.png" alt="" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Dropdown.Item >Edit</Dropdown.Item>
                                    <Dropdown.Item >Report</Dropdown.Item>
                                    <Dropdown.Item >Save</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </h2>
                        {
                            ( post.postCategory !== "4" && post.postContent && <p>{post.postContent}</p>)    
                        }
                    </div>
                    <div className="timeStamp">
                        {
                            (post.date ) ? (
                                <span className="date">
                                    <img src="images/meetupDateIcon.png" alt="" /> {post.date}
                                </span>          
                            ) : ''
                        }
                        {
                            post.postCategory === "4" ? 
                            <div className="jobIcon">
                                {
                                    post.postContent && 
                                        <span>
                                            <img src="images/jobIcon.png" alt="" />
                                            {post.postContent}
                                        </span> 
                                }
                            </div> : ""
                        }
                        {
                            (post.location) ? (
                                <span className="time">
                                    <LocationOnOutlinedIcon /> {post.location}
                                </span> 
                            ) : ""
                        }
                        <div></div>    
                    </div>
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