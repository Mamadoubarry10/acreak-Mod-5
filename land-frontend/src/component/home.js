import React from 'react'
import image from '../homeImage/home..jpg'
import { NavLink } from 'react-router-dom'




const HomePage = () =>{
    return(
        <main className="home-page">
            <div className="home-hero">
                <img className="home-hero-image" src={image} alt="Open green acreage"/>
                <div className="home-hero-overlay"></div>
                <div className="home-hero-content">
                    <span className="page-eyebrow page-eyebrow-light">Find your ground</span>
                    <h1>Land with room<br/>for what comes next.</h1>
                    <p>Browse acreage, save the properties you love, and connect directly with landowners.</p>
                    <div className="home-actions">
                        <NavLink to="/listings" className="theme-button theme-button-primary">Explore listings</NavLink>
                        <NavLink to="/list" className="theme-button theme-button-ghost">List your land</NavLink>
                    </div>
                </div>
            </div>
            <section className="home-values">
                <div><strong>Direct</strong><span>Connect with property owners</span></div>
                <div><strong>Simple</strong><span>Discover land without the clutter</span></div>
                <div><strong>Personal</strong><span>Save and manage your favorites</span></div>
            </section>
        </main>
    )
}

export default HomePage
