# Application Logs

## Problem Statement

Are you familiar with application logs or a log file?

We have an application with 26 buttons labeled A through Z that users can click on in 
any order they want and as many times as they want. Each time a user clicks a button 
the action is logged in a file/array.

Unfortunately, for our app, it has been reported that some users are encountering an error. 
We've resolved the error but we would like to provide our Customer Success team with a 
list of users that encountered the error so we can send them some "we’re sorry" swag.
What we know is that the error is caused by a sequence of button presses in exactly this order:
A press followed by B press followed by C press.

Given a sorted list of logs (by time oldest to newest) please create a function that will
return a list of users that experienced the error

Input:
```
[
  { user: 1, action: 'A' },
  { user: 1, action: 'B' },
  { user: 2, action: 'A' },
  { user: 1, action: 'C' },
  { user: 2, action: 'B' },
  { user: 3, action: 'Z' },
  { user: 2, action: 'B' },
  { user: 2, action: 'C' },
  { user: 3, action: 'A' },
  { user: 3, action: 'B' },
  { user: 3, action: 'C' },
];
```

Output:
```
[ 1, 3 ]
[execution time limit] 4 seconds (js)
```
