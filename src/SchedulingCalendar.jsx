import * as React from "react";
import { Eventcalendar } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

class SchedulingCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'day'
    };
  }

  render() {

    const myResources = [
      {
        id: 1,
        name: 'Josh H.',
        color: '#f7c4b4',
        img: 'https://img.mobiscroll.com/demos/m1.png'
      }, {
          id: 2,
          name: 'Maggy T.',
          color: '#c6f1c9',
          img: 'https://img.mobiscroll.com/demos/f3.png'
      }, {
          id: 3,
          name: 'Monica S.',
          color: '#e8d0ef',
          img: 'https://img.mobiscroll.com/demos/m2.png'
      }];

    const myEvents = [
      {
        start: '2022-02-06T10:00',
        end: '2022-02-06T11:30',
        title: '',
        resource: [2, 3],
        color: '#ff6358'
      },
      {
        start: '2022-02-06T13:00',
        end: '2022-02-06T14:00',
        title: '',
        resource: [1],
        color: '#ff6358'
      }

    ]  

    const renderCustomResource = (resource) => {
      return <div className="resource-template-content">
              <div className="resource-name">{resource.name}</div>
              {/* <div className="resource-description">{resource.description}</div> */}
              <img className="resource-avatar" src={resource.img} />
      </div>;
  }

    return (
      <div>
          <Eventcalendar 
            data={myEvents}
            width={450}
            height={400}
            view={{
              schedule: { type: 'day' }
            }}
            groupBy="date"
            resources={myResources}
            renderResource={renderCustomResource}
        />
      </div>
    );
  }

}

export default SchedulingCalendar;