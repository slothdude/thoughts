import React, { Component } from 'react';
import firebase from 'firebase';
import autobind from 'class-autobind';
import lodash from 'lodash';

//individual newsfeed component, like each post is one 'Value'
class Value extends Component {
    render() {
        const {keyProp, valProp} = this.props;
        return (
          <tr className = "NewsFeed-td">
              <td><p>{keyProp}: {valProp}</p></td>
          </tr>
        );
    }
}

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { keys: null, values: null };
    autobind(this);
  }

  //fills state from database
  getData(){
    //add something to databse here before uncomment
    var postRef = firebase.database().ref('posts');
    postRef.on('value', snapshot => {
      var allPosts = snapshot.val();
      var keys = Object.keys(allPosts);
      var values = [];
      keys.forEach(function(key) {
        //var userDataRef = firebase.database().ref(`users/${key}/data`)
        values.push(allPosts[key].message);
      });
      if (snapshot.val() !==null){
        this.setState({ keys: keys, values: values });
      }
    });
  }

  listItems(){
    console.log(this.state);
    const { keys, values } = this.state;
    if (values === null) {
      this.getData();
    } else {
      return (
        //creates a value by mapping over keys and values
        lodash.zip(keys, values).map((i) => {
          return <Value key = {i} keyProp={i[0]} valProp={i[1]} />
        })
      );
    }
  }

  render() {
    return (
      <div>
        <table className = "NewsFeed">
          <tbody>
            {this.listItems()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default NewsFeed;
