import * as React from "react";
import { Calendar } from '@progress/kendo-react-dateinputs';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import CardsComponent from "./cards"

class SchedulingCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'day'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('event: ', event);
    const dayOfWeek = event.value.getDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dayOfWeek = event.value.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // logica de activar desactivar fechas

        this.setState({
          dia: event.value.getDay()
        });
        console.log(this.state.dia);
      }
    }
  }

  render() {
    const renderCustomResource = (resource) => {
      return <div className="resource-template-content">
        <div className="resource-name">{resource.name}</div>
        {/* <div className="resource-description">{resource.description}</div> */}
        <img className="resource-avatar" src={resource.img} />
      </div>;
    }

    return (
      <div>
        <Calendar cell={CustomCell} value={this.state.value} onChange={this.handleChange} />
        <CardsComponent />
      </div>
    );
  }

}

export default SchedulingCalendar;


