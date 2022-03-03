import * as React from "react";
import { Calendar } from '@progress/kendo-react-dateinputs';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";


const CustomCell = props => {
  const title = "We're closed on the weekends!";

  const handleClick = () => {
    if (!props.isWeekend) {
      if (props.onClick) {
        props.onClick(props.value);
      }
    }
  };

  const style = {
    cursor: "pointer",
    opacity: props.isWeekend ? 0.6 : 1
  };

  const titleValue = props.isWeekend ? title : '';
  return <td onClick={handleClick} style={style}>
    <span className="k-link" title={titleValue}>
      {props.children}
    </span>
  </td>;
};

class SchedulingCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(event) {
    console.log('event: ', event);
    const dayOfWeek = event.value.getDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // this.setState(event.value);
    }
  }

  render() {



    return (
      <div>
        <Calendar cell={CustomCell} onChange={this.handleChange} />
      </div>
    );
  }

}

export default SchedulingCalendar;