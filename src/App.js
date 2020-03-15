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
      sortArray: [],
      sortFieldArray: [],	  
	  search: '',
    }
  }
  
  componentWillMount() {
    for (let i = 0; i < 1000; i++) {
      const user = {
        id: i,
	    github: Faker.internet.userName(),
		firstName: Faker.name.firstName(),
		lastName: Faker.name.lastName(),
		login: Faker.internet.userName(),
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
  
  onSort = sortField => event => { 
    const cloneData = this.state.users.concat();
	const cloneSortField = this.state.sortFieldArray.concat();
	const cloneSort = this.state.sortArray.concat();
	let orderedData;
	
    if (event.shiftKey) {
	  if(cloneSortField.indexOf(sortField) !== -1){
		let indexSortField = cloneSortField.indexOf(sortField);
		cloneSort[indexSortField] = this.state.sortArray[indexSortField] === 'asc' ? 'desc' : 'asc';
	  }
	  else{
		cloneSortField.push(sortField);
		cloneSort.push('asc');
	  }
	  orderedData = _.sortBy(cloneData, cloneSortField, cloneSort);
    }
	else{
	  if(cloneSortField.indexOf(sortField) !== -1 || cloneSortField[0]===sortField){
		cloneSort[0] = this.state.sortArray[0] === 'asc' ? 'desc' : 'asc';
	  }
	  else{
		cloneSortField.length = 0;
		cloneSort.length = 0;
		cloneSortField.push(sortField);
		cloneSort.push('asc'); 
	  }
      orderedData = _.orderBy(cloneData, cloneSortField, cloneSort); 	
	}
    this.setState({
      users: orderedData,
      sortFieldArray: cloneSortField,
	  sortArray: cloneSort
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
		  sortArray={this.state.sortArray}
		  sortFieldArray={this.state.sortFieldArray}	  
		/>
      </div>
    );
  }
}

export default App;
