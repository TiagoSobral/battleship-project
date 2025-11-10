# 🚢 Battleship (The Odin Project)

**Live:** [BattleShip Game](https://tiagosobral.github.io/battleship-project/)

## 🚀 Overview

The project focuses on using **object-oriented programming**, **modular architecture**, and **testing** to simulate the logic of the classic Battleship game.  
You’ll implement ships, gameboards, players (human and computer), and create an interactive UI to play the game.


## 🧩 Project Instructions

### 1. 🛳️ Ship Class / Factory
1. Create a `Ship` class or factory function.
2. Each ship should include:
   - Its **length**
   - The **number of times** it has been hit
   - Whether or not it has been **sunk**
3. Add a `hit()` method that increases the hit count.
4. Add an `isSunk()` method that checks if the ship is sunk (`hits === length`).
5. Only test the **public interface** — internal logic doesn’t need direct tests.

### 2. 🗺️ Gameboard Class / Factory
1. Create a `Gameboard` class or factory function.  
2. No UI yet — use **unit tests** instead of `console.log()` for verification.  
3. The Gameboard should:
   - Place ships at specific coordinates by calling the `Ship` class/factory.
   - Include a `receiveAttack()` method that:
     - Takes a pair of coordinates.
     - Determines if the attack hit a ship.
     - Calls `ship.hit()` for a hit or records a **miss**.
   - Keep track of **missed attacks**.
   - Report if **all ships have been sunk**.

### 3. 👥 Player Class / Factory
1. Create a `Player` class or factory.
2. Include **two types of players**:
   - Human Player
   - Computer Player
3. Each player should contain its own **Gameboard**.
4. The computer player should make **random but legal** moves (no repeats).

### 4. ⚙️ Game Logic & DOM Interaction
1. Import your classes/factories into a main file that drives the game.  
2. Use **event listeners** to interact with objects through the DOM.  
3. Begin building your **User Interface**:
   - Create two gameboards (one per player).
   - Populate boards with **preset ship positions** for now.
   - Render boards using data from the `Gameboard` class.
4. Implement **turn-based gameplay**:
   - The user clicks a coordinate on the enemy board to attack.
   - Alternate turns between the player and the computer.
   - Ensure the computer does not attack the same spot twice.
5. Re-render the boards after each turn to show updated hits/misses.
6. End the game when **all ships** on one board are sunk, and display a **Game Over** message.

### 5. ⚓ Ship Placement System
1. Add functionality for **players to place their ships**:
   - Let them input coordinates manually, or  
   - Add a **random placement** button for convenience.

## 🌟 Extra Credit

1. Implement **drag-and-drop** functionality for player ship placement.
2. Add a **2-player mode**, allowing players to take turns on the same device:
   - Include a “pass device” screen between turns to hide boards.

## 👷🏻 Struggles

The biggest challenge in this project was definitely the **drag-and-drop extra credit** feature.  

Getting the basic drag-and-drop functionality to work was manageable, but refining it took a lot more effort, especially when handling **hover styling** to visually indicate when a ship couldn’t be dropped in a valid position. Managing all the edge cases where ships would overlap or go out of bounds required a lot of trial and error.  

Another tricky part was making the logic flexible enough to support **rotated ships**. When a ship’s orientation changed from horizontal to vertical, all the calculations for valid positions, placement detection, and DOM updates had to adapt dynamically.  

After some debugging and reorganizing the logic behind the placement validation, everything finally worked smoothly — but this feature easily took the most time and patience to get right.


