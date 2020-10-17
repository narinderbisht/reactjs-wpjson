import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'react-moment';
import BlogDataService from '../services/blog.service';
import PostFeaturedImage from './post-featured-image';
import PostCategoryName from './post-category-name';
import PostPagination from './post-pagination';

class PostListing extends Component{

    constructor(props){
        super(props);
        this.blogPostListing = this.blogPostListing.bind(this);
        this.state = {
            blogPosts: [],
            headers: [],
            currentPage: 1
        };
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.match.params.page !== this.props.match.params.page) {
            this.blogPostListing(this.props.match.params.page);
        }
    }

    componentDidMount(){
        let page = this.props.match.params.page ? this.props.match.params.page : 1;
        this.blogPostListing(page);
    }

    blogPostListing(page) {
        BlogDataService.getPostList(page)
        .then(response => {
            this.setState({
                blogPosts: response.data,
                headers: response.headers,
                currentPage: page
            });
        }, error => {
            this.setState({
            message: (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString()
            })
        }).catch(e => {
            console.log(e);
        });
    }
    render() {
        const { blogPosts,currentPage,headers } = this.state;
        
        return(
        <div>
            { blogPosts &&
            blogPosts.map( (blogPost, index) => (
                <article className="card mb-4" key={index}>
                    <header className="card-header">
                    <div className="card-meta">
                        <time className="timeago badge" dateTime={blogPost.date}>
                            <Moment format="D MMMM YYYY">{blogPost.date}</Moment>
                        </time>
                        in 
                        { blogPost.categories.map( ( category_id, catindex) => (
                            <PostCategoryName id={category_id} key={catindex}/>
                        ) )}                        
                    </div>
                    <Link to={'/'+blogPost.slug}>
                        <h4 className="card-title">{blogPost.title.rendered}</h4>
                    </Link>
                    </header>
                    { blogPost.featured_media > 0 && 
                        <Link to={'/'+blogPost.slug}>
                            <PostFeaturedImage id={blogPost.featured_media}/>
                        </Link>
                    }
                  
                    <div className="card-body">
                        <div className="card-text">{ ReactHtmlParser(blogPost.excerpt.rendered) }</div>
                    </div>
                </article>
            ) )
            
        }
        { blogPosts.length > 0 &&
            <PostPagination headers={headers} activePage={currentPage} activeUrl="blog"/>
        }
        </div>
            
        )
    }

};

export default PostListing;