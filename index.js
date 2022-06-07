const { PORT } = require('./config')
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", function(req, res) {
    res.status(200).send("Hello World");
});

app.post("/nj", async function(req, res) {
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;

    getNJInfo(address, city, state, zip, function(response) {
        res.json(response);
    });
});

getNJInfo = function(address, city, state, zip, callback) {
    const url = `https://njparcels.com/search/address/?s=${address}&s_co=%23%23`
    axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        
        $("table.table tr", html).each(function(i, ele) {
            var strings = []
            var county = "";
            var municipality = ""
            var street = ""
            var cityStateZip = ""
            $(".listing_sub", ele).each(function(i, ele) {
                console.log(`${i} ${$(ele).html()}`)
                if (i == 0) {
                    //County > Municipality (broken by <br>)
                    strings = $(ele).html().split("<br>")
                    county = strings[1]
                    municipality = strings[0]                    

                } else if (i == 1) {
                    //Address (broken by <br>)
                    strings = $(ele).html().split("<br>")
                    street = strings[0]
                    cityStateZip = strings[1]
                }
            })

            if (cityStateZip.toLowerCase().includes(city.toLowerCase())) {
                callback({
                    "County": county,
                    "Municipality": municipality,
                    "Street": street,
                    "CityStateZip": cityStateZip
                })
                return;
            }
        })
    }) 
}

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));