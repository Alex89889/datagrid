import React, { Component} from "react";
import style from './GridStyles.css';


class Grid extends Component {

  render() {
      const indexSortId =  this.props.sortFieldArray.indexOf('id');
	  const indexSortFirstName =  this.props.sortFieldArray.indexOf('firstName');
	  const indexSortLastName =  this.props.sortFieldArray.indexOf('lastName');
	  const indexSortLogin =  this.props.sortFieldArray.indexOf('login');
	  const indexSortEmail =  this.props.sortFieldArray.indexOf('email');
	  const indexSortMentor =  this.props.sortFieldArray.indexOf('mentor');
	  const indexSortActive =  this.props.sortFieldArray.indexOf('active');
	  const indexSortRole =  this.props.sortFieldArray.indexOf('role');
      
	  return (
	    <section className="data" css={style}>
		  <div className="col-table sg-display">
		    
            <table className="table table-striped table-bordered table-condensed" >
              <thead>
                <tr>
				  <th onClick={this.props.onSort('id')} className="id">
					id {indexSortId !== -1 ? <small>{this.props.sortArray[indexSortId]}</small> : null}
				  </th>
				  <th onClick={this.props.onSort('firstName')}>
				    first name {indexSortFirstName !== -1 ? <small>{this.props.sortArray[indexSortFirstName]}</small> : null}
				  </th>
				  <th onClick={this.props.onSort('lastName')}>
				    last name {indexSortLastName !== -1 ? <small>{this.props.sortArray[indexSortLastName]}</small> : null}
				  </th>
				  <th onClick={this.props.onSort('login')}>
				    login {indexSortLogin !== -1 ? <small>{this.props.sortArray[indexSortLogin]}</small> : null}
				  </th>
				  <th onClick={this.props.onSort('email')}>
				     email {indexSortEmail !== -1 ? <small>{this.props.sortArray[indexSortEmail]}</small> : null}
				  </th>
                  <th onClick={this.props.onSort('mentor')}>
				    mentor {indexSortMentor !== -1 ? <small>{this.props.sortArray[indexSortMentor]}</small> : null}
				  </th>
				  <th onClick={this.props.onSort('role')}>
					role {indexSortRole !== -1 ? <small>{this.props.sortArray[indexSortRole]}</small> : null}
				  </th>
				  <th onClick={this.props.onSort('active')}>
					active {indexSortActive !== -1 ? <small>{this.props.sortArray[indexSortActive]}</small> : null}
				  </th>
                </tr>
              </thead>
              <tbody>
			    { this.props.users.map(item =>(
				  <tr key={item.id}>
				    <th>{item.id}</th>
					<td>{item.firstName}</td>
					<td>{item.lastName}</td>
					<td>{item.login}</td>
                    <td>{item.email}</td>
					<td>{item.mentor}</td>
					<td>{item.role}</td>
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
