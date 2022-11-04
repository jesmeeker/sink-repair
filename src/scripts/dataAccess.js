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

// Define and export a function named getRequests that returns a copy of the requests state.

export const getRequests = () => {
    return applicationState.requests.map(requests => ({...requests}))
}