import React from 'react';
import logo from './thoughts-logo.svg';

//why doesnt it behave like the css rules in chef?
const Banner = props => {
  return(
    <table className="App-header">
      <tbody>
        <tr>
          <td className="App-header-td">
            <img src = {logo} className = "logo" alt = "thoughts logo"/>
          </td>
          <td className="App-header-td">
            <h2 className = "Cursive">Thoughts?</h2>
          </td>
          <td className="App-header-td">
            <img src = {logo} className = "logo" alt = "go to profile page" />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Banner;
