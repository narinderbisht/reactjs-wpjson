import React, {Component} from 'react';
import BlogDataService from '../services/blog.service'
class PostFeaturedImage extends Component{
    constructor(props){
        super(props);
        this.postFeaturedImage = this.postFeaturedImage.bind(this);
        this.state = {
            postFeaturedImg: [],
            message: ''
        }
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.id !== this.props.id) {
            this.postFeaturedImage(this.props.id);
        }
    }


    componentDidMount(){
        this.postFeaturedImage(this.props.id);
    }

    postFeaturedImage(id){
        BlogDataService.getPostFeaturedImage(id)
        .then(
            response => {
                //console.log(response.data);
                this.setState({
                    postFeaturedImg: response.data
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
        const {postFeaturedImg} = this.state;
        return(
            <img className="card-img" 
            src={postFeaturedImg.source_url} 
            alt={postFeaturedImg.alt_text} />
        )
    }

}

export default PostFeaturedImage;