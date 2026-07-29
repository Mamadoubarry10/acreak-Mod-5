import React from 'react'
import {connect} from 'react-redux'
import {fetchPropeties} from './redux/action'
import './App.css';
import Login from './component/login'
import List from './component/list'
import Navbar from './component/navbar'
import ListingConatiner from './container/listingContainer'
import FavoritesContainer from './container/favoritesContainer'
import ProfileContainer from './container/profileContainer'
import {Route, Switch} from "react-router-dom";
import Landshow from './component/landshow'
import Homepage from './component/home'

import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = React.lazy(() => import('./component/signup'))



// import 'bulma/css/bulma.css'





class App extends React.Component{

  componentDidMount(){
   this.props.fetchProperties()

  }
  
  render(){


    return (
      <div className="App">
        
       {this.props.user? <><Navbar/></>: null}
       
{this.props.user ?
  <Switch>
       <Route path="/listings/:id"  render={(routerProps) => {
                let id = parseInt(routerProps.match.params.id)
                let product

                if (this.props.properties.length > 0) {
                  product = this.props.properties.find(el => parseInt(el.id) === id
                  )
                
                }
                
                return (
                  <>
                  {console.log('hereeeee', product)}
                    {this.props.properties.length ? <Landshow product={product.attributes}  />
                      : <h1>Loading</h1>}  
                      
                  </>)
              }} />
       
         <Route path= "/listings" render={()=><ListingConatiner/>} />
       <Route path= "/list" render={()=><List/>} />
       <Route path= "/favorites" render={()=><FavoritesContainer/>} />
       <Route path= "/profile" render={()=><ProfileContainer/>} />
       <Route path= "/" render={()=> <Homepage/>} />
       </Switch>
       :<Switch>
       <><Route path= "/signup" exact render={()=>
          <React.Suspense fallback={<div className="route-loading">Loading signup…</div>}>
            <Signup/>
          </React.Suspense>
        } />
        <Route path= "/" exact render={()=><Login/>} />
       </> </Switch>
       
       
    

      }

       
      {console.log("ghh", this.props.user)}
      </div>
    );
  }

}

function mdp(dispatch){
return{fetchProperties: () => dispatch(fetchPropeties())}
}

const msp = (state)=>{

  return { properties: state.properties, user: state.user}
}

export default connect(msp, mdp)(App);
