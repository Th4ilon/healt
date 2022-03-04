import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Observable, of } from "rxjs/operators";
import "./App.css";
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
} from "@progress/kendo-react-listview";
import {
  MultiSelectTree,
  getMultiSelectTreeValue,
} from "@progress/kendo-react-dropdowns";
import {
  processMultiSelectTreeData,
  expandedState,
} from "./multiselecttree-data-operations";

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
    text: "IVs",
    id: 1,
    items: [
      {
        text: "Hangover",
        id: 2,
      },
      {
        text: "Recovery",
        id: 3,
      },
      {
        text: "Myers Cocktail",
        id: 4,
      },
      {
        text: "Myers Cocktail w/ NAD",
        id: 5,
      },
      {
        text: "Immune System Booster",
        id: 6,
      },
      {
        text: "Ozone Blood Therapy",
        id: 7,
      },
    ],
  },
  {
    text: "Labs",
    id: 7,
    items: [
      {
        text: "Methylation",
        id: 8,
      },
      {
        text: "Male Panel",
        id: 9,
      },
      {
        text: "Female Panel",
        id: 10,
      },
    ],
  },
];

const getStringTime = (duration) => {
  let value = duration;
  let units = "min";
  if (duration > 59) {
    units = "hr";
    value = duration / 60;
  }
  return value + " " + units;
};

const ItemRender = (props) => {
  let item = props.dataItem;
  return (
    <div
      className="row p-2 border-bottom align-middle"
      style={{
        margin: 0,
      }}
    >
      <div className="col-5">
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          {item.name}
        </div>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          {item.category}
        </div>
      </div>
      <div className="col-5">
        <div>Price: ${item.price}</div>
        <div>Time: {getStringTime(item.duration)}</div>
      </div>
      <div className="col-2">
        <Button themeColor={"primary"}>ADD</Button>
      </div>
    </div>
  );
};

class ChooseService extends React.Component {
  state = {
    value: [],
    servicesData: [],
    expanded: [data[0][dataItemKey]],
  };

  constructor() {
    super();
    this.getServicesData();
  }

  onChange = (event) => {
    this.setState({
      value: getMultiSelectTreeValue(data, {
        ...fields,
        ...event,
        value: this.state.value,
      }),
    });
  };
  onExpandChange = (event) => {
    this.setState({
      expanded: expandedState(event.item, dataItemKey, this.state.expanded),
    });
  };
  getServicesData = async () => {
    let response = await fetch(
      "https://tenxhealth-api-apim.azure-api.net/services"
    );
    let json = await response.json();
    //console.log("Services", json);
    this.setState({
      servicesData: json,
    });
    return json;
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div className={"step-title"}>Services</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "right",
            paddingTop: 30,
          }}
        >
          <ListView data={this.state.servicesData} item={ItemRender} />
        </div>
      </div>
    );
  }
}

export default ChooseService;
