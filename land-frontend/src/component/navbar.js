import React from 'react'
import { NavLink } from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import { connect } from 'react-redux'

const Navigation = (props) =>{
    return(
        <Navbar className="site-navbar" expand="lg" sticky="top">
        <NavLink to="/" exact className="site-brand">
            <span className="site-brand-mark">A</span>
            <span>Acreak</span>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <NavLink to="/" exact className="site-nav-link" activeClassName="active">Home</NavLink>
                <NavLink to="/listings" exact className="site-nav-link" activeClassName="active">Listings</NavLink>
                <NavLink to="/favorites" exact className="site-nav-link" activeClassName="active">Favorites</NavLink>
                <NavLink to="/list" exact className="site-nav-link" activeClassName="active">Sell land</NavLink>
                <NavLink to="/profile" exact className="site-nav-link" activeClassName="active">Profile</NavLink>
            </Nav>
            <button onClick={props.logOut} className="nav-logout">Log out</button>
        </Navbar.Collapse>
        </Navbar>
    )
}
const mdp = (dispatch)=>{

    return { logOut:()=> dispatch({type: "LOG_OUT"})}
}

export default connect(null,mdp)(Navigation)
