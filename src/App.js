import * as React from "react";
import axios from "axios";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Stepper } from "@progress/kendo-react-layout";
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
} from "@progress/kendo-react-listview";
import { AccountDetails } from "./AccountDetail";
import ChooseService from "./ChooseService";
import SelectLocation from "./SelectLocation";
import "bootstrap/dist/css/bootstrap.min.css";
import "@progress/kendo-theme-default/dist/all.css";
// import "@progress/kendo-theme-material/dist/all.css";

class App extends React.Component {
  state = {
    step: 0,
    service: "",
    formState: {},
    busy: false,
    personalDetailsState: {
      showRegisterationForm: false,
      checkingEmail: false,
      formValues: {
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        cellPhone: "",
        dateOfBirth: new Date(Date.now()),
        homePhone: "",
        city: "",
        gender: "Male",
        preferredLanguage: "English",
        state: "AK",
        zipCode: 0,
      },
    },
    locationDetailsState: [{
      text: "BrickAndMortar",
      id: 0,
      unselectableItem: true,
      items: [
        {
          text: "Carrie Carda",
          id: 330874,
        },
        {
          text: "Josh Harrellson",
          id: 331665,
        },
        {
          text: "Maggy Toporkiewicz",
          id: 331699,
        }
      ],
    },
    {
      text: "Concierge",
      id: 1,
      unselectableItem: true,
      items: [
        {
          text: "Monika Szmit",
          id: 331700,
        }
      ],
    },
    {
      text: "CardoneEvent",
      id: 2,
      unselectableItem: true,
      items: [
        {
          text: "360",
          id: 333595,
        }
      ],
    },
  ],
    patient: {},
    steps: [
      {
        label: "Choose Service",
        icon: "k-i-cart",
        isValid: undefined,
      },
      {
        label: "Personal Details",
        icon: "k-i-user",
        isValid: undefined,
      },
      {
        label: "Schedule",
        icon: "k-i-calendar",
        isValid: undefined,
      },
    ],
  };
  lastStepIndex = this.state.steps.length - 1;
  isLastStep = this.lastStepIndex === this.state.step;
  isPreviousStepsValid =
    this.state.steps
      .slice(0, this.state.step)
      .findIndex((currentStep) => currentStep.isValid === false) === -1;
  onStepSubmit = async (event) => {
    let isValid = false;

    switch (this.state.step) {
      case 0:
        isValid = true;
        break;
      case 1:
        this.setState({...this.state, busy:true});
        console.log("Case one is executing");
        let { showRegisterationForm } = this.state.personalDetailsState;
        let { patient } = this.state;
        let { formValues } = this.state.personalDetailsState;
        //if showRegisterationForm is false and there is a valid email in the formvalues please retrieve that patient
        //If no patient is available we look to the form to create the patient
        if (!patient.id) {
          if (formValues.email && !showRegisterationForm) {
            this.handleCheckPatient(formValues.email);
            this.setState({...this.state, busy:false});

            return;
          }
          ///Absurd validaity until we use proper react forms
          if (
            formValues.email === "" ||
            formValues.firstName === "" ||
            formValues.lastName === "" ||
            formValues.gender === "" ||
            formValues.cellPhone === "" ||
            formValues.city === "" ||
            formValues.state === "" ||
            formValues.dateOfBirth === "" ||
            formValues.homePhone === "" ||
            formValues.preferredLanguage === "" ||
            formValues.zipCode === 0
          ) {
            console.log("Form not valid");
            this.setState({...this.state, busy:false});
            return;
          }
          let patient = await this.createPatient(formValues);
          if (patient) {
            this.setState({ ...this.state, patient });
            isValid = true;
          }
        } else {
          isValid = true;
        }
        console.log("Location details is executing");
        let officeDetails = this.state.locationDetailsState;
        this.handleOfficeCheck(officeDetails);
        this.setState({...this.state, busy:false});
        break;
      case 2:
        this.setState({...this.state, busy:true});
        //console.log("Case two is executing");
        //let officeDetails = this.state.locationDetailsState;
        //this.handleOfficeCheck(officeDetails);
        isValid = true;
        break;

      default:
        console.log("Step not found");
        break;
    }
    //Now its not a part of form so theses needs to be removeed and custom validation needs to be added
    // const { isValid, values } = event;
    //check current step is 1 then we need to check if we have a valid patient if not we need to create one
    const currentSteps = this.state.steps.map((currentStep, index) => ({
      ...currentStep,
      isValid: index === this.state.step ? isValid : currentStep.isValid,
    }));
    this.setState({
      steps: currentSteps,
      step: Math.min(this.state.step + 1, this.lastStepIndex),
      // formState: values,
    });

    if (
      this.lastStepIndex === this.state.step &&
      this.isPreviousStepsValid &&
      isValid
    ) {
      // alert(JSON.stringify(values));
    }
  };
  onPrevClick = (event) => {
    event.preventDefault();
    this.setState({
      step: Math.max(this.state.step - 1, 0),
    });
  };
  createPatient = async (patientData) => {
    try {
      let date = new Date(patientData.dateOfBirth);
      patientData.dateOfBirth = date.toISOString();
      let payload = JSON.stringify(patientData);
      console.log(payload);
      const response = await axios.post(
        "https://tenxhealth-api-apim.azure-api.net/patients",

        payload,
        {
          withCredentials: false,
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      console.log("Created Patient ", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  findPatientByEmail = async (email) => {
    if (email.length === 0) return;
    //This api return an array of patients with the email should have returned one patient
    const response = await axios.get(
      `https://tenxhealth-api-apim.azure-api.net/patients/find/${email}`
    );
    const patients = response.data;
    if (patients.length === 0) {
      this.setState({
        personalDetailsState: {
          ...this.state.personalDetailsState,
          showRegisterationForm: true,
          patient: {},
        },
      });
      return;
    }
    ///This is wrong position here but will do for now.
    this.setState({ ...this.state, patient: patients[0] });
    //we can trigger next here to go to step 3
    this.onStepSubmit({});
    //we found the patient
    return patients[0];
  };
  handleCheckPatient = async (event) => {
    this.setState({
      personalDetailsState: {
        ...this.state.personalDetailsState,
        checkingEmail: true,
        showRegisterationForm: false,
        patient: {},
      },
    });
    let email = this.state.personalDetailsState.formValues.email;
    if (email.length > 0) await this.findPatientByEmail(email);
    this.setState({
      personalDetailsState: {
        ...this.state.personalDetailsState,
        checkingEmail: false,
      },
    });
  };

  handleOfficeCheck = async (event) => {
    this.setState({
      locationDetailsState: {
        ...this.state.locationDetailsState
      },
    });
    fetch('https://tenxhealth-api-apim.azure-api.net/offices', { 
    headers: {
    'Accept': 'application/json',
    'Path': '/',
    }
    })
    .then(response => response.json())
    .then(json => console.log(json));
  };
  // for this to make sure the element id name is same as data required in the form
  handleFormChange = (event) => {
    //check if the field is valid

    let isValid = event.target.props.valid ?? event.target.validity.valid;
    if (!isValid) {
      console.log(
        "Value for field with ID : ",
        event.target.props.id,
        "  is not valid"
      );
      return;
    }
    let personalDetailsState = this.state.personalDetailsState;
    personalDetailsState.formValues = {
      ...personalDetailsState.formValues,
      [event.target.props.id]: event.target.value,
    };
    this.setState({ ...this.state, personalDetailsState });
  };
  render() {
    const stepPages = [
      <ChooseService />,
      <AccountDetails
        detailsState={this.state.personalDetailsState}
        onChange={this.handleFormChange}
        onCheckPatient={this.handleCheckPatient}
      />,
      <SelectLocation
        locationState={this.state.locationDetailsState} 
        onCheckOffice={this.handleOfficeCheck}
      />,
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stepper value={this.state.step} items={this.state.steps} />{" "}
        <div
          style={{
            alignSelf: "center",

            margin: "0 auto",
            // width: "600px",
            width: "80%",
            // minWidth: "60%",
          }}
        >
          {stepPages[this.state.step]}{" "}
          <span
            style={{
              marginTop: "40px",
            }}
            className={"k-form-separator"}
          />{" "}
          <div
            style={{
              justifyContent: "space-between",
              alignContent: "center",
            }}
            className={
              "k-form-buttons k-button k-button-md k-rounded-md k-button-solid k-button-solid-bases-end"
            }
          >
            <span
              style={{
                alignSelf: "center",
              }}
            >
              Step {this.state.step + 1} of 3{" "}
            </span>{" "}
            <div>
              {" "}
              {this.state.step !== 0 ? (
                <Button
                  style={{
                    marginRight: "16px",
                  }}
                  onClick={this.onPrevClick}
                >
                  Previous{" "}
                </Button>
              ) : undefined}{" "}
              <Button
                themeColor={"primary"}
                disabled={this.state.busy}
                onClick={this.onStepSubmit}
              >
                {" "}
                {this.isLastStep ? "Submit" : "Next"}{" "}
              </Button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default App;
