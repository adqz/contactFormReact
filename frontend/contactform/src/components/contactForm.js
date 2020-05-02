import React, { Component } from "react";
import axios from "axios";
import MyTextField from "./myTextField";
import MyButton from "./myButton";
import Google from "./google";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Alert, AlertTitle } from "@material-ui/lab";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactInformation: {
        name: "",
        email: "",
        message: "",
      },
      apiResponse: {
        staus: null,
        data: null,
      },
      stepIndex: 1,
      error: [],
    };
    // Binding event handlers
    this.updateContactInformation = this.updateContactInformation.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.pageLevelValidation = this.pageLevelValidation.bind(this);
    this.onGoogleLogin = this.onGoogleLogin.bind(this);
    // RegEx patterns to validate fields
    this.regExPatterns = {
      name: /^[a-zA-Z ]{2,30}$/,
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "",
    };
    // URL to prepend to POST request. This will temporarily bypass CORS issue.
    this.urlByPassCors = "https://cors-anywhere.herokuapp.com/";
  }

  updateContactInformation = (updatedContactInformation) => {
    this.setState({ contactInformation: updatedContactInformation });
  };

  updateApiResponse = (response) => {
    if (response.status === 200) {
      this.setState({
        contactInformation: {
          name: "",
          email: "",
          message: "",
        },
        stepIndex: 3,
        error: [],
      });
    } else if (response.status === 500 && response.status === 400) {
      let ApiError = [];
      ApiError.push(response.data);
      this.setState({ error: ApiError });
    } else if (response.status === 404) {
      let ApiError = [];
      ApiError.push(response.data);
      this.setState({ error: ApiError });
    }
  };

  onButtonPress(event, id) {
    event.preventDefault();
    let data = this.state.contactInformation;
    let errors = this.pageLevelValidation(data);
    let hasError = false;
    for (let errorType in errors) {
      if (errors[errorType].length > 0) {
        hasError = true;
      }
    }

    if (id === "submit") {
      if (!hasError) {
        axios({
          url:
            this.urlByPassCors +
            "https://nwszrqrum8.execute-api.us-west-2.amazonaws.com/test2_cors/email",
          host: "https://nwszrqrum8.execute-api.us-west-2.amazonaws.com/",
          method: "POST",
          path: "/test2_cors/email",
          data: JSON.stringify(data),
        })
          .then((response) => {
            this.updateApiResponse(response);
          })
          .catch((error) => {
            let ApiError = [];
            ApiError.push(error);
            this.setState({ error: ApiError });
          });
      } else {
        let errorMessages = [];
        for (let errorType in errors) {
          errors[errorType].map((val) => {
            if (errorType === "required") {
              errorMessages.push(val.toUpperCase() + " field is a mandatory.");
            } else if (errorType === "regex") {
              errorMessages.push(val.toUpperCase() + " field is invalid.");
            }
          });
        }
        this.setState({ error: errorMessages });
      }
    } else if (id === "submitAnotherOne") {
      this.setState({
        contactInformation: {
          name: "",
          email: "",
          message: "",
        },
        stepIndex: 2,
      });
    }
  }

  pageLevelValidation = (data) => {
    let errors = {
      required: [],
      regex: [],
    };
    for (let fieldName in data) {
      const regex = new RegExp(this.regExPatterns[fieldName]);

      if (data[fieldName] === "") {
        errors.required.push(fieldName);
      } else if (!regex.test(data[fieldName])) {
        errors.regex.push(fieldName);
      }
    }
    return errors;
  };

  onGoogleLogin = (event, status) => {
    status === "success" ? this.setState({ stepIndex: 2 }) : this.setState({ stepIndex: 1 })
  }

  render() {
    if (this.state.stepIndex === 1) {
      return (
        <div>
          <Typography variant="h1" component="h2" gutterBottom align="center">
            CONTACT FORM
          </Typography>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "50vh" }}
          >
            <Typography variant="h3" component="h4" gutterBottom align="center">
              Log In
            </Typography>
            <Card
              alignItems="center"
              style={{ backgroundColor: "lightblue", padding: "20px" }}
            >
              <div>
                <Google
                  contactInformation={this.state.contactInformation}
                  updateContactInformation={this.updateContactInformation}
                  onGoogleLogin={this.onGoogleLogin}
                />
              </div>
            </Card>
          </Grid>
        </div>
      );
    } else if (this.state.stepIndex === 2) {
      return (
        <div>
          <Typography variant="h1" component="h2" gutterBottom align="center">
            CONTACT FORM
          </Typography>
          <div>
            {this.state.error.map((eachErrorMessage) => {
              return (
                <div>
                  <Alert severity="error" disable={true}>
                    <AlertTitle>
                      <strong>{eachErrorMessage}</strong>
                    </AlertTitle>
                  </Alert>
                </div>
              );
            })}
          </div>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "50vh" }}
          >
            <Typography variant="h3" component="h4" gutterBottom align="center">
              Contact Form Information
            </Typography>
            <Card
              alignItems="center"
              style={{ backgroundColor: "lightblue", padding: "20px" }}
            >
              <div>
                <div>
                  <MyTextField
                    id="name"
                    label="Name"
                    contactInformation={this.state.contactInformation}
                    updateContactInformation={this.updateContactInformation}
                    pattern={this.regExPatterns.name}
                    required={true}
                  />
                </div>
                <br></br>
                <div>
                  <MyTextField
                    id="email"
                    label="Email"
                    contactInformation={this.state.contactInformation}
                    updateContactInformation={this.updateContactInformation}
                    pattern={this.regExPatterns.email}
                    required={true}
                  />
                </div>
                <br></br>
                <div>
                  <MyTextField
                    id="message"
                    label="Message"
                    contactInformation={this.state.contactInformation}
                    updateContactInformation={this.updateContactInformation}
                    pattern={this.regExPatterns.message}
                    required={true}
                  />
                </div>
                <br></br>
                <div>
                  <MyButton
                    id="submit"
                    label="Submit"
                    onButtonPress={this.onButtonPress}
                  />
                </div>
              </div>
            </Card>
          </Grid>
        </div>
      );
    } else if (this.state.stepIndex === 3) {
      return (
        <div>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "50vh" }}
          >
            <Card
              alignItems="center"
              style={{ backgroundColor: "lightblue", padding: "20px" }}
            >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Your information for successfully saved.
                <strong> Thank you!</strong>
              </Alert>
              <br></br>
              <MyButton
                id="submitAnotherOne"
                label="Submit Another One"
                onButtonPress={this.onButtonPress}
              />
            </Card>
          </Grid>
        </div>
      );
    }
  }
}

export default ContactForm;
