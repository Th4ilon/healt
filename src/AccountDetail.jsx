import * as React from "react";
import { Field, Dropw } from "@progress/kendo-react-form";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { FormInput, FormUpload } from "./form-components";
import {
  userNameValidator,
  emailValidator,
  passwordValidator,
  nameValidator,
  dobValidator,
  phoneValidator,
  addressValidator
} from "./validators";
export const AccountDetails = (
  <div>
    <Field
      key={"firstName"}
      id={"firstName"}
      name={"firstName"}
      label={"First Name"}
      component={FormInput}
      validator={nameValidator}
    />
    <Field
      key={"lastName"}
      id={"lastName"}
      name={"lastName"}
      label={"Last Name"}
      component={FormInput}
      validator={nameValidator}
    />
    <Field
      key={"email"}
      id={"email"}
      name={"email"}
      label={"Email"}
      type={"email"}
      component={FormInput}
      validator={emailValidator}
    />
    <Field
      key={"cell"}
      id={"cell"}
      name={"cell"}
      label={"Cell Phone"}
      type={"email"}
      component={FormInput}
      validator={phoneValidator}
    />
    <Field
      key={"address"}
      id={"address"}
      name={"address"}
      label={"Address"}
      component={FormInput}
      validator={addressValidator}
    />
    <Field
      key={"city"}
      id={"city"}
      name={"city"}
      label={"City"}
      component={FormInput}
    />
    <div style={{paddingTop: 20}}>State
    <DropDownList
        width={100}
        data={["AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]}
      />
     </div>
    <Field
      key={"zip"}
      id={"zip"}
      name={"zip"}
      label={"Zip Code"}
      component={FormInput}
    />
    </div>
);