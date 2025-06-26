// const Service = require("../models/services-model")
// const Upvote = require("../models/upvote-model")
// const services = async (req, res) => {
//     try {
//         const response = await Service.find();
//         if (!response) {
//             //handle if no services were found
//             res.status(404).json({ msg: "No services were found" })
//         }


//         res.status(200).json({ msg: response })
//     } catch (error) {
//         console.log(`services: ${error}`)
//     }
// }

// //record new upvotes logic

// const createUpvote = async (req, res) => {
//     const id = req.params.id;
//     const userId = req.user.userId;

//     try {
//         const existingUpvote = await Upvote.findOne({ userId, itemId: id });

//         if (existingUpvote) {
//             return res.status(400).json({ message: 'You have already upvoted this item' });
//         }
//         const upvote = await Upvote.create({ userId, itemId: id });

//         await Service.findByIdAndUpdate(id, {
//             $inc: { upvotesCount: 1 }
//         });
//         res.status(200).json({ message: 'Upvote recorded' });

//     } catch (error) {
//         res.status(500).json({ message: 'Error upvoting', error: error.message });
//     }
// }

// const getUpvote = async (req, res) => {
//     const id = req.params.id;
//     const userId = req.user.userId;

//     try {
//         const upvote = await Upvote.findOne({ userId, itemId: id });
//         res.json({ hasUpvoted: !!upvote });
//     } catch (error) {
//         res.status(500).json({ message: "Error checking upvote status", error: error.message })
//     }
// }

// module.exports = { services, createUpvote, getUpvote };