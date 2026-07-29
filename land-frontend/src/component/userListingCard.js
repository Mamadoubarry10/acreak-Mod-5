import React from 'react'
import {Card} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { listAsSold } from '../redux/action'



const UserListingCard = (props)=>{
    return(
        <Card className="property-card">
            <div className="property-image-wrap">
                <Card.Img variant="top" src={props.land.attributes.img2} className="property-image" />
                <span className="property-acres">{props.land.attributes.acres} acres</span>
            </div>
            <Card.Body className="property-card-body">
                <span className="property-label">Your listing</span>
                <Card.Title>{props.land.attributes.location}</Card.Title>
                <p className="property-price">${props.land.attributes.price}</p>
                <div className="property-card-actions">
                    <NavLink to={`/listings/${props.land.id}`} exact className="property-link">View <span>→</span></NavLink>
                    <button type="button" className="text-button" onClick={()=>props.listAsSold(props.land.id)}>Mark sold</button>
                </div>
            </Card.Body>
        </Card>
    )
}

const mdp =(dispatch) => {
    return {listAsSold:(id) => dispatch(listAsSold(id))}
}

export default connect(null, mdp)(UserListingCard)
