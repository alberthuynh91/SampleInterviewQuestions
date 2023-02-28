/** 
 * A dasher is dropping off orders in a large building and we want to compute how much time they spend in each room. 
 * We are given a list of elements containing the name of a room, a time period, and a value indicating 
 * whether a user is entering/leaving the room. The dasher cannot be in more than one room at the same time. 
 * Once they exit a room, they return to the previous room. Determine the time spent in each room. i.e.:
 * 
 * Input:
Lobby 0 Enter
Hallway1 10 Enter
Room1 30 Enter
Room1 40 Exit // back in hallway1 now
Room1 50 Enter
Room1 60 Exit
Hallway1 90 Exit // back in Lobby
Hallway2 100 Enter
Hallway2 150 Exit
Lobby 160 Exit

* Output:
map(Lobby = 30, Hallway1 = 60, Room1 = 20, Hallway2 = 50)

*/

function accumulate(list) {}

const input = [
  'Lobby 0 Enter',
  'Hallway1 10 Enter',
  'Room1 30 Enter',
  'Room1 40 Exit', // back in hallway1 now
  'Room1 50 Enter',
  'Room1 60 Exit',
  'Hallway1 90 Exit', // back in Lobby
  'Hallway2 100 Enter',
  'Hallway2 150 Exit',
  'Lobby 160 Exit',
];
console.log(accumulate(input));
