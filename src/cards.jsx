import * as React from "react";

class CardsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>{this.props.dataFromParent}</p>
      </div>
    );
  }

}


export default CardsComponent;