import React from 'react';
import logo from './thoughts-logo.svg';
import profileLogo from './profile-logo.svg';
import LinkImage from './LinkImage';

//Ribbon at top with the navigation icons
const Banner = props => {
  return
  (
    <table className="App-header">
      <tbody>
        <tr>
          <td className="App-header-td">
            <LinkImage to = "/"
                       src = {logo}
                       className = "logo"
                       alt = "go to home page" />
          </td>
          <td className="App-header-td">
            <h2 className = "Cursive">Thoughts?</h2>
          </td>
          <td className="App-header-td">
            <LinkImage to = "/profile"
                       src = {profileLogo}
                       className = "logo"
                       alt = "go to profile page" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Banner;
