import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import BlogDataService from '../services/blog.service';

class PostCategoryListing extends Component{
    constructor(props){
        super(props);
        this.categoryListing = this.categoryListing.bind(this);
        this.state = {
            loading: false,
            message: '',
            categories: []
        };
    }

    componentDidMount(){
        this.categoryListing();
    }

    categoryListing(){
        
        BlogDataService.getCategoryList()
        .then(
            response => {
                console.log(response.data);
                this.setState({
                    categories: response.data,
                    loading: false
                });
            }, error => {
                //console.log(error);
                this.setState({
                    loading:false,
                    message: (error.response && error.response.data &&
                        error.response.data.message ) || error.message || error.toString()
                });
            }
        ).catch(e => {
            console.log(e);
        });
    }

    render(){
        const { categories } = this.state;
       
        return(
            <Fragment>
            <h1>Blog Post Categories</h1>
            <div className="container-fluid">
                <div className="row">
                {
                    categories && categories.map( ( category, index) => (
                        <div className="col-xs-12 col-md-6" key={index}>
                            <h5 className="mt-5">
                                <Link to={"/category/"+category.slug} key={index}>
                                    { category.name }
                                </Link>
                            </h5>
                        </div>
                    ))
                }
                </div>
            </div>
           
            </Fragment>
        )
    }
};
export default PostCategoryListing;