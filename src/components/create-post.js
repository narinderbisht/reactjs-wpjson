import React, {Component} from 'react';

class CreatePost extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    savePost(){

    }
    addNewPost(){

    }
    render(){
        return(
            <div class="create-blog-post">
            <div v-if="!submitted">
                <p v-if="errorMsg" class="alert alert-danger">{{errorMsg}}</p>
                <form>
                    <div class="form-group">
                        <label for="post_title">Post Title</label>
                        <input type="text" v-model="blogPost.title" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="post_content">Post Content</label>
                        <textarea v-model="blogPost.content" class="form-control"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div v-else>
                <h4>You submitted successfully!</h4>
                <button class="btn btn-success">Add</button>
            </div>
            </div>
        );
    }
}
export default CreatePost;