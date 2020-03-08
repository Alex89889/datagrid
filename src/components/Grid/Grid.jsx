import React, { Component} from "react";
import style from './GridStyles.css';

class Grid extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
	  return (
	    <section className="data" css={style}>
	      <div className="col-lg-12 sg-display">
		
            <table className="table table-striped table-bordered table-condensed">
              <thead>
                <tr>
				  <th onClick={this.props.onSort.bind(null, 'id')}>id</th>
                  <th onClick={this.props.onSort.bind(null, 'name')}>
				    name {this.props.sortField === 'name' ? <small>{this.props.sort}</small> : null}
				  </th>
                  <th onClick={this.props.onSort.bind(null, 'github')}>
					github {this.props.sortField === 'github' ? <small>{this.props.sort}</small> : null}
				  </th>
				  <th onClick={this.props.onSort.bind(null, 'email')}>
				    email {this.props.sortField === 'email' ? <small>{this.props.sort}</small> : null}
				  </th>
                  <th onClick={this.props.onSort.bind(null, 'score')}>
				    score {this.props.sortField === 'score' ? <small>{this.props.sort}</small> : null}
				  </th>
                  <th onClick={this.props.onSort.bind(null, 'mentor')}>
				    mentor {this.props.sortField === 'mentor' ? <small>{this.props.sort}</small> : null}
				  </th>
				  <th onClick={this.props.onSort.bind(null, 'active')}>
					active {this.props.sortField === 'active' ? <small>{this.props.sort}</small> : null}
				  </th>
                </tr>
              </thead>
              <tbody>
			    { this.props.users.map(item =>(
				  <tr key={item.id}>
				    <td>{item.id}</td>
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
