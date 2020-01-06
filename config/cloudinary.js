const {config, uploader} = require('cloudinary');
require('dotenv').config();

const cloudConfig = () => config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET
})

module.exports = {
    cloudConfig,
    uploader
}