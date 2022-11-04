import { getRequests } from "./dataAccess.js"

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
    let html = `<li>${requestObject.description}</li>`
    return html
    }