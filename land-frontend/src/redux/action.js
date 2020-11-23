export function fetchPropeties(){
    return function(dispatch){

        fetch('http://localhost:3000/api/v1/listings/')
        .then(resp =>resp.json())
        .then(properties => dispatch({type: "FETCH_PROPERTIES", payload:properties }))

    };
}


export function fetchSignUp(newUser){
    return function(dispatch){
        fetch('http://localhost:3000/api/v1/users', {
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
            .then(user => {dispatch({type: "ADD_USER",  payload: user})
            console.log("loook", user.jwt)
            localStorage.setItem("token", user.jwt)
            localStorage.setItem("user", "user")
        })

    };
}

export function fetchToFavorites(current_user, listing_id){
console.log(current_user, listing_id)
    return function(dispatch){
        fetch('http://localhost:3000/api/v1/favorites', {
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
            .then(favorite => {dispatch({type: "ADD_FAVORITE",  payload: favorite.data.attributes.listing})
            console.log("hi" ,favorite.data)}
          
        
            
            )

    };
}

export const userLoginFetch = user => {
    return function (dispatch){
      return fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(user => {dispatch({type: "ADD_USER",  payload: user.user.data.attributes})
        dispatch({type: "PAST_FAVORITE",  payload: user.user.data.attributes.favorites})
        console.log("loook", user.jwt)
        localStorage.setItem("token", user.jwt)
        localStorage.setItem("user", "user")
    })

};
}
