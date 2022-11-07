//You will need to store that external data in your application state when you fetch it. Create a property named requests in your application state object. Its initial value must be an empty array.

const applicationState = {
    requests: []

}

//HTTP GET Request with Fetch

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

const mainContainer = document.querySelector("#container")


export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
})
}

//When you use the DELETE method on an HTTP request, you must identify a single resource.
//You can't delete an entire collection with a single HTTP request.
//Therefore, the function whose responsiblity it is to initiate the fetch request for DELETE must have the primary key sent to it as an argument.
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

// Create two functions in your dataAccess module.
// This will perform the POST request to save the completion object to the API

export const saveCompletion = (completionObject) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionObject)
    } 
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
})
}

    


// - This will retrieve all completion objects from the API

export const fetchCompletions = () => {
    fetch(`${API}/completions`)
    .then(response => response.json())
    .then((data) => {
        applicationState.plumbers = data
    }
    )
    // mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
}



// Define and export a function named getRequests that returns a copy of the requests state.

export const getRequests = () => {
    return applicationState.requests.map(requests => ({...requests}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumbers => ({...plumbers}))
}

// export const getCompletions = () => {
//     return applicationState.completions.map(completions => ({...completions}))
// }