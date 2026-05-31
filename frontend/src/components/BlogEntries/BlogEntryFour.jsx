import { Link } from "react-router-dom";
import headshot from '/headshot.png'

function BlogEntryFour() {
    return (
        <div>
            <h2>5/30/26 7:44pm</h2>

            <p>Added <Link to="/gun-effect">/gun-effect</Link>, which uses MediaPipe to track the user's fingers, and allows them to shoot 'finger guns'.</p>
            <img src={headshot} style={{ width: "64px", height: "64px" }} />

            <br/>
            <br/>
            
            <p>requires webcam permissions, but its kinda cool to mess around with :p. As usual, source code is available on my Github </p>

            

            <h3>Added</h3>
            <p>/gun-effect</p>

            <h3>Changed</h3>
            <p>~</p>

            <h3>Removed</h3>
            <p>~</p>
        </div>
    )
}

export default BlogEntryFour;