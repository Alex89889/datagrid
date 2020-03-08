import React, { Component} from "react";
import style from './GridStyles.css';
import Faker from 'faker';


class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
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
  
  render() {
	  return (
	    
	      <section className="worklog" css={style}>
	        <div className="col-lg-12 sg-display">
		        <h2 className="sg-h2">DataGrid React</h2>
		
			      <table className="table table-striped table-bordered table-condensed">
              <thead>
                <tr>
				  <th>avatar</th>
                  <th>name</th>
                  <th>github</th>
				  <th>email</th>
                  <th>score</th>
                  <th>mentor</th>
				  <th>active</th>
                </tr>
              </thead>
              <tbody>
			      { this.state.users.map(item =>(
				  <tr key={item.id}>
				    <td><img src={item.avatar} alt={item.name} width="50" height="50" /></td>
					<td>{item.name}</td>
                    <td>{item.github}</td>
                    <td>{item.email}</td>
					<td>{item.score}</td>
					<td>{item.mentor}</td>
					<td>{String(item.active)}</td>
                  </tr>
				        ))}
              </tbody>
			  </table>
			</div>
            
	      </section>
	  
	  );
  }
}

export default Grid;
