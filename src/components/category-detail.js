import React, {Component, Fragment} from 'react';
//import {Link} from 'react-router-dom';
import BlogDataService from '../services/blog.service';
import CategoryPosts from './category-posts';

class CategoryDetail extends Component{
    constructor(props){
        super(props);
        this.categoryDetail = this.categoryDetail.bind(this);
        this.state = {
            loading: false,
            message: '',
            categoryContent: [],
            subCategories: [],
            currentPage: 1
        }
    }
    componentDidUpdate(prevProps, prevState){
        
        if (prevProps.match.params.slug !== this.props.match.params.slug
        || prevProps.match.params.page !== this.props.match.params.page){
            let page = this.props.match.params.page ? this.props.match.params.page : 1;
            this.categoryDetail(this.props.match.params.slug, page);
        }
    }
    
    componentDidMount(){
        let page = this.props.match.params.page ? this.props.match.params.page : 1;
        this.categoryDetail(this.props.match.params.slug, page);
    }

    categoryDetail(slug, currentPage) {
        BlogDataService.getCategoryDetail(slug)
        .then(
            response => {
                console.log(response.data);
                this.setState({
                    categoryContent: response.data[0],
                    currentPage: currentPage
                });

            }, error => {
                this.setState({
                    message: (error.response && error.response.data && error.response.data.message)
                    || error.message || error.toString()
                })
            }
        )
    }
    render(){
        const {categoryContent, currentPage} = this.state;
        console.log(currentPage);
        return(
            <Fragment>
               
                <div className="jumbotron">
                    <h1 className="display-4">{ categoryContent.name }</h1>
                    <div className="lead">
                        {categoryContent.description}
                    </div>
                </div>
                { categoryContent.id > 0 && 
                 <CategoryPosts catId={categoryContent.id} 
                 catgorySlug={categoryContent.slug}
                 currentPage={currentPage}/>
                }
            </Fragment>
        )
    }
   
}

export default CategoryDetail;