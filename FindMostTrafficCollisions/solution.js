// Carburetor Springs Police Department is looking to improve their response
// times to traffic collisions by setting up cameras at the intersection
// with the most traffic collisions.
// Carburetor Springs Police Department decided to hire you to help them
// determine which intersection has the most traffic collision events.
// You have been provided with a dataset consisting of history of events
// collected from the police department's records management system.

// Explanation of the Input:
//     An event consists of 3 fields: {street1, street2, numVehiclesInvolved}

// Which will be provided to you in way that works for whatever language you pick.
//     Example: {"Greenwich", "Spring", 1},
//          or: { street1: "Greenwich", street2: "Spring", numVehiclesInvolved: 1 },

// Consider the following example.

// Input:
// [
//     { street1: "Hudson", street2: "Canal", numVehiclesInvolved: 3 },
//     { street1: "6th", street2: "Canal", numVehiclesInvolved: 4 },
//     { street1: "6th", street2: "Canal", numVehiclesInvolved: 2 },
//     { street1: "Hudson", street2: "Canal", numVehiclesInvolved: 2 },
//     { street1: "Hudson", street2: "Canal", numVehiclesInvolved: 3 },
//     { street1: "Hudson", street2: "Dominick", numVehiclesInvolved: 2 },
//     { street1: "Greenwich", street2: "Spring", numVehiclesInvolved: 1 },
//     { street1: "Greenwich", street2: "Spring", numVehiclesInvolved: 0 },
// ]

// Output: "Hudson & Canal"

// In this example, the intersection, "Hudson & Canal" has the most traffic collisions and is
// therefore the most traffic-collision-prone intersection.

// Let’s talk about your plan of attack before you start coding, and remember
// to keep talking me through what you are doing as you code.
// Don't forget to consider any possible edge cases.
// 1) What happens if the street 1 and street 2 are switched? Hudson & Canal vs Canal & Hudson

function findMostTrafficCollisions(events) {
  const results = {};
  let largestNum = 0;
  let crossStreet = null;
  for (let i = 0; i < events.length; i++) {
    if (events[i].numVehiclesInvolved > 0) {
      const key = events[i].street1 + ' % ' + events[i].street2;
      const key2 = events[i].street2 + ' % ' + events[i].street1;

      if (results[key] === undefined) {
        results[key] = 1;
        results[key2] = 1;
      } else {
        results[key] += 1;
        results[key2] += 1;
      }
      if (results[key] > largestNum) {
        largestNum = results[key];
        crossStreet = key;
      }
    }
  }

  console.log(`result: `, results);
  // console.log(`largestNum `, largestNum)
  // console.log(`crossStreet `, crossStreet)
  return crossStreet;
}

const events = [
  { street1: 'Hudson', street2: 'Canal', numVehiclesInvolved: 3 },
  { street1: 'Canal', street2: 'Hudson', numVehiclesInvolved: 1 },
  { street1: '6th', street2: 'Canal', numVehiclesInvolved: 4 },
  { street1: '6th', street2: 'Canal', numVehiclesInvolved: 2 },
  { street1: 'Canal', street2: '6th', numVehiclesInvolved: 2 },
  { street1: 'Hudson', street2: 'Canal', numVehiclesInvolved: 2 },
  { street1: 'Hudson', street2: 'Canal', numVehiclesInvolved: 3 },
  { street1: 'Hudson', street2: 'Dominick', numVehiclesInvolved: 2 },
  { street1: 'Greenwich', street2: 'Spring', numVehiclesInvolved: 1 },
  { street1: 'Greenwich', street2: 'Spring', numVehiclesInvolved: 0 },
];

console.log(findMostTrafficCollisions(events));
