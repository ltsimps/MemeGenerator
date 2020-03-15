import React, { Component } from "react";
//import ReactDom from "react-dom";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: "null"
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
        console.log(memes);
      });
  }
  onChangeHandler(event) {
    console.log("changing the text");
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  onSubmitHandler(event) {
    const max = this.state.allMemeImgs.length;
    const randomIndex = Math.floor(Math.random(max) * Math.floor(max));
    console.log(randomIndex);
    const randomImageUrl = this.state.allMemeImgs[randomIndex].url;
    this.setState({ randomImg: randomImageUrl });
    event.preventDefault();
  }
  render() {
    return (
      <div>
        Meme
        <form className="meme-form" onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            name="topText"
            placeholder="input top text"
            value={this.state.topText}
            onChange={this.onChangeHandler}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="input bottom text"
            value={this.state.bottomText}
            onChange={this.onChangeHandler}
          />

          <button> Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="funny" />
          <h2 className="top"> {this.state.topText} </h2>
          <h2 className="bottom"> {this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
