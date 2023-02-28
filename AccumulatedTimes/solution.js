/** 
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

map(Lobby = 30, Hallway1 = 60, Room1 = 20, Hallway2 = 50)

*/

const getTimeSpent = (stack, currentRoom) => {
  const currentTimePeriod = parseInt(currentRoom.split(' ')[1]);
  const prevTimePeriod = parseInt(stack[stack.length - 1].split(' ')[1]);
  const totalTimeSpent = currentTimePeriod - prevTimePeriod;
  return totalTimeSpent;
};

function accumulate(list) {
  const result = {};
  const stack = [];

  list.forEach((currentItem) => {
    console.log(`\n what is result: `, result);
    console.log(`what is stack: `, stack);
    const current = currentItem.split(' ');
    const currentTimePeriod = parseInt(current[1]);
    const currentAction = current[2];

    if (currentAction === 'Enter') {
      if (stack.length > 0) {
        const prevRoom = stack[stack.length - 1].split(' ')[0];
        const totalTimeSpent = getTimeSpent(stack, currentItem);
        if (result[prevRoom] !== undefined) {
          result[prevRoom] = result[prevRoom] + totalTimeSpent;
        } else {
          result[prevRoom] = totalTimeSpent;
        }
      }
      stack.push(currentItem);
    } else {
      const prevRoom = stack[stack.length - 1].split(' ')[0];
      const totalTimeSpent = getTimeSpent(stack, currentItem);
      if (result[prevRoom] !== undefined) {
        result[prevRoom] = result[prevRoom] + totalTimeSpent;
      } else {
        result[prevRoom] = totalTimeSpent;
      }
      stack.pop();
      // Update last item in stack with correct time period
      if (stack.length > 0) {
        const temp = stack[stack.length - 1].split(' ');
        temp[1] = currentItem.split(' ')[1];
        stack[stack.length - 1] = temp.join(' ');
      }
    }
  });
  return result;
}

const list = [
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
console.log(accumulate(list));
