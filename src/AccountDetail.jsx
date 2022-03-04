import * as React from "react";
import { Form, Field, Dropw, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

import { Loader } from "@progress/kendo-react-indicators";
import { FormInput, FormUpload, FormDatePicker } from "./form-components";
import {
  userNameValidator,
  emailValidator,
  passwordValidator,
  nameValidator,
  dobValidator,
  phoneValidator,
  addressValidator,
} from "./validators";

export class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { formValues } = this.props.detailsState;

    return (
      //TODO:Initialize the form with the formState
      //Using react forms\
      <div style={{ paddingTop: "20px" }}>
        <Form
          initialValues={formValues}
          render={(formRenderProps) => (
            <FormElement
              style={{
                maxWidth: 650,
              }}
            >
              <Field
                key={"email"}
                id={"email"}
                name={"email"}
                label={"Email"}
                type={"email"}
                iconButton={
                  <React.Fragment>
                    {this.props.detailsState.checkingEmail ? (
                      <Loader size="small" type="converging-spinner" />
                    ) : (
                      <Button
                        icon="check"
                        themeColor={"primary"}
                        fillMode="flat"
                        disabled={this.props.detailsState.checkingEmail}
                        onClick={this.props.onCheckPatient}
                      />
                    )}{" "}
                  </React.Fragment>
                }
                onBlur={this.props.onCheckPatient}
                onChange={this.props.onChange}
                component={FormInput}
                validator={emailValidator}
              />

              {this.props.detailsState.showRegisterationForm && (
                <React.Fragment>
                  <Field
                    key={"firstName"}
                    id={"firstName"}
                    name={"firstName"}
                    label={"First Name"}
                    onChange={this.props.onChange}
                    component={FormInput}
                    validator={nameValidator}
                  />

                  <Field
                    key={"lastName"}
                    id={"lastName"}
                    name={"lastName"}
                    label={"Last Name"}
                    component={FormInput}
                    onChange={this.props.onChange}
                    validator={nameValidator}
                  />

                  <Field
                    key={"cell"}
                    id={"cellPhone"}
                    name={"cell"}
                    label={"Cell Phone"}
                    type={"email"}
                    onChange={this.props.onChange}
                    component={FormInput}
                    validator={phoneValidator}
                  />
                  <Field
                    key={"homePhone"}
                    id={"homePhone"}
                    name={"homePhone"}
                    label={"Home Phone"}
                    type={"email"}
                    onChange={this.props.onChange}
                    component={FormInput}
                    validator={phoneValidator}
                  />
                  <Field
                    key={"birthDate"}
                    id={"dateOfBirth"}
                    name={"birthDate"}
                    label={"Birth Date"}
                    format={"MM/dd/yyyy"}
                    // defaultValue={formValues.dateOfBirth}
                    onChange={this.props.onChange}
                    component={FormDatePicker}
                    validator={dobValidator}
                  />

                  <Field
                    key={"city"}
                    id={"city"}
                    name={"city"}
                    label={"City"}
                    onChange={this.props.onChange}
                    component={FormInput}
                  />
                  <div style={{ paddingTop: 20 }}>
                    Gender
                    <DropDownList
                      key={"gender"}
                      id={"gender"}
                      name={"gender"}
                      fillMode="outline"
                      width={100}
                      defaultItem="Select gender ..."
                      defaultValue={formValues.gender}
                      required={true}
                      validationMessage={"Please select a gender"}
                      onChange={this.props.onChange}
                      data={[
                        "Male",
                        "Female",
                        "Other",
                        "Unknown",
                        "DeclinedToSpecify",
                      ]}
                    />
                  </div>

                  <div style={{ paddingTop: 20 }}>
                    State
                    <DropDownList
                      key={"state"}
                      id={"state"}
                      name={"state"}
                      fillMode="outline"
                      defaultItem="Select state ..."
                      defaultValue={formValues.state}
                      required={true}
                      validationMessage={"Please select a state"}
                      width={100}
                      onChange={this.props.onChange}
                      data={[
                        "AK",
                        "AL",
                        "AR",
                        "AS",
                        "AZ",
                        "CA",
                        "CO",
                        "CT",
                        "DC",
                        "DE",
                        "FL",
                        "GA",
                        "GU",
                        "HI",
                        "IA",
                        "ID",
                        "IL",
                        "IN",
                        "KS",
                        "KY",
                        "LA",
                        "MA",
                        "MD",
                        "ME",
                        "MI",
                        "MN",
                        "MO",
                        "MS",
                        "MT",
                        "NC",
                        "ND",
                        "NE",
                        "NH",
                        "NJ",
                        "NM",
                        "NV",
                        "NY",
                        "OH",
                        "OK",
                        "OR",
                        "PA",
                        "PR",
                        "RI",
                        "SC",
                        "SD",
                        "TN",
                        "TX",
                        "UT",
                        "VA",
                        "VI",
                        "VT",
                        "WA",
                        "WI",
                        "WV",
                        "WY",
                      ]}
                    />
                  </div>
                  <div style={{ paddingTop: 20 }}>
                    Preferred Language
                    <DropDownList
                      key={"preferredLanguage"}
                      id={"preferredLanguage"}
                      name={"preferredLanguage"}
                      fillMode="outline"
                      width={100}
                      defaultItem="Select preferred language ..."
                      defaultValue={formValues.preferredLanguage}
                      required={true}
                      validationMessage={"Please select a gender"}
                      onChange={this.props.onChange}
                      data={[
                        "English",
                        "Chinese",
                        "French",
                        "Italian",
                        "Japanese",
                        "Portuguese",
                        "Russian",
                        "Spanish",
                        "Other",
                        "DeclinedToSpecify",
                        "Unknown",
                      ]}
                    />
                  </div>
                  <Field
                    key={"zip"}
                    id={"zipCode"}
                    name={"zip"}
                    label={"Zip Code"}
                    onChange={this.props.onChange}
                    component={FormInput}
                  />
                </React.Fragment>
              )}
            </FormElement>
          )}
        />
      </div>
    );
  }
}
