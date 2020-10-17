import React from 'react';
//import logo from './logo.svg';
import {BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./parts/header";
import Sidebar from './parts/sidebar';
import Footer from './parts/footer';
import Content from './parts/content';

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <main className="main pt-4">
        <div className="container">
          <div className="row">
            <Content/>
            <Sidebar/>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
