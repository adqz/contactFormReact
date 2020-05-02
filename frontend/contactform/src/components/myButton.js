import React from "react";
import { Button } from "@material-ui/core";

class MyButton extends React.Component {
  constructor(props) {
    super(props);
  }
  myButtonPress = (event) => {
    this.props.onButtonPress(event, this.props.id);
  };
  render() {
    return (
      <Button
        id={this.props.id}
        onClick={(event) => this.myButtonPress(event, this.props.id)}
        color="primary"
        style={{ backgroundColor: "white" }}
      >
        {this.props.label}
      </Button>
    );
  }
}
export default MyButton;
