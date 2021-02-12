const weatherForm = document.querySelector("form")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const search = document.querySelector("input")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        
        if (data.error) {
            messageOne.textContent = data.error
        }
        
        else {
            response.render(
                messageOne.textContent = data.location,
                messageTwo.textContent = data.forecast
            )
            
        }
    })
})
    

    console.log(location)
 })