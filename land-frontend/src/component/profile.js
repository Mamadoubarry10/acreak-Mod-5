import React from 'react'
import {connect} from 'react-redux'

const Profile = ({ user, properties }) =>{
    const userListings = properties.filter(
        property => property.attributes.user_id === user.id
    )
    const initials = (user.name || user.username || 'A')
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return(
        <section className="profile-hero">
            <div className="profile-cover" aria-hidden="true">
                <span className="profile-cover-shape profile-cover-shape-one"></span>
                <span className="profile-cover-shape profile-cover-shape-two"></span>
            </div>

            <div className="profile-content">
                <div className="profile-avatar-wrap">
                    {user.userImg ? (
                        <img
                            className="profile-avatar"
                            src={user.userImg}
                            alt={`${user.name || user.username}'s profile`}
                        />
                    ) : (
                        <div className="profile-avatar profile-avatar-fallback" aria-label="Profile initials">
                            {initials}
                        </div>
                    )}
                </div>

                <div className="profile-identity">
                    <span className="profile-eyebrow">Acreak member</span>
                    <h1>{user.name || 'Your profile'}</h1>
                    {user.username && <p className="profile-handle">@{user.username}</p>}
                    {user.location && (
                        <p className="profile-location">
                            <span aria-hidden="true">⌖</span> {user.location}
                        </p>
                    )}
                </div>

                <div className="profile-details">
                    <div className="profile-stat">
                        <strong>{userListings.length}</strong>
                        <span>{userListings.length === 1 ? 'Listing' : 'Listings'}</span>
                    </div>
                    {user.email && (
                        <a className="profile-detail" href={`mailto:${user.email}`}>
                            <span className="profile-detail-label">Email</span>
                            <span>{user.email}</span>
                        </a>
                    )}
                    {user.phone && (
                        <a className="profile-detail" href={`tel:${user.phone}`}>
                            <span className="profile-detail-label">Phone</span>
                            <span>{user.phone}</span>
                        </a>
                    )}
                </div>
            </div>
        </section>
    )
}


function msp(state){
    return {user: state.user, properties: state.properties}
}

export default connect(msp)(Profile)
