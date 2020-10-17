import React, {Component, Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'react-moment';
import BlogDataService from '../services/blog.service';
import PostFeaturedImage from './post-featured-image';
import PostCategoryName from './post-category-name';

class PostDetail extends Component{
    constructor(props){
        super(props);
        this.getPostDetail = this.getPostDetail.bind(this);
        this.state = {
            blogPost: [],
            message: '',
            redirect: null
        }
    }
    componentDidMount(){
        this.getPostDetail(this.props.match.params.slug);
    }

    getPostDetail(slug){
        BlogDataService.getPostDetail(slug)
        .then(response => {
            console.log(response);
            if(response.data.length > 0){
                this.setState({
                    blogPost: response.data[0]
                });
            }else{
                this.setState({
                    redirect: '404'
                });
            }
           
            
        }, error => {
            this.setState({
            message: (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString()
            })
        })
        .catch(err => {
            console.log(err);
        })

    }
    render(){
        const {blogPost} = this.state;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <Fragment>
            
            { blogPost.id > 0 && 
            <article className="card mb-4">
               
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
                    <div className="card-text">{ ReactHtmlParser(blogPost.content.rendered) }</div>
                </div>
                
            </article>
            }
        </Fragment>
        )
    }
}
export default PostDetail;