import * as React from "react";
import { Form, FormElement, Field } from "@progress/kendo-react-form";
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

class App extends React.Component {
  stepPages;
  state1 = {
    step: 0,
    services: [],
    formState: {},
    steps: [
      {
        label: "Choose Service",
        isValid: true,
      },
      {
        label: "Personal Details",
        isValid: true,
      },
      {
        label: "Schedule",
        isValid: true,
      },
    ],
  };

  constructor() {
    super();
    this.state = this.state1;
    this.lastStepIndex = this.state.steps.length - 1;
    this.isLastStep = this.lastStepIndex === this.state.step;
    this.isPreviousStepsValid =
      this.state.steps
        .slice(0, this.state.step)
        .findIndex((currentStep) => currentStep.isValid === false) === -1;
  }
  componentDidMount() {
    fetch("/services")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ services: data });
      });
  }
  getServicesData = () => {};
  onStepSubmit = (event) => {
    const { isValid, values } = event;
    const currentSteps = this.state.steps.map((currentStep, index) => ({
      ...currentStep,
      isValid: index === this.state.step ? isValid : currentStep.isValid,
    }));
    this.setState({
      steps: currentSteps,
      step: Math.min(this.state.step + 1, this.lastStepIndex),
      formState: values,
    });

    if (
      this.lastStepIndex === this.state.step &&
      this.isPreviousStepsValid &&
      isValid
    ) {
      alert(JSON.stringify(values));
    }
  };
  onPrevClick = (event) => {
    event.preventDefault();
    this.setState({
      step: Math.max(this.state.step - 1, 0),
    });
  };

  render() {
    const stepPages = [
      <ChooseService services={this.state.services} />,
      AccountDetails,
      <SelectLocation />,
    ];
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "0.75rem",
        }}
        className="container-fluid"
      >
        <Stepper value={this.state.step} items={this.state.steps} />{" "}
        <Form
          initialValues={this.state.formState}
          onSubmitClick={this.onStepSubmit}
          render={(formRenderProps) => (
            <div
              style={{
                alignSelf: "center",
                width: "inherit",
              }}
            >
              <FormElement>
                {stepPages[this.state.step]}
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
                    Step {this.state.step + 1}
                    of 3{" "}
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
                      disabled={false}
                      onClick={formRenderProps.onSubmit}
                    >
                      {" "}
                      {this.isLastStep ? "Submit" : "Next"}{" "}
                    </Button>{" "}
                  </div>{" "}
                </div>{" "}
              </FormElement>{" "}
            </div>
          )}
        />{" "}
      </div>
    );
  }
}

export default App;
