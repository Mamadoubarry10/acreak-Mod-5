import React from 'react'
import { connect } from 'react-redux'
import {fetchToFavorites} from '../redux/action'



const LandShow = (props)=>{
    return(
        <main className="property-detail-page">
            <div className="property-gallery">
                <img className="property-gallery-main" src={props.product.img1} alt={`${props.product.location} property view`}/>
                <img src={props.product.img2} alt={`${props.product.location} landscape`}/>
                <img src={props.product.img3} alt={`${props.product.location} acreage`}/>
            </div>
            <div className="property-detail-layout">
                <section className="property-detail-copy">
                    <span className="page-eyebrow">Land for sale</span>
                    <h1>{props.product.location}</h1>
                    <div className="property-metrics">
                        <div><span>Price</span><strong>${props.product.price}</strong></div>
                        <div><span>Property size</span><strong>{props.product.acres} acres</strong></div>
                    </div>
                    <div className="property-description">
                        <h2>About this land</h2>
                        <p>{props.product.description}</p>
                    </div>
                </section>
                <aside className="owner-card">
                    <span className="page-eyebrow">Property owner</span>
                    <h2>{props.product.user.name}</h2>
                    <p>Interested in this property? Reach out directly to learn more.</p>
                    {props.product.user.phone && <a href={`tel:${props.product.user.phone}`}>{props.product.user.phone}</a>}
                    {props.product.user.email && <a href={`mailto:${props.product.user.email}`}>{props.product.user.email}</a>}
                    <button type="button" className="theme-button theme-button-primary theme-button-block" onClick={()=>props.addToFavorites(props.user.id, props.product)}>Save to favorites</button>
                </aside>
            </div>
        </main>
    )

}

const msp = (state)=>{

    return { user: state.user}
}


const mdp = (dispatch)=>{

    return {addToFavorites: (user, listing)=> dispatch(fetchToFavorites(user, listing))}
}



export default connect(msp, mdp)(LandShow)
