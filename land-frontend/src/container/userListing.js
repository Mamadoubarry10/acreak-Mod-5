import React from 'react'
import { connect } from 'react-redux'
import UserListingCard from '../component/userListingCard'
import{CardColumns} from 'react-bootstrap'

class userListing extends React.Component{
     
  renderUserListing = () =>{
      return this.props.properties.filter(mine => mine.attributes.user_id === this.props.user.id).map(land => <UserListingCard key={land.id} land={land}/>)
  }

render(){
  const listings = this.renderUserListing()

  return (
            <div className="profile-listings-content">
              {listings.length ? (
                <CardColumns className="profile-listings-grid">
                  {listings}
                </CardColumns>
              ) : (
                <div className="profile-empty-state">
                  <span className="profile-empty-icon" aria-hidden="true">⌂</span>
                  <h3>No listings yet</h3>
                  <p>Your properties will appear here after you create a listing.</p>
                </div>
              )}
            </div>
                    
     )

    }
   
}
const msp = (state)=>{

return { properties: state.properties, user: state.user}
}


export default connect(msp)(userListing)
