import React, { Component} from "react";
import style from './GridFilterNumStyles.css';

import 'react-widgets/dist/css/react-widgets.css';
import Multiselect from 'react-widgets/lib/Multiselect';

class GridFilterNum extends Component {
	
  constructor(props) {
    super(props)
    this.state = {
      value: []
    }
  }
   
  valueChangeHandler = event => {
    this.setState({
      value: event
    })
  }
	
 render() {	  
    const role = ['mentor', 'student', 'active', 'inactive'];
	const {value} = this.state;

    return (
      <div className="col" css={style}>
	    <div className="input-group mb-3 mt-3">
			<button
              className="btn btn-outline-secondary btn-filter"
			  onClick={() => this.props.onFilter(value)}
            >
              Filter
            </button>
		  <Multiselect
			  data={role}
			  className = "multiselect"
			  onChange={this.valueChangeHandler}
			/>
		</div>
        <p className="text-center">
          The search will show any matching values. If there is no match,
          then all the data.
        </p>
        <p className="text-center">To sort, click on the title.</p>		
      </div>
    );
 }
}
export default GridFilterNum;