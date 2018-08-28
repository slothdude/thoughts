import React, {Component} from 'react';
import autobind from 'class-autobind';
import Name from './Name';
import Picture from './Picture';

//component for the picture and name for each post
//uses inline styling onPress, see ./NewsFeed.js for css attribute way
class PostSquare extends Component {
  constructor(props){
      super(props);
      this.state= {borderStyle: "outset"};
      autobind(this);
  }

  handleMouseDown(e){
    this.setState({borderStyle: "inset"});
  }

  handleMouseUp(e){
    this.setState({borderStyle: "outset"});
  }

  render(){
    return(
      <td className = "NewsFeed-td"
          style = {{borderStyle: this.state.borderStyle}}
          onMouseDown = {this.handleMouseDown}
          onMouseUp = {this.handleMouseUp}>
        <Picture id = {this.props.keyProp}/>
        <Name id = {this.props.keyProp} />
      </td>
    );
  }
}

export default PostSquare;
