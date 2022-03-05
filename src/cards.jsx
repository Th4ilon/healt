import * as React from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardActions,
  CardImage
} from '@progress/kendo-react-layout';
import { BsHouseDoorFill } from "react-icons/bs";

class CardsComponent extends React.Component {
  dataFromParent = this.props.dataFromParent
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <div className="k-card-list">
          <Card orientation='horizontal'
            style={{
              width: '329px',
            }}
          >

            <div className="k-vbox">
              <CardBody>
                <CardTitle>Magdalena T.</CardTitle>
                <CardTitle><BsHouseDoorFill />Tuscon, AZ</CardTitle>
              </CardBody>
              <CardActions style={{width: 200, marginRight: 50}}>
                <div>
                  <span className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
                    8:00 AM
                  </span>
                  <span className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
                    9:00 AM
                  </span>
                </div>
                <div>
                  <span className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
                    8:00 AM
                  </span>
                  <span className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
                    9:00 AM
                  </span>
                </div>
              </CardActions>
            </div>
            <CardImage src="https://store-images.s-microsoft.com/image/apps.29972.14474337564596307.6c783b22-9460-4205-938c-2969961ed85c.aa21aff2-b2b2-411b-88bb-158187c6e238?mode=scale&q=90&h=1080&w=1920" />
          </Card>
        </div>
      </div>
    );
  }

}


export default CardsComponent;