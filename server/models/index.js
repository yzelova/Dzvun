//Инициализиране на помощни модели, допълващи функционалността на ORM моделите
module.exports = (ormsModels) => {
    const User = require('./user')(ormsModels);
    return {
        User
    }
}