const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const testRecipe = {
  title: "first",
  level: "Easy Peasy",
  ingredients: ["milk"],
  cuisine: "French",
  dishType: "drink",
  duration: 1,
  creator: "me"
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const recipes = await Recipe.insertMany(data)
    recipes.forEach(x => console.log(x.title))
    await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},  {duration: 100}, {new: true})
    console.log("update success:")
    await Recipe.deleteOne({title: "Carrot Cake"})
    console.log("delete success!")
    mongoose.disconnect()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

