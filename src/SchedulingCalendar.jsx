import * as React from "react";
import { Calendar } from '@progress/kendo-react-dateinputs';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { classNames } from "@progress/kendo-react-common";
import { ComboBox } from '@progress/kendo-react-dropdowns';
import CardsComponent from "./cards";


const CustomCell = props => {
  const title = "We're closed on the weekends!";

  const handleClick = () => {
    if (!props.isWeekend) {
      if (props.onClick) {
        props.onClick(props.value);
      }
    }
  };

  const some = classNames({
    "k-state-selected": props.isSelected,
    "k-state-focused": props.isFocused
  });

  const style = {
    cursor: "pointer",
    opacity: props.isWeekend ? 0.6 : 1
  };

  const titleValue = props.isWeekend ? title : '';
  return <td onClick={handleClick} className={some} style={style}>
    <span className="k-link" title={titleValue}>
      {props.children}
    </span>
  </td>;
};

class SchedulingCalendar extends React.Component {

  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      value: today,
      dia: today.toLocaleDateString("en-US")
    };
    this.handleChange = this.handleChange.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
  }

  handleChange(event) {
    const dayOfWeek = event.value.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // logica de activar desactivar fechas
      this.setState({
        dia: event.value.toLocaleDateString("en-US")
      });
      console.log(this.state.dia);
    }
  }

  showCalendar(event) {
    this.setState({
      activeDate: this.state.activeDate ? false : true
    })
  }

  render() {
    return (
      <div>
        <div className="col-xs-12 col-sm-7 example-col">
          <select defaultValue={this.state.dia} onClick={this.showCalendar}>
            <option  style={{ display:'none' }} value="dia">{this.state.dia}</option>
          </select>
          {this.state.activeDate ? <Calendar cell={CustomCell} value={this.state.value} onChange={this.handleChange} /> : null}
        </div>
        <CardsComponent dataFromParent={this.state.dia} />
      </div>
    );
  }

}

export default SchedulingCalendar;