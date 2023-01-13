// Sample Front End Tech Screen
// https://jsfiddle.net/x7na2Lsq/#
// 1. Make an api call to https://reduxblog.herokuapp.com/api/posts?key=123 and display the results in a table
// 2. Create a button that filters the empty titles from the data
// 3. Add error handling if the api returns an error
// 4. Write psuedo unit tests of how you would test this componentDidMount
// 5. What other improvements could you make to this component? Optimize rerendering. Break out jsx into subcomponents. 

class TitleList extends React.Component {
  constructor(props) {
    super(props)
  }
  

  componentDidMount() {
  }
  
  render() {

		return null;
  }
}

ReactDOM.render(<TitleList />, document.querySelector("#app"));
