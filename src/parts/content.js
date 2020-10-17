import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PostCategories from '../components/category-listing';
import PostListing from '../components/post-listing';
import CategoryDetail from '../components/category-detail';
import PostDetail from '../components/post-detail';
import Error from '../components/error-page';

class Content extends Component{
    render(){
        return(
            <div className="col-md-9">
                <Switch>
                <Route exact path={['/', '/categories']} component={PostCategories} />
                <Route exact path={["/category/:slug", "/category/:slug/page/:page"]} component={CategoryDetail} />
                <Route exact path={["/blog", "/blog/page/:page"]} component={PostListing} />
                <Route exact path={['/404']} component={Error} />
                <Route exact path="/:slug" component={PostDetail} />
                </Switch>
            </div>
        )
    }
};

export default Content;