module.exports = (ormsModels) => {
    const User = require('./user')(ormsModels);
    return {
        User
    }
}