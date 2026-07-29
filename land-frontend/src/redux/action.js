const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/v1'

export function fetchPropeties(){
    return function(dispatch){

        fetch(`${API_BASE_URL}/listings/`)
        .then(resp =>resp.json())
        .then(properties => dispatch({type: "FETCH_PROPERTIES", payload:properties.data },   console.log("here", properties))
        )

    };
}


export function postPropeties(obj, User){
    console.log('hereee', obj)
    return function(dispatch){

        fetch(`${API_BASE_URL}/listings/` , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({img1:obj.image1, img2:obj.image2, img3:obj.image3, price:obj.price, acres:obj.acres, location:obj.location, description:obj.description, user_id:User})
        })
            .then(r => r.json())
            .then(property => {dispatch({type: "ADD_PROPERTY",  payload: property.data})
            console.log("LOOK", property)
        })

    }
}
    





export function fetchSignUp(newUser){
  console.log(newUser, 'objjjjj')
    return function(dispatch){
        fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify(
                {user:
                    {name:newUser.name, username:newUser.username, email:newUser.email, password:newUser.password, userImg:newUser.userImg, phone:newUser.phone, location:newUser.location}})
          })
            .then(r => r.json())
            .then(user => {dispatch({type: "ADD_USER",  payload: user.user.data.attributes})
            console.log("loook", user)
            localStorage.setItem("token", user.jwt)
            localStorage.setItem("user", "user")
        })

    };
}

export function fetchToFavorites(current_user, listing_id){
console.log(current_user, listing_id)
    return function(dispatch){
        fetch(`${API_BASE_URL}/favorites`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify(
                { user_id: current_user, listing_id: listing_id.id }
            )
          })
            .then(r => r.json())
            .then(favorite => {dispatch({type: "ADD_FAVORITE",  payload: [favorite.data.attributes.listing, parseInt(favorite.data.id)]})
            console.log("hi" ,favorite.data.id)}
          
        
            
            )

    };
}

export const removeFave=(item)=>{
   
    return function(dispatch){
        fetch(`${API_BASE_URL}/favorites/${item}`, {
            method: "DELETE"
          })
            .then(res => res.json())
            .then(data => {dispatch({type: "DELETE_FAVORITE", payload: data}, console.log('okkkkkkkkk',data.id))
       
        })
                
              // console.log("Looking for you", parseInt(data.data.id)))
              

    }
  
}

export const userLoginFetch = user => {
    return function (dispatch){
      return fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(user => {dispatch({type: "ADD_USER",  payload: user.user.data.attributes})
        dispatch({type: "PAST_FAVORITE",  payload: user.user.data.attributes.favorites_listings})
        console.log("loook", user.jwt)
        localStorage.setItem("token", user.jwt)
        localStorage.setItem("user", "user")
    }).catch(res =>{dispatch({type:"ERROR", payload: res})})

};
}

export const listAsSold = id => {
  return function (dispatch){
    return fetch(`${API_BASE_URL}/listings/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({price: "Sold"})
    })
      .then(resp => resp.json())
      .then(prop =>{dispatch({type:"UPDATE_PROPERTY", payload: prop.data})})

};
}

