import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  MultiSelectTree,
  getMultiSelectTreeValue,
} from "@progress/kendo-react-dropdowns";
import {
  processMultiSelectTreeData,
  expandedState,
  getValueMap
} from "./multiselecttree-data-operations";
import SchedulingCalendar from "./SchedulingCalendar"
import { localeInfo } from "@telerik/kendo-intl";

const dataItemKey = "id";
const checkField = "checkField";
const checkIndeterminateField = "checkIndeterminateField";
const subItemsField = "items";
const expandField = "expanded";
const textField = "text";
const fields = {
  dataItemKey,
  checkField,
  checkIndeterminateField,
  expandField,
  subItemsField,
};

//const data = this.props.locationState;

class SelectLocation extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    value: [],
    locationSelect: false,
    expanded: [this.props.locationState[0][dataItemKey]],
    locationsProps: this.props.locationState[0],
    selecetedOfficeId: [],
  };
  onChange = (event) => {
    this.setState({
      value: getMultiSelectTreeValue([this.state.locationsProps], {
        ...fields,
        ...event,
        value: this.state.value,
      }),
      locationSelect: true
    });
    this.setState({
      selecetedOfficeId: event.items[0],
    });
  };

  onExpandChange = (event) => {
    this.setState({
      expanded: expandedState(event.item, dataItemKey, this.state.expanded),
    });
  };
  


  treeData = () => {
    let result = processMultiSelectTreeData([this.state.locationsProps], { ...this.state, ...fields });
    return result
  };

  render() {

    let schedulingCalender = !this.state.locationSelect
      ? null
      : <SchedulingCalendar 
          selectedOffice={this.state.selecetedOfficeId}
      />

    return (
      <div style={{ display: "flex", flexDirection: "column", paddingTop: 30 }}>
        <div style={{ display: "flex", flexDirection: "row", paddingBottom: 30 }}>
          <div style={{ flexGrow: 4 }}></div>
          <div style={{ display: "flex", flexGrow: 2, flexDirection: "column" }}>
            <div>Select Location</div>
            <MultiSelectTree
              style={{ width: "225px" }}
              data={this.treeData()}
              value={this.state.value}
              onChange={this.onChange}
              placeholder={"Select ..."}
              textField={textField}
              dataItemKey={dataItemKey}
              checkField={checkField}
              checkIndeterminateField={checkIndeterminateField}
              subItemsField={subItemsField}
              expandField={expandField}
              onExpandChange={this.onExpandChange}
            />
          </div>
          <div style={{ flexGrow: 4 }}></div>
        </div>
        {schedulingCalender}
      </div>
    );
  }
}

export default SelectLocation;

