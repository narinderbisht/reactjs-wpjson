import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class HeaderNavigation extends Component {
    render(){
        return(
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/blog">Blog</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/create">Create Post</Link>
                </li>
            </ul>
        )
    }
};

export default HeaderNavigation;