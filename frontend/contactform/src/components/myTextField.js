import React from "react";
import TextField from "@material-ui/core/TextField";

class MyTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      errorText: "",
    };
    this.updateField = this.updateField.bind(this);
    this.isRequiredLabel = this.isRequiredLabel.bind(this);
  }

  isTextValid = (text, pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(text) && text !== "";
  };

  isRequired = (val) => {
    if (val === "") {
      this.setState({ errorText: "Requried" });
    }
  };

  updateField = (id, val) => {
    let localContactInformation = this.props.contactInformation;
    localContactInformation[id] = val;
    this.setState({ value: val });
    this.props.updateContactInformation(localContactInformation);
    // Text validation using RegEx
    if (this.isTextValid(val, this.props.pattern)) {
      this.setState({ errorText: "" });
    } else {
      this.setState({ errorText: "Invalid enrty" });
    }
  };

  isRequiredLabel = (label) => {
    return label + "*";
  };

  render() {
    return (
      <TextField
        error={this.state.errorText === "" ? false : true}
        id={this.props.id}
        label={this.isRequiredLabel(this.props.label)}
        value={this.state.value}
        multiline={this.props.id === "message"}
        helperText={this.state.errorText}
        onChange={(event) =>
          this.updateField(this.props.id, event.target.value)
        }
        onBlur={(event) => this.isRequired(event.target.value)}
      />
    );
  }
}
export default MyTextField;
