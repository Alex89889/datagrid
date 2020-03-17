import React, { Component} from "react";
import Grid from './components/Grid/';
import GridFilter from './components/GridFilter/';
import GridFilterNum from './components/GridFilterNum/';
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
	  filterField: '',
	  selectedEmails: [],
	  role:['mentor', 'student'],
	  statusSt: ['active', 'inactive']
    }
	
  }
  
  componentWillMount() {
    for (let i = 0; i < 1000; i++) {
	  let randomRole = this.state.role[(Math.floor(Math.random() * (this.state.role.length)))];
	  let randomStatus = this.state.statusSt[(Math.floor(Math.random() * (this.state.statusSt.length)))];
	  let newRole = `${randomRole}, ${randomStatus}`
      const user = {
        id: i,
		firstName: Faker.name.firstName(),
		lastName: Faker.name.lastName(),
		login: Faker.internet.userName(),
		avatar: Faker.internet.avatar(),
		email: Faker.internet.email(),
		mentor: Faker.internet.userName(),
		active: Faker.random.boolean(),
		role: newRole
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
    this.setState({search});
  }
  
  filterHandler = filterField => { 
    this.setState({filterField});
  }
  
  
  
   getFilteredData(){

    const {users, search, filterField} = this.state;

    if (!filterField && !search) {
      return users
    }
	if(search){
	var result = users.filter(item => {
      return (
       item["login"].toLowerCase().includes(search.toLowerCase()) ||
	   item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
	   item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
       item["email"].toLowerCase().includes(search.toLowerCase()) ||
       item["mentor"].toLowerCase().includes(search.toLowerCase())||
       item["role"].toLowerCase().includes(search.toLowerCase())  
       || item["active"].toString().toLowerCase().includes(search.toLowerCase())
     );
    });
	}
	 
	if(filterField){
	  let filterFieldStr = filterField.join(' ');
	  result = users.filter(item => {
      return (
       item["role"].toLowerCase().includes(filterFieldStr.toLowerCase())  
     );
    });	
	}
   if(!result.length){
     result = users
   }
    return result
  }
  
  
  
  render() {
	const filteredData = this.getFilteredData();

	return (
      <div className="App">
        <header className="App-header">
          <div className="col-lg-12 sg-display">
		    <h2 className="sg-h2">DataGrid React</h2>
		  </div>
        </header>
		<GridFilter onSearch={this.searchHandler} />
		<GridFilterNum onFilter={this.filterHandler} />
	    <Grid 
		  users={filteredData}
		  onSort={this.onSort} 
		  sortArray={this.state.sortArray}
		  sortFieldArray={this.state.sortFieldArray}	
          selectChange = {this.selectChange}	
		  selectedEmails = {this.state.selectedEmails}
		/>
      </div>
    );
  }
}

export default App;