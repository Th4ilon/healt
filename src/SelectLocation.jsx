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

// back info
const data = [
  {
    text: "Concierge",
    id: 0,
    unselectableItem: true,
    items: [
      {
        text: "Magdalena",
        id: 1,
      },
      {
        text: "josh",
        id: 2,
      },
      {
        text: "simon",
        id: 3,
      }
    ],
  }
];


class SelectLocation extends React.Component {

  state = {
    value: [],
    locationSelect: false,
    expanded: [data[0][dataItemKey]],
  };

  onChange = (event) => {
    this.setState({
      value: getMultiSelectTreeValue(data, {
        ...fields,
        ...event,
        value: this.state.value,
      }),
      locationSelect: true
    });
  };

  onExpandChange = (event) => {
    this.setState({
      expanded: expandedState(event.item, dataItemKey, this.state.expanded),
    });
  };

  treeData = () => {
    let result = processMultiSelectTreeData(data, { ...this.state, ...fields });
    return result
  };

  render() {

    let schedulingCalender = !this.state.locationSelect
      ? null
      : <SchedulingCalendar />

    return (
      <div style={{ display: "flex", flexDirection: "column", paddingTop: 30 }}>
        <div style={{ display: "flex", flexDirection: "row", paddingBottom: 30 }}>

          <div style={{ display: "flex", flexGrow: 2, flexDirection: "column" }}>
            <div>Select Location</div>
            <MultiSelectTree
              style={{ width: "329px" }}
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

        </div>

        <div style={{ display: "flex", flexDirection: "row", paddingBottom: 30 }}>{schedulingCalender}</div>

      </div>
    );
  }
}

export default SelectLocation;

