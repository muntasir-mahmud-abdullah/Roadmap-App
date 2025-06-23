const Service = require("../models/services-model")
const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            //handle if no services were found
            res.status(404).json({ msg: "No services were found" })
        }


        res.status(200).json({ msg: response })
    } catch (error) {
        console.log(`services: ${error}`)
    }
}
module.exports = services;