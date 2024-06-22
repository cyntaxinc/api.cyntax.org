require("dotenv").config();
const username = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PW;
module.exports = {
    url: `mongodb+srv://${username}:${password}@cluster0.5uhj0.mongodb.net/?retryWrites=true&w=majority`
};