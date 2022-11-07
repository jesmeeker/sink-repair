import { getRequests, getPlumbers, saveCompletion  } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `
    return html
        }

const convertRequestToListElement = (requestObject) => {
    const plumbers = getPlumbers()
    let html = `<li class="requests">
            <div class="request__description">${requestObject.description}</div>
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
    return html
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            
            
            var d = new Date();
            var date= d.getDate()+"-"
                        +d.getMonth()+1+"-"
                        +d.getFullYear()+" "
            
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: (parseInt(requestId)),
                plumberId: (parseInt(plumberId)),
                date_created: date
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