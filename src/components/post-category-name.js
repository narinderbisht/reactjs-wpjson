import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import BlogDataService from '../services/blog.service'
class PostCategoryName extends Component{
    constructor(props){
        super(props);
        this.postCategoryName = this.postCategoryName.bind(this);
        this.state = {
            categoryName: [],
            message: ''
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.id !== this.props.id) {
            this.postCategoryName(this.props.id);
        }
    }

    componentDidMount(){
        this.postCategoryName(this.props.id);
    }

    postCategoryName(id){
        BlogDataService.getPostCategoryName(id)
        .then(
            response => {
                //console.log(response.data);
                this.setState({
                    categoryName: response.data
                });
            }, error => {
                this.setState({
                message: (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.toString()
                });
            }
        )
    }
    render(){
        const {categoryName} = this.state;
        return(
            <Link className="badge" to={'/category/'+categoryName.slug}>{categoryName.name}</Link>
        )
    }

}

export default PostCategoryName;