// The issue with line 27 is that process.env.VOYAGER_URI could potentially be undefined
// Answer:
// Can we guarantee that process.env.VOYAGER_URI will not be undefined? .toString could potentially throw an error if undefined
// We should have a fallback value for process.env.VOYAGER_URI in the case it resolves to undefined