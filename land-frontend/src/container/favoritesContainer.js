import React from 'react'
import { connect } from 'react-redux'
import FavoritesCard from '../component/favoritesCard'
import{CardColumns} from 'react-bootstrap'




 class FavoritesContainer extends React.Component{

    

     renderListing = () => { 
        if (this.props.favorite.length > 0)
         return this.props.favorite.map(land => <FavoritesCard   land={land[0]} favoriteId={land[1]}/>)
         else 
         return null
        }


     render(){
        
        return (
      
        <main className="collection-page">
            <header className="page-header">
                <span className="page-eyebrow">Saved for later</span>
                <h1>Your favorite land.</h1>
                <p>Keep the properties you are considering together in one place.</p>
            </header>
            {this.props.favorite.length ? (
                <CardColumns className="property-grid">{this.renderListing()}</CardColumns>
            ) : (
                <div className="profile-empty-state"><span className="profile-empty-icon" aria-hidden="true">♡</span><h3>No favorites yet</h3><p>Save a listing and it will appear here.</p></div>
            )}
        </main>

       
     )

    }
   
}
const msp = (state)=>{

return { favorite: state.favorites, favorite_id: state.favorite_id}
}


export default connect(msp)(FavoritesContainer)
