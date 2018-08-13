Trying it yourself
==========
git clone (project url)
npm install
npm start

Overview
==========

Thoughts is a web app where a user can log in (using firebase auth), and leave a
message that is added to the firebase realtime database, which the thoughts feed
pulls from. This app could be ran on local state by pulling the thoughts feed
from local state, but this would mean that everyone's thoughts would be lost on
refresh. If you click the top right icon, you will be brought to a profile page
where you can update your name and a picture. These will replace your email and
default picture on all previous thoughts automatically. Click the top left icon
from the profile page to go back to the thoughts feed. Even though there is a
link on this website, and the profile page is at the "/profile" endpoint, typing
in the url or refreshing will cause you to log out because I did not set up
login persistence.

Challenges
========

## CSS

1. I was unable to center the logos inside of the top border:
![thoughtsprob1.PNG](./src/thoughtsprob1.PNG)
Somehow I missed that there was a `float: left` style attribute on the
logo class, so I changed that to `position: relative`. The whole top border is
actually a table, to help with ease in css.

2. I was curious why the background color for the elements would fail to cover
the whole page:
![prob2.PNG](./src/prob2.PNG)
I fixed this by doing `html {background-color: #F8E691}`. I never knew you could
style the entire html document.
