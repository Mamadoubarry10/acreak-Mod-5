import React from 'react'
import { connect } from 'react-redux'
import {fetchSignUp} from '../redux/action'
import { NavLink } from 'react-router-dom'
import USLocationPicker, { findExactUSCity } from './USLocationPicker'



class Signup extends React.Component{


    state={
        name:"",
        username:"",
        email:"",
        password:"",
        userImg:"",
        phone:"",
        city:"",
        stateCode:"",
        locationIsValid:false,
        locationError:""
    }

    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})

       
    }

    localSubmithandler= (e)=>{
        e.preventDefault()
        const matchedCity = findExactUSCity(this.state.city, this.state.stateCode)

        if (!matchedCity || !this.state.locationIsValid) {
            this.setState({
                locationError: "Choose a city from the suggestions and confirm its state."
            })
            return
        }

        this.props.submitHandler({
            ...this.state,
            city: matchedCity.name,
            location: `${matchedCity.name}, ${matchedCity.stateCode}`
        })
    }

    locationChangeHandler = ({city, stateCode, isValid}) => {
        this.setState({
            city,
            stateCode,
            locationIsValid: isValid,
            locationError: ""
        })
    }

    uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'mamadou')
     
        const res = await fetch(
          '	https://api.cloudinary.com/v1_1/dchooagl5/image/upload' ,
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
    
       console.log(file)
        this.setState({userImg:file.secure_url})
   
      }
    render(){
        return(
            <main className="form-page">
                <div className="form-shell">
                 <div className="form-heading">
                    <span className="page-eyebrow">Join the community</span>
                    <h1>Create your profile</h1>
                    <p>Save properties, connect with owners, and list your own land.</p>
                 </div>
                 <form onSubmit={this.localSubmithandler} className="theme-form theme-form-grid">
                 <div className="field-group"><label>Full name</label><input className="theme-input" type="text" name ="name" value={this.state.name} onChange={e => this.changeHandler(e)} placeholder="Your full name"/></div>
                 <div className="field-group"><label>Username</label><input className="theme-input" type="text" name ="username" value={this.state.username} onChange={e => this.changeHandler(e)} placeholder="Choose a username"/></div>
                 <div className="field-group"><label>Email</label><input className="theme-input" type="email" name="email" value={this.state.email} onChange={e => this.changeHandler(e)} placeholder="you@example.com"/></div>
                 <div className="field-group"><label>Password</label><input className="theme-input" type="password" name="password" value={this.state.password} onChange={e => this.changeHandler(e)} placeholder="Create a password"/></div>
                 <div className="field-group field-group-wide"><label>Profile photo</label><input className="theme-input theme-file-input" type="file" name="userImg" onChange={e => this.uploadImage(e)}/></div>
                 <div className="field-group"><label>Phone</label><input className="theme-input" type="tel" name ="phone" value={this.state.phone} onChange={e => this.changeHandler(e)} placeholder="Your phone number"/></div>
                 <USLocationPicker
                    city={this.state.city}
                    stateCode={this.state.stateCode}
                    onChange={this.locationChangeHandler}
                 />
                 {this.state.locationError && (
                    <p className="form-error field-group-wide" role="alert">
                        {this.state.locationError}
                    </p>
                 )}
                 <input className="theme-button theme-button-primary field-group-wide" type="submit" value="Create account" />
                 </form>
                 <p className="auth-switch">Already have an account? <NavLink to="/">Sign in</NavLink></p>
                </div>
            </main>



        )
    }
}


function mdp(dispatch){
    return {submitHandler: (newUser)=>dispatch(fetchSignUp(newUser))}
}

export default connect(null, mdp)(Signup)
