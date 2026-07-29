import React from 'react'
import {userLoginFetch} from '../redux/action'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Login extends React.Component{


    state={
        username:'',
        password:''

    }    
    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})

        console.log(this.state)
    }
    
    localSubmithandler= (e)=>{
        e.preventDefault()
        this.props.submitHandler(this.state)

    }
    render(){

        return(
  
            <main className="auth-page">
            <div className="auth-card">
                <div className="auth-brand"><span>A</span></div>
                <span className="page-eyebrow">Welcome back</span>
                <h1 className="auth-title">Sign in to Acreak</h1>
                <p className="auth-subtitle">Your saved land and listings are waiting.</p>
                <form onSubmit={this.localSubmithandler} className="theme-form">
                <label>Username</label>
                <input className="theme-input" type="text" name ="username" value={this.state.username} onChange={e => this.changeHandler(e)} placeholder="Enter your username"/>
                <label>Password</label>
                <input className="theme-input" type="password" name = "password" value={this.state.password} onChange={e => this.changeHandler(e)} placeholder="Enter your password"/>
                <input className="theme-button theme-button-primary theme-button-block" type="submit" value="Sign in" />
                </form>
                {this.props.error ? <p className="form-error">Incorrect username or password</p> : null}
                <p className="auth-switch">New to Acreak? <NavLink to="/signup" exact>Build your profile</NavLink></p>
    </div>
                </main>
         
        )


    }
}

function mdp(dispatch){
    return {submitHandler: (newUser)=>dispatch(userLoginFetch(newUser))}
}

function msp(state){
    return {error : state.error}
}

export default connect(msp, mdp)(Login)
