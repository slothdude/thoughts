import React, {Component} from 'react';
import autobind from 'class-autobind';


//component for the picture and name for each post
//uses inline styling onPress, see ./Message.js for css attribute way
class Message extends Component {
  constructor(props){
      super(props);
      this.state= {pressed: false};
      autobind(this);
  }

  handleMouseDown(e){
    this.setState({pressed: true});
  }

  handleMouseUp(e){
    this.setState({pressed: false});
  }

  render(){
    return(
      <td className = "NewsFeed-message"
          pressed = {this.state.pressed.toString()}
          onMouseDown = {this.handleMouseDown}
          onMouseUp = {this.handleMouseUp}>
        <p>
          {this.props.message}
        </p>
      </td>
    );
  }
}

export default Message;
