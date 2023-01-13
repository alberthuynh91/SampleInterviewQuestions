class TitleList extends React.Component {
  constructor(props) {
    super(props)
		this.state = {
    	data: [],
      errorMsg: ''
    }
  }
  
  // Test that api returns some type of data. { id, title, categories, content }
  componentDidMount() {
  	fetch('https://reduxblog.herokuapp.com/api/posts?key=123')
 	 			.then(response => response.json())
  		.then(data => this.setState({ data }))
      .catch(() => {
      	// error logging
        console.log(`am i inside`)
        this.setState({ errorMsg: 'Error getting data'})
      })
  }
  
  // Test handleclick that it does some.
  handleClick = () => {
  	const { data } = this.state
    const noMissingTitles = data.filter((item) => {
    	return item.title !== null
    })
    this.setState({ data: noMissingTitles })
  }
  
  
  render() {
 
 if (this.state.errorMsg !== '' && this.state.errorMsg) {
 return (
 <div>
{this.state.errorMsg !== '' && this.state.errorMsg}
 </div>
 )
 }
  return this.state.data.length > 0 && (
  <div>
  	<table>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>categories</th>
        <th>content</th>
      </tr>
      {
        this.state.data.map((item) => {
    		return (
        <tr>
        	<td>{item.id}</td>
        	<td>{item.title}</td>
        	<td>{item.categories}</td>
        	<td>{item.content}</td>
        </tr>
				)
   		 })
      }
    </table>
    <button onClick={this.handleClick}>Filter row w/o title</button>
   
    </div>
  )
    
		return null;
  }
}

ReactDOM.render(<TitleList />, document.querySelector("#app"));
