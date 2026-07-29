import React from 'react'
import {Card} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {removeFave} from '../redux/action'



const FavoriteCard = (props)=>{
    return(
        <Card className="property-card">
            <div className="property-image-wrap">
                <Card.Img variant="top" src={props.land.img2} className="property-image" />
                <span className="property-acres">{props.land.acres} acres</span>
                <button className="favorite-remove" type="button" aria-label="Remove from favorites" onClick={()=> props.removeFave(parseInt(props.favoriteId))}>×</button>
            </div>
            <Card.Body className="property-card-body">
                <span className="property-label">Saved property</span>
                <Card.Title>{props.land.location}</Card.Title>
                <p className="property-price">${props.land.price}</p>
                <NavLink to={`/listings/${props.land.id}`} exact className="property-link">View property <span>→</span></NavLink>
            </Card.Body>
        </Card>
    )
}

const mdp = (dispatch)=>{

    return {removeFave: (id)=> dispatch(removeFave(id))}
}

export default connect(null,mdp)(FavoriteCard)
