# A simple react based game
I made this version of noughts and crosses from scratch in order to give me a better focus to learn React.js and to help cement my knowledge of javascript. It also helped me to become more familiar with git and the git workflow, by working with a decent sized project of a few hundred lines over a few days.

## Setting up the system
The app is compiled by babel using webpack and all the dependancies should be included inside of `node_modules`. Meaning that you shouldn't need to install anything else to get it to work. Although I have created it on a mac and only tested it with google chrome version 62, so can not vouch that it will work on different systems.

In order to run webpack and build the code you need to run:
```
npm run build
```

If you have forked the code and wish to make changes then use:
```
npm run watch
```
to automatically build the code when you make any changes to a .js file.

Once the project has been built, it is placed inside a build directory. In order to play the game copy and paste the link to the build/index.html file into a browser.

## Using the app
How to set up and play the game once it's been loaded up.

### Setting up the game
When the app first loads up your greeted with a set-up form. The form is pre-filled with default parameters, so feel free at least initially to ignore the form. Simply clicking the `submit` button and playing with the default settings. 

The form allows you to change each players name and colour, as well as some more advanced settings. The standard game of noughts and crosses uses a 3x3 grid, but by changing the grid size option you can play on a square grid of any integer size from 2x2 up-to and including 20x20. The rules are the same on a larger grid, you just need to complete a (horizontal/vertical/diagonal) line of your symbols before the other player does. Lastly you can choose how many games to play, who goes first and if the first player should switch each new game.

The form validates it's inputs when you click submit and will create a pop-up explaining any errors that you may have inadvertently included, allowing you to correct them.

### Playing the game
The actual game should hopefully be self-explanatory, assuming that you can actually play noughts and crosses (also know as tic-tac-toe and X's and O's). If you can't then it's not hard to learn, here's some [rules](http://www.ubergames.co.uk/noughts-and-crosses-rules.html) that a brief google search brought up, for example. The game can end in a draw if the board fills up, leaving no spaces to place new symbols. In this scenario neither player is awarded a point (which amounts to the same thing as both players getting one).

Under the grid is a slider which lets you change the size of the grid and the text, and a button (`Reset Everything`) that resets the application, bringing you back to the main start-up screen.

## Acknowledgments
[Iqbal Ahmed (propattern)](https://github.com/propattern) helped me with useful advice when I got stuck.
I learnt JavaScript by using the following resources: 
* [MDN Web Docs](https://developer.mozilla.org/en-US/)
* [Eloquent JavaScript](http://eloquentjavascript.net/)
* [CodeAcademy](https://www.codecademy.com/learn/introduction-to-javascript)
* Various random google searches

In terms of learning React, the main resource I used was [egghead.io](https://egghead.io/lessons/react-introduction-to-the-beginner-s-guide-to-reactjs)
