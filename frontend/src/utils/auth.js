// const BASE_URL = 'http://api.aroundtheusa.students.nomoreparties.site'
const BASE_URL =  "http://localhost:3001"

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`,{
        method: 'POST',
        headers: {         
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify({email, password})
    })
    .catch((err) => console.log(err))
}

export const authorize = (email , password) => {
    return fetch(`${BASE_URL}/signin`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
           
        },
        body: JSON.stringify({email, password})
    })
    .then(((response) => {
        return response.json()
    }))
    .then((data)=>{
        if(data.token){
            return data
        } else {
            return
        }
    })
    .catch(err => console.log(err))
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`,{
        method: 'GET',
        headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
        }
    })
    .then( res => {
       return res.json()
    })
    .then(data => data)
    .catch((err) => console.log(err))
}