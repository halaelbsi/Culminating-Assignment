// defines and itiializes the variables
let gameState = "start"; // defines gameState variable
let selectedCharacter = null; // sets selectedCharacter to null, indicating that no character has been chosen
let characterX, characterY; // initalizes characterX and characterY variables
let levelStarted = false; // initializes levelStarted variable
let currentLevel = 1; // Tracks the current level
let levelTimes = [45, 30, 20]; // array for time limits for each level in seconds
let startingLevel = 1; // Default starting level
let startTime;  // stores time an event or action occurs


let mazes = [ // opens mazes array
   // Level 1
   [ // opens an array literal
       { x1: 50, y1: 50, x2: 325, y2: 50 }, // coordinates for line 1
       { x1: 100, y1: 100, x2: 375, y2: 100 }, // coordinates for line 2
       { x1: 50, y1: 150, x2: 325, y2: 150 }, // coordinates for line 3
       { x1: 100, y1: 200, x2: 375, y2: 200 }, // coordinates for line 4
       { x1: 50, y1: 250, x2: 325, y2: 250 }, // coordinates for line 5
       { x1: 100, y1: 300, x2: 375, y2: 300 }, // coordinates for line 6
       { x1: 50, y1: 350, x2: 325, y2: 350 } // coordinates for line 7
   ], // closes array literal
   // Level 2 - increased difficulty from level 1 as the lines are more difficult to pass through, less typical
   [ // opens another array literal
       { x1: 50, y1: 50, x2: 375, y2: 50 }, // coordinates for line 1
       { x1: 300, y1: 100, x2: 400, y2: 100 }, // coordinates for line 2
       { x1: 300, y1: 130, x2: 200, y2: 130 }, // coordinates for line 3
       { x1: 100, y1: 170, x2: 375, y2: 170 }, // coordinates for line 4
       { x1: 50, y1: 215, x2: 130, y2: 215 }, // coordinates for line 5
       { x1: 75, y1: 250, x2: 250, y2: 250 }, // coordinates for line 6
       { x1: 100, y1: 300, x2: 375, y2: 300 }, // coordinates for line 7
       { x1: 50, y1: 350, x2: 350, y2: 350 } // coordinates for line 8
   ], // closes array literal
   // Level 3 - increased difficulty from levels 1 and 2 as the lines are more tricky and smaller than in the other levels
   [ // opens an array literal
       { x1: 50, y1: 50, x2: 100, y2: 50 }, // coordinates for line 1
       { x1: 95, y1: 90, x2: 175, y2: 90},  // coordinates for line 2
       { x1: 95, y1: 120, x2: 75, y2: 120}, // coordinates for line 3
       { x1: 110, y1: 155, x2: 40, y2: 155 }, // coordinates for line 4
       { x1: 20, y1: 185, x2: 50, y2: 185}, // coordinates for line 5
       { x1: 50, y1: 210, x2: 130, y2: 210 }, // coordinates for line 6
       { x1: 130, y1: 240, x2: 160, y2: 240}, // coordinates for line 7
       { x1: 155, y1: 270, x2: 240, y2: 270 }, // coordinates for line 8
       { x1: 225, y1: 300, x2: 265, y2: 300 }, // coordinates for line 9
       { x1: 250, y1: 330, x2: 295, y2: 330}, // coordinates for line 10
       { x1: 275, y1: 360, x2: 350, y2: 360}, // coordinates for line 11
   ] // closes array literal
]; // closes mazes array


let endPoint = { x: 375, y: 350 }; // defines endPoint and its assigned coordinates


function setup() { // opens function setup
   createCanvas(400, 400); // creates canvas
   characterX = 25; // defines characterX
   characterY = 25; // defines characterY
   startTime = millis(); // initializes timer
} // closes function setup


function draw() { // opens function draw()
 // the following conditional statements will define the functions to be used according to the gameState variable
  if (gameState === "start") { // opens if statement that will be run if gameState is "start"
      drawStartScreen(); // calls drawStartScreen() function
  } // closes if statement
  else if (gameState === "instructions") { // if the previous statement is false, this statement checks if gameState is "instructions" and runs accordingly
      drawInstructionScreen(); // calls drawInstructionScreen() if the condition is true, otherwise it ignores this
  } // closes else if statement 
  else if (gameState === "characterSelection") { // if previous conditions are false, gameState is checked to see if it is "characterSelection"
      drawCharacterSelection(); // calls drawCharacterSelection() if the condition is true, otherwise it ignores this
      drawCharacters(); // calls drawCharacters() if the condition is true, otherwise it ignores this
  } // closes else if statement
  else if (gameState === "gameWon") { // if previous conditions are false, gameState is checked to see if it is "gameWon"
      drawGameWonScreen(); // calls drawGameWonScreen() if the condition is true, otherwise it is ignored and checker moves on
  } // closes else if statement 
  else if (gameState === "runningLevel") { // if previous conditions are false, gameState is checked to see if it is "runningLevel"
      if (currentLevel === 1) { // opens if statement to check if currentLevel is equal to 1
          if (!levelStarted) { // opens if statement to check if the level has started or not
              startTime = millis(); // sets the timer if conditions are met
              levelStarted = true; // marks the level as started
          } // closes if statement
      } // closes if statement
      runLevel(drawMaze, "Maze", levelTimes[currentLevel - 1]); // calls the runLevel() function with its parameters
  } else if (gameState === "timeUp") { // if previous conditions are false, gameState is checked to see if it is "timeUp"
      drawTimeUpScreen(); // calls drawTimeUpScreen() function if the condition is true
  } // closes else if statement
} // closes function draw()


function keyPressed() { // opens function keyPressed()
 // the following conditional statements will determine the value of the gameState variable associated with keys pressed and its current value
   if (gameState === "start" && key === ' ') { // opens if condiitonal statement for when gameState is "start" and the spacebar is pressed
       gameState = "instructions"; // sets gameState to "instructions"
   } else if (gameState === "instructions" && key === ' ') { // opens else if condiitonal statement for when gameState is "instructions" and the spacebar is pressed (only runs if previous conditional is false)
       gameState = "characterSelection"; // sets gameState to "characterSelection"
   } else if (gameState === "characterSelection" && key === ' ') { // opens else if condiitonal statement for when gameState is "characterSelection" and the spacebar is pressed (only runs if previous conditionals are false)
       gameState = "runningLevel"; // starts the level, sets gameState to "runningLevel"
   } else if (gameState === "runningLevel") { // opens else if condiitonal statement for when gameState is "runningLevel" (only runs if previous conditionals are false)
       if (keyCode === LEFT_ARROW) { // opens if conditional for when keyCode is left arrow
           characterX -= 30; // subtracts 30 from the value of characterX when the key is pressed
       } // closes if conditional
       else if (keyCode === RIGHT_ARROW) { // opens else if conditional for when keyCode is right arrow - only runs when the previous conditional is false
           characterX += 30; // adds 30 to the value of characterX when the key is pressed
       } // closes else if conditional
       else if (keyCode === UP_ARROW) { // opens else if conditional for when keyCode is up arrow - only runs when the previous conditionals are false
           characterY -= 30; // subtracts 30 from the value of characterY when the key is pressed
       } // closes else if conditional
       else if (keyCode === DOWN_ARROW) { // opens else if conditional for when keyCode is down arrow - only runs when the previous conditionals are false
           characterY += 30; // adds 30 to the value of characterY when the key is pressed
       } // closes else if conditional
   } // closes if conditional

   // the following if conditional restricts the user from taking the character out of the bounds of the canvas and resets the character to the starting point if they hit the set boundaries
   if (characterX > 390 || characterX <= 0 || characterY > 400 || characterY <= 0) { // opens if conditional for when the characterX and characterY coordinates approximately hit the canvas boundaries
       characterX = 25; // resets characterX value
       characterY = 25; // resets characterY value
   } // closes if statement

} // closes function keyPressed()


function mousePressed() { // opens function mousePressed()


if (gameState === "gameWon" || gameState === "timeUp" || gameState === "runningLevel") {
   gameState = "start"; // sets gameState to start to go back to the start screen
   background(220); // sets background to grey
   drawStartScreen(); // calls drawStartScreen() function
   startTime = millis(); // Resets the timer
}
} // closes function mousePressed()


function drawStartScreen() { // opens drawStartScreen() function
   background(220); // sets background to grey
   frameRate(60); // sets frameRate to 60
   let biteSize = PI / 16; // defines biteSize variable that holds a small angle for the mouth of the character
   let startAngle = biteSize * sin(frameCount * 0.1) + biteSize; // calculates start angle for the mouth of the character
   let endAngle = TWO_PI - startAngle; // calculates end angle for the mouth of the character
   fill(0, 0, 255); // fills character with color blue
   noStroke(); // allows the shape to have no outline/border
   arc(100, 250, 150, 150, startAngle, endAngle, PIE); // draws arc shape for the character


   noStroke(); // allows the shape to have no outline/border
   fill(255); // fill white
   ellipse(150, 170, 20); // draws ellipse for thought bubbles
   ellipse(180, 140, 35); // draws ellipse for thought bubbles
   ellipse(296, 100, 210, 160); // draws ellipse for text box


   fill(0); //sets text color to black
   textAlign(LEFT, TOP); // aligns the text to be located at the top left
   textSize(20); // sets text size to 20
   textStyle(BOLD); // bolds text
   text("Welcome to MyMaze!", 200, 90); // defines text and its coordinates
   text("Press the Spacebar", 205, 120); // defines text and its coordinates
   text("to start!", 260, 150); // defines text and its coordinates


} // closes drawStartScreen() function


function drawInstructionScreen() { // opens drawInstructionScreen() function
   background(220); // sets background color to grey
   frameRate(60); // sets frameRate to 60
   // Draw blue arc character
   fill(0, 0, 255); // fills character with blue color
   noStroke(); // allows the shape to have no outline/border
   let biteSize = PI / 16; // defines biteSize variable that holds a small angle for the mouth of the character
   let startAngle = biteSize * sin(frameCount * 0.1) + biteSize; // calculates start angle for the mouth of the character
   let endAngle = TWO_PI - startAngle; // calculates end angle for the mouth of the character
   arc(100, 250, 120, 120, startAngle, endAngle, PIE); // draws arc shape for the character


   fill(255); // fill white
   ellipse(150, 195, 20); // draws ellipse for thought bubbles
   ellipse(180, 174, 37); // draws ellipse for thought bubbles
   ellipse(240, 90, 220, 160); // draws ellipse for thought bubbles


   // text
   fill(0); // sets text color to black
   textAlign(TOP, CENTER); // aligns the text to be located at the top center
   textSize(16); // sets text size to 16
   textStyle(BOLD); // bolds text
   text("Instructions:", 162, 40); // defines text and its coordinates
   textSize(13); // sets text size to 14
   text("Use the arrow keys to navigate", 145, 70); // defines text and its coordinates
   text("your character through the mazes.", 140, 90); // defines text and its coordinates
   text("Watch out for the timer!", 145, 115); // defines text and its coordinates
   text("Don't hit the walls!", 155, 140); // defines text and its coordinates
   textSize(24)
   text("Press the Spacebar to Start", 50, 340); // defines text and its coordinates
} // closes drawInstructionScreen() function


function drawCharacterSelection() { // opens drawCharacterSelection() function
   background(220); // sets background color to grey
   frameRate(60); // sets frameRate to 60
   fill(0); // sets text color to black
   textAlign(CENTER, TOP); // aligns the text to be located at the top center
   textSize(24); // sets text size to 24
   text("Click to Select your Character", width / 2, 30); // defines text and its coordinates
   drawCharacters(); // calls drawCharacters() function
} // closes drawCharacterSelection() function


function drawCharacters() { // opens drawCharacters() function
   let biteSize = PI / 16; // defines biteSize variable that holds a small angle for the mouth of the character
   let startAngle = biteSize * sin(frameCount * 0.1) + biteSize; // calculates start angle for the mouth of the character


   // Draw blue arc character
   fill(0, 0, 255); // fills character with blue color
   noStroke(); // allows the shape to have no outline/border
   arc(50, 200, 80, 80, startAngle, TWO_PI - startAngle, PIE); // draws the shape of the charaacter


   // Draw purple arc character
   fill(128, 0, 128); // fills character with purple color
   arc(150, 200, 80, 80, startAngle, TWO_PI - startAngle, PIE); // draws the shape of the character


   // Draw green arc character
   fill(0, 255, 0); // fills character with green color
   arc(250, 200, 80, 80, startAngle, TWO_PI - startAngle, PIE); // draws the shape of the character


   // Draw red arc character
   fill(255, 0, 0); // fills character with red color
   arc(350, 200, 80, 80, startAngle, TWO_PI - startAngle, PIE); // draws the shape of the character
} // closes drawCharacters() function


function mouseClicked() { // opens function mouseClicked()
   if (gameState === "characterSelection") { // opens if conditional statement for when gameState is "characterSelection"
       if (mouseX >= 10 && mouseX <= 130 && mouseY >= 160 && mouseY <= 240) { // opens if conditional for when the mouse's X and Y coordinates are within the coordinates of the blue arc character and it is clicked
           selectedCharacter = "blue"; // selects the blue arc character
           characterX = 25; // sets the initial characterX value to start at the starting point
           characterY = 25;  // sets the initial characterY value to start at the starting point
           gameState = "runningLevel"; // starts the level
       } // closes if statement
       else if (mouseX >= 110 && mouseX <= 230 && mouseY >= 160 && mouseY <= 240) { // opens else if conditional for when the mouse's X and Y coordinates are within the coordinates of the purple arc character and it is clicked
           selectedCharacter = "purple"; // selects the purple arc character
           characterX = 25; // sets the initial characterX value to start at the starting point
           characterY = 25; // sets the initial characterY value to start at the starting point
           gameState = "runningLevel"; // starts the level
       } // closes else if statement
       else if (mouseX >= 210 && mouseX <= 330 && mouseY >= 160 && mouseY <= 240) { // opens else if conditional for when the mouse's X and Y coordinates are within the coordinates of the green arc character and it is clicked
           selectedCharacter = "green"; // selects the green arc character
           characterX = 25; // sets the initial characterX value to start at the starting point
           characterY = 25; // sets the initial characterY value to start at the starting point
           gameState = "runningLevel"; // starts the level
       } // closes else if statement
       else if (mouseX >= 310 && mouseX <= 430 && mouseY >= 160 && mouseY <= 240) { // opens else if conditional for when the mouse's X and Y coordinates are within the coordinates of the red arc character and it is clicked
           selectedCharacter = "red"; // selects the red arc character
           characterX = 25; // sets the initial characterX value to start at the starting point
           characterY = 25; // sets the initial characterY value to start at the starting point
           gameState = "runningLevel"; // starts the level
       } // closes elseif statement
   } // closes if statement
} // closes function mouseClicked()


function runLevel(levelFunction, levelText, timeLimit) { // opens function runLevel
   levelFunction(levelText); // calls the function to start the timer
   let elapsedTime = (millis() - startTime) / 1000; // calculations to determine elapsedTime in seconds - elapsed time is calculated by subtracting the start time from the current time and converting the result from milliseconds to seconds by dividing by 1000
   let timeRemaining = timeLimit - elapsedTime; // calculations to determine timeRemaining - time remaining is calculated by subtracting the elapsed time from the time limit.


   noStroke(); // allows for no outline/boundary
   fill(0); // sets text color to black
   textAlign(RIGHT); // aligns the text to appear on the right side of the canvas
   textSize(16); // sets text size to 16
   text('Time left: ' + ceil(timeRemaining), width - 10, height - 20); // displays the time remaining for the player on that level


   if (timeRemaining <= 0) { // opens if conditional statement for when the timeRemaining value is less than or equal to 0
       gameState = "timeUp"; // sets gameState to "timeUp"
   } // closes if conditional statement
} // closes function runLevel()


function drawMaze(levelText) { // opens function drawMaze()
   background(220); // sets background to grey


   // Draw maze walls
   strokeWeight(4); // sets width of maze walls to 4
   stroke(0); // sets stroke to black
   // the following for loop draws walls, iterates over maze walls, gets wall coordinates, and draws lines for each wall. It iterates over the mazes array
   for (let i = 0; i < mazes[currentLevel - 1].length; i++) { // opens for loop - initializes i, sets the condition (while calling the mazes array), and sets the increment to +1
       let wall = mazes[currentLevel - 1][i]; // retrieves a wall segment from the mazes array based on the current level and index i
       line(wall.x1, wall.y1, wall.x2, wall.y2); // Draws a line on the canvas representing the wall segment using its coordinates x1, y1, x2, and y2
   } // closes for loop


   // draw start point
   fill(0, 255, 0); // fills start point with green color
   noStroke(); // allows the point to have no outline/boundary
   ellipse(25, 25, 20, 20); // draws ellipse for start point


   // draw end point
   fill(255, 0, 0); // fills end point with red color
   ellipse(375, 350, 20, 20); // draws ellipse for end point


   // Display current level
   textAlign(LEFT); // aligns text to the left side of the canvas
   textSize(16); // sets text size to 16
   text("Level " + currentLevel, 10, height - 20); // displays the current level of the player


   // Check if the player has won
   let d = dist(characterX, characterY, endPoint.x, endPoint.y); // calculates the distance between the character's current position and the endpoint of the maze
   if (d < 20) { // opens if conditional statement and sets condition to check if character is close to the endpoint
       currentLevel++; // increments current level
       if (currentLevel > mazes.length) { // checks if all levels are completed
           currentLevel = 1; // resets to level 1 after completing all levels
           gameState = "gameWon"; // sets gameState to "gameWon"
       } // closes if statement
       else { // opens else statement / if all levels are not completed
           characterX = 25; // resets characterX value to starting point
           characterY = 25; // resets characterY value to starting point
           startTime = millis(); // resets the timer for the new level
       } // closes else statement
   } // closes if conditional statement


   drawSelectedCharacter(); // calls drawSelectedCharacter function so that the selected character moves onto the maze as the user's character
} // closes drawMaze function()


function drawSelectedCharacter() { // opens function drawSelectedCharacter()
   let biteSize = PI / 16; // defines biteSize variable that holds a small angle for the mouth of the character
   let startAngle = biteSize * sin(frameCount * 0.1) + biteSize; // calculates start angle for the mouth of the character


   if (selectedCharacter === "blue") { // opens if statement for when the selected character is "blue"
       fill(0, 0, 255);  // fills character with blue color
   } // closes else if statement
   else if (selectedCharacter === "purple") { // opens if statement for when the selected character is "purple"
       fill(128, 0, 128); // fills character with purple color
   } // closes else if statement
   else if (selectedCharacter === "green") { // opens if statement for when the selected character is "green"
       fill(0, 255, 0); // fills character with green color
   } // closes else if statement
   else if (selectedCharacter === "red") { // opens if statement for when the selected character is "red"
       fill(255, 0, 0); // fills character with red color
   } // closes else if statement
   noStroke(); // allows the shape of the character to have no outline/boundary
   arc(characterX, characterY, 20, 20, startAngle, TWO_PI - startAngle, PIE); // draws arc for character
} // closes drawSelectedCharacters() function


function drawTimeUpScreen() { // opens function drawTimeUpScreen()
   background(220); // sets background color to grey


   let biteSize = PI / 16; // defines biteSize variable that holds a small angle for the mouth of the character
   let startAngle = biteSize * sin(frameCount * 0.1) + biteSize; // calculates start angle for the mouth of the character
   let endAngle = TWO_PI - startAngle; // calculates end angle for the mouth of the character
   fill(0, 0, 255); // fills shape with blue color
   noStroke(); // allows the shape to have no outline/boundary
   arc(100, 250, 150, 150, startAngle, endAngle, PIE); // draws arc shape for character


   noStroke(); // allows the shape to have no outline/boundary
   fill(255); // fills shape with white
   ellipse(150, 170, 20); // draws ellipse for thought bubbles
   ellipse(180, 140, 35); // draws ellipse for thought bubbles
   ellipse(296, 100, 210, 160); // draws ellipse for text box


   fill(0); // sets text color to black
   textAlign(LEFT, TOP); // aligns text to top left side of the canvas
   textSize(20); // sets text size to 20
   text("Time's up! You lost.", 200, 90); // defines text and its coordinates
   text("Press the mouse", 205, 120); // defines text and its coordinates
   text("to restart.", 220, 140); // defines text and its coordinates


   textStyle(BOLD); // sets text style to bold
   fill(0, 0, 255) // sets text color to blue
   textSize(32); // sets text size to 32
   text("WOMP WOMP!", 150, 320); // defines text and its coordinates


// the following while loop sets the sad emojis that appear randomly on the page that appears when the user loses the game
   let i = 0;  // initializes value
 while (i < 50) { // opens while loop and sets its condition
   let x = random(width); // sets x value to have a random value assigned in the range of the width of the canvas
   let y = random(height); // sets y value to have a random value assigned in the range of the height of the canvas
   textSize(20); // sets text size to 20
   frameRate(7); // sets frameRate to 7
   text("😪", x, y); // defines text and its coordinates (random values)
   i+=8; // sets increment - adds 8 to i every time the loop runs
 } // closes while loop
} // closes drawTimeUpScreen() function


function drawGameWonScreen() { // opens function drawGameWon()
 background(220); // sets background to grey


 let biteSize = PI / 16; // defines biteSize variable that holds a small angle for the mouth of the character
 let startAngle = biteSize * sin(frameCount * 0.1) + biteSize; // calculates start angle for the mouth of the character
 let endAngle = TWO_PI - startAngle; // calculates end angle for the mouth of the character
 fill(0, 0, 255); // fills character with color blue
 noStroke(); // allows the shape to have no outline/border
 arc(100, 250, 150, 150, startAngle, endAngle, PIE); // draws arc shape for the character


 fill(255); // fill white
 ellipse(150, 170, 20); // draws ellipse for thought bubble
 ellipse(180, 140, 35); // draws ellipse for thought bubble
 ellipse(296, 100, 210, 160); // draws ellipse for text box


 fill(0); // sets text color to black
 textAlign(LEFT, TOP); // aligns the text to be located at the top left
textSize(18); // sets text size to 18
 text("Congratulations!", 205, 50); // defines text and its coordinates
 text("You have won!", 200, 80); // defines text and its coordinates
 text("To restart, press the", 205, 110); // defines text and its coordinates
 text("mouse.", 205, 130); // defines text and its coordinates
  textStyle(BOLD); // sets text style to bold
 textSize(32); // sets text size to 32
 fill(0, 0, 255); // sets text color to blue
 text("YAYYYY!!", 150, 320); // defines text and its coordinates


 // the following for loop sets the circles to appear on the screen at random to appear as celebratory confetti. It initializes the value, sets the condition, and the increment
 for (let i = 0; i < 50; i++) { // opens for loop. Value is initialized to 0, condiiton is set to i<50, and the increment is +1
   let x = random(width); // sets x to be a random number within the range of the width of the canvas
   let y = random(height); // sets y to be a random number within the range of the height of the canvas
   let r = random(5, 15); // sets the radius to be a random number between 5 and 14.99
   fill(random(255), random(255), random(255)); // fills the curcles with random colors
   ellipse(x, y, r, r); // draws the ellipse with x, y, and r values
   frameRate(10); // sets frameRate to 10
} // closes for loop
} // closes drawGameWonScreen() function
