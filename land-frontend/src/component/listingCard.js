import React from 'react'
import {Card} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'



const ListingCard = (props)=>{
    return(
        <Card className="property-card">
            <div className="property-image-wrap">
                <Card.Img variant="top" src={props.land.attributes.img2} className="property-image" />
                <span className="property-acres">{props.land.attributes.acres} acres</span>
            </div>
            <Card.Body className="property-card-body">
                <span className="property-label">Land for sale</span>
                <Card.Title>{props.land.attributes.location}</Card.Title>
                <p className="property-price">${props.land.attributes.price}</p>
                <NavLink to={`/listings/${props.land.id}`} exact className="property-link">View property <span>→</span></NavLink>
            </Card.Body>
        </Card>
    )
}

export default ListingCard
