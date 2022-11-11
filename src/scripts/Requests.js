import { getRequests, getPlumbers, saveCompletion , updateRequest , deleteRequest  } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")




const convertRequestToListElement = (requestObject) => {
    const plumbers = getPlumbers()
    let html = ``

    if (requestObject.complete === false) {
       html += `<li class="requests"><div class="request__description">${requestObject.description}</div>
        <button class="request__delete"
        id="request--${requestObject.id}">
        Delete
        </button>
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${
            plumbers.map(
                plumber => {
                    return `<option value="${requestObject.id}--${plumber.id}">${plumber.name}</option>`
                }
                ).join("")
            }
            </select>
            </li>`
        } else {
            html += `<li class="requests__completed"><div class="request__description">${requestObject.description}</div>
            <button class="request__delete"
            id="request--${requestObject.id}">
            Delete
            </button>
            </li>`

        }
        return html
    }
    

     
            
export const Requests = () => {
    const requests = getRequests()

    let html = 
        `<ul>
        ${requests.sort(function(a,b){return a.complete-b.complete}).map(convertRequestToListElement).join("")}
        </ul>`
    return html
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers"){
            const [requestId] = event.target.value.split("--")
            const requests = getRequests()
            for (const request of requests){
                if (request.id === parseInt(requestId)) {
                    request.complete = true
                    updateRequest(request)}}
                }
            })

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: (parseInt(requestId)),
                plumberId: (parseInt(plumberId)),
                date_created: new Date().toDateString()
                }

             /*
                 Invoke the function that performs the POST request
                 to the `completions` resource for your API. Send the
                 completion object as a parameter.
              */
            
             saveCompletion(completion)
        }
    }
)



mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})