import { Link } from "react-router-dom";
import "../styles/Blog.css";

import BlogEntryTwo from "../components/BlogEntries/BlogEntryTwo";
import BlogEntryOne from "../components/BlogEntries/BlogEntryOne";
import BlogEntryThree from "../components/BlogEntries/BlogEntryThree";
import BlogEntryFour from "../components/BlogEntries/BlogEntryFour";

function Blog() {
  return (
    <div>
      <Link to="/" className="redirect-home">
        home
      </Link>

      <div className="blog-entry-list-container">
        <BlogEntryFour />
        <BlogEntryThree />
        <BlogEntryTwo  />
        <BlogEntryOne  />
      </div>
    </div>
  );
}

export default Blog;