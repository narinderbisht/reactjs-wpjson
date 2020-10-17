import React, { Component } from "react";

class SearchBar extends Component{
    render(){
        return(
        <div className="collapse navbar-collapse order-4 order-md-4" id="navbar-right">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="page-about.html">Sign In</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="page-contact.html">Sign Up</a>
            </li>
          </ul>
          <form className="form-inline" role="search">
            <input className="search js-search form-control form-control-rounded mr-sm-2" type="text" title="Enter search query here.." placeholder="Search.." aria-label="Search"/>
          </form>
        </div>
        )
    }
};
export default SearchBar;