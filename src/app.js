const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


//Define oaths for express
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

const app = express()

//set up handlebars engine and views location
app.set("views", viewsPath)
app.set("view engine", "hbs")
hbs.registerPartials(partialsPath)

//set up static directory
app.use(express.static(path.join(__dirname, "../public")))


//get and render pages
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Luke Nisbet",
        comp: "LUNIS"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About us",
        name: "Lunizzle",
        comp: "LUNIS"
        
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help is here",
        content: "Here's some help for all of your enquiries", 
        name: "Lunizzle",
        comp: "LUNIS"
        
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: "No address has been input",
        }) 
    } else {
            geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        
                if (error) {
                   return res.send({error})
                }
            
                forecast(latitude, longitude, (error, forecastData) => {
                    
                    if (error) {
                        return res.send({error})
                    }
                   
                    res.send({
                        location,
                        address: req.query,
                        lat: latitude,
                        long: longitude,
                        forecast: forecastData
                    })
            
            
                  })
                
            })
        }
    })

app.get("/products", (req, res) => {
    if (!req.query.search) {
       return res.send({
            errorMessage: "You must provide a search term",
        })
    }
    
    console.log(req.query.search)
    res.send({

        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        errorText: "Help article not found"
    })
})


app.get("*", (req, res) => {
        res.render("404", {
            errorText: "Page not found"
        })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})
