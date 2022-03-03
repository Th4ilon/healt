import * as React from "react";
import {
  MultiSelectTree,
  getMultiSelectTreeValue,
} from "@progress/kendo-react-dropdowns";
import {
  processMultiSelectTreeData,
  expandedState,
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
const data = [
      {
        text: "Cardone Event",
        id: 1,
        items: [
          {
            text: "10x Mastermind (Feb 7th)",
            id: 0,
          },
          {
            text: "10x 360 (Feb 10th)",
            id: 1,
          },
          {
            text: "Growth Conference 6",
            id: 2,
          }
        ],
      },
      {
        text: "Concierge",
        id: 3,
        items: [
          {
            text: "AZ",
            id: 4,
            items: [
                {
                    id: 5,
                    text: "Scottsdale",
                    items: [
                        {
                            id: 6,
                            text: "Josh Harrellson"
                        },
                        {
                            id: 7,
                            text: "Maggy Toporkiewicz"
                        },
                        {
                            id: 8,
                            text: "Monica Szmit"
                        }
                    ]
                }
            ]
          },
          {
            text: "FL",
            id: 9,
            items: [
                {
                    id: 10,
                    text: "Miami",
                    items: [
                        {
                            id: 11,
                            text: "Gary Brecka"
                        },
                        {
                            id: 12,
                            text: "Madison Brecka"
                        }
                    ]
                }
            ]
          },
        ]
      },
      {
        text: "In-Office",
        id: 13,
        items: [
          {
            text: "AZ",
            id: 14
          },
        ]
      },
    ];


class SelectLocation extends React.Component {

  state = {
    value: [],
    locationSelect : false,
    expanded: [data[0][dataItemKey]],
  };
  onChange = (event) => {
    this.setState({
      value: getMultiSelectTreeValue(data, {
        ...fields,
        ...event,
        value: this.state.value,
      }),
      locationSelect : true
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
      : <SchedulingCalendar/>

    return (
      <div style={{display: "flex", flexDirection: "column", paddingTop: 30}}>
        <div style={{display: "flex", flexDirection: "row", paddingBottom: 30}}>
          <div style={{flexGrow: 4}}></div>
          <div style={{display: "flex", flexGrow: 2, flexDirection: "column"}}>
            <div>Select Location</div>  
            <MultiSelectTree
              style={{width: "225px"}}
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
          <div style={{flexGrow: 4}}></div>
        </div>
        {schedulingCalender}
      </div>
    );
  }
}

export default SelectLocation;