import React from 'react'
import { connect } from 'react-redux'
import {postPropeties} from '../redux/action'



class List extends React.Component{


    state={
        image1:'',
        image2:'',
        image3:'',
        price:'',
        acres:'',
        description:'',
        location:''
    }

    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})

    }

    localSubmithandler= (e)=>{
        e.preventDefault()
        this.props.submitHandler(this.state, this.props.user.id)
        this.setState({image1:'',
        image2:'',
        image3:'',
        price:'',
        acres:'',
        description:'',
        location:''})
        console.log("state",this.state)

    }

    uploadImage1 = async e => {
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
        this.setState({image1:file.secure_url})
   
      }

      uploadImage2 = async e => {
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
        this.setState({image2:file.secure_url})
   
      }

      uploadImage3 = async e => {
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
        this.setState({image3:file.secure_url})
   
      }


    render(){
        
        console.log("USER", this.props.user.id)
        
        return(
            
            <main className="form-page">
                <div className="form-shell">
                 <div className="form-heading">
                    <span className="page-eyebrow">Reach the right buyer</span>
                    <h1>List your land</h1>
                    <p>Share the essentials and add three strong photos of your property.</p>
                 </div>
                 <form onSubmit={this.localSubmithandler} className="theme-form theme-form-grid">
                 <div className="field-group"><label>Primary photo</label><input className="theme-input theme-file-input" type="file" name="image1" onChange={e => this.uploadImage1(e)}/></div>
                 <div className="field-group"><label>Second photo</label><input className="theme-input theme-file-input" type="file" name="image2" onChange={e => this.uploadImage2(e)}/></div>
                 <div className="field-group field-group-wide"><label>Third photo</label><input className="theme-input theme-file-input" type="file" name="image3" onChange={e => this.uploadImage3(e)}/></div>
                 <div className="field-group"><label>Price</label><input className="theme-input" type="text" name="price" value={this.state.price} onChange={e => this.changeHandler(e)} placeholder="e.g. 125,000"/></div>
                 <div className="field-group"><label>Acres</label><input className="theme-input" type="number" name="acres" value={this.state.acres} onChange={e => this.changeHandler(e)} placeholder="Property size"/></div>
                 <div className="field-group field-group-wide"><label>Description</label><textarea className="theme-input theme-textarea" name="description" value={this.state.description} onChange={e => this.changeHandler(e)} placeholder="Tell buyers what makes this property special"></textarea></div>
                 <div className="field-group field-group-wide"><label>Location</label><input className="theme-input" type="text" name="location" value={this.state.location} onChange={e => this.changeHandler(e)} placeholder="City, state"/></div>
                 <input className="theme-button theme-button-primary field-group-wide" type="submit" value="Publish listing" />
                 </form>
                </div>
            </main>



        )
    }
}

const msp = (state)=>{

    return { user: state.user}
}

function mdp(dispatch){
    return {submitHandler: (obj,User)=>dispatch(postPropeties(obj, User))}
}


export default connect(msp, mdp)(List)
