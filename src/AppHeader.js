import React from "react";
import './AppHeader.css';
import {NavLink}from 'react-router-dom';
function AppHeader(){
    return (
        <header className="app-header">
            {/* <NavLink className="app-header-item" to="/" 
            activeClassName="app-header-item-active"exact>Homepage</NavLink>
            <NavLink className="app-header-item" to="/Sample" 
            activeClassName="app-header-item-active"exact>Sample</NavLink> */}
            <NavLink className="app-header-item" to="/rootofequation" 
            activeClassName="app-header-item-active"exact>Rootofequation</NavLink>
        </header>
    );
}
export default AppHeader;