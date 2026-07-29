import React from 'react'
import { connect } from 'react-redux'
import ListingCard from '../component/listingCard'
import{CardColumns} from 'react-bootstrap'



 class ListingContainer extends React.Component{

     renderListing = () => { 
         return this.props.properties.map(land => <ListingCard  key={land.id} land={land}/>)
        }


     render(){
        console.log("look", this.props.properties.find(el => el.id === '4') )
        return (
          
        <main className="collection-page">
            <header className="page-header">
                <span className="page-eyebrow">Available acreage</span>
                <h1>Find land worth building on.</h1>
                <p>Explore properties listed directly by the Acreak community.</p>
            </header>
            {this.props.properties.length ? (
                <CardColumns className="property-grid">{this.renderListing()}</CardColumns>
            ) : (
                <div className="profile-empty-state"><h3>No listings available</h3><p>Check back soon for new land.</p></div>
            )}
        </main>
     )

    }
   
}
const msp = (state)=>{

return { properties: state.properties}
}


export default connect(msp)(ListingContainer)
