import React from 'react'
import { connect } from 'react-redux'
import ProfileRender from './ProfileRender'
import UserListing from './userListing'


class ProfileContainer extends React.Component{
     render(){
        return (
            <main className="profile-page">
                <ProfileRender/>
                <section className="profile-listings">
                    <div className="profile-section-heading">
                        <div>
                            <span className="profile-eyebrow">Your properties</span>
                            <h2>My listings</h2>
                        </div>
                        <span className="profile-listing-count">
                            {this.props.properties.filter(
                                property => property.attributes.user_id === this.props.user.id
                            ).length}
                        </span>
                    </div>
                    <UserListing/>
                </section>
            </main>
        )
    }
}

const msp = (state)=>{
    return { properties: state.properties, user: state.user}
}


export default connect(msp)(ProfileContainer)
