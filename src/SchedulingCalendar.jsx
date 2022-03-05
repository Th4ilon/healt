import * as React from "react";
import { Calendar } from '@progress/kendo-react-dateinputs';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { classNames } from "@progress/kendo-react-common";
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
  
  const some =  classNames({
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
    this.state = {
      value: new Date(),
      dia: '',
      officeId: this.props.selectedOffice.id,
      officeName: this.props.selectedOffice.text,
    };
   this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      officeId: this.props.selectedOffice.id,
      officeName: this.props.selectedOffice.text,
    }, () => { // utilizar esta función para la lógica de generación de cartas
      
      console.log(this.state.officeId);
      console.log(this.state.officeName);
      console.log('event: ', event);

      const dayOfWeek = event.value.getDay();
      console.log(this.state.officeName);
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // logica de activar desactivar fechas
        this.setState({
        dia: event.value.getDay()
      });
      console.log(this.state.dia);
    }
    });
    
  }

  render() {
    return (
      <div>
        <Calendar cell={CustomCell} value={this.state.value} onChange={this.handleChange} />
        <CardsComponent dataFromParent={this.state.dia}/>
      </div>
    );
  }

}

export default SchedulingCalendar;