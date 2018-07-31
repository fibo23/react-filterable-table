import React from 'react';
import ExactFilters from './ExactFilters';
import {Row, Col, FormGroup, Label, Card, CardBody, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'; 

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.filterChanged = this.filterChanged.bind(this);
	}

	static get defaultProps() {
		// Set defaults if values weren't passed in
		return {
			recordCountName: "record",
			recordCountNamePlural: "records"
		}
	}


	filterChanged(event) {
		let newValue = event ? event.target.value : '';
		if (newValue.length === 0) {
			// When clearing filter, set focus in the text box
			this.refs.filter.focus();
		}
		this.props.updateFilter(newValue);
	}

	render() {
		if (this.props.visible === false) {
			return <div></div>;
		}
		const { loading, recordCount, filter, updateFilter, updatePageSize, pageSizes } = this.props;

		// Record count message -- the text at the top that says something like "4 records"
		// text can be overridden using the recordCountName and recordCountNamePlural props.
		const recordCountMessage = (
			<span>
				{recordCount} {recordCount === 1 ? this.props.recordCountName : this.props.recordCountNamePlural}
			</span>
		);

		let perPageSelect = this.props.pagersVisible !== false && this.props.pageSizes && this.props.pageSizes.length > 0
			?  <Input bsSize="sm" type="select" className="form-control input-sm" onChange={updatePageSize} value={this.props.pageSize}>
					{this.props.pageSizes.map((p, i) =>
						<option value={p} key={i}>{p} items</option>
					)}
				</Input>
			: null;

		return (
			<Row>
	          <Col xs="12" sm="6" md="4">
	            <Card className="filter-card">
	              <FormGroup row>
	                <Col sm="6">
	                  {perPageSelect}
	                </Col>
	              </FormGroup>
	            </Card>
	          </Col>
	          <Col xs="12" sm="6" md="4">
	            <Card className="filter-card">
	            </Card>
	          </Col>
	          <Col xs="12" sm="6" md="4">
	            <Card className="filter-card">
	              <FormGroup row>
	                <Col sm="12">
				        <Input type="text" bsSize="sm" className="input-sm form-control" value={filter} onChange={this.filterChanged} ref="filter" placeholder="Search" autoFocus={this.props.autofocusFilter} />
	                </Col>
	              </FormGroup>
	            </Card>
	          </Col>
	        </Row>
		);
	}
}

export default Header;
