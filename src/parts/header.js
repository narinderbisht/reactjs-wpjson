import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderNavigation from './navigation';
import SearchBar from './searchbar';

class Header extends Component {
   render(){
 
    return (

      <header>
        <nav className="navbar navbar-expand-md navbar-light bg-white absolute-top">
          <div className="container">
            <button className="navbar-toggler order-2 order-md-1" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbar-left navbar-right" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse order-3 order-md-2" id="navbar-left">
              <HeaderNavigation/>
            </div>
            <Link to={'/'} className="navbar-brand mx-auto order-1 order-md-3">React Blog</Link>
            <SearchBar/>
          </div>
        </nav>
      </header>
    )
   }
};

export default Header;