import React, { Component} from "react";
import Grid from './components/Grid/';
import GridFilter from './components/GridFilter/';
import Faker from 'faker';
import _ from 'lodash';

class App extends Component {
	
  constructor(props) {
    super(props)
    this.state = {
      users: [],
	  sort: 'asc',  // 'desc'
	  sortField: 'id',
	  search: '',
    }
  }
  
  componentWillMount() {
    for (let i = 0; i < 1000; i++) {
      const user = {
        id: i,
	    github: Faker.internet.userName(),
		name: Faker.internet.userName(),
		avatar: Faker.internet.avatar(),
		email: Faker.internet.email(),
		score: Faker.random.number(),
		mentor: Faker.internet.userName(),
		active: Faker.random.boolean(),
      }
      this.setState(prevState => ({
        users: [...prevState.users, user],
      }))
    }
  }
  
  onSort = sortField => { 
    const cloneData = this.state.users.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
    const orderedData = _.orderBy(cloneData, sortField, sortType);

    this.setState({
      users: orderedData,
      sort: sortType,
      sortField
    })
  }
  
  searchHandler = search => {
    this.setState({search, currentPage: 0})
  }
  
   getFilteredData(){
    const {users, search} = this.state

    if (!search) {
      return users
    }
   var result = users.filter(item => {
     return (
       item["name"].toLowerCase().includes(search.toLowerCase()) ||
       item["github"].toLowerCase().includes(search.toLowerCase()) ||
       item["email"].toLowerCase().includes(search.toLowerCase()) ||
       item["score"].toLowerCase().includes(search.toLowerCase()) ||
       item["mentor"].toLowerCase().includes(search.toLowerCase()) ||
       item["active"].toLowerCase().includes(search.toLowerCase())
     );
   });
   if(!result.length){
     result = this.state.users
   }
    return result
  }
  
  render() {
	const filteredData = this.getFilteredData();
    // debugger
  //  const pageCount = Math.ceil(filteredData.length / pageSize)
  //  const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]
	
	return (
      <div className="App">
        <header className="App-header">
          <div className="col-lg-12 sg-display">
		    <h2 className="sg-h2">DataGrid React</h2>
		  </div>
        </header>
		<GridFilter onSearch={this.searchHandler} />
	    <Grid 
		  users={filteredData}
		  onSort={this.onSort} 
		  sortField={this.state.sortField}
		  sort={this.state.sort}
		/>
      </div>
    );
  }
}

export default App;
