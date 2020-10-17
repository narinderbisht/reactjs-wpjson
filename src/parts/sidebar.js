import React, { Component } from "react";

class Sidebar extends Component{
    render(){
        return(
            <div className="col-md-3 ml-auto">
                <aside className="sidebar">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title">About</h4>
                            <p className="card-text">Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam 
                            semper libero, sit amet adipiscing sem neque sed ipsum. </p>
                        </div>
                    </div>
                </aside>
            </div>
        )
    }
};

export default Sidebar;