import M from 'materialize-css'
import history from './history'
export const url = 'https://actual-sales-api.gustavotorregrosa.com/api/'



const getJwt = context => context.getJwt()

const updateUserData = (context, userData) => new Promise(success => {
    localStorage.setItem("user", userData)
    let userObj = {
        isLogged: userData.user.email ? true : false,
        userName: userData.user.name ? userData.user.name : '',
        userEmail: userData.user.email ? userData.user.email : '',
        jwt: userData.jwt ? userData.jwt : ''

    }
    context.changeUserState(userObj)
    setTimeout(() => success(), 100)
})
   

const generateRequest = (route, context, obj = null) => {
    let method = obj ? obj.method : "get"

    let h = new Headers()
    h.set("jwt", getJwt(context))
   
    let objRequest = {
        method,
        headers: h,
    }

    if (method != "get") {
        objRequest.body = obj.body
    }

    return new Request(url + route, objRequest)
}



const jwtFetchUnit = requestUnit => {
    return new Promise((success, reject) => {
        fetch(requestUnit).then(r => {
            let status = r.status
            success(r.json().then(content => {
                return {
                    status,
                    content
                }
            }))
        })
    })
}

const assuredFetch = (route, context, options) => new Promise((success, reject) => {
    jwtFetchUnit(generateRequest(route, context, options)).then(resp => success(resp))
})


export const jwtFetch = (route, context, options = null) => {
    return new Promise((success, reject) => {
        assuredFetch(route, context, options).then(r => {
            let status = r.status
            if (status == 203) {
                let objUser = r.content
                localStorage.setItem('user', JSON.stringify(objUser))
                updateUserData(context, objUser).then(() => generateRequest(route, context, options))
                .then(r => new Promise(success => {
                    setTimeout(() => {
                        success(r)
                    }, 2000)
                }))
                .then(r => jwtFetchUnit(r)).then(r => r.content).then(r => success(r))
            } else if (status == 301) {
                M.toast({ html: "You will be redirected to a new login" })
                localStorage.removeItem('user')
                context.changeUserState({
                    isLogged: false,
                    userName: '',
                    userEmail: '',
                    jwt: ''
                })
                history.push('/login')
            }
            else if (status < 200 || status > 299) {
                let content = r.content
                reject(content)
            }
            else {
                success(r.content)
            }

        })
    })
}