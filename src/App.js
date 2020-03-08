import React, { Component} from "react";
import Grid from './components/Grid/';
import Faker from 'faker';
import _ from 'lodash';

class App extends Component {
	
  constructor(props) {
    super(props)
    this.state = {
      users: [],
	  sort: 'asc',  // 'desc'
	  sortField: 'id',
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
  
  render() {
	return (
      <div className="App">
        <header className="App-header">
       
        </header>
	    <Grid 
		  users={this.state.users}
		  onSort={this.onSort} 
		  sortField={this.state.sortField}
		  sort={this.state.sort}
		/>
      </div>
    );
  }
}

export default App;
