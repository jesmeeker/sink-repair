import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests , fetchPlumbers, fetchCompletions } from "./dataAccess.js"



const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        // .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()

// render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

// Now update your main module again to fetch the completions after requests and plumbers have been fetched.


// const mainContainer = document.querySelector("#container")

// const render = () => {
//     mainContainer.innerHTML = SinkRepair()
// }

// render()

