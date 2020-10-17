import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'react-moment';
import BlogDataService from '../services/blog.service';
import PostFeaturedImage from './post-featured-image';
import PostCategoryName from './post-category-name';
import PostPagination from './post-pagination';

class CategoryPosts extends Component{
    constructor(props){
        super(props);
        this.categoryPosts = this.categoryPosts.bind(this);
        this.state = {
            blogPosts: [],
            message: '',
            headers: [],
            currentPage: 1,
            catgorySlug: ''
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.catId !== this.props.catId 
            || prevProps.currentPage !== this.props.currentPage) {
            let page = this.props.currentPage ? this.props.currentPage : 1;
            this.categoryPosts(this.props.catId, this.props.catgorySlug, page);
        }
    }

    componentDidMount(){
        let page = this.props.currentPage ? this.props.currentPage : 1;
        this.categoryPosts(this.props.catId, this.props.catgorySlug, page);
    }

    categoryPosts(cat_id, catgorySlug, currentPage){
        //console.log(cat_id);
        BlogDataService.getCategoryPosts(cat_id, currentPage )
        .then(
            response => {
                //console.log(response.data);
                this.setState({
                    blogPosts: response.data,
                    headers: response.headers,
                    currentPage: currentPage,
                    catgorySlug: catgorySlug
                });
            }, error => {
                this.setState({
                message: (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.toString()
                })
            }
        ).catch(e => {
            console.log(e);
        });
    }

    render(){
        const { blogPosts,currentPage,headers,catgorySlug } = this.state;
        console.log(currentPage);
        return(
            <Fragment>
                { blogPosts && blogPosts.map( (blogPost, index) => (
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
                ))}
                { blogPosts.length > 0 &&
            <PostPagination headers={headers} activePage={currentPage} activeUrl={`category/${catgorySlug}`}/>
        }
            </Fragment>
        )
    }
}
export default CategoryPosts;