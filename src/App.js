import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


import Form from "./components/Form";
import Recipes from "./components/Recipes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
  }
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    //prevents default behaviour that is web page going to refresh
    e.preventDefault();
    const apiKey = process.env.REACT_APP_API_KEY

    const apiCall = await axios(`https://www.food2fork.com/api/search?key=${apiKey}&q=${recipeName}&count=20`)
    this.setState({ recipes: apiCall.data.recipes })
  }
  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json)
    this.setState({ recipes })
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes)
    localStorage.setItem("recipes", recipes);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }

}

export default App;
