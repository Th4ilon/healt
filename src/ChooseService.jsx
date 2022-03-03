import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import "./App.css";
import { ListView } from "@progress/kendo-react-listview";


const dataItemKey = "id";
const checkField = "checkField";
const checkIndeterminateField = "checkIndeterminateField";
const subItemsField = "items";
const expandField = "expanded";

// const fields = {
//   dataItemKey,
//   checkField,
//   checkIndeterminateField,
//   expandField,
//   subItemsField,
// };

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

class ChooseService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      selectedService: {},
      services: this.props.services,
      expanded: [data[0][dataItemKey]],
    };
  }

  ItemRender = (props) => {
    let item = props.dataItem;
    console.log(item, this.state.selectedService);
    return (
      <div
        className="border-bottom align-middle px-3 py-1"
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
          }}
        >
          <div
            style={{
              fontWeight: "bold",
            }}
          >
            {item.name}
          </div>
          <div>{item.category}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div>Price: ${item.price}</div>
          <div>Time: {getStringTime(item.duration)}</div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            togglable={true}
            selected={this.state.selectedService.id === item.id}
            onClick={(e) => {
              console.log(this.state.selectedService.id, item.id);
              this.handleClick(item, e);
            }}
          >
            SELECT
          </Button>
        </div>
      </div>
    );
  };

  handleClick = (service, e) => {
    this.setState({ selectedService: service });
    console.log(this.state);
    e.preventDefault();
  };
  // onChange = (event) => {
  //   this.setState({
  //     value: getMultiSelectTreeValue(data, {
  //       ...fields,
  //       ...event,
  //       value: this.state.value,
  //     }),
  //   });
  // };
  // onExpandChange = (event) => {
  //   this.setState({
  //     expanded: expandedState(event.item, dataItemKey, this.state.expanded),
  //   });
  // };
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (!prevProps.services.length) {
      this.setState({ services: this.props.services });
    }
    //
  }
  render() {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "right",
            boxShadow: "0 0 4px 4px rgba(0, 0, 0, .1)",
            marginTop: 30,
          }}
        >
          <ListView data={this.state.services} item={this.ItemRender} />
        </div>
      </div>
    );
  }
}

export default ChooseService;
