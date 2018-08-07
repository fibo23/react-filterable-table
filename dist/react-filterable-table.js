(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["FilterableTable"] = factory(require("react"), require("react-dom"));
	else
		root["FilterableTable"] = factory(root["react"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _Table = __webpack_require__(4);

	var _Table2 = _interopRequireDefault(_Table);

	var _Header = __webpack_require__(6);

	var _Header2 = _interopRequireDefault(_Header);

	var _reactPager = __webpack_require__(21);

	var _reactPager2 = _interopRequireDefault(_reactPager);

	var _FilterAndSort = __webpack_require__(22);

	var _FilterAndSort2 = _interopRequireDefault(_FilterAndSort);

	var _axios = __webpack_require__(23);

	var _axios2 = _interopRequireDefault(_axios);

	var _isElementInViewport = __webpack_require__(49);

	var _isElementInViewport2 = _interopRequireDefault(_isElementInViewport);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FilterableTable = function (_React$Component) {
		_inherits(FilterableTable, _React$Component);

		function FilterableTable(props) {
			_classCallCheck(this, FilterableTable);

			var _this = _possibleConstructorReturn(this, (FilterableTable.__proto__ || Object.getPrototypeOf(FilterableTable)).call(this, props));

			_this.state = {
				loading: false,
				entries: _this.props.data || [],
				sort: _this.props.initialSort,
				sortDir: typeof _this.props.initialSortDir === "boolean" ? _this.props.initialSortDir : true,
				filter: '',
				exactFilters: [],
				serverError: false,
				totalPages: 1,
				visiblePages: 5,
				page: 0,
				pageSize: +localStorage.getItem(_this.props.namespace + '.PageSize') || _this.props.pageSize || 10
			};

			_this.loadData = _this.loadData.bind(_this);
			_this.setData = _this.setData.bind(_this);
			_this.updateFilter = _this.updateFilter.bind(_this);
			_this.addExactFilter = _this.addExactFilter.bind(_this);
			_this.updatePageSize = _this.updatePageSize.bind(_this);
			_this.updatePage = _this.updatePage.bind(_this);
			_this.filterInputChanged = _this.filterInputChanged.bind(_this);
			_this.updateSort = _this.updateSort.bind(_this);
			_this.scrollIntoView = _this.scrollIntoView.bind(_this);
			_this.removeExactFilter = _this.removeExactFilter.bind(_this);

			_axios2.default.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
			return _this;
		}

		_createClass(FilterableTable, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.loadData();
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				// If the `data` prop changes, make sure we run our onDataReceived callback (if supplied)
				// and set our states
				if (nextProps.hasOwnProperty('data')) {
					this.setData(nextProps.data);
				}

				if (nextProps.hasOwnProperty('initialSort')) {
					this.setState({ sort: nextProps.initialSort });
				}
				if (nextProps.hasOwnProperty('initialSortDir')) {
					this.setState({ sortDir: nextProps.initialSortDir });
				}
				if (nextProps.hasOwnProperty('loading')) {
					this.setState({ loading: nextProps.loading });
				}
			}
		}, {
			key: 'loadData',
			value: function loadData(e) {
				var _this2 = this;

				if (e) {
					e.preventDefault();
				}

				// Make sure either data was set or an endpoint was passed in
				if (!Array.isArray(this.props.data) && !this.props.dataEndpoint) {
					throw "No data was passed in and no data endpoint was set.";
				}

				// Set state to 'loading' to show the "Loading..." message
				this.setState({
					loading: true
				});

				if (Array.isArray(this.props.data)) {
					this.setData(this.props.data);
				} else {
					// Load data from endpoint
					_axios2.default.get(this.props.dataEndpoint).then(function (response) {
						return response.data;
					}).then(function (entries) {
						_this2.setData(entries);
					}).catch(function (error) {
						_this2.setState({
							serverError: true,
							loading: false
						});
						console.log(error);
					});
				}
			}
		}, {
			key: 'setData',
			value: function setData(entries) {
				if (this.props.onDataReceived) {
					// Run callback if supplied
					this.props.onDataReceived(entries);
				}

				this.setState({
					entries: entries,
					loading: false,
					serverError: false,
					page: 0
				});
			}
		}, {
			key: 'updateFilter',
			value: function updateFilter(filter) {
				// Set the state filter to what was passed in.
				this.setState({
					filter: filter,
					page: 0
				});

				this.scrollIntoView();
			}
		}, {
			key: 'addExactFilter',
			value: function addExactFilter(value, fieldname) {
				var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : fieldname;

				// Exact filters are an array; grab the existing ones and push this one on it.
				// Don't add it if value is null/undefined
				if (value === undefined || value === null || value.toString().length === 0) {
					return;
				}

				var exactFilters = this.state.exactFilters;

				// Build our object to push onto the array

				var thisFilter = {
					value: value.toString(),
					fieldname: fieldname,
					name: name

					// Don't add it if it's already in there
				};var filterExists = exactFilters.some(function (f) {
					// If field and value ar the same, we already have this filter.
					return f.fieldname === thisFilter.fieldname && f.value === thisFilter.value;
				});

				if (filterExists) {
					return;
				}

				exactFilters.push(thisFilter);

				// Update state
				this.setState({
					exactFilters: exactFilters,
					page: 0
				});

				// Call callback if supplied
				if (this.props.onFilterAdded) {
					this.props.onFilterAdded(thisFilter);
				}
			}
		}, {
			key: 'removeExactFilter',
			value: function removeExactFilter(filter, e) {
				var exactFilters = this.state.exactFilters;

				var index = exactFilters.indexOf(filter);
				var removedFilter = null;
				if (index > -1) {
					removedFilter = exactFilters.splice(index, 1).pop();
				}
				this.setState({
					exactFilters: exactFilters,
					page: 0
				});
				this.scrollIntoView();

				// Call callback if supplied
				if (this.props.onFilterRemoved) {
					this.props.onFilterRemoved(removedFilter, e);
				}
			}
		}, {
			key: 'updatePage',
			value: function updatePage(page) {
				this.setState({ page: page });
				this.scrollIntoView();
			}
		}, {
			key: 'updatePageSize',
			value: function updatePageSize(event) {
				var pageSize = +event.target.value;
				this.setState({ page: 0, pageSize: pageSize });
				if (this.props.namespace) {
					localStorage.setItem(this.props.namespace + '.PageSize', pageSize);
				}
			}
		}, {
			key: 'filterInputChanged',
			value: function filterInputChanged(event) {
				this.updateFilter(event.target.value);
				this.setState({ page: 0 });
			}
		}, {
			key: 'updateSort',
			value: function updateSort(sort) {
				var sortDir = this.state.sortDir;
				if (sort === this.state.sort) {
					// If sorting again on the same field, switch the sort direction
					sortDir = !sortDir;
				} else {
					// Default to asc when sorting on new field
					sortDir = true;
				}
				this.setState({
					sort: sort,
					sortDir: sortDir,
					page: 0
				});
			}
		}, {
			key: 'scrollIntoView',
			value: function scrollIntoView() {
				// Make sure things are in view
				if (this.refs.Table) {
					var table = this.refs.Table.refs.table;
					if (table && !(0, _isElementInViewport2.default)(table)) {
						table.scrollIntoView();
					}
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var fields = this.props.fields || [];

				// If fields prop was not specified, use object keys of first record as fieldnames
				if (this.props.fields === undefined && this.state.entries.length > 0) {
					fields = Object.keys(this.state.entries[0]).map(function (name) {
						return { name: name };
					});
				}

				var loading = this.state.loading && (this.props.loadingMessage || _react2.default.createElement(
					'div',
					{ className: 'well text-center' },
					'Loading...'
				));

				var serverErrorMessage = this.state.serverError && (this.props.serverErrorMessage || _react2.default.createElement(
					'div',
					{ className: 'alert alert-danger text-center' },
					'Something went wrong! Check console for error message(s).'
				));

				var noRecordsMessage = !this.state.serverError && !this.state.loading && this.state.entries.length === 0 && _react2.default.createElement(
					'div',
					null,
					this.props.noRecordsMessage
				);

				var filteredEntries = (0, _FilterAndSort2.default)(this.state.entries, {
					filter: this.state.filter,
					exactFilters: this.state.exactFilters,
					sort: this.state.sort,
					sortDir: this.state.sortDir,
					stickySorting: this.props.stickySorting,
					fields: fields
				});

				var table = !this.state.loading && this.state.entries.length > 0 && _react2.default.createElement(_Table2.default, {
					records: filteredEntries,
					allRecords: this.state.entries,
					fields: fields,
					filterExact: this.state.filterExact,
					addExactFilter: this.addExactFilter,
					updateSort: this.updateSort,
					sort: this.state.sort,
					sortDir: this.state.sortDir,
					page: this.state.page,
					pageSize: this.state.pageSize,
					pagersVisible: this.props.pagersVisible,
					noFilteredRecordsMessage: this.props.noFilteredRecordsMessage,
					className: this.props.tableClassName,
					trClassName: this.props.trClassName,
					style: this.props.style,
					ref: 'Table'
				});

				var totalPages = filteredEntries && filteredEntries.length > 0 ? Math.ceil(filteredEntries.length / this.state.pageSize) : 0;

				var topPager = this.state.loading || this.state.entries.length === 0 || this.props.pagersVisible === false || this.props.topPagerVisible === false ? '' : _react2.default.createElement(_reactPager2.default, { total: totalPages,
					current: this.state.page,
					visiblePages: this.state.visiblePages,
					onPageChanged: this.updatePage,
					className: this.props.pagerTopClassName || "pagination-sm pull-right",
					titles: this.props.pagerTitles
				});

				var bottomPager = this.state.loading || this.state.entries.length === 0 || this.props.pagersVisible === false || this.props.bottomPagerVisible === false ? '' : _react2.default.createElement(_reactPager2.default, { total: totalPages,
					current: this.state.page,
					visiblePages: this.state.visiblePages,
					onPageChanged: this.updatePage,
					className: this.props.pagerBottomClassName,
					titles: this.props.pagerTitles
				});

				return _react2.default.createElement(
					'div',
					{ className: "filterable-table-container" + (this.props.className ? ' ' + this.props.className : '') },
					_react2.default.createElement(_Header2.default, {
						loading: this.state.loading,
						updateFilter: this.updateFilter,
						updateSort: this.updateSort,
						filter: this.state.filter,
						exactFilters: this.state.exactFilters,
						removeExactFilter: this.removeExactFilter,
						pageSize: this.state.pageSize,
						updatePageSize: this.updatePageSize,
						pager: topPager,
						recordCount: filteredEntries.length,
						recordCountName: this.props.recordCountName,
						recordCountNamePlural: this.props.recordCountNamePlural,
						upperHeaderChildren: this.props.upperHeaderChildren,
						lowerHeaderChildren: this.props.lowerHeaderChildren,
						visible: this.props.headerVisible,
						pagersVisible: this.props.pagersVisible,
						pageSizes: this.props.pageSizes,
						autofocusFilter: this.props.autofocusFilter
					}),
					_react2.default.createElement(
						'div',
						{ className: 'table-container' },
						loading,
						serverErrorMessage,
						noRecordsMessage,
						table,
						bottomPager
					)
				);
			}
		}], [{
			key: 'defaultProps',
			get: function get() {
				// Set defaults if values weren't passed in
				return {
					noRecordsMessage: "There are no records to display",
					noFilteredRecordsMessage: "There are no records to display",
					stickySorting: false,
					tableClassName: "table table-condensed table-hover filterable-table",
					pageSizes: [10, 20, 30, 50]
				};
			}
		}]);

		return FilterableTable;
	}(_react2.default.Component);

	module.exports = FilterableTable;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var hasValue = __webpack_require__(5);

	var Table = function (_React$Component) {
		_inherits(Table, _React$Component);

		function Table(props) {
			_classCallCheck(this, Table);

			var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

			_this.headerSortClassName = _this.headerSortClassName.bind(_this);
			return _this;
		}

		_createClass(Table, [{
			key: 'headerSortClassName',
			value: function headerSortClassName(field) {
				// Return the class name for the sort icon
				if (field.sortable) {
					if (this.props.sort && (this.props.sort === field.name || this.props.sort === field.sortFieldName)) {
						if (this.props.sortDir) {
							return "fa fa-sort-asc";
						} else {
							return "fa fa-sort-desc";
						}
					}
					return "fa fa-sort";
				}
				return null;
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props,
				    addExactFilter = _props.addExactFilter,
				    updateSort = _props.updateSort,
				    page = _props.page,
				    pageSize = _props.pageSize,
				    visible = _props.visible;

				// Paging - determine indexes for where to slice the array

				var startIndex = page * pageSize;
				var endIndex = startIndex + pageSize;

				// Slice array based on what should be shown on the current page
				// if pagersVisible is false, don't slice it - all records should be shown
				var records = this.props.records;
				if (this.props.pagersVisible !== false) {
					records = records.slice(startIndex, endIndex);
				}

				// If the field has the visible property set to false, ignore it
				var fields = this.props.fields.filter(function (field) {
					return field.visible !== false;
				});

				var headerCells = fields.map(function (field, i) {
					// Use the displayName property if supplied, otherwise use name
					var fieldDisplayName = field.displayName !== undefined ? field.displayName : field.name;
					var renderProps = _extends({ field: field }, _this2.props);
					if (typeof field.thRender === "function") {
						fieldDisplayName = field.thRender(renderProps);
					}

					return _react2.default.createElement(
						'th',
						{ onClick: field.sortable ? function () {
								return updateSort(field.sortFieldName || field.name);
							} : null, className: field.thClassName ? field.thClassName : null, key: i, title: field.title || null },
						_react2.default.createElement(
							'span',
							{ className: field.sortable ? "sortable" : null },
							fieldDisplayName
						),
						_react2.default.createElement('span', { className: _this2.headerSortClassName(field) })
					);
				});

				var rows = records.map(function (record, i) {
					var trClassName = _this2.props.trClassName || null;
					if (typeof _this2.props.trClassName === "function") {
						trClassName = _this2.props.trClassName(record, i);
					}

					var tableTds = fields.map(function (field, q) {
						// Use the displayName property if supplied, otherwise use name
						var fieldDisplayName = field.displayName !== undefined ? field.displayName : field.name;
						var spanClassName = "";
						var tdClassName = field.tdClassName || null;

						// Build out the body of the <td>
						var recordBody = record[field.name];

						// If this field has a render function, call it with some props
						var renderProps = _extends({
							value: record[field.name],
							record: record,
							records: _this2.props.allRecords,
							filteredRecords: records,
							field: field
						}, _this2.props);

						if (field.render && typeof field.render === "function") {
							recordBody = field.render(renderProps);
						}

						// If tdClassName is a function, call it with our renderProps
						if (typeof field.tdClassName === "function") {
							tdClassName = field.tdClassName(renderProps);
						}

						// Determine if the body is empty
						var bodyIsEmpty = recordBody === null || recordBody === undefined || recordBody.toString().length === 0;

						// If the body is empty and the field has something set for emptyDisplay, use that as the text.
						if (field.emptyDisplay && bodyIsEmpty) {
							recordBody = field.emptyDisplay;
						}

						// add the "empty" classname if record is empty
						if (bodyIsEmpty) {
							spanClassName = "empty";
						}

						if (!bodyIsEmpty && field.exactFilterable) {
							spanClassName = "filterable";
						}

						var tdContent = hasValue(recordBody) ? _react2.default.createElement(
							'span',
							{ className: spanClassName, onClick: field.exactFilterable ? function () {
									return addExactFilter(record[field.name], field.name, fieldDisplayName);
								} : null },
							recordBody
						) : null;

						return _react2.default.createElement(
							'td',
							{ className: tdClassName, key: q },
							tdContent
						);
					});

					return _react2.default.createElement(
						'tr',
						{ key: i, className: trClassName },
						tableTds
					);
				});

				var tfoot = fields.some(function (f) {
					return f.footerValue;
				}) ? _react2.default.createElement(
					'tfoot',
					null,
					_react2.default.createElement(
						'tr',
						{ className: this.props.footerTrClassName },
						fields.map(function (field, i) {
							var renderProps = _extends({
								records: _this2.props.allRecords,
								filteredRecords: _this2.props.records,
								field: field
							}, _this2.props);

							return _react2.default.createElement(
								'td',
								{ key: i, className: field.footerTdClassName },
								(typeof field.footerValue === "function" ? field.footerValue(renderProps) : field.footerValue) || ''
							);
						})
					)
				) : null;

				var tableClassName = this.props.className;
				if (tableClassName.indexOf('filterable-table') === -1) {
					// Make sure class 'filterable-table' is included
					tableClassName += " filterable-table";
				}

				return rows.length === 0 ? _react2.default.createElement(
					'div',
					null,
					this.props.noFilteredRecordsMessage || 'There are no records to display.'
				) : _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'table',
						{ className: tableClassName, style: this.props.style, ref: 'table' },
						_react2.default.createElement(
							'thead',
							null,
							_react2.default.createElement(
								'tr',
								null,
								headerCells
							)
						),
						_react2.default.createElement(
							'tbody',
							null,
							rows
						),
						tfoot
					)
				);
			}
		}]);

		return Table;
	}(_react2.default.Component);

	module.exports = Table;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	// Return true if it's not null or undefined, and length is > 0
	module.exports = function (val) {
		return val !== null && val !== undefined && val.toString().length > 0;
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _ExactFilters = __webpack_require__(7);

	var _ExactFilters2 = _interopRequireDefault(_ExactFilters);

	var _reactstrap = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = function (_React$Component) {
		_inherits(Header, _React$Component);

		function Header(props) {
			_classCallCheck(this, Header);

			var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

			_this.filterChanged = _this.filterChanged.bind(_this);
			return _this;
		}

		_createClass(Header, [{
			key: 'filterChanged',
			value: function filterChanged(event) {
				var newValue = event ? event.target.value : '';
				if (newValue.length === 0) {
					// When clearing filter, set focus in the text box
					this.refs.filter.focus();
				}
				this.props.updateFilter(newValue);
			}
		}, {
			key: 'render',
			value: function render() {
				if (this.props.visible === false) {
					return _react2.default.createElement('div', null);
				}
				var _props = this.props,
				    loading = _props.loading,
				    recordCount = _props.recordCount,
				    filter = _props.filter,
				    updateFilter = _props.updateFilter,
				    updatePageSize = _props.updatePageSize,
				    pageSizes = _props.pageSizes;

				// Record count message -- the text at the top that says something like "4 records"
				// text can be overridden using the recordCountName and recordCountNamePlural props.

				var recordCountMessage = _react2.default.createElement(
					'span',
					null,
					recordCount,
					' ',
					recordCount === 1 ? this.props.recordCountName : this.props.recordCountNamePlural
				);

				var perPageSelect = this.props.pagersVisible !== false && this.props.pageSizes && this.props.pageSizes.length > 0 ? _react2.default.createElement(
					_reactstrap.Input,
					{ bsSize: 'sm', type: 'select', className: 'form-control input-sm', onChange: updatePageSize, value: this.props.pageSize },
					this.props.pageSizes.map(function (p, i) {
						return _react2.default.createElement(
							'option',
							{ value: p, key: i },
							p,
							' items'
						);
					})
				) : null;

				return _react2.default.createElement(
					_reactstrap.Row,
					null,
					_react2.default.createElement(
						_reactstrap.Col,
						{ xs: '12', sm: '6', md: '4' },
						_react2.default.createElement(
							_reactstrap.Card,
							{ className: 'filter-card' },
							_react2.default.createElement(
								_reactstrap.FormGroup,
								{ row: true },
								_react2.default.createElement(
									_reactstrap.Col,
									{ sm: '6' },
									perPageSelect
								)
							)
						)
					),
					_react2.default.createElement(
						_reactstrap.Col,
						{ xs: '12', sm: '4', md: '4' },
						_react2.default.createElement(_reactstrap.Card, { className: 'filter-card' })
					),
					_react2.default.createElement(
						_reactstrap.Col,
						{ xs: '12', sm: '6', md: '4' },
						_react2.default.createElement(
							_reactstrap.Card,
							{ className: 'filter-card' },
							_react2.default.createElement(
								_reactstrap.FormGroup,
								{ row: true },
								_react2.default.createElement(
									_reactstrap.Col,
									{ sm: '12' },
									_react2.default.createElement(
										_reactstrap.InputGroup,
										null,
										_react2.default.createElement('input', { className: 'form-control py-2 border-right-0 border', bsSize: 'sm', type: 'search', value: filter, id: 'filter-input', onChange: this.filterChanged, ref: 'filter', placeholder: 'Search', autoFocus: this.props.autofocusFilter }),
										_react2.default.createElement(
											'span',
											{ className: 'input-group-append' },
											_react2.default.createElement(
												'div',
												{ className: 'input-group-text bg-transparent' },
												_react2.default.createElement('i', { className: 'fa fa-search' })
											)
										)
									)
								)
							)
						)
					)
				);
			}
		}], [{
			key: 'defaultProps',
			get: function get() {
				// Set defaults if values weren't passed in
				return {
					recordCountName: "record",
					recordCountNamePlural: "records"
				};
			}
		}]);

		return Header;
	}(_react2.default.Component);

	exports.default = Header;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ExactFilter = __webpack_require__(8);

	var ExactFilters = function (_React$Component) {
		_inherits(ExactFilters, _React$Component);

		function ExactFilters(props) {
			_classCallCheck(this, ExactFilters);

			return _possibleConstructorReturn(this, (ExactFilters.__proto__ || Object.getPrototypeOf(ExactFilters)).call(this, props));
		}

		_createClass(ExactFilters, [{
			key: 'render',
			value: function render() {
				var _props = this.props,
				    exactFilters = _props.exactFilters,
				    removeExactFilter = _props.removeExactFilter;


				var filters = exactFilters.map(function (filter, i) {
					return _react2.default.createElement(ExactFilter, { filter: filter, removeFilter: removeExactFilter, key: i });
				});

				return _react2.default.createElement(
					'div',
					{ className: 'exact-filters' },
					filters
				);
			}
		}]);

		return ExactFilters;
	}(_react2.default.Component);

	module.exports = ExactFilters;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ExactFilter = function (_React$Component) {
		_inherits(ExactFilter, _React$Component);

		function ExactFilter(props) {
			_classCallCheck(this, ExactFilter);

			return _possibleConstructorReturn(this, (ExactFilter.__proto__ || Object.getPrototypeOf(ExactFilter)).call(this, props));
		}

		_createClass(ExactFilter, [{
			key: "render",
			value: function render() {
				var _props = this.props,
				    filter = _props.filter,
				    removeFilter = _props.removeFilter;


				return _react2.default.createElement(
					"span",
					{ className: "filter-item" },
					_react2.default.createElement(
						"span",
						{ className: "filter-item-title" },
						_react2.default.createElement(
							"span",
							{ className: "filter-item-remove", onClick: function onClick(e) {
									return removeFilter(filter, e);
								} },
							_react2.default.createElement("span", { className: "fa fa-times" })
						),
						filter.name
					),
					_react2.default.createElement(
						"span",
						{ className: "filter-item-value" },
						filter.value
					)
				);
			}
		}]);

		return ExactFilter;
	}(_react2.default.Component);

	module.exports = ExactFilter;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var React = __webpack_require__(3);
	var React__default = _interopDefault(React);
	var PropTypes = _interopDefault(__webpack_require__(10));
	var classNames = _interopDefault(__webpack_require__(13));
	var isFunction = _interopDefault(__webpack_require__(14));
	var isobject = _interopDefault(__webpack_require__(15));
	var ReactDOM = _interopDefault(__webpack_require__(16));
	var reactPopper = __webpack_require__(17);
	var toNumber = _interopDefault(__webpack_require__(19));
	var reactLifecyclesCompat = __webpack_require__(20);

	// https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/js/src/modal.js#L436-L443
	function getScrollbarWidth() {
	  var scrollDiv = document.createElement('div');
	  // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113
	  scrollDiv.style.position = 'absolute';
	  scrollDiv.style.top = '-9999px';
	  scrollDiv.style.width = '50px';
	  scrollDiv.style.height = '50px';
	  scrollDiv.style.overflow = 'scroll';
	  document.body.appendChild(scrollDiv);
	  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	  document.body.removeChild(scrollDiv);
	  return scrollbarWidth;
	}

	function setScrollbarWidth(padding) {
	  document.body.style.paddingRight = padding > 0 ? padding + 'px' : null;
	}

	function isBodyOverflowing() {
	  return document.body.clientWidth < window.innerWidth;
	}

	function getOriginalBodyPadding() {
	  var style = window.getComputedStyle(document.body, null);

	  return parseInt(style && style.getPropertyValue('padding-right') || 0, 10);
	}

	function conditionallyUpdateScrollbar() {
	  var scrollbarWidth = getScrollbarWidth();
	  // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.6/js/src/modal.js#L433
	  var fixedContent = document.querySelectorAll('.fixed-top, .fixed-bottom, .is-fixed, .sticky-top')[0];
	  var bodyPadding = fixedContent ? parseInt(fixedContent.style.paddingRight || 0, 10) : 0;

	  if (isBodyOverflowing()) {
	    setScrollbarWidth(bodyPadding + scrollbarWidth);
	  }
	}

	var globalCssModule = void 0;

	function setGlobalCssModule(cssModule) {
	  globalCssModule = cssModule;
	}

	function mapToCssModules() {
	  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var cssModule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalCssModule;

	  if (!cssModule) return className;
	  return className.split(' ').map(function (c) {
	    return cssModule[c] || c;
	  }).join(' ');
	}

	/**
	 * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
	 */
	function omit(obj, omitKeys) {
	  var result = {};
	  Object.keys(obj).forEach(function (key) {
	    if (omitKeys.indexOf(key) === -1) {
	      result[key] = obj[key];
	    }
	  });
	  return result;
	}

	/**
	 * Returns a filtered copy of an object with only the specified keys.
	 */
	function pick(obj, keys) {
	  var pickKeys = Array.isArray(keys) ? keys : [keys];
	  var length = pickKeys.length;
	  var key = void 0;
	  var result = {};

	  while (length > 0) {
	    length -= 1;
	    key = pickKeys[length];
	    result[key] = obj[key];
	  }
	  return result;
	}

	var warned = {};

	function warnOnce(message) {
	  if (!warned[message]) {
	    /* istanbul ignore else */
	    if (typeof console !== 'undefined') {
	      console.error(message); // eslint-disable-line no-console
	    }
	    warned[message] = true;
	  }
	}

	function deprecated(propType, explanation) {
	  return function validate(props, propName, componentName) {
	    if (props[propName] !== null && typeof props[propName] !== 'undefined') {
	      warnOnce('"' + propName + '" property of "' + componentName + '" has been deprecated.\n' + explanation);
	    }

	    for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	      rest[_key - 3] = arguments[_key];
	    }

	    return propType.apply(undefined, [props, propName, componentName].concat(rest));
	  };
	}

	function DOMElement(props, propName, componentName) {
	  if (!(props[propName] instanceof Element)) {
	    return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`. Expected prop to be an instance of Element. Validation failed.');
	  }
	}

	/* eslint key-spacing: ["error", { afterColon: true, align: "value" }] */
	// These are all setup to match what is in the bootstrap _variables.scss
	// https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
	var TransitionTimeouts = {
	  Fade: 150, // $transition-fade
	  Collapse: 350, // $transition-collapse
	  Modal: 300, // $modal-transition
	  Carousel: 600 // $carousel-transition
	};

	// Duplicated Transition.propType keys to ensure that Reactstrap builds
	// for distribution properly exclude these keys for nested child HTML attributes
	// since `react-transition-group` removes propTypes in production builds.
	var TransitionPropTypeKeys = ['in', 'mountOnEnter', 'unmountOnExit', 'appear', 'enter', 'exit', 'timeout', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

	var TransitionStatuses = {
	  ENTERING: 'entering',
	  ENTERED: 'entered',
	  EXITING: 'exiting',
	  EXITED: 'exited'
	};

	var keyCodes = {
	  esc: 27,
	  space: 32,
	  tab: 9,
	  up: 38,
	  down: 40
	};

	var PopperPlacements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	function findDOMElements(target) {
	  if (isFunction(target)) {
	    return target();
	  }
	  if (typeof target === 'string' && canUseDOM) {
	    var selection = document.querySelectorAll(target);
	    if (!selection.length) {
	      selection = document.querySelectorAll('#' + target);
	    }
	    if (!selection.length) {
	      throw new Error('The target \'' + target + '\' could not be identified in the dom, tip: check spelling');
	    }
	    return selection;
	  }
	  return target;
	}

	function isArrayOrNodeList(els) {
	  return Array.isArray(els) || canUseDOM && typeof els.length === 'number';
	}

	function getTarget(target) {
	  var els = findDOMElements(target);
	  if (isArrayOrNodeList(els)) {
	    return els[0];
	  }
	  return els;
	}

	var defaultToggleEvents = ['touchstart', 'click'];

	function addMultipleEventListeners(_els, handler, _events) {
	  var els = _els;
	  if (!isArrayOrNodeList(els)) {
	    els = [els];
	  }

	  var events = _events;
	  if (typeof events === 'string') {
	    events = events.split(/\s+/);
	  }

	  if (!isArrayOrNodeList(els) || typeof handler !== 'function' || !Array.isArray(events)) {
	    throw new Error('\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ');
	  }
	  events.forEach(function (event) {
	    els.forEach(function (el) {
	      el.addEventListener(event, handler);
	    });
	  });
	  return function removeEvents() {
	    events.forEach(function (event) {
	      els.forEach(function (el) {
	        el.removeEventListener(event, handler);
	      });
	    });
	  };
	}

	var utils = Object.freeze({
		getScrollbarWidth: getScrollbarWidth,
		setScrollbarWidth: setScrollbarWidth,
		isBodyOverflowing: isBodyOverflowing,
		getOriginalBodyPadding: getOriginalBodyPadding,
		conditionallyUpdateScrollbar: conditionallyUpdateScrollbar,
		setGlobalCssModule: setGlobalCssModule,
		mapToCssModules: mapToCssModules,
		omit: omit,
		pick: pick,
		warnOnce: warnOnce,
		deprecated: deprecated,
		DOMElement: DOMElement,
		TransitionTimeouts: TransitionTimeouts,
		TransitionPropTypeKeys: TransitionPropTypeKeys,
		TransitionStatuses: TransitionStatuses,
		keyCodes: keyCodes,
		PopperPlacements: PopperPlacements,
		canUseDOM: canUseDOM,
		findDOMElements: findDOMElements,
		isArrayOrNodeList: isArrayOrNodeList,
		getTarget: getTarget,
		defaultToggleEvents: defaultToggleEvents,
		addMultipleEventListeners: addMultipleEventListeners
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};











	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();





	var defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};



	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};









	var objectWithoutProperties = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var propTypes = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  fluid: PropTypes.bool,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps = {
	  tag: 'div'
	};

	var Container = function Container(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      fluid = props.fluid,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'fluid', 'tag']);


	  var classes = mapToCssModules(classNames(className, fluid ? 'container-fluid' : 'container'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	Container.propTypes = propTypes;
	Container.defaultProps = defaultProps;

	var propTypes$1 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  noGutters: PropTypes.bool,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$1 = {
	  tag: 'div'
	};

	var Row = function Row(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      noGutters = props.noGutters,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'noGutters', 'tag']);


	  var classes = mapToCssModules(classNames(className, noGutters ? 'no-gutters' : null, 'row'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	Row.propTypes = propTypes$1;
	Row.defaultProps = defaultProps$1;

	var colWidths = ['xs', 'sm', 'md', 'lg', 'xl'];
	var stringOrNumberProp = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

	var columnProps = PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string, PropTypes.shape({
	  size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
	  push: deprecated(stringOrNumberProp, 'Please use the prop "order"'),
	  pull: deprecated(stringOrNumberProp, 'Please use the prop "order"'),
	  order: stringOrNumberProp,
	  offset: stringOrNumberProp
	})]);

	var propTypes$2 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  xs: columnProps,
	  sm: columnProps,
	  md: columnProps,
	  lg: columnProps,
	  xl: columnProps,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  widths: PropTypes.array
	};

	var defaultProps$2 = {
	  tag: 'div',
	  widths: colWidths
	};

	var getColumnSizeClass = function getColumnSizeClass(isXs, colWidth, colSize) {
	  if (colSize === true || colSize === '') {
	    return isXs ? 'col' : 'col-' + colWidth;
	  } else if (colSize === 'auto') {
	    return isXs ? 'col-auto' : 'col-' + colWidth + '-auto';
	  }

	  return isXs ? 'col-' + colSize : 'col-' + colWidth + '-' + colSize;
	};

	var Col = function Col(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      widths = props.widths,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'widths', 'tag']);

	  var colClasses = [];

	  widths.forEach(function (colWidth, i) {
	    var columnProp = props[colWidth];

	    delete attributes[colWidth];

	    if (!columnProp && columnProp !== '') {
	      return;
	    }

	    var isXs = !i;

	    if (isobject(columnProp)) {
	      var _classNames;

	      var colSizeInterfix = isXs ? '-' : '-' + colWidth + '-';
	      var colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);

	      colClasses.push(mapToCssModules(classNames((_classNames = {}, defineProperty(_classNames, colClass, columnProp.size || columnProp.size === ''), defineProperty(_classNames, 'order' + colSizeInterfix + columnProp.order, columnProp.order || columnProp.order === 0), defineProperty(_classNames, 'offset' + colSizeInterfix + columnProp.offset, columnProp.offset || columnProp.offset === 0), _classNames)), cssModule));
	    } else {
	      var _colClass = getColumnSizeClass(isXs, colWidth, columnProp);
	      colClasses.push(_colClass);
	    }
	  });

	  if (!colClasses.length) {
	    colClasses.push('col');
	  }

	  var classes = mapToCssModules(classNames(className, colClasses), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	Col.propTypes = propTypes$2;
	Col.defaultProps = defaultProps$2;

	var propTypes$3 = {
	  light: PropTypes.bool,
	  dark: PropTypes.bool,
	  inverse: deprecated(PropTypes.bool, 'Please use the prop "dark"'),
	  full: PropTypes.bool,
	  fixed: PropTypes.string,
	  sticky: PropTypes.string,
	  color: PropTypes.string,
	  role: PropTypes.string,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  toggleable: deprecated(PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), 'Please use the prop "expand"'),
	  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
	};

	var defaultProps$3 = {
	  tag: 'nav',
	  expand: false
	};

	var getExpandClass = function getExpandClass(expand) {
	  if (expand === false) {
	    return false;
	  } else if (expand === true || expand === 'xs') {
	    return 'navbar-expand';
	  }

	  return 'navbar-expand-' + expand;
	};

	// To better maintain backwards compatibility while toggleable is deprecated.
	// We must map breakpoints to the next breakpoint so that toggleable and expand do the same things at the same breakpoint.
	var toggleableToExpand = {
	  xs: 'sm',
	  sm: 'md',
	  md: 'lg',
	  lg: 'xl'
	};

	var getToggleableClass = function getToggleableClass(toggleable) {
	  if (toggleable === undefined || toggleable === 'xl') {
	    return false;
	  } else if (toggleable === false) {
	    return 'navbar-expand';
	  }

	  return 'navbar-expand-' + (toggleable === true ? 'sm' : toggleableToExpand[toggleable] || toggleable);
	};

	var Navbar = function Navbar(props) {
	  var _classNames;

	  var toggleable = props.toggleable,
	      expand = props.expand,
	      className = props.className,
	      cssModule = props.cssModule,
	      light = props.light,
	      dark = props.dark,
	      inverse = props.inverse,
	      fixed = props.fixed,
	      sticky = props.sticky,
	      color = props.color,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['toggleable', 'expand', 'className', 'cssModule', 'light', 'dark', 'inverse', 'fixed', 'sticky', 'color', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'navbar', getExpandClass(expand) || getToggleableClass(toggleable), (_classNames = {
	    'navbar-light': light,
	    'navbar-dark': inverse || dark
	  }, defineProperty(_classNames, 'bg-' + color, color), defineProperty(_classNames, 'fixed-' + fixed, fixed), defineProperty(_classNames, 'sticky-' + sticky, sticky), _classNames)), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	Navbar.propTypes = propTypes$3;
	Navbar.defaultProps = defaultProps$3;

	var propTypes$4 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$4 = {
	  tag: 'a'
	};

	var NavbarBrand = function NavbarBrand(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'navbar-brand'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	NavbarBrand.propTypes = propTypes$4;
	NavbarBrand.defaultProps = defaultProps$4;

	var propTypes$5 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  type: PropTypes.string,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  children: PropTypes.node
	};

	var defaultProps$5 = {
	  tag: 'button',
	  type: 'button'
	};

	var NavbarToggler = function NavbarToggler(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      children = props.children,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'children', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'navbar-toggler'), cssModule);

	  return React__default.createElement(
	    Tag,
	    _extends({}, attributes, { className: classes }),
	    children || React__default.createElement('span', { className: mapToCssModules('navbar-toggler-icon', cssModule) })
	  );
	};

	NavbarToggler.propTypes = propTypes$5;
	NavbarToggler.defaultProps = defaultProps$5;

	var propTypes$6 = {
	  tabs: PropTypes.bool,
	  pills: PropTypes.bool,
	  vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	  horizontal: PropTypes.string,
	  justified: PropTypes.bool,
	  fill: PropTypes.bool,
	  navbar: PropTypes.bool,
	  card: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$6 = {
	  tag: 'ul',
	  vertical: false
	};

	var getVerticalClass = function getVerticalClass(vertical) {
	  if (vertical === false) {
	    return false;
	  } else if (vertical === true || vertical === 'xs') {
	    return 'flex-column';
	  }

	  return 'flex-' + vertical + '-column';
	};

	var Nav = function Nav(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      tabs = props.tabs,
	      pills = props.pills,
	      vertical = props.vertical,
	      horizontal = props.horizontal,
	      justified = props.justified,
	      fill = props.fill,
	      navbar = props.navbar,
	      card = props.card,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tabs', 'pills', 'vertical', 'horizontal', 'justified', 'fill', 'navbar', 'card', 'tag']);


	  var classes = mapToCssModules(classNames(className, navbar ? 'navbar-nav' : 'nav', horizontal ? 'justify-content-' + horizontal : false, getVerticalClass(vertical), {
	    'nav-tabs': tabs,
	    'card-header-tabs': card && tabs,
	    'nav-pills': pills,
	    'card-header-pills': card && pills,
	    'nav-justified': justified,
	    'nav-fill': fill
	  }), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	Nav.propTypes = propTypes$6;
	Nav.defaultProps = defaultProps$6;

	var propTypes$7 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  active: PropTypes.bool,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$7 = {
	  tag: 'li'
	};

	var NavItem = function NavItem(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      active = props.active,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'active', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'nav-item', active ? 'active' : false), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	NavItem.propTypes = propTypes$7;
	NavItem.defaultProps = defaultProps$7;

	/* eslint react/no-find-dom-node: 0 */
	// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md

	var propTypes$8 = {
	  disabled: PropTypes.bool,
	  dropup: deprecated(PropTypes.bool, 'Please use the prop "direction" with the value "up".'),
	  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
	  group: PropTypes.bool,
	  isOpen: PropTypes.bool,
	  nav: PropTypes.bool,
	  active: PropTypes.bool,
	  addonType: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['prepend', 'append'])]),
	  size: PropTypes.string,
	  tag: PropTypes.string,
	  toggle: PropTypes.func,
	  children: PropTypes.node,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  inNavbar: PropTypes.bool,
	  setActiveFromChild: PropTypes.bool
	};

	var defaultProps$8 = {
	  isOpen: false,
	  direction: 'down',
	  nav: false,
	  active: false,
	  addonType: false,
	  inNavbar: false,
	  setActiveFromChild: false
	};

	var childContextTypes = {
	  toggle: PropTypes.func.isRequired,
	  isOpen: PropTypes.bool.isRequired,
	  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']).isRequired,
	  inNavbar: PropTypes.bool.isRequired
	};

	var Dropdown = function (_React$Component) {
	  inherits(Dropdown, _React$Component);

	  function Dropdown(props) {
	    classCallCheck(this, Dropdown);

	    var _this = possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

	    _this.addEvents = _this.addEvents.bind(_this);
	    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
	    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
	    _this.removeEvents = _this.removeEvents.bind(_this);
	    _this.toggle = _this.toggle.bind(_this);
	    return _this;
	  }

	  createClass(Dropdown, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        toggle: this.props.toggle,
	        isOpen: this.props.isOpen,
	        direction: this.props.direction === 'down' && this.props.dropup ? 'up' : this.props.direction,
	        inNavbar: this.props.inNavbar
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.handleProps();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      if (this.props.isOpen !== prevProps.isOpen) {
	        this.handleProps();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.removeEvents();
	    }
	  }, {
	    key: 'getContainer',
	    value: function getContainer() {
	      return ReactDOM.findDOMNode(this);
	    }
	  }, {
	    key: 'addEvents',
	    value: function addEvents() {
	      var _this2 = this;

	      ['click', 'touchstart', 'keyup'].forEach(function (event) {
	        return document.addEventListener(event, _this2.handleDocumentClick, true);
	      });
	    }
	  }, {
	    key: 'removeEvents',
	    value: function removeEvents() {
	      var _this3 = this;

	      ['click', 'touchstart', 'keyup'].forEach(function (event) {
	        return document.removeEventListener(event, _this3.handleDocumentClick, true);
	      });
	    }
	  }, {
	    key: 'handleDocumentClick',
	    value: function handleDocumentClick(e) {
	      if (e && (e.which === 3 || e.type === 'keyup' && e.which !== keyCodes.tab)) return;
	      var container = this.getContainer();

	      if (container.contains(e.target) && container !== e.target && (e.type !== 'keyup' || e.which === keyCodes.tab)) {
	        return;
	      }

	      this.toggle(e);
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(e) {
	      if ([keyCodes.esc, keyCodes.up, keyCodes.down, keyCodes.space].indexOf(e.which) === -1 || /button/i.test(e.target.tagName) && e.which === keyCodes.space || /input|textarea/i.test(e.target.tagName)) {
	        return;
	      }

	      e.preventDefault();
	      if (this.props.disabled) return;

	      var container = this.getContainer();

	      if (e.which === keyCodes.space && this.props.isOpen && container !== e.target) {
	        e.target.click();
	      }

	      if (e.which === keyCodes.esc || !this.props.isOpen) {
	        this.toggle(e);
	        container.querySelector('[aria-expanded]').focus();
	        return;
	      }

	      var menuClass = mapToCssModules('dropdown-menu', this.props.cssModule);
	      var itemClass = mapToCssModules('dropdown-item', this.props.cssModule);
	      var disabledClass = mapToCssModules('disabled', this.props.cssModule);

	      var items = container.querySelectorAll('.' + menuClass + ' .' + itemClass + ':not(.' + disabledClass + ')');

	      if (!items.length) return;

	      var index = -1;
	      for (var i = 0; i < items.length; i += 1) {
	        if (items[i] === e.target) {
	          index = i;
	          break;
	        }
	      }

	      if (e.which === keyCodes.up && index > 0) {
	        index -= 1;
	      }

	      if (e.which === keyCodes.down && index < items.length - 1) {
	        index += 1;
	      }

	      if (index < 0) {
	        index = 0;
	      }

	      items[index].focus();
	    }
	  }, {
	    key: 'handleProps',
	    value: function handleProps() {
	      if (this.props.isOpen) {
	        this.addEvents();
	      } else {
	        this.removeEvents();
	      }
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle(e) {
	      if (this.props.disabled) {
	        return e && e.preventDefault();
	      }

	      return this.props.toggle(e);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames;

	      var _omit = omit(this.props, ['toggle', 'disabled', 'inNavbar', 'direction']),
	          className = _omit.className,
	          cssModule = _omit.cssModule,
	          dropup = _omit.dropup,
	          isOpen = _omit.isOpen,
	          group = _omit.group,
	          size = _omit.size,
	          nav = _omit.nav,
	          setActiveFromChild = _omit.setActiveFromChild,
	          active = _omit.active,
	          addonType = _omit.addonType,
	          attrs = objectWithoutProperties(_omit, ['className', 'cssModule', 'dropup', 'isOpen', 'group', 'size', 'nav', 'setActiveFromChild', 'active', 'addonType']);

	      var direction = this.props.direction === 'down' && dropup ? 'up' : this.props.direction;

	      attrs.tag = attrs.tag || (nav ? 'li' : 'div');

	      var subItemIsActive = false;
	      if (setActiveFromChild) {
	        React__default.Children.map(this.props.children[1].props.children, function (dropdownItem) {
	          if (dropdownItem.props.active) subItemIsActive = true;
	        });
	      }

	      var classes = mapToCssModules(classNames(className, direction !== 'down' && 'drop' + direction, nav && active ? 'active' : false, setActiveFromChild && subItemIsActive ? 'active' : false, (_classNames = {}, defineProperty(_classNames, 'input-group-' + addonType, addonType), defineProperty(_classNames, 'btn-group', group), defineProperty(_classNames, 'btn-group-' + size, !!size), defineProperty(_classNames, 'dropdown', !group && !addonType), defineProperty(_classNames, 'show', isOpen), defineProperty(_classNames, 'nav-item', nav), _classNames)), cssModule);

	      return React__default.createElement(reactPopper.Manager, _extends({}, attrs, { className: classes, onKeyDown: this.handleKeyDown }));
	    }
	  }]);
	  return Dropdown;
	}(React__default.Component);

	Dropdown.propTypes = propTypes$8;
	Dropdown.defaultProps = defaultProps$8;
	Dropdown.childContextTypes = childContextTypes;

	function NavDropdown(props) {
	  warnOnce('The "NavDropdown" component has been deprecated.\nPlease use component "Dropdown" with nav prop.');
	  return React__default.createElement(Dropdown, _extends({ nav: true }, props));
	}

	var propTypes$9 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
	  disabled: PropTypes.bool,
	  active: PropTypes.bool,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  onClick: PropTypes.func,
	  href: PropTypes.any
	};

	var defaultProps$9 = {
	  tag: 'a'
	};

	var NavLink = function (_React$Component) {
	  inherits(NavLink, _React$Component);

	  function NavLink(props) {
	    classCallCheck(this, NavLink);

	    var _this = possibleConstructorReturn(this, (NavLink.__proto__ || Object.getPrototypeOf(NavLink)).call(this, props));

	    _this.onClick = _this.onClick.bind(_this);
	    return _this;
	  }

	  createClass(NavLink, [{
	    key: 'onClick',
	    value: function onClick(e) {
	      if (this.props.disabled) {
	        e.preventDefault();
	        return;
	      }

	      if (this.props.href === '#') {
	        e.preventDefault();
	      }

	      if (this.props.onClick) {
	        this.props.onClick(e);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          cssModule = _props.cssModule,
	          active = _props.active,
	          Tag = _props.tag,
	          innerRef = _props.innerRef,
	          attributes = objectWithoutProperties(_props, ['className', 'cssModule', 'active', 'tag', 'innerRef']);


	      var classes = mapToCssModules(classNames(className, 'nav-link', {
	        disabled: attributes.disabled,
	        active: active
	      }), cssModule);

	      return React__default.createElement(Tag, _extends({}, attributes, { ref: innerRef, onClick: this.onClick, className: classes }));
	    }
	  }]);
	  return NavLink;
	}(React__default.Component);

	NavLink.propTypes = propTypes$9;
	NavLink.defaultProps = defaultProps$9;

	var propTypes$10 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  listTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  listClassName: PropTypes.string,
	  cssModule: PropTypes.object,
	  children: PropTypes.node,
	  'aria-label': PropTypes.string
	};

	var defaultProps$10 = {
	  tag: 'nav',
	  listTag: 'ol',
	  'aria-label': 'breadcrumb'
	};

	var Breadcrumb = function Breadcrumb(props) {
	  var className = props.className,
	      listClassName = props.listClassName,
	      cssModule = props.cssModule,
	      children = props.children,
	      Tag = props.tag,
	      ListTag = props.listTag,
	      label = props['aria-label'],
	      attributes = objectWithoutProperties(props, ['className', 'listClassName', 'cssModule', 'children', 'tag', 'listTag', 'aria-label']);


	  var classes = mapToCssModules(classNames(className), cssModule);

	  var listClasses = mapToCssModules(classNames('breadcrumb', listClassName), cssModule);

	  return React__default.createElement(
	    Tag,
	    _extends({}, attributes, { className: classes, 'aria-label': label }),
	    React__default.createElement(
	      ListTag,
	      { className: listClasses },
	      children
	    )
	  );
	};

	Breadcrumb.propTypes = propTypes$10;
	Breadcrumb.defaultProps = defaultProps$10;

	var propTypes$11 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  active: PropTypes.bool,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$11 = {
	  tag: 'li'
	};

	var BreadcrumbItem = function BreadcrumbItem(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      active = props.active,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'active', 'tag']);

	  var classes = mapToCssModules(classNames(className, active ? 'active' : false, 'breadcrumb-item'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes, 'aria-current': active ? 'page' : undefined }));
	};

	BreadcrumbItem.propTypes = propTypes$11;
	BreadcrumbItem.defaultProps = defaultProps$11;

	var propTypes$12 = {
	  active: PropTypes.bool,
	  block: PropTypes.bool,
	  color: PropTypes.string,
	  disabled: PropTypes.bool,
	  outline: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
	  onClick: PropTypes.func,
	  size: PropTypes.string,
	  children: PropTypes.node,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$12 = {
	  color: 'secondary',
	  tag: 'button'
	};

	var Button = function (_React$Component) {
	  inherits(Button, _React$Component);

	  function Button(props) {
	    classCallCheck(this, Button);

	    var _this = possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

	    _this.onClick = _this.onClick.bind(_this);
	    return _this;
	  }

	  createClass(Button, [{
	    key: 'onClick',
	    value: function onClick(e) {
	      if (this.props.disabled) {
	        e.preventDefault();
	        return;
	      }

	      if (this.props.onClick) {
	        this.props.onClick(e);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          active = _props.active,
	          block = _props.block,
	          className = _props.className,
	          cssModule = _props.cssModule,
	          color = _props.color,
	          outline = _props.outline,
	          size = _props.size,
	          Tag = _props.tag,
	          innerRef = _props.innerRef,
	          attributes = objectWithoutProperties(_props, ['active', 'block', 'className', 'cssModule', 'color', 'outline', 'size', 'tag', 'innerRef']);


	      var classes = mapToCssModules(classNames(className, 'btn', 'btn' + (outline ? '-outline' : '') + '-' + color, size ? 'btn-' + size : false, block ? 'btn-block' : false, { active: active, disabled: this.props.disabled }), cssModule);

	      if (attributes.href && Tag === 'button') {
	        Tag = 'a';
	      }

	      return React__default.createElement(Tag, _extends({
	        type: Tag === 'button' && attributes.onClick ? 'button' : undefined
	      }, attributes, {
	        className: classes,
	        ref: innerRef,
	        onClick: this.onClick
	      }));
	    }
	  }]);
	  return Button;
	}(React__default.Component);

	Button.propTypes = propTypes$12;
	Button.defaultProps = defaultProps$12;

	var propTypes$13 = {
	  children: PropTypes.node
	};

	var ButtonDropdown = function ButtonDropdown(props) {
	  return React__default.createElement(Dropdown, _extends({ group: true }, props));
	};

	ButtonDropdown.propTypes = propTypes$13;

	var propTypes$14 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  'aria-label': PropTypes.string,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  role: PropTypes.string,
	  size: PropTypes.string,
	  vertical: PropTypes.bool
	};

	var defaultProps$13 = {
	  tag: 'div',
	  role: 'group'
	};

	var ButtonGroup = function ButtonGroup(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      size = props.size,
	      vertical = props.vertical,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'size', 'vertical', 'tag']);


	  var classes = mapToCssModules(classNames(className, size ? 'btn-group-' + size : false, vertical ? 'btn-group-vertical' : 'btn-group'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	ButtonGroup.propTypes = propTypes$14;
	ButtonGroup.defaultProps = defaultProps$13;

	var propTypes$15 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  'aria-label': PropTypes.string,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  role: PropTypes.string
	};

	var defaultProps$14 = {
	  tag: 'div',
	  role: 'toolbar'
	};

	var ButtonToolbar = function ButtonToolbar(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'btn-toolbar'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	ButtonToolbar.propTypes = propTypes$15;
	ButtonToolbar.defaultProps = defaultProps$14;

	var propTypes$16 = {
	  children: PropTypes.node,
	  active: PropTypes.bool,
	  disabled: PropTypes.bool,
	  divider: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  header: PropTypes.bool,
	  onClick: PropTypes.func,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  toggle: PropTypes.bool
	};

	var contextTypes = {
	  toggle: PropTypes.func
	};

	var defaultProps$15 = {
	  tag: 'button',
	  toggle: true
	};

	var DropdownItem = function (_React$Component) {
	  inherits(DropdownItem, _React$Component);

	  function DropdownItem(props) {
	    classCallCheck(this, DropdownItem);

	    var _this = possibleConstructorReturn(this, (DropdownItem.__proto__ || Object.getPrototypeOf(DropdownItem)).call(this, props));

	    _this.onClick = _this.onClick.bind(_this);
	    _this.getTabIndex = _this.getTabIndex.bind(_this);
	    return _this;
	  }

	  createClass(DropdownItem, [{
	    key: 'onClick',
	    value: function onClick(e) {
	      if (this.props.disabled || this.props.header || this.props.divider) {
	        e.preventDefault();
	        return;
	      }

	      if (this.props.onClick) {
	        this.props.onClick(e);
	      }

	      if (this.props.toggle) {
	        this.context.toggle(e);
	      }
	    }
	  }, {
	    key: 'getTabIndex',
	    value: function getTabIndex() {
	      if (this.props.disabled || this.props.header || this.props.divider) {
	        return '-1';
	      }

	      return '0';
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var tabIndex = this.getTabIndex();

	      var _omit = omit(this.props, ['toggle']),
	          className = _omit.className,
	          cssModule = _omit.cssModule,
	          divider = _omit.divider,
	          Tag = _omit.tag,
	          header = _omit.header,
	          active = _omit.active,
	          props = objectWithoutProperties(_omit, ['className', 'cssModule', 'divider', 'tag', 'header', 'active']);

	      var classes = mapToCssModules(classNames(className, {
	        disabled: props.disabled,
	        'dropdown-item': !divider && !header,
	        active: active,
	        'dropdown-header': header,
	        'dropdown-divider': divider
	      }), cssModule);

	      if (Tag === 'button') {
	        if (header) {
	          Tag = 'h6';
	        } else if (divider) {
	          Tag = 'div';
	        } else if (props.href) {
	          Tag = 'a';
	        }
	      }

	      return React__default.createElement(Tag, _extends({
	        type: Tag === 'button' && (props.onClick || this.props.toggle) ? 'button' : undefined
	      }, props, {
	        tabIndex: tabIndex,
	        className: classes,
	        onClick: this.onClick
	      }));
	    }
	  }]);
	  return DropdownItem;
	}(React__default.Component);

	DropdownItem.propTypes = propTypes$16;
	DropdownItem.defaultProps = defaultProps$15;
	DropdownItem.contextTypes = contextTypes;

	var propTypes$17 = {
	  tag: PropTypes.string,
	  children: PropTypes.node.isRequired,
	  right: PropTypes.bool,
	  flip: PropTypes.bool,
	  modifiers: PropTypes.object,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  persist: PropTypes.bool
	};

	var defaultProps$16 = {
	  tag: 'div',
	  flip: true
	};

	var contextTypes$1 = {
	  isOpen: PropTypes.bool.isRequired,
	  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']).isRequired,
	  inNavbar: PropTypes.bool.isRequired
	};

	var noFlipModifier = { flip: { enabled: false } };

	var directionPositionMap = {
	  up: 'top',
	  left: 'left',
	  right: 'right',
	  down: 'bottom'
	};

	var DropdownMenu = function DropdownMenu(props, context) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      right = props.right,
	      tag = props.tag,
	      flip = props.flip,
	      modifiers = props.modifiers,
	      persist = props.persist,
	      attrs = objectWithoutProperties(props, ['className', 'cssModule', 'right', 'tag', 'flip', 'modifiers', 'persist']);

	  var classes = mapToCssModules(classNames(className, 'dropdown-menu', {
	    'dropdown-menu-right': right,
	    show: context.isOpen
	  }), cssModule);

	  var Tag = tag;

	  if (persist || context.isOpen && !context.inNavbar) {
	    Tag = reactPopper.Popper;

	    var position1 = directionPositionMap[context.direction] || 'bottom';
	    var position2 = right ? 'end' : 'start';
	    attrs.placement = position1 + '-' + position2;
	    attrs.component = tag;
	    attrs.modifiers = !flip ? _extends({}, modifiers, noFlipModifier) : modifiers;
	  }

	  return React__default.createElement(Tag, _extends({
	    tabIndex: '-1',
	    role: 'menu'
	  }, attrs, {
	    'aria-hidden': !context.isOpen,
	    className: classes,
	    'x-placement': attrs.placement
	  }));
	};

	DropdownMenu.propTypes = propTypes$17;
	DropdownMenu.defaultProps = defaultProps$16;
	DropdownMenu.contextTypes = contextTypes$1;

	var propTypes$18 = {
	  caret: PropTypes.bool,
	  color: PropTypes.string,
	  children: PropTypes.node,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  disabled: PropTypes.bool,
	  onClick: PropTypes.func,
	  'aria-haspopup': PropTypes.bool,
	  split: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  nav: PropTypes.bool
	};

	var defaultProps$17 = {
	  'aria-haspopup': true,
	  color: 'secondary'
	};

	var contextTypes$2 = {
	  isOpen: PropTypes.bool.isRequired,
	  toggle: PropTypes.func.isRequired,
	  inNavbar: PropTypes.bool.isRequired
	};

	var DropdownToggle = function (_React$Component) {
	  inherits(DropdownToggle, _React$Component);

	  function DropdownToggle(props) {
	    classCallCheck(this, DropdownToggle);

	    var _this = possibleConstructorReturn(this, (DropdownToggle.__proto__ || Object.getPrototypeOf(DropdownToggle)).call(this, props));

	    _this.onClick = _this.onClick.bind(_this);
	    return _this;
	  }

	  createClass(DropdownToggle, [{
	    key: 'onClick',
	    value: function onClick(e) {
	      if (this.props.disabled) {
	        e.preventDefault();
	        return;
	      }

	      if (this.props.nav && !this.props.tag) {
	        e.preventDefault();
	      }

	      if (this.props.onClick) {
	        this.props.onClick(e);
	      }

	      this.context.toggle(e);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          color = _props.color,
	          cssModule = _props.cssModule,
	          caret = _props.caret,
	          split = _props.split,
	          nav = _props.nav,
	          tag = _props.tag,
	          props = objectWithoutProperties(_props, ['className', 'color', 'cssModule', 'caret', 'split', 'nav', 'tag']);

	      var ariaLabel = props['aria-label'] || 'Toggle Dropdown';
	      var classes = mapToCssModules(classNames(className, {
	        'dropdown-toggle': caret || split,
	        'dropdown-toggle-split': split,
	        'nav-link': nav
	      }), cssModule);
	      var children = props.children || React__default.createElement(
	        'span',
	        { className: 'sr-only' },
	        ariaLabel
	      );

	      var Tag = void 0;

	      if (nav && !tag) {
	        Tag = 'a';
	        props.href = '#';
	      } else if (!tag) {
	        Tag = Button;
	        props.color = color;
	        props.cssModule = cssModule;
	      } else {
	        Tag = tag;
	      }

	      if (this.context.inNavbar) {
	        return React__default.createElement(Tag, _extends({}, props, {
	          className: classes,
	          onClick: this.onClick,
	          'aria-expanded': this.context.isOpen,
	          children: children
	        }));
	      }

	      return React__default.createElement(reactPopper.Target, _extends({}, props, {
	        className: classes,
	        component: Tag,
	        onClick: this.onClick,
	        'aria-expanded': this.context.isOpen,
	        children: children
	      }));
	    }
	  }]);
	  return DropdownToggle;
	}(React__default.Component);

	DropdownToggle.propTypes = propTypes$18;
	DropdownToggle.defaultProps = defaultProps$17;
	DropdownToggle.contextTypes = contextTypes$2;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var PropTypes$1 = createCommonjsModule(function (module, exports) {
	  'use strict';

	  exports.__esModule = true;
	  exports.classNamesShape = exports.timeoutsShape = undefined;
	  exports.transitionTimeout = transitionTimeout;

	  var _propTypes2 = _interopRequireDefault(PropTypes);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	  }

	  function transitionTimeout(transitionType) {
	    var timeoutPropName = 'transition' + transitionType + 'Timeout';
	    var enabledPropName = 'transition' + transitionType;

	    return function (props) {
	      // If the transition is enabled
	      if (props[enabledPropName]) {
	        // If no timeout duration is provided
	        if (props[timeoutPropName] == null) {
	          return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

	          // If the duration isn't a number
	        } else if (typeof props[timeoutPropName] !== 'number') {
	          return new Error(timeoutPropName + ' must be a number (in milliseconds)');
	        }
	      }

	      return null;
	    };
	  }

	  var timeoutsShape = exports.timeoutsShape = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
	    enter: _propTypes2.default.number,
	    exit: _propTypes2.default.number
	  }).isRequired]);

	  var classNamesShape = exports.classNamesShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
	    enter: _propTypes2.default.string,
	    exit: _propTypes2.default.string,
	    active: _propTypes2.default.string
	  }), _propTypes2.default.shape({
	    enter: _propTypes2.default.string,
	    enterDone: _propTypes2.default.string,
	    enterActive: _propTypes2.default.string,
	    exit: _propTypes2.default.string,
	    exitDone: _propTypes2.default.string,
	    exitActive: _propTypes2.default.string
	  })]);
	});

	unwrapExports(PropTypes$1);

	var Transition_1 = createCommonjsModule(function (module, exports) {
	  'use strict';

	  exports.__esModule = true;
	  exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;

	  var PropTypes$$1 = _interopRequireWildcard(PropTypes);

	  var _react2 = _interopRequireDefault(React__default);

	  var _reactDom2 = _interopRequireDefault(ReactDOM);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	  }

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }newObj.default = obj;return newObj;
	    }
	  }

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	    }return target;
	  }

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  function _possibleConstructorReturn(self, call) {
	    if (!self) {
	      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	  }

	  function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	  }

	  var UNMOUNTED = exports.UNMOUNTED = 'unmounted';
	  var EXITED = exports.EXITED = 'exited';
	  var ENTERING = exports.ENTERING = 'entering';
	  var ENTERED = exports.ENTERED = 'entered';
	  var EXITING = exports.EXITING = 'exiting';

	  /**
	   * The Transition component lets you describe a transition from one component
	   * state to another _over time_ with a simple declarative API. Most commonly
	   * it's used to animate the mounting and unmounting of a component, but can also
	   * be used to describe in-place transition states as well.
	   *
	   * By default the `Transition` component does not alter the behavior of the
	   * component it renders, it only tracks "enter" and "exit" states for the components.
	   * It's up to you to give meaning and effect to those states. For example we can
	   * add styles to a component when it enters or exits:
	   *
	   * ```jsx
	   * import Transition from 'react-transition-group/Transition';
	   *
	   * const duration = 300;
	   *
	   * const defaultStyle = {
	   *   transition: `opacity ${duration}ms ease-in-out`,
	   *   opacity: 0,
	   * }
	   *
	   * const transitionStyles = {
	   *   entering: { opacity: 0 },
	   *   entered:  { opacity: 1 },
	   * };
	   *
	   * const Fade = ({ in: inProp }) => (
	   *   <Transition in={inProp} timeout={duration}>
	   *     {(state) => (
	   *       <div style={{
	   *         ...defaultStyle,
	   *         ...transitionStyles[state]
	   *       }}>
	   *         I'm a fade Transition!
	   *       </div>
	   *     )}
	   *   </Transition>
	   * );
	   * ```
	   *
	   * As noted the `Transition` component doesn't _do_ anything by itself to its child component.
	   * What it does do is track transition states over time so you can update the
	   * component (such as by adding styles or classes) when it changes states.
	   *
	   * There are 4 main states a Transition can be in:
	   *  - `'entering'`
	   *  - `'entered'`
	   *  - `'exiting'`
	   *  - `'exited'`
	   *
	   * Transition state is toggled via the `in` prop. When `true` the component begins the
	   * "Enter" stage. During this stage, the component will shift from its current transition state,
	   * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
	   * it's complete. Let's take the following example:
	   *
	   * ```jsx
	   * state = { in: false };
	   *
	   * toggleEnterState = () => {
	   *   this.setState({ in: true });
	   * }
	   *
	   * render() {
	   *   return (
	   *     <div>
	   *       <Transition in={this.state.in} timeout={500} />
	   *       <button onClick={this.toggleEnterState}>Click to Enter</button>
	   *     </div>
	   *   );
	   * }
	   * ```
	   *
	   * When the button is clicked the component will shift to the `'entering'` state and
	   * stay there for 500ms (the value of `timeout`) before it finally switches to `'entered'`.
	   *
	   * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
	   *
	   * ## Timing
	   *
	   * Timing is often the trickiest part of animation, mistakes can result in slight delays
	   * that are hard to pin down. A common example is when you want to add an exit transition,
	   * you should set the desired final styles when the state is `'exiting'`. That's when the
	   * transition to those styles will start and, if you matched the `timeout` prop with the
	   * CSS Transition duration, it will end exactly when the state changes to `'exited'`.
	   *
	   * > **Note**: For simpler transitions the `Transition` component might be enough, but
	   * > take into account that it's platform-agnostic, while the `CSSTransition` component
	   * > [forces reflows](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
	   * > in order to make more complex transitions more predictable. For example, even though
	   * > classes `example-enter` and `example-enter-active` are applied immediately one after
	   * > another, you can still transition from one to the other because of the forced reflow
	   * > (read [this issue](https://github.com/reactjs/react-transition-group/issues/159#issuecomment-322761171)
	   * > for more info). Take this into account when choosing between `Transition` and
	   * > `CSSTransition`.
	   *
	   * ## Example
	   *
	   * <iframe src="https://codesandbox.io/embed/741op4mmj0?fontsize=14" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
	   *
	   */

	  var Transition = function (_React$Component) {
	    _inherits(Transition, _React$Component);

	    function Transition(props, context) {
	      _classCallCheck(this, Transition);

	      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

	      var parentGroup = context.transitionGroup;
	      // In the context of a TransitionGroup all enters are really appears
	      var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;

	      var initialStatus = void 0;
	      _this.nextStatus = null;

	      if (props.in) {
	        if (appear) {
	          initialStatus = EXITED;
	          _this.nextStatus = ENTERING;
	        } else {
	          initialStatus = ENTERED;
	        }
	      } else {
	        if (props.unmountOnExit || props.mountOnEnter) {
	          initialStatus = UNMOUNTED;
	        } else {
	          initialStatus = EXITED;
	        }
	      }

	      _this.state = { status: initialStatus };

	      _this.nextCallback = null;
	      return _this;
	    }

	    Transition.prototype.getChildContext = function getChildContext() {
	      return { transitionGroup: null }; // allows for nested Transitions
	    };

	    Transition.prototype.componentDidMount = function componentDidMount() {
	      this.updateStatus(true);
	    };

	    Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      var _ref = this.pendingState || this.state,
	          status = _ref.status;

	      if (nextProps.in) {
	        if (status === UNMOUNTED) {
	          this.setState({ status: EXITED });
	        }
	        if (status !== ENTERING && status !== ENTERED) {
	          this.nextStatus = ENTERING;
	        }
	      } else {
	        if (status === ENTERING || status === ENTERED) {
	          this.nextStatus = EXITING;
	        }
	      }
	    };

	    Transition.prototype.componentDidUpdate = function componentDidUpdate() {
	      this.updateStatus();
	    };

	    Transition.prototype.componentWillUnmount = function componentWillUnmount() {
	      this.cancelNextCallback();
	    };

	    Transition.prototype.getTimeouts = function getTimeouts() {
	      var timeout = this.props.timeout;

	      var exit = void 0,
	          enter = void 0,
	          appear = void 0;

	      exit = enter = appear = timeout;

	      if (timeout != null && typeof timeout !== 'number') {
	        exit = timeout.exit;
	        enter = timeout.enter;
	        appear = timeout.appear;
	      }
	      return { exit: exit, enter: enter, appear: appear };
	    };

	    Transition.prototype.updateStatus = function updateStatus() {
	      var mounting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      var nextStatus = this.nextStatus;

	      if (nextStatus !== null) {
	        this.nextStatus = null;
	        // nextStatus will always be ENTERING or EXITING.
	        this.cancelNextCallback();
	        var node = _reactDom2.default.findDOMNode(this);

	        if (nextStatus === ENTERING) {
	          this.performEnter(node, mounting);
	        } else {
	          this.performExit(node);
	        }
	      } else if (this.props.unmountOnExit && this.state.status === EXITED) {
	        this.setState({ status: UNMOUNTED });
	      }
	    };

	    Transition.prototype.performEnter = function performEnter(node, mounting) {
	      var _this2 = this;

	      var enter = this.props.enter;

	      var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;

	      var timeouts = this.getTimeouts();

	      // no enter animation skip right to ENTERED
	      // if we are mounting and running this it means appear _must_ be set
	      if (!mounting && !enter) {
	        this.safeSetState({ status: ENTERED }, function () {
	          _this2.props.onEntered(node);
	        });
	        return;
	      }

	      this.props.onEnter(node, appearing);

	      this.safeSetState({ status: ENTERING }, function () {
	        _this2.props.onEntering(node, appearing);

	        // FIXME: appear timeout?
	        _this2.onTransitionEnd(node, timeouts.enter, function () {
	          _this2.safeSetState({ status: ENTERED }, function () {
	            _this2.props.onEntered(node, appearing);
	          });
	        });
	      });
	    };

	    Transition.prototype.performExit = function performExit(node) {
	      var _this3 = this;

	      var exit = this.props.exit;

	      var timeouts = this.getTimeouts();

	      // no exit animation skip right to EXITED
	      if (!exit) {
	        this.safeSetState({ status: EXITED }, function () {
	          _this3.props.onExited(node);
	        });
	        return;
	      }
	      this.props.onExit(node);

	      this.safeSetState({ status: EXITING }, function () {
	        _this3.props.onExiting(node);

	        _this3.onTransitionEnd(node, timeouts.exit, function () {
	          _this3.safeSetState({ status: EXITED }, function () {
	            _this3.props.onExited(node);
	          });
	        });
	      });
	    };

	    Transition.prototype.cancelNextCallback = function cancelNextCallback() {
	      if (this.nextCallback !== null) {
	        this.nextCallback.cancel();
	        this.nextCallback = null;
	      }
	    };

	    Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
	      var _this4 = this;

	      // We need to track pending updates for instances where a cWRP fires quickly
	      // after cDM and before the state flushes, which would double trigger a
	      // transition
	      this.pendingState = nextState;

	      // This shouldn't be necessary, but there are weird race conditions with
	      // setState callbacks and unmounting in testing, so always make sure that
	      // we can cancel any pending setState callbacks after we unmount.
	      callback = this.setNextCallback(callback);
	      this.setState(nextState, function () {
	        _this4.pendingState = null;
	        callback();
	      });
	    };

	    Transition.prototype.setNextCallback = function setNextCallback(callback) {
	      var _this5 = this;

	      var active = true;

	      this.nextCallback = function (event) {
	        if (active) {
	          active = false;
	          _this5.nextCallback = null;

	          callback(event);
	        }
	      };

	      this.nextCallback.cancel = function () {
	        active = false;
	      };

	      return this.nextCallback;
	    };

	    Transition.prototype.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
	      this.setNextCallback(handler);

	      if (node) {
	        if (this.props.addEndListener) {
	          this.props.addEndListener(node, this.nextCallback);
	        }
	        if (timeout != null) {
	          setTimeout(this.nextCallback, timeout);
	        }
	      } else {
	        setTimeout(this.nextCallback, 0);
	      }
	    };

	    Transition.prototype.render = function render() {
	      var status = this.state.status;
	      if (status === UNMOUNTED) {
	        return null;
	      }

	      var _props = this.props,
	          children = _props.children,
	          childProps = _objectWithoutProperties(_props, ['children']);
	      // filter props for Transtition


	      delete childProps.in;
	      delete childProps.mountOnEnter;
	      delete childProps.unmountOnExit;
	      delete childProps.appear;
	      delete childProps.enter;
	      delete childProps.exit;
	      delete childProps.timeout;
	      delete childProps.addEndListener;
	      delete childProps.onEnter;
	      delete childProps.onEntering;
	      delete childProps.onEntered;
	      delete childProps.onExit;
	      delete childProps.onExiting;
	      delete childProps.onExited;

	      if (typeof children === 'function') {
	        return children(status, childProps);
	      }

	      var child = _react2.default.Children.only(children);
	      return _react2.default.cloneElement(child, childProps);
	    };

	    return Transition;
	  }(_react2.default.Component);

	  Transition.contextTypes = {
	    transitionGroup: PropTypes$$1.object
	  };
	  Transition.childContextTypes = {
	    transitionGroup: function transitionGroup() {}
	  };

	  Transition.propTypes =  false ? {
	    /**
	     * A `function` child can be used instead of a React element.
	     * This function is called with the current transition status
	     * ('entering', 'entered', 'exiting', 'exited', 'unmounted'), which can be used
	     * to apply context specific props to a component.
	     *
	     * ```jsx
	     * <Transition timeout={150}>
	     *   {(status) => (
	     *     <MyComponent className={`fade fade-${status}`} />
	     *   )}
	     * </Transition>
	     * ```
	     */
	    children: PropTypes$$1.oneOfType([PropTypes$$1.func.isRequired, PropTypes$$1.element.isRequired]).isRequired,

	    /**
	     * Show the component; triggers the enter or exit states
	     */
	    in: PropTypes$$1.bool,

	    /**
	     * By default the child component is mounted immediately along with
	     * the parent `Transition` component. If you want to "lazy mount" the component on the
	     * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
	     * mounted, even on "exited", unless you also specify `unmountOnExit`.
	     */
	    mountOnEnter: PropTypes$$1.bool,

	    /**
	     * By default the child component stays mounted after it reaches the `'exited'` state.
	     * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
	     */
	    unmountOnExit: PropTypes$$1.bool,

	    /**
	     * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
	     * If you want to transition on the first mount set `appear` to `true`, and the
	     * component will transition in as soon as the `<Transition>` mounts.
	     *
	     * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
	     */
	    appear: PropTypes$$1.bool,

	    /**
	     * Enable or disable enter transitions.
	     */
	    enter: PropTypes$$1.bool,

	    /**
	     * Enable or disable exit transitions.
	     */
	    exit: PropTypes$$1.bool,

	    /**
	     * The duration of the transition, in milliseconds.
	     * Required unless `addEndListener` is provided
	     *
	     * You may specify a single timeout for all transitions like: `timeout={500}`,
	     * or individually like:
	     *
	     * ```jsx
	     * timeout={{
	     *  enter: 300,
	     *  exit: 500,
	     * }}
	     * ```
	     *
	     * @type {number | { enter?: number, exit?: number }}
	     */
	    timeout: function timeout(props) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var pt = PropTypes$1.timeoutsShape;
	      if (!props.addEndListener) pt = pt.isRequired;
	      return pt.apply(undefined, [props].concat(args));
	    },

	    /**
	     * Add a custom transition end trigger. Called with the transitioning
	     * DOM node and a `done` callback. Allows for more fine grained transition end
	     * logic. **Note:** Timeouts are still used as a fallback if provided.
	     *
	     * ```jsx
	     * addEndListener={(node, done) => {
	     *   // use the css transitionend event to mark the finish of a transition
	     *   node.addEventListener('transitionend', done, false);
	     * }}
	     * ```
	     */
	    addEndListener: PropTypes$$1.func,

	    /**
	     * Callback fired before the "entering" status is applied. An extra parameter
	     * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	     *
	     * @type Function(node: HtmlElement, isAppearing: bool) -> void
	     */
	    onEnter: PropTypes$$1.func,

	    /**
	     * Callback fired after the "entering" status is applied. An extra parameter
	     * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	     *
	     * @type Function(node: HtmlElement, isAppearing: bool)
	     */
	    onEntering: PropTypes$$1.func,

	    /**
	     * Callback fired after the "entered" status is applied. An extra parameter
	     * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	     *
	     * @type Function(node: HtmlElement, isAppearing: bool) -> void
	     */
	    onEntered: PropTypes$$1.func,

	    /**
	     * Callback fired before the "exiting" status is applied.
	     *
	     * @type Function(node: HtmlElement) -> void
	     */
	    onExit: PropTypes$$1.func,

	    /**
	     * Callback fired after the "exiting" status is applied.
	     *
	     * @type Function(node: HtmlElement) -> void
	     */
	    onExiting: PropTypes$$1.func,

	    /**
	     * Callback fired after the "exited" status is applied.
	     *
	     * @type Function(node: HtmlElement) -> void
	     */
	    onExited: PropTypes$$1.func
	  } : {};

	  // Name the function so it is clearer in the documentation
	  function noop() {}

	  Transition.defaultProps = {
	    in: false,
	    mountOnEnter: false,
	    unmountOnExit: false,
	    appear: false,
	    enter: true,
	    exit: true,

	    onEnter: noop,
	    onEntering: noop,
	    onEntered: noop,

	    onExit: noop,
	    onExiting: noop,
	    onExited: noop
	  };

	  Transition.UNMOUNTED = 0;
	  Transition.EXITED = 1;
	  Transition.ENTERING = 2;
	  Transition.ENTERED = 3;
	  Transition.EXITING = 4;

	  exports.default = Transition;
	});

	var Transition = unwrapExports(Transition_1);

	var propTypes$19 = _extends({}, Transition.propTypes, {
	  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	  baseClass: PropTypes.string,
	  baseClassActive: PropTypes.string,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
	});

	var defaultProps$18 = _extends({}, Transition.defaultProps, {
	  tag: 'div',
	  baseClass: 'fade',
	  baseClassActive: 'show',
	  timeout: TransitionTimeouts.Fade,
	  appear: true,
	  enter: true,
	  exit: true,
	  in: true
	});

	function Fade(props) {
	  var Tag = props.tag,
	      baseClass = props.baseClass,
	      baseClassActive = props.baseClassActive,
	      className = props.className,
	      cssModule = props.cssModule,
	      children = props.children,
	      innerRef = props.innerRef,
	      otherProps = objectWithoutProperties(props, ['tag', 'baseClass', 'baseClassActive', 'className', 'cssModule', 'children', 'innerRef']);

	  // In NODE_ENV=production the Transition.propTypes are wrapped which results in an
	  // empty object "{}". This is the result of the `react-transition-group` babel
	  // configuration settings. Therefore, to ensure that production builds work without
	  // error, we can either explicitly define keys or use the Transition.defaultProps.
	  // Using the Transition.defaultProps excludes any required props. Thus, the best
	  // solution is to explicitly define required props in our utilities and reference these.
	  // This also gives us more flexibility in the future to remove the prop-types
	  // dependency in distribution builds (Similar to how `react-transition-group` does).
	  // Note: Without omitting the `react-transition-group` props, the resulting child
	  // Tag component would inherit the Transition properties as attributes for the HTML
	  // element which results in errors/warnings for non-valid attributes.

	  var transitionProps = pick(otherProps, TransitionPropTypeKeys);
	  var childProps = omit(otherProps, TransitionPropTypeKeys);

	  return React__default.createElement(
	    Transition,
	    transitionProps,
	    function (status) {
	      var isActive = status === 'entered';
	      var classes = mapToCssModules(classNames(className, baseClass, isActive && baseClassActive), cssModule);
	      return React__default.createElement(
	        Tag,
	        _extends({ className: classes }, childProps, { ref: innerRef }),
	        children
	      );
	    }
	  );
	}

	Fade.propTypes = propTypes$19;
	Fade.defaultProps = defaultProps$18;

	var propTypes$20 = {
	  color: PropTypes.string,
	  pill: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  children: PropTypes.node,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$19 = {
	  color: 'secondary',
	  pill: false,
	  tag: 'span'
	};

	var Badge = function Badge(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      color = props.color,
	      pill = props.pill,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'color', 'pill', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'badge', 'badge-' + color, pill ? 'badge-pill' : false), cssModule);

	  if (attributes.href && Tag === 'span') {
	    Tag = 'a';
	  }

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	Badge.propTypes = propTypes$20;
	Badge.defaultProps = defaultProps$19;

	var propTypes$21 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  inverse: PropTypes.bool,
	  color: PropTypes.string,
	  block: deprecated(PropTypes.bool, 'Please use the props "body"'),
	  body: PropTypes.bool,
	  outline: PropTypes.bool,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
	};

	var defaultProps$20 = {
	  tag: 'div'
	};

	var Card = function Card(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      color = props.color,
	      block = props.block,
	      body = props.body,
	      inverse = props.inverse,
	      outline = props.outline,
	      Tag = props.tag,
	      innerRef = props.innerRef,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'color', 'block', 'body', 'inverse', 'outline', 'tag', 'innerRef']);

	  var classes = mapToCssModules(classNames(className, 'card', inverse ? 'text-white' : false, block || body ? 'card-body' : false, color ? (outline ? 'border' : 'bg') + '-' + color : false), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes, ref: innerRef }));
	};

	Card.propTypes = propTypes$21;
	Card.defaultProps = defaultProps$20;

	var propTypes$22 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$21 = {
	  tag: 'div'
	};

	var CardGroup = function CardGroup(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'card-group'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardGroup.propTypes = propTypes$22;
	CardGroup.defaultProps = defaultProps$21;

	var propTypes$23 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$22 = {
	  tag: 'div'
	};

	var CardDeck = function CardDeck(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'card-deck'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardDeck.propTypes = propTypes$23;
	CardDeck.defaultProps = defaultProps$22;

	var propTypes$24 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$23 = {
	  tag: 'div'
	};

	var CardColumns = function CardColumns(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'card-columns'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardColumns.propTypes = propTypes$24;
	CardColumns.defaultProps = defaultProps$23;

	var propTypes$25 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$24 = {
	  tag: 'div'
	};

	var CardBody = function CardBody(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'card-body'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardBody.propTypes = propTypes$25;
	CardBody.defaultProps = defaultProps$24;

	function CardBlock(props) {
	  warnOnce('The "CardBlock" component has been deprecated.\nPlease use component "CardBody".');
	  return React__default.createElement(CardBody, props);
	}

	var propTypes$26 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$25 = {
	  tag: 'a'
	};

	var CardLink = function CardLink(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      innerRef = props.innerRef,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'innerRef']);

	  var classes = mapToCssModules(classNames(className, 'card-link'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { ref: innerRef, className: classes }));
	};

	CardLink.propTypes = propTypes$26;
	CardLink.defaultProps = defaultProps$25;

	var propTypes$27 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$26 = {
	  tag: 'div'
	};

	var CardFooter = function CardFooter(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'card-footer'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardFooter.propTypes = propTypes$27;
	CardFooter.defaultProps = defaultProps$26;

	var propTypes$28 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$27 = {
	  tag: 'div'
	};

	var CardHeader = function CardHeader(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'card-header'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardHeader.propTypes = propTypes$28;
	CardHeader.defaultProps = defaultProps$27;

	var propTypes$29 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  top: PropTypes.bool,
	  bottom: PropTypes.bool,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$28 = {
	  tag: 'img'
	};

	var CardImg = function CardImg(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      top = props.top,
	      bottom = props.bottom,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'top', 'bottom', 'tag']);


	  var cardImgClassName = 'card-img';
	  if (top) {
	    cardImgClassName = 'card-img-top';
	  }
	  if (bottom) {
	    cardImgClassName = 'card-img-bottom';
	  }

	  var classes = mapToCssModules(classNames(className, cardImgClassName), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardImg.propTypes = propTypes$29;
	CardImg.defaultProps = defaultProps$28;

	var propTypes$30 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$29 = {
	  tag: 'div'
	};

	var CardImgOverlay = function CardImgOverlay(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'card-img-overlay'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardImgOverlay.propTypes = propTypes$30;
	CardImgOverlay.defaultProps = defaultProps$29;

	var CarouselItem = function (_React$Component) {
	  inherits(CarouselItem, _React$Component);

	  function CarouselItem(props) {
	    classCallCheck(this, CarouselItem);

	    var _this = possibleConstructorReturn(this, (CarouselItem.__proto__ || Object.getPrototypeOf(CarouselItem)).call(this, props));

	    _this.state = {
	      startAnimation: false
	    };

	    _this.onEnter = _this.onEnter.bind(_this);
	    _this.onEntering = _this.onEntering.bind(_this);
	    _this.onExit = _this.onExit.bind(_this);
	    _this.onExiting = _this.onExiting.bind(_this);
	    _this.onExited = _this.onExited.bind(_this);
	    return _this;
	  }

	  createClass(CarouselItem, [{
	    key: 'onEnter',
	    value: function onEnter(node, isAppearing) {
	      this.setState({ startAnimation: false });
	      this.props.onEnter(node, isAppearing);
	    }
	  }, {
	    key: 'onEntering',
	    value: function onEntering(node, isAppearing) {
	      // getting this variable triggers a reflow
	      var offsetHeight = node.offsetHeight;
	      this.setState({ startAnimation: true });
	      this.props.onEntering(node, isAppearing);
	      return offsetHeight;
	    }
	  }, {
	    key: 'onExit',
	    value: function onExit(node) {
	      this.setState({ startAnimation: false });
	      this.props.onExit(node);
	    }
	  }, {
	    key: 'onExiting',
	    value: function onExiting(node) {
	      this.setState({ startAnimation: true });
	      node.dispatchEvent(new CustomEvent('slide.bs.carousel'));
	      this.props.onExiting(node);
	    }
	  }, {
	    key: 'onExited',
	    value: function onExited(node) {
	      node.dispatchEvent(new CustomEvent('slid.bs.carousel'));
	      this.props.onExited(node);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          isIn = _props.in,
	          children = _props.children,
	          cssModule = _props.cssModule,
	          slide = _props.slide,
	          Tag = _props.tag,
	          className = _props.className,
	          transitionProps = objectWithoutProperties(_props, ['in', 'children', 'cssModule', 'slide', 'tag', 'className']);


	      return React__default.createElement(
	        Transition,
	        _extends({}, transitionProps, {
	          enter: slide,
	          exit: slide,
	          'in': isIn,
	          onEnter: this.onEnter,
	          onEntering: this.onEntering,
	          onExit: this.onExit,
	          onExiting: this.onExiting,
	          onExited: this.onExited
	        }),
	        function (status) {
	          var direction = _this2.context.direction;

	          var isActive = status === TransitionStatuses.ENTERED || status === TransitionStatuses.EXITING;
	          var directionClassName = (status === TransitionStatuses.ENTERING || status === TransitionStatuses.EXITING) && _this2.state.startAnimation && (direction === 'right' ? 'carousel-item-left' : 'carousel-item-right');
	          var orderClassName = status === TransitionStatuses.ENTERING && (direction === 'right' ? 'carousel-item-next' : 'carousel-item-prev');
	          var itemClasses = mapToCssModules(classNames(className, 'carousel-item', isActive && 'active', directionClassName, orderClassName), cssModule);

	          return React__default.createElement(
	            Tag,
	            { className: itemClasses },
	            children
	          );
	        }
	      );
	    }
	  }]);
	  return CarouselItem;
	}(React__default.Component);

	CarouselItem.propTypes = _extends({}, Transition.propTypes, {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  in: PropTypes.bool,
	  cssModule: PropTypes.object,
	  children: PropTypes.node,
	  slide: PropTypes.bool,
	  className: PropTypes.string
	});

	CarouselItem.defaultProps = _extends({}, Transition.defaultProps, {
	  tag: 'div',
	  timeout: TransitionTimeouts.Carousel,
	  slide: true
	});

	CarouselItem.contextTypes = {
	  direction: PropTypes.string
	};

	var Carousel = function (_React$Component) {
	  inherits(Carousel, _React$Component);

	  function Carousel(props) {
	    classCallCheck(this, Carousel);

	    var _this = possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

	    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
	    _this.renderItems = _this.renderItems.bind(_this);
	    _this.hoverStart = _this.hoverStart.bind(_this);
	    _this.hoverEnd = _this.hoverEnd.bind(_this);
	    _this.state = {
	      direction: 'right',
	      indicatorClicked: false
	    };
	    return _this;
	  }

	  createClass(Carousel, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return { direction: this.state.direction };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Set up the cycle
	      if (this.props.ride === 'carousel') {
	        this.setInterval();
	      }

	      // TODO: move this to the specific carousel like bootstrap. Currently it will trigger ALL carousels on the page.
	      document.addEventListener('keyup', this.handleKeyPress);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.setInterval(nextProps);
	      // Calculate the direction to turn
	      if (this.props.activeIndex + 1 === nextProps.activeIndex) {
	        this.setState({ direction: 'right' });
	      } else if (this.props.activeIndex - 1 === nextProps.activeIndex) {
	        this.setState({ direction: 'left' });
	      } else if (this.props.activeIndex > nextProps.activeIndex) {
	        this.setState({ direction: this.state.indicatorClicked ? 'left' : 'right' });
	      } else if (this.props.activeIndex !== nextProps.activeIndex) {
	        this.setState({ direction: this.state.indicatorClicked ? 'right' : 'left' });
	      }
	      this.setState({ indicatorClicked: false });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.clearInterval();
	      document.removeEventListener('keyup', this.handleKeyPress);
	    }
	  }, {
	    key: 'setInterval',
	    value: function (_setInterval) {
	      function setInterval() {
	        return _setInterval.apply(this, arguments);
	      }

	      setInterval.toString = function () {
	        return _setInterval.toString();
	      };

	      return setInterval;
	    }(function () {
	      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

	      // make sure not to have multiple intervals going...
	      this.clearInterval();
	      if (props.interval) {
	        this.cycleInterval = setInterval(function () {
	          props.next();
	        }, parseInt(props.interval, 10));
	      }
	    })
	  }, {
	    key: 'clearInterval',
	    value: function (_clearInterval) {
	      function clearInterval() {
	        return _clearInterval.apply(this, arguments);
	      }

	      clearInterval.toString = function () {
	        return _clearInterval.toString();
	      };

	      return clearInterval;
	    }(function () {
	      clearInterval(this.cycleInterval);
	    })
	  }, {
	    key: 'hoverStart',
	    value: function hoverStart() {
	      if (this.props.pause === 'hover') {
	        this.clearInterval();
	      }
	      if (this.props.mouseEnter) {
	        var _props;

	        (_props = this.props).mouseEnter.apply(_props, arguments);
	      }
	    }
	  }, {
	    key: 'hoverEnd',
	    value: function hoverEnd() {
	      if (this.props.pause === 'hover') {
	        this.setInterval();
	      }
	      if (this.props.mouseLeave) {
	        var _props2;

	        (_props2 = this.props).mouseLeave.apply(_props2, arguments);
	      }
	    }
	  }, {
	    key: 'handleKeyPress',
	    value: function handleKeyPress(evt) {
	      if (this.props.keyboard) {
	        if (evt.keyCode === 37) {
	          this.props.previous();
	        } else if (evt.keyCode === 39) {
	          this.props.next();
	        }
	      }
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems(carouselItems, className) {
	      var _this2 = this;

	      var slide = this.props.slide;

	      return React__default.createElement(
	        'div',
	        { role: 'listbox', className: className },
	        carouselItems.map(function (item, index) {
	          var isIn = index === _this2.props.activeIndex;
	          return React__default.cloneElement(item, {
	            in: isIn,
	            slide: slide
	          });
	        })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _props3 = this.props,
	          cssModule = _props3.cssModule,
	          slide = _props3.slide,
	          className = _props3.className;

	      var outerClasses = mapToCssModules(classNames(className, 'carousel', slide && 'slide'), cssModule);

	      var innerClasses = mapToCssModules(classNames('carousel-inner'), cssModule);

	      // filter out booleans, null, or undefined
	      var children = this.props.children.filter(function (child) {
	        return child !== null && child !== undefined && typeof child !== 'boolean';
	      });

	      var slidesOnly = children.every(function (child) {
	        return child.type === CarouselItem;
	      });

	      // Rendering only slides
	      if (slidesOnly) {
	        return React__default.createElement(
	          'div',
	          { className: outerClasses, onMouseEnter: this.hoverStart, onMouseLeave: this.hoverEnd },
	          this.renderItems(children, innerClasses)
	        );
	      }

	      // Rendering slides and controls
	      if (children[0] instanceof Array) {
	        var _carouselItems = children[0];
	        var _controlLeft = children[1];
	        var _controlRight = children[2];

	        return React__default.createElement(
	          'div',
	          { className: outerClasses, onMouseEnter: this.hoverStart, onMouseLeave: this.hoverEnd },
	          this.renderItems(_carouselItems, innerClasses),
	          _controlLeft,
	          _controlRight
	        );
	      }

	      // Rendering indicators, slides and controls
	      var indicators = children[0];
	      var wrappedOnClick = function wrappedOnClick(e) {
	        if (typeof indicators.props.onClickHandler === 'function') {
	          _this3.setState({ indicatorClicked: true }, function () {
	            return indicators.props.onClickHandler(e);
	          });
	        }
	      };
	      var wrappedIndicators = React__default.cloneElement(indicators, { onClickHandler: wrappedOnClick });
	      var carouselItems = children[1];
	      var controlLeft = children[2];
	      var controlRight = children[3];

	      return React__default.createElement(
	        'div',
	        { className: outerClasses, onMouseEnter: this.hoverStart, onMouseLeave: this.hoverEnd },
	        wrappedIndicators,
	        this.renderItems(carouselItems, innerClasses),
	        controlLeft,
	        controlRight
	      );
	    }
	  }]);
	  return Carousel;
	}(React__default.Component);

	Carousel.propTypes = {
	  // the current active slide of the carousel
	  activeIndex: PropTypes.number,
	  // a function which should advance the carousel to the next slide (via activeIndex)
	  next: PropTypes.func.isRequired,
	  // a function which should advance the carousel to the previous slide (via activeIndex)
	  previous: PropTypes.func.isRequired,
	  // controls if the left and right arrow keys should control the carousel
	  keyboard: PropTypes.bool,
	  /* If set to "hover", pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on
	   * mouseleave. If set to false, hovering over the carousel won't pause it. (default: "hover")
	   */
	  pause: PropTypes.oneOf(['hover', false]),
	  // Autoplays the carousel after the user manually cycles the first item. If "carousel", autoplays the carousel on load.
	  // This is how bootstrap defines it... I would prefer a bool named autoplay or something...
	  ride: PropTypes.oneOf(['carousel']),
	  // the interval at which the carousel automatically cycles (default: 5000)
	  // eslint-disable-next-line react/no-unused-prop-types
	  interval: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
	  children: PropTypes.array,
	  // called when the mouse enters the Carousel
	  mouseEnter: PropTypes.func,
	  // called when the mouse exits the Carousel
	  mouseLeave: PropTypes.func,
	  // controls whether the slide animation on the Carousel works or not
	  slide: PropTypes.bool,
	  cssModule: PropTypes.object,
	  className: PropTypes.string
	};

	Carousel.defaultProps = {
	  interval: 5000,
	  pause: 'hover',
	  keyboard: true,
	  slide: true
	};

	Carousel.childContextTypes = {
	  direction: PropTypes.string
	};

	var CarouselControl = function CarouselControl(props) {
	  var direction = props.direction,
	      onClickHandler = props.onClickHandler,
	      cssModule = props.cssModule,
	      directionText = props.directionText,
	      className = props.className;


	  var anchorClasses = mapToCssModules(classNames(className, 'carousel-control-' + direction), cssModule);

	  var iconClasses = mapToCssModules(classNames('carousel-control-' + direction + '-icon'), cssModule);

	  var screenReaderClasses = mapToCssModules(classNames('sr-only'), cssModule);

	  return React__default.createElement(
	    'a',
	    {
	      className: anchorClasses,
	      role: 'button',
	      tabIndex: '0',
	      onClick: function onClick(e) {
	        e.preventDefault();
	        onClickHandler();
	      }
	    },
	    React__default.createElement('span', { className: iconClasses, 'aria-hidden': 'true' }),
	    React__default.createElement(
	      'span',
	      { className: screenReaderClasses },
	      directionText || direction
	    )
	  );
	};

	CarouselControl.propTypes = {
	  direction: PropTypes.oneOf(['prev', 'next']).isRequired,
	  onClickHandler: PropTypes.func.isRequired,
	  cssModule: PropTypes.object,
	  directionText: PropTypes.string,
	  className: PropTypes.string
	};

	var CarouselIndicators = function CarouselIndicators(props) {
	  var items = props.items,
	      activeIndex = props.activeIndex,
	      cssModule = props.cssModule,
	      onClickHandler = props.onClickHandler,
	      className = props.className;


	  var listClasses = mapToCssModules(classNames(className, 'carousel-indicators'), cssModule);
	  var indicators = items.map(function (item, idx) {
	    var indicatorClasses = mapToCssModules(classNames({ active: activeIndex === idx }), cssModule);
	    return React__default.createElement('li', {
	      key: '' + (item.key || item.src) + item.caption + item.altText,
	      onClick: function onClick(e) {
	        e.preventDefault();
	        onClickHandler(idx);
	      },
	      className: indicatorClasses
	    });
	  });

	  return React__default.createElement(
	    'ol',
	    { className: listClasses },
	    indicators
	  );
	};

	CarouselIndicators.propTypes = {
	  items: PropTypes.array.isRequired,
	  activeIndex: PropTypes.number.isRequired,
	  cssModule: PropTypes.object,
	  onClickHandler: PropTypes.func.isRequired,
	  className: PropTypes.string
	};

	var CarouselCaption = function CarouselCaption(props) {
	  var captionHeader = props.captionHeader,
	      captionText = props.captionText,
	      cssModule = props.cssModule,
	      className = props.className;

	  var classes = mapToCssModules(classNames(className, 'carousel-caption', 'd-none', 'd-md-block'), cssModule);

	  return React__default.createElement(
	    'div',
	    { className: classes },
	    React__default.createElement(
	      'h3',
	      null,
	      captionHeader
	    ),
	    React__default.createElement(
	      'p',
	      null,
	      captionText
	    )
	  );
	};

	CarouselCaption.propTypes = {
	  captionHeader: PropTypes.string,
	  captionText: PropTypes.string.isRequired,
	  cssModule: PropTypes.object,
	  className: PropTypes.string
	};

	var propTypes$31 = {
	  items: PropTypes.array.isRequired,
	  indicators: PropTypes.bool,
	  controls: PropTypes.bool,
	  autoPlay: PropTypes.bool,
	  activeIndex: PropTypes.number,
	  next: PropTypes.func,
	  previous: PropTypes.func,
	  goToIndex: PropTypes.func
	};

	var UncontrolledCarousel = function (_Component) {
	  inherits(UncontrolledCarousel, _Component);

	  function UncontrolledCarousel(props) {
	    classCallCheck(this, UncontrolledCarousel);

	    var _this = possibleConstructorReturn(this, (UncontrolledCarousel.__proto__ || Object.getPrototypeOf(UncontrolledCarousel)).call(this, props));

	    _this.animating = false;
	    _this.state = { activeIndex: 0 };
	    _this.next = _this.next.bind(_this);
	    _this.previous = _this.previous.bind(_this);
	    _this.goToIndex = _this.goToIndex.bind(_this);
	    _this.onExiting = _this.onExiting.bind(_this);
	    _this.onExited = _this.onExited.bind(_this);
	    return _this;
	  }

	  createClass(UncontrolledCarousel, [{
	    key: 'onExiting',
	    value: function onExiting() {
	      this.animating = true;
	    }
	  }, {
	    key: 'onExited',
	    value: function onExited() {
	      this.animating = false;
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      if (this.animating) return;
	      var nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
	      this.setState({ activeIndex: nextIndex });
	    }
	  }, {
	    key: 'previous',
	    value: function previous() {
	      if (this.animating) return;
	      var nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
	      this.setState({ activeIndex: nextIndex });
	    }
	  }, {
	    key: 'goToIndex',
	    value: function goToIndex(newIndex) {
	      if (this.animating) return;
	      this.setState({ activeIndex: newIndex });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          autoPlay = _props.autoPlay,
	          indicators = _props.indicators,
	          controls = _props.controls,
	          items = _props.items,
	          goToIndex = _props.goToIndex,
	          props = objectWithoutProperties(_props, ['autoPlay', 'indicators', 'controls', 'items', 'goToIndex']);
	      var activeIndex = this.state.activeIndex;


	      var slides = items.map(function (item) {
	        return React__default.createElement(
	          CarouselItem,
	          {
	            onExiting: _this2.onExiting,
	            onExited: _this2.onExited,
	            key: item.src
	          },
	          React__default.createElement('img', { className: 'd-block w-100', src: item.src, alt: item.altText }),
	          React__default.createElement(CarouselCaption, { captionText: item.caption, captionHeader: item.header || item.caption })
	        );
	      });

	      return React__default.createElement(
	        Carousel,
	        _extends({
	          activeIndex: activeIndex,
	          next: this.next,
	          previous: this.previous,
	          ride: autoPlay ? 'carousel' : undefined
	        }, props),
	        indicators && React__default.createElement(CarouselIndicators, {
	          items: items,
	          activeIndex: props.activeIndex || activeIndex,
	          onClickHandler: goToIndex || this.goToIndex
	        }),
	        slides,
	        controls && React__default.createElement(CarouselControl, {
	          direction: 'prev',
	          directionText: 'Previous',
	          onClickHandler: props.previous || this.previous
	        }),
	        controls && React__default.createElement(CarouselControl, {
	          direction: 'next',
	          directionText: 'Next',
	          onClickHandler: props.next || this.next
	        })
	      );
	    }
	  }]);
	  return UncontrolledCarousel;
	}(React.Component);

	UncontrolledCarousel.propTypes = propTypes$31;
	UncontrolledCarousel.defaultProps = {
	  controls: true,
	  indicators: true,
	  autoPlay: true
	};

	var propTypes$32 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$30 = {
	  tag: 'h6'
	};

	var CardSubtitle = function CardSubtitle(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'card-subtitle'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardSubtitle.propTypes = propTypes$32;
	CardSubtitle.defaultProps = defaultProps$30;

	var propTypes$33 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$31 = {
	  tag: 'p'
	};

	var CardText = function CardText(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'card-text'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardText.propTypes = propTypes$33;
	CardText.defaultProps = defaultProps$31;

	var propTypes$34 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$32 = {
	  tag: 'h5'
	};

	var CardTitle = function CardTitle(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'card-title'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	CardTitle.propTypes = propTypes$34;
	CardTitle.defaultProps = defaultProps$32;

	var propTypes$35 = {
	  className: PropTypes.string,
	  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	  type: PropTypes.string.isRequired,
	  label: PropTypes.node,
	  inline: PropTypes.bool,
	  valid: PropTypes.bool,
	  invalid: PropTypes.bool,
	  bsSize: PropTypes.string,
	  cssModule: PropTypes.object,
	  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func]),
	  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
	};

	function CustomInput(props) {
	  var className = props.className,
	      label = props.label,
	      inline = props.inline,
	      valid = props.valid,
	      invalid = props.invalid,
	      cssModule = props.cssModule,
	      children = props.children,
	      bsSize = props.bsSize,
	      innerRef = props.innerRef,
	      attributes = objectWithoutProperties(props, ['className', 'label', 'inline', 'valid', 'invalid', 'cssModule', 'children', 'bsSize', 'innerRef']);


	  var type = attributes.type;

	  var customClass = mapToCssModules(classNames(className, 'custom-' + type, bsSize ? 'custom-' + type + '-' + bsSize : false), cssModule);

	  var validationClassNames = mapToCssModules(classNames(invalid && 'is-invalid', valid && 'is-valid'), cssModule);

	  if (type === 'select') {
	    return React__default.createElement(
	      'select',
	      _extends({}, attributes, { ref: innerRef, className: classNames(validationClassNames, customClass) }),
	      children
	    );
	  }

	  if (type === 'file') {
	    return React__default.createElement(
	      'div',
	      { className: customClass },
	      React__default.createElement('input', _extends({}, attributes, { ref: innerRef, className: classNames(validationClassNames, mapToCssModules('custom-file-input', cssModule)) })),
	      React__default.createElement(
	        'label',
	        { className: mapToCssModules('custom-file-label', cssModule), htmlFor: attributes.id },
	        label || 'Choose file'
	      )
	    );
	  }

	  if (type !== 'checkbox' && type !== 'radio') {
	    return React__default.createElement('input', _extends({}, attributes, { ref: innerRef, className: classNames(validationClassNames, customClass) }));
	  }

	  var wrapperClasses = classNames(customClass, mapToCssModules(classNames('custom-control', { 'custom-control-inline': inline }), cssModule));

	  return React__default.createElement(
	    'div',
	    { className: wrapperClasses },
	    React__default.createElement('input', _extends({}, attributes, {
	      ref: innerRef,
	      className: classNames(validationClassNames, mapToCssModules('custom-control-input', cssModule))
	    })),
	    React__default.createElement(
	      'label',
	      { className: mapToCssModules('custom-control-label', cssModule), htmlFor: attributes.id },
	      label
	    ),
	    children
	  );
	}

	CustomInput.propTypes = propTypes$35;

	var propTypes$36 = {
	  children: PropTypes.node.isRequired,
	  className: PropTypes.string,
	  placement: PropTypes.string,
	  placementPrefix: PropTypes.string,
	  arrowClassName: PropTypes.string,
	  hideArrow: PropTypes.bool,
	  tag: PropTypes.string,
	  isOpen: PropTypes.bool.isRequired,
	  cssModule: PropTypes.object,
	  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	  fallbackPlacement: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	  flip: PropTypes.bool,
	  container: PropTypes.oneOfType([PropTypes.string, PropTypes.func, DOMElement]),
	  target: PropTypes.oneOfType([PropTypes.string, PropTypes.func, DOMElement]).isRequired,
	  modifiers: PropTypes.object
	};

	var defaultProps$33 = {
	  placement: 'auto',
	  hideArrow: false,
	  isOpen: false,
	  offset: 0,
	  fallbackPlacement: 'flip',
	  flip: true,
	  container: 'body',
	  modifiers: {}
	};

	var childContextTypes$1 = {
	  popperManager: PropTypes.object.isRequired
	};

	var PopperContent = function (_React$Component) {
	  inherits(PopperContent, _React$Component);

	  function PopperContent(props) {
	    classCallCheck(this, PopperContent);

	    var _this = possibleConstructorReturn(this, (PopperContent.__proto__ || Object.getPrototypeOf(PopperContent)).call(this, props));

	    _this.handlePlacementChange = _this.handlePlacementChange.bind(_this);
	    _this.setTargetNode = _this.setTargetNode.bind(_this);
	    _this.getTargetNode = _this.getTargetNode.bind(_this);
	    _this.state = {};
	    return _this;
	  }

	  createClass(PopperContent, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        popperManager: {
	          setTargetNode: this.setTargetNode,
	          getTargetNode: this.getTargetNode
	        }
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.handleProps();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      if (this.props.isOpen !== prevProps.isOpen) {
	        this.handleProps();
	      } else if (this._element) {
	        // rerender
	        this.renderIntoSubtree();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.hide();
	    }
	  }, {
	    key: 'setTargetNode',
	    value: function setTargetNode(node) {
	      this.targetNode = node;
	    }
	  }, {
	    key: 'getTargetNode',
	    value: function getTargetNode() {
	      return this.targetNode;
	    }
	  }, {
	    key: 'getContainerNode',
	    value: function getContainerNode() {
	      return getTarget(this.props.container);
	    }
	  }, {
	    key: 'handlePlacementChange',
	    value: function handlePlacementChange(data) {
	      if (this.state.placement !== data.placement) {
	        this.setState({ placement: data.placement });
	      }
	      return data;
	    }
	  }, {
	    key: 'handleProps',
	    value: function handleProps() {
	      if (this.props.container !== 'inline') {
	        if (this.props.isOpen) {
	          this.show();
	        } else {
	          this.hide();
	        }
	      }
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      if (this._element) {
	        this.getContainerNode().removeChild(this._element);
	        ReactDOM.unmountComponentAtNode(this._element);
	        this._element = null;
	      }
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this._element = document.createElement('div');
	      this.getContainerNode().appendChild(this._element);
	      this.renderIntoSubtree();
	      if (this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
	        this._element.childNodes[0].focus();
	      }
	    }
	  }, {
	    key: 'renderIntoSubtree',
	    value: function renderIntoSubtree() {
	      ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderChildren(), this._element);
	    }
	  }, {
	    key: 'renderChildren',
	    value: function renderChildren() {
	      var _props = this.props,
	          cssModule = _props.cssModule,
	          children = _props.children,
	          isOpen = _props.isOpen,
	          flip = _props.flip,
	          target = _props.target,
	          offset = _props.offset,
	          fallbackPlacement = _props.fallbackPlacement,
	          placementPrefix = _props.placementPrefix,
	          _arrowClassName = _props.arrowClassName,
	          hideArrow = _props.hideArrow,
	          className = _props.className,
	          tag = _props.tag,
	          container = _props.container,
	          modifiers = _props.modifiers,
	          attrs = objectWithoutProperties(_props, ['cssModule', 'children', 'isOpen', 'flip', 'target', 'offset', 'fallbackPlacement', 'placementPrefix', 'arrowClassName', 'hideArrow', 'className', 'tag', 'container', 'modifiers']);

	      var arrowClassName = mapToCssModules(classNames('arrow', _arrowClassName), cssModule);
	      var placement = (this.state.placement || attrs.placement).split('-')[0];
	      var popperClassName = mapToCssModules(classNames(className, placementPrefix ? placementPrefix + '-' + placement : placement), this.props.cssModule);

	      var extendedModifiers = _extends({
	        offset: { offset: offset },
	        flip: { enabled: flip, behavior: fallbackPlacement },
	        update: {
	          enabled: true,
	          order: 950,
	          fn: this.handlePlacementChange
	        }
	      }, modifiers);

	      return React__default.createElement(
	        reactPopper.Popper,
	        _extends({ modifiers: extendedModifiers }, attrs, { component: tag, className: popperClassName, 'x-placement': this.state.placement || attrs.placement }),
	        children,
	        !hideArrow && React__default.createElement(reactPopper.Arrow, { className: arrowClassName })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.setTargetNode(getTarget(this.props.target));

	      if (this.props.container === 'inline') {
	        return this.props.isOpen ? this.renderChildren() : null;
	      }

	      return null;
	    }
	  }]);
	  return PopperContent;
	}(React__default.Component);

	PopperContent.propTypes = propTypes$36;
	PopperContent.defaultProps = defaultProps$33;
	PopperContent.childContextTypes = childContextTypes$1;

	var PopperTargetHelper = function PopperTargetHelper(props, context) {
	  context.popperManager.setTargetNode(getTarget(props.target));
	  return null;
	};

	PopperTargetHelper.contextTypes = {
	  popperManager: PropTypes.object.isRequired
	};

	PopperTargetHelper.propTypes = {
	  target: PropTypes.oneOfType([PropTypes.string, PropTypes.func, DOMElement]).isRequired
	};

	var propTypes$37 = {
	  placement: PropTypes.oneOf(PopperPlacements),
	  target: PropTypes.oneOfType([PropTypes.string, PropTypes.func, DOMElement]).isRequired,
	  container: PropTypes.oneOfType([PropTypes.string, PropTypes.func, DOMElement]),
	  isOpen: PropTypes.bool,
	  disabled: PropTypes.bool,
	  hideArrow: PropTypes.bool,
	  className: PropTypes.string,
	  innerClassName: PropTypes.string,
	  placementPrefix: PropTypes.string,
	  cssModule: PropTypes.object,
	  toggle: PropTypes.func,
	  delay: PropTypes.oneOfType([PropTypes.shape({ show: PropTypes.number, hide: PropTypes.number }), PropTypes.number]),
	  modifiers: PropTypes.object,
	  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	};

	var DEFAULT_DELAYS = {
	  show: 0,
	  hide: 0
	};

	var defaultProps$34 = {
	  isOpen: false,
	  hideArrow: false,
	  placement: 'right',
	  placementPrefix: 'bs-popover',
	  delay: DEFAULT_DELAYS,
	  toggle: function toggle() {}
	};

	var Popover = function (_React$Component) {
	  inherits(Popover, _React$Component);

	  function Popover(props) {
	    classCallCheck(this, Popover);

	    var _this = possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props));

	    _this.addTargetEvents = _this.addTargetEvents.bind(_this);
	    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
	    _this.removeTargetEvents = _this.removeTargetEvents.bind(_this);
	    _this.getRef = _this.getRef.bind(_this);
	    _this.toggle = _this.toggle.bind(_this);
	    _this.show = _this.show.bind(_this);
	    _this.hide = _this.hide.bind(_this);
	    return _this;
	  }

	  createClass(Popover, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._target = getTarget(this.props.target);
	      this.handleProps();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.handleProps();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.clearShowTimeout();
	      this.clearHideTimeout();
	      this.removeTargetEvents();
	    }
	  }, {
	    key: 'getRef',
	    value: function getRef(ref) {
	      this._popover = ref;
	    }
	  }, {
	    key: 'getDelay',
	    value: function getDelay(key) {
	      var delay = this.props.delay;

	      if ((typeof delay === 'undefined' ? 'undefined' : _typeof(delay)) === 'object') {
	        return isNaN(delay[key]) ? DEFAULT_DELAYS[key] : delay[key];
	      }
	      return delay;
	    }
	  }, {
	    key: 'handleProps',
	    value: function handleProps() {
	      if (this.props.isOpen) {
	        this.show();
	      } else {
	        this.hide();
	      }
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this.clearHideTimeout();
	      this.addTargetEvents();
	      if (!this.props.isOpen) {
	        this.clearShowTimeout();
	        this._showTimeout = setTimeout(this.toggle, this.getDelay('show'));
	      }
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.clearShowTimeout();
	      this.removeTargetEvents();
	      if (this.props.isOpen) {
	        this.clearHideTimeout();
	        this._hideTimeout = setTimeout(this.toggle, this.getDelay('hide'));
	      }
	    }
	  }, {
	    key: 'clearShowTimeout',
	    value: function clearShowTimeout() {
	      clearTimeout(this._showTimeout);
	      this._showTimeout = undefined;
	    }
	  }, {
	    key: 'clearHideTimeout',
	    value: function clearHideTimeout() {
	      clearTimeout(this._hideTimeout);
	      this._hideTimeout = undefined;
	    }
	  }, {
	    key: 'handleDocumentClick',
	    value: function handleDocumentClick(e) {
	      if (e.target !== this._target && !this._target.contains(e.target) && e.target !== this._popover && !(this._popover && this._popover.contains(e.target))) {
	        if (this._hideTimeout) {
	          this.clearHideTimeout();
	        }

	        if (this.props.isOpen) {
	          this.toggle(e);
	        }
	      }
	    }
	  }, {
	    key: 'addTargetEvents',
	    value: function addTargetEvents() {
	      var _this2 = this;

	      ['click', 'touchstart'].forEach(function (event) {
	        return document.addEventListener(event, _this2.handleDocumentClick, true);
	      });
	    }
	  }, {
	    key: 'removeTargetEvents',
	    value: function removeTargetEvents() {
	      var _this3 = this;

	      ['click', 'touchstart'].forEach(function (event) {
	        return document.removeEventListener(event, _this3.handleDocumentClick, true);
	      });
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle(e) {
	      if (this.props.disabled) {
	        return e && e.preventDefault();
	      }

	      return this.props.toggle(e);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.props.isOpen) {
	        return null;
	      }

	      var attributes = omit(this.props, Object.keys(propTypes$37));
	      var classes = mapToCssModules(classNames('popover-inner', this.props.innerClassName), this.props.cssModule);

	      var popperClasses = mapToCssModules(classNames('popover', 'show', this.props.className), this.props.cssModule);

	      return React__default.createElement(
	        PopperContent,
	        {
	          className: popperClasses,
	          target: this.props.target,
	          isOpen: this.props.isOpen,
	          hideArrow: this.props.hideArrow,
	          placement: this.props.placement,
	          placementPrefix: this.props.placementPrefix,
	          container: this.props.container,
	          modifiers: this.props.modifiers,
	          offset: this.props.offset
	        },
	        React__default.createElement('div', _extends({}, attributes, { className: classes, ref: this.getRef }))
	      );
	    }
	  }]);
	  return Popover;
	}(React__default.Component);

	Popover.propTypes = propTypes$37;
	Popover.defaultProps = defaultProps$34;

	var propTypes$38 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$35 = {
	  tag: 'h3'
	};

	var PopoverHeader = function PopoverHeader(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'popover-header'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	PopoverHeader.propTypes = propTypes$38;
	PopoverHeader.defaultProps = defaultProps$35;

	function PopoverTitle(props) {
	  warnOnce('The "PopoverTitle" component has been deprecated.\nPlease use component "PopoverHeader".');
	  return React__default.createElement(PopoverHeader, props);
	}

	var propTypes$39 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$36 = {
	  tag: 'div'
	};

	var PopoverBody = function PopoverBody(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'popover-body'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	PopoverBody.propTypes = propTypes$39;
	PopoverBody.defaultProps = defaultProps$36;

	function PopoverContent(props) {
	  warnOnce('The "PopoverContent" component has been deprecated.\nPlease use component "PopoverBody".');
	  return React__default.createElement(PopoverBody, props);
	}

	var propTypes$40 = {
	  children: PropTypes.node,
	  bar: PropTypes.bool,
	  multi: PropTypes.bool,
	  tag: PropTypes.string,
	  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	  animated: PropTypes.bool,
	  striped: PropTypes.bool,
	  color: PropTypes.string,
	  className: PropTypes.string,
	  barClassName: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$37 = {
	  tag: 'div',
	  value: 0,
	  max: 100
	};

	var Progress = function Progress(props) {
	  var children = props.children,
	      className = props.className,
	      barClassName = props.barClassName,
	      cssModule = props.cssModule,
	      value = props.value,
	      max = props.max,
	      animated = props.animated,
	      striped = props.striped,
	      color = props.color,
	      bar = props.bar,
	      multi = props.multi,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['children', 'className', 'barClassName', 'cssModule', 'value', 'max', 'animated', 'striped', 'color', 'bar', 'multi', 'tag']);


	  var percent = toNumber(value) / toNumber(max) * 100;

	  var progressClasses = mapToCssModules(classNames(className, 'progress'), cssModule);

	  var progressBarClasses = mapToCssModules(classNames('progress-bar', bar ? className || barClassName : barClassName, animated ? 'progress-bar-animated' : null, color ? 'bg-' + color : null, striped || animated ? 'progress-bar-striped' : null), cssModule);

	  var ProgressBar = multi ? children : React__default.createElement('div', {
	    className: progressBarClasses,
	    style: { width: percent + '%' },
	    role: 'progressbar',
	    'aria-valuenow': value,
	    'aria-valuemin': '0',
	    'aria-valuemax': max,
	    children: children
	  });

	  if (bar) {
	    return ProgressBar;
	  }

	  return React__default.createElement(Tag, _extends({}, attributes, { className: progressClasses, children: ProgressBar }));
	};

	Progress.propTypes = propTypes$40;
	Progress.defaultProps = defaultProps$37;

	var propTypes$42 = {
	  children: PropTypes.node.isRequired,
	  node: PropTypes.any
	};

	var Portal = function (_React$Component) {
	  inherits(Portal, _React$Component);

	  function Portal() {
	    classCallCheck(this, Portal);
	    return possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(this, arguments));
	  }

	  createClass(Portal, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.defaultNode) {
	        document.body.removeChild(this.defaultNode);
	      }
	      this.defaultNode = null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!canUseDOM) {
	        return null;
	      }

	      if (!this.props.node && !this.defaultNode) {
	        this.defaultNode = document.createElement('div');
	        document.body.appendChild(this.defaultNode);
	      }

	      return ReactDOM.createPortal(this.props.children, this.props.node || this.defaultNode);
	    }
	  }]);
	  return Portal;
	}(React__default.Component);

	Portal.propTypes = propTypes$42;

	function noop() {}

	var FadePropTypes = PropTypes.shape(Fade.propTypes);

	var propTypes$41 = {
	  isOpen: PropTypes.bool,
	  autoFocus: PropTypes.bool,
	  centered: PropTypes.bool,
	  size: PropTypes.string,
	  toggle: PropTypes.func,
	  keyboard: PropTypes.bool,
	  role: PropTypes.string,
	  labelledBy: PropTypes.string,
	  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
	  onEnter: PropTypes.func,
	  onExit: PropTypes.func,
	  onOpened: PropTypes.func,
	  onClosed: PropTypes.func,
	  children: PropTypes.node,
	  className: PropTypes.string,
	  wrapClassName: PropTypes.string,
	  modalClassName: PropTypes.string,
	  backdropClassName: PropTypes.string,
	  contentClassName: PropTypes.string,
	  external: PropTypes.node,
	  fade: PropTypes.bool,
	  cssModule: PropTypes.object,
	  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	  backdropTransition: FadePropTypes,
	  modalTransition: FadePropTypes,
	  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
	};

	var propsToOmit = Object.keys(propTypes$41);

	var defaultProps$38 = {
	  isOpen: false,
	  autoFocus: true,
	  centered: false,
	  role: 'dialog',
	  backdrop: true,
	  keyboard: true,
	  zIndex: 1050,
	  fade: true,
	  onOpened: noop,
	  onClosed: noop,
	  modalTransition: {
	    timeout: TransitionTimeouts.Modal
	  },
	  backdropTransition: {
	    mountOnEnter: true,
	    timeout: TransitionTimeouts.Fade // uses standard fade transition
	  }
	};

	var Modal = function (_React$Component) {
	  inherits(Modal, _React$Component);

	  function Modal(props) {
	    classCallCheck(this, Modal);

	    var _this = possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

	    _this._element = null;
	    _this._originalBodyPadding = null;
	    _this.handleBackdropMouseDown = _this.handleBackdropMouseDown.bind(_this);
	    _this.handleBackdropMouseUp = _this.handleBackdropMouseUp.bind(_this);
	    _this.handleEscape = _this.handleEscape.bind(_this);
	    _this.onOpened = _this.onOpened.bind(_this);
	    _this.onClosed = _this.onClosed.bind(_this);

	    _this.state = {
	      isOpen: props.isOpen
	    };

	    if (props.isOpen) {
	      _this.init();
	    }
	    return _this;
	  }

	  createClass(Modal, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.onEnter) {
	        this.props.onEnter();
	      }

	      if (this.state.isOpen && this.props.autoFocus) {
	        this.setFocus();
	      }

	      this._isMounted = true;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.isOpen && !this.props.isOpen) {
	        this.setState({ isOpen: nextProps.isOpen });
	      }
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(nextProps, nextState) {
	      if (nextState.isOpen && !this.state.isOpen) {
	        this.init();
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      if (this.props.autoFocus && this.state.isOpen && !prevState.isOpen) {
	        this.setFocus();
	      }

	      if (this._element && prevProps.zIndex !== this.props.zIndex) {
	        this._element.style.zIndex = this.props.zIndex;
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.props.onExit) {
	        this.props.onExit();
	      }

	      if (this.state.isOpen) {
	        this.destroy();
	      }

	      this._isMounted = false;
	    }
	  }, {
	    key: 'onOpened',
	    value: function onOpened(node, isAppearing) {
	      this.props.onOpened();
	      (this.props.modalTransition.onEntered || noop)(node, isAppearing);
	    }
	  }, {
	    key: 'onClosed',
	    value: function onClosed(node) {
	      // so all methods get called before it is unmounted
	      this.props.onClosed();
	      (this.props.modalTransition.onExited || noop)(node);
	      this.destroy();

	      if (this._isMounted) {
	        this.setState({ isOpen: false });
	      }
	    }
	  }, {
	    key: 'setFocus',
	    value: function setFocus() {
	      if (this._dialog && this._dialog.parentNode && typeof this._dialog.parentNode.focus === 'function') {
	        this._dialog.parentNode.focus();
	      }
	    }
	  }, {
	    key: 'handleBackdropMouseDown',
	    value: function handleBackdropMouseDown(e) {
	      this._mouseDownElement = e.target;
	    }
	  }, {
	    key: 'handleBackdropMouseUp',
	    value: function handleBackdropMouseUp(e) {
	      if (e.target === this._mouseDownElement) {
	        e.stopPropagation();
	        if (!this.props.isOpen || this.props.backdrop !== true) return;

	        var container = this._dialog;

	        if (e.target && !container.contains(e.target) && this.props.toggle) {
	          this.props.toggle(e);
	        }
	      }
	    }
	  }, {
	    key: 'handleEscape',
	    value: function handleEscape(e) {
	      if (this.props.isOpen && this.props.keyboard && e.keyCode === 27 && this.props.toggle) {
	        this.props.toggle(e);
	      }
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      this._element = document.createElement('div');
	      this._element.setAttribute('tabindex', '-1');
	      this._element.style.position = 'relative';
	      this._element.style.zIndex = this.props.zIndex;
	      this._originalBodyPadding = getOriginalBodyPadding();

	      conditionallyUpdateScrollbar();

	      document.body.appendChild(this._element);

	      if (!this.bodyClassAdded) {
	        document.body.className = classNames(document.body.className, mapToCssModules('modal-open', this.props.cssModule));
	        this.bodyClassAdded = true;
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      if (this._element) {
	        document.body.removeChild(this._element);
	        this._element = null;
	      }

	      if (this.bodyClassAdded) {
	        var modalOpenClassName = mapToCssModules('modal-open', this.props.cssModule);
	        // Use regex to prevent matching `modal-open` as part of a different class, e.g. `my-modal-opened`
	        var modalOpenClassNameRegex = new RegExp('(^| )' + modalOpenClassName + '( |$)');
	        document.body.className = document.body.className.replace(modalOpenClassNameRegex, ' ').trim();
	        this.bodyClassAdded = false;
	      }

	      setScrollbarWidth(this._originalBodyPadding);
	    }
	  }, {
	    key: 'renderModalDialog',
	    value: function renderModalDialog() {
	      var _classNames,
	          _this2 = this;

	      var attributes = omit(this.props, propsToOmit);
	      var dialogBaseClass = 'modal-dialog';

	      return React__default.createElement(
	        'div',
	        _extends({}, attributes, {
	          className: mapToCssModules(classNames(dialogBaseClass, this.props.className, (_classNames = {}, defineProperty(_classNames, 'modal-' + this.props.size, this.props.size), defineProperty(_classNames, dialogBaseClass + '-centered', this.props.centered), _classNames)), this.props.cssModule),
	          role: 'document',
	          ref: function ref(c) {
	            _this2._dialog = c;
	          }
	        }),
	        React__default.createElement(
	          'div',
	          {
	            className: mapToCssModules(classNames('modal-content', this.props.contentClassName), this.props.cssModule)
	          },
	          this.props.children
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.isOpen) {
	        var _props = this.props,
	            wrapClassName = _props.wrapClassName,
	            modalClassName = _props.modalClassName,
	            backdropClassName = _props.backdropClassName,
	            cssModule = _props.cssModule,
	            isOpen = _props.isOpen,
	            backdrop = _props.backdrop,
	            role = _props.role,
	            labelledBy = _props.labelledBy,
	            external = _props.external,
	            innerRef = _props.innerRef;


	        var modalAttributes = {
	          onMouseDown: this.handleBackdropMouseDown,
	          onMouseUp: this.handleBackdropMouseUp,
	          onKeyUp: this.handleEscape,
	          style: { display: 'block' },
	          'aria-labelledby': labelledBy,
	          role: role,
	          tabIndex: '-1'
	        };

	        var hasTransition = this.props.fade;
	        var modalTransition = _extends({}, Fade.defaultProps, this.props.modalTransition, {
	          baseClass: hasTransition ? this.props.modalTransition.baseClass : '',
	          timeout: hasTransition ? this.props.modalTransition.timeout : 0
	        });
	        var backdropTransition = _extends({}, Fade.defaultProps, this.props.backdropTransition, {
	          baseClass: hasTransition ? this.props.backdropTransition.baseClass : '',
	          timeout: hasTransition ? this.props.backdropTransition.timeout : 0
	        });

	        return React__default.createElement(
	          Portal,
	          { node: this._element },
	          React__default.createElement(
	            'div',
	            { className: mapToCssModules(wrapClassName) },
	            React__default.createElement(
	              Fade,
	              _extends({}, modalAttributes, modalTransition, {
	                'in': isOpen,
	                onEntered: this.onOpened,
	                onExited: this.onClosed,
	                cssModule: cssModule,
	                className: mapToCssModules(classNames('modal', modalClassName), cssModule),
	                innerRef: innerRef
	              }),
	              external,
	              this.renderModalDialog()
	            ),
	            React__default.createElement(Fade, _extends({}, backdropTransition, {
	              'in': isOpen && !!backdrop,
	              cssModule: cssModule,
	              className: mapToCssModules(classNames('modal-backdrop', backdropClassName), cssModule)
	            }))
	          )
	        );
	      }

	      return null;
	    }
	  }]);
	  return Modal;
	}(React__default.Component);

	Modal.propTypes = propTypes$41;
	Modal.defaultProps = defaultProps$38;

	var propTypes$43 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  wrapTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  toggle: PropTypes.func,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  children: PropTypes.node,
	  closeAriaLabel: PropTypes.string
	};

	var defaultProps$39 = {
	  tag: 'h5',
	  wrapTag: 'div',
	  closeAriaLabel: 'Close'
	};

	var ModalHeader = function ModalHeader(props) {
	  var closeButton = void 0;
	  var className = props.className,
	      cssModule = props.cssModule,
	      children = props.children,
	      toggle = props.toggle,
	      Tag = props.tag,
	      WrapTag = props.wrapTag,
	      closeAriaLabel = props.closeAriaLabel,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'children', 'toggle', 'tag', 'wrapTag', 'closeAriaLabel']);


	  var classes = mapToCssModules(classNames(className, 'modal-header'), cssModule);

	  if (toggle) {
	    closeButton = React__default.createElement(
	      'button',
	      { type: 'button', onClick: toggle, className: mapToCssModules('close', cssModule), 'aria-label': closeAriaLabel },
	      React__default.createElement(
	        'span',
	        { 'aria-hidden': 'true' },
	        String.fromCharCode(215)
	      )
	    );
	  }

	  return React__default.createElement(
	    WrapTag,
	    _extends({}, attributes, { className: classes }),
	    React__default.createElement(
	      Tag,
	      { className: mapToCssModules('modal-title', cssModule) },
	      children
	    ),
	    closeButton
	  );
	};

	ModalHeader.propTypes = propTypes$43;
	ModalHeader.defaultProps = defaultProps$39;

	var propTypes$44 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$40 = {
	  tag: 'div'
	};

	var ModalBody = function ModalBody(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'modal-body'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	ModalBody.propTypes = propTypes$44;
	ModalBody.defaultProps = defaultProps$40;

	var propTypes$45 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$41 = {
	  tag: 'div'
	};

	var ModalFooter = function ModalFooter(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'modal-footer'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	ModalFooter.propTypes = propTypes$45;
	ModalFooter.defaultProps = defaultProps$41;

	var propTypes$46 = {
	  placement: PropTypes.oneOf(PopperPlacements),
	  target: PropTypes.oneOfType([PropTypes.string, PropTypes.func, DOMElement]).isRequired,
	  container: PropTypes.oneOfType([PropTypes.string, PropTypes.func, DOMElement]),
	  isOpen: PropTypes.bool,
	  disabled: PropTypes.bool,
	  hideArrow: PropTypes.bool,
	  className: PropTypes.string,
	  innerClassName: PropTypes.string,
	  arrowClassName: PropTypes.string,
	  cssModule: PropTypes.object,
	  toggle: PropTypes.func,
	  autohide: PropTypes.bool,
	  placementPrefix: PropTypes.string,
	  delay: PropTypes.oneOfType([PropTypes.shape({ show: PropTypes.number, hide: PropTypes.number }), PropTypes.number]),
	  modifiers: PropTypes.object,
	  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
	  trigger: PropTypes.string
	};

	var DEFAULT_DELAYS$1 = {
	  show: 0,
	  hide: 250
	};

	var defaultProps$42 = {
	  isOpen: false,
	  hideArrow: false,
	  placement: 'top',
	  placementPrefix: 'bs-tooltip',
	  delay: DEFAULT_DELAYS$1,
	  autohide: true,
	  toggle: function toggle() {}
	};

	var Tooltip = function (_React$Component) {
	  inherits(Tooltip, _React$Component);

	  function Tooltip(props) {
	    classCallCheck(this, Tooltip);

	    var _this = possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

	    _this.addTargetEvents = _this.addTargetEvents.bind(_this);
	    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
	    _this.removeTargetEvents = _this.removeTargetEvents.bind(_this);
	    _this.toggle = _this.toggle.bind(_this);
	    _this.onMouseOverTooltip = _this.onMouseOverTooltip.bind(_this);
	    _this.onMouseLeaveTooltip = _this.onMouseLeaveTooltip.bind(_this);
	    _this.onMouseOverTooltipContent = _this.onMouseOverTooltipContent.bind(_this);
	    _this.onMouseLeaveTooltipContent = _this.onMouseLeaveTooltipContent.bind(_this);
	    _this.show = _this.show.bind(_this);
	    _this.hide = _this.hide.bind(_this);
	    _this.onEscKeyDown = _this.onEscKeyDown.bind(_this);
	    return _this;
	  }

	  createClass(Tooltip, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._target = getTarget(this.props.target);
	      this.addTargetEvents();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.removeTargetEvents();
	    }
	  }, {
	    key: 'onMouseOverTooltip',
	    value: function onMouseOverTooltip(e) {
	      if (this._hideTimeout) {
	        this.clearHideTimeout();
	      }
	      this._showTimeout = setTimeout(this.show.bind(this, e), this.getDelay('show'));
	    }
	  }, {
	    key: 'onMouseLeaveTooltip',
	    value: function onMouseLeaveTooltip(e) {
	      if (this._showTimeout) {
	        this.clearShowTimeout();
	      }
	      this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'));
	    }
	  }, {
	    key: 'onMouseOverTooltipContent',
	    value: function onMouseOverTooltipContent() {
	      if (this.props.autohide) {
	        return;
	      }
	      if (this._hideTimeout) {
	        this.clearHideTimeout();
	      }
	    }
	  }, {
	    key: 'onMouseLeaveTooltipContent',
	    value: function onMouseLeaveTooltipContent(e) {
	      if (this.props.autohide) {
	        return;
	      }
	      if (this._showTimeout) {
	        this.clearShowTimeout();
	      }
	      e.persist();
	      this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'));
	    }
	  }, {
	    key: 'onEscKeyDown',
	    value: function onEscKeyDown(e) {
	      if (e.key === 'Escape') {
	        this.hide(e);
	      }
	    }
	  }, {
	    key: 'getDelay',
	    value: function getDelay(key) {
	      var delay = this.props.delay;

	      if ((typeof delay === 'undefined' ? 'undefined' : _typeof(delay)) === 'object') {
	        return isNaN(delay[key]) ? DEFAULT_DELAYS$1[key] : delay[key];
	      }
	      return delay;
	    }
	  }, {
	    key: 'show',
	    value: function show(e) {
	      if (!this.props.isOpen) {
	        this.clearShowTimeout();
	        this.toggle(e);
	      }
	    }
	  }, {
	    key: 'hide',
	    value: function hide(e) {
	      if (this.props.isOpen) {
	        this.clearHideTimeout();
	        this.toggle(e);
	      }
	    }
	  }, {
	    key: 'clearShowTimeout',
	    value: function clearShowTimeout() {
	      clearTimeout(this._showTimeout);
	      this._showTimeout = undefined;
	    }
	  }, {
	    key: 'clearHideTimeout',
	    value: function clearHideTimeout() {
	      clearTimeout(this._hideTimeout);
	      this._hideTimeout = undefined;
	    }
	  }, {
	    key: 'handleDocumentClick',
	    value: function handleDocumentClick(e) {
	      if (e.target === this._target || this._target.contains(e.target)) {
	        if (this._hideTimeout) {
	          this.clearHideTimeout();
	        }

	        if (!this.props.isOpen) {
	          this.toggle(e);
	        }
	      } else if (this.props.isOpen && e.target.getAttribute('role') !== 'tooltip') {
	        if (this._showTimeout) {
	          this.clearShowTimeout();
	        }
	        this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'));
	      }
	    }
	  }, {
	    key: 'addTargetEvents',
	    value: function addTargetEvents() {
	      var _this2 = this;

	      if (this.props.trigger) {
	        var triggers = this.props.trigger.split(' ');
	        if (triggers.indexOf('manual') === -1) {
	          if (triggers.indexOf('click') > -1) {
	            ['click', 'touchstart'].forEach(function (event) {
	              return document.addEventListener(event, _this2.handleDocumentClick, true);
	            });
	          }
	          if (triggers.indexOf('hover') > -1) {
	            this._target.addEventListener('mouseover', this.onMouseOverTooltip, true);
	            this._target.addEventListener('mouseout', this.onMouseLeaveTooltip, true);
	          }
	          if (triggers.indexOf('focus') > -1) {
	            this._target.addEventListener('focusin', this.show, true);
	            this._target.addEventListener('focusout', this.hide, true);
	          }
	          this._target.addEventListener('keydown', this.onEscKeyDown, true);
	        }
	      } else {
	        this._target.addEventListener('mouseover', this.onMouseOverTooltip, true);
	        this._target.addEventListener('mouseout', this.onMouseLeaveTooltip, true);
	        this._target.addEventListener('keydown', this.onEscKeyDown, true);
	        this._target.addEventListener('focusin', this.show, true);
	        this._target.addEventListener('focusout', this.hide, true);
	        ['click', 'touchstart'].forEach(function (event) {
	          return document.addEventListener(event, _this2.handleDocumentClick, true);
	        });
	      }
	    }
	  }, {
	    key: 'removeTargetEvents',
	    value: function removeTargetEvents() {
	      var _this3 = this;

	      this._target.removeEventListener('mouseover', this.onMouseOverTooltip, true);
	      this._target.removeEventListener('mouseout', this.onMouseLeaveTooltip, true);
	      this._target.addEventListener('keydown', this.onEscKeyDown, true);
	      this._target.addEventListener('focusin', this.show, true);
	      this._target.addEventListener('focusout', this.hide, true);

	      ['click', 'touchstart'].forEach(function (event) {
	        return document.removeEventListener(event, _this3.handleDocumentClick, true);
	      });
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle(e) {
	      if (this.props.disabled) {
	        return e && e.preventDefault();
	      }

	      return this.props.toggle(e);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.props.isOpen) {
	        return null;
	      }

	      var attributes = omit(this.props, Object.keys(propTypes$46));
	      var classes = mapToCssModules(classNames('tooltip-inner', this.props.innerClassName), this.props.cssModule);

	      var popperClasses = mapToCssModules(classNames('tooltip', 'show', this.props.className), this.props.cssModule);

	      return React__default.createElement(
	        PopperContent,
	        {
	          className: popperClasses,
	          target: this.props.target,
	          isOpen: this.props.isOpen,
	          hideArrow: this.props.hideArrow,
	          placement: this.props.placement,
	          placementPrefix: this.props.placementPrefix,
	          arrowClassName: this.props.arrowClassName,
	          container: this.props.container,
	          modifiers: this.props.modifiers,
	          offset: this.props.offset,
	          cssModule: this.props.cssModule
	        },
	        React__default.createElement('div', _extends({}, attributes, {
	          ref: this.props.innerRef,
	          className: classes,
	          role: 'tooltip',
	          'aria-hidden': this.props.isOpen,
	          onMouseOver: this.onMouseOverTooltipContent,
	          onMouseLeave: this.onMouseLeaveTooltipContent,
	          onKeyDown: this.onEscKeyDown
	        }))
	      );
	    }
	  }]);
	  return Tooltip;
	}(React__default.Component);

	Tooltip.propTypes = propTypes$46;
	Tooltip.defaultProps = defaultProps$42;

	var propTypes$47 = {
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  size: PropTypes.string,
	  bordered: PropTypes.bool,
	  borderless: PropTypes.bool,
	  striped: PropTypes.bool,
	  inverse: deprecated(PropTypes.bool, 'Please use the prop "dark"'),
	  dark: PropTypes.bool,
	  hover: PropTypes.bool,
	  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  responsiveTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
	};

	var defaultProps$43 = {
	  tag: 'table',
	  responsiveTag: 'div'
	};

	var Table = function Table(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      size = props.size,
	      bordered = props.bordered,
	      borderless = props.borderless,
	      striped = props.striped,
	      inverse = props.inverse,
	      dark = props.dark,
	      hover = props.hover,
	      responsive = props.responsive,
	      Tag = props.tag,
	      ResponsiveTag = props.responsiveTag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'size', 'bordered', 'borderless', 'striped', 'inverse', 'dark', 'hover', 'responsive', 'tag', 'responsiveTag']);


	  var classes = mapToCssModules(classNames(className, 'table', size ? 'table-' + size : false, bordered ? 'table-bordered' : false, borderless ? 'table-borderless' : false, striped ? 'table-striped' : false, dark || inverse ? 'table-dark' : false, hover ? 'table-hover' : false), cssModule);

	  var table = React__default.createElement(Tag, _extends({}, attributes, { className: classes }));

	  if (responsive) {
	    var responsiveClassName = responsive === true ? 'table-responsive' : 'table-responsive-' + responsive;

	    return React__default.createElement(
	      ResponsiveTag,
	      { className: responsiveClassName },
	      table
	    );
	  }

	  return table;
	};

	Table.propTypes = propTypes$47;
	Table.defaultProps = defaultProps$43;

	var propTypes$48 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  flush: PropTypes.bool,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$44 = {
	  tag: 'ul'
	};

	var ListGroup = function ListGroup(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      flush = props.flush,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'flush']);

	  var classes = mapToCssModules(classNames(className, 'list-group', flush ? 'list-group-flush' : false), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	ListGroup.propTypes = propTypes$48;
	ListGroup.defaultProps = defaultProps$44;

	var propTypes$49 = {
	  children: PropTypes.node,
	  inline: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$45 = {
	  tag: 'form'
	};

	var Form = function (_Component) {
	  inherits(Form, _Component);

	  function Form(props) {
	    classCallCheck(this, Form);

	    var _this = possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

	    _this.getRef = _this.getRef.bind(_this);
	    _this.submit = _this.submit.bind(_this);
	    return _this;
	  }

	  createClass(Form, [{
	    key: 'getRef',
	    value: function getRef(ref) {
	      if (this.props.innerRef) {
	        this.props.innerRef(ref);
	      }
	      this.ref = ref;
	    }
	  }, {
	    key: 'submit',
	    value: function submit() {
	      if (this.ref) {
	        this.ref.submit();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          cssModule = _props.cssModule,
	          inline = _props.inline,
	          Tag = _props.tag,
	          innerRef = _props.innerRef,
	          attributes = objectWithoutProperties(_props, ['className', 'cssModule', 'inline', 'tag', 'innerRef']);


	      var classes = mapToCssModules(classNames(className, inline ? 'form-inline' : false), cssModule);

	      return React__default.createElement(Tag, _extends({}, attributes, { ref: innerRef, className: classes }));
	    }
	  }]);
	  return Form;
	}(React.Component);

	Form.propTypes = propTypes$49;
	Form.defaultProps = defaultProps$45;

	var propTypes$50 = {
	  children: PropTypes.node,
	  tag: PropTypes.string,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  valid: PropTypes.bool,
	  tooltip: PropTypes.bool
	};

	var defaultProps$46 = {
	  tag: 'div',
	  valid: undefined
	};

	var FormFeedback = function FormFeedback(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      valid = props.valid,
	      tooltip = props.tooltip,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'valid', 'tooltip', 'tag']);


	  var validMode = tooltip ? 'tooltip' : 'feedback';

	  var classes = mapToCssModules(classNames(className, valid ? 'valid-' + validMode : 'invalid-' + validMode), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	FormFeedback.propTypes = propTypes$50;
	FormFeedback.defaultProps = defaultProps$46;

	var propTypes$51 = {
	  children: PropTypes.node,
	  row: PropTypes.bool,
	  check: PropTypes.bool,
	  inline: PropTypes.bool,
	  disabled: PropTypes.bool,
	  tag: PropTypes.string,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$47 = {
	  tag: 'div'
	};

	var FormGroup = function FormGroup(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      row = props.row,
	      disabled = props.disabled,
	      check = props.check,
	      inline = props.inline,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'row', 'disabled', 'check', 'inline', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'position-relative', row ? 'row' : false, check ? 'form-check' : 'form-group', check && inline ? 'form-check-inline' : false, check && disabled ? 'disabled' : false), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	FormGroup.propTypes = propTypes$51;
	FormGroup.defaultProps = defaultProps$47;

	var propTypes$52 = {
	  children: PropTypes.node,
	  inline: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  color: PropTypes.string,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$48 = {
	  tag: 'small',
	  color: 'muted'
	};

	var FormText = function FormText(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      inline = props.inline,
	      color = props.color,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'inline', 'color', 'tag']);


	  var classes = mapToCssModules(classNames(className, !inline ? 'form-text' : false, color ? 'text-' + color : false), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	FormText.propTypes = propTypes$52;
	FormText.defaultProps = defaultProps$48;

	/* eslint react/prefer-stateless-function: 0 */

	var propTypes$53 = {
	  children: PropTypes.node,
	  type: PropTypes.string,
	  size: PropTypes.string,
	  bsSize: PropTypes.string,
	  state: deprecated(PropTypes.string, 'Please use the props "valid" and "invalid" to indicate the state.'),
	  valid: PropTypes.bool,
	  invalid: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
	  static: deprecated(PropTypes.bool, 'Please use the prop "plaintext"'),
	  plaintext: PropTypes.bool,
	  addon: PropTypes.bool,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$49 = {
	  type: 'text'
	};

	var Input = function (_React$Component) {
	  inherits(Input, _React$Component);

	  function Input(props) {
	    classCallCheck(this, Input);

	    var _this = possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

	    _this.getRef = _this.getRef.bind(_this);
	    _this.focus = _this.focus.bind(_this);
	    return _this;
	  }

	  createClass(Input, [{
	    key: 'getRef',
	    value: function getRef(ref) {
	      if (this.props.innerRef) {
	        this.props.innerRef(ref);
	      }
	      this.ref = ref;
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      if (this.ref) {
	        this.ref.focus();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          cssModule = _props.cssModule,
	          type = _props.type,
	          bsSize = _props.bsSize,
	          state = _props.state,
	          valid = _props.valid,
	          invalid = _props.invalid,
	          tag = _props.tag,
	          addon = _props.addon,
	          staticInput = _props.static,
	          plaintext = _props.plaintext,
	          innerRef = _props.innerRef,
	          attributes = objectWithoutProperties(_props, ['className', 'cssModule', 'type', 'bsSize', 'state', 'valid', 'invalid', 'tag', 'addon', 'static', 'plaintext', 'innerRef']);


	      var checkInput = ['radio', 'checkbox'].indexOf(type) > -1;
	      var isNotaNumber = new RegExp('\\D', 'g');

	      var fileInput = type === 'file';
	      var textareaInput = type === 'textarea';
	      var selectInput = type === 'select';
	      var Tag = tag || (selectInput || textareaInput ? type : 'input');

	      var formControlClass = 'form-control';

	      if (plaintext || staticInput) {
	        formControlClass = formControlClass + '-plaintext';
	        Tag = tag || 'p';
	      } else if (fileInput) {
	        formControlClass = formControlClass + '-file';
	      } else if (checkInput) {
	        if (addon) {
	          formControlClass = null;
	        } else {
	          formControlClass = 'form-check-input';
	        }
	      }

	      if (state && typeof valid === 'undefined' && typeof invalid === 'undefined') {
	        if (state === 'danger') {
	          invalid = true;
	        } else if (state === 'success') {
	          valid = true;
	        }
	      }

	      if (attributes.size && isNotaNumber.test(attributes.size)) {
	        warnOnce('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.');
	        bsSize = attributes.size;
	        delete attributes.size;
	      }

	      var classes = mapToCssModules(classNames(className, invalid && 'is-invalid', valid && 'is-valid', bsSize ? 'form-control-' + bsSize : false, formControlClass), cssModule);

	      if (Tag === 'input' || tag && typeof tag === 'function') {
	        attributes.type = type;
	      }

	      if (attributes.children && !(plaintext || staticInput || type === 'select' || typeof Tag !== 'string' || Tag === 'select')) {
	        warnOnce('Input with a type of "' + type + '" cannot have children. Please use "value"/"defaultValue" instead.');
	        delete attributes.children;
	      }

	      return React__default.createElement(Tag, _extends({}, attributes, { ref: innerRef, className: classes }));
	    }
	  }]);
	  return Input;
	}(React__default.Component);

	Input.propTypes = propTypes$53;
	Input.defaultProps = defaultProps$49;

	var propTypes$54 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  size: PropTypes.string,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$50 = {
	  tag: 'div'
	};

	var InputGroup = function InputGroup(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      size = props.size,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'size']);

	  var classes = mapToCssModules(classNames(className, 'input-group', size ? 'input-group-' + size : null), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	InputGroup.propTypes = propTypes$54;
	InputGroup.defaultProps = defaultProps$50;

	var propTypes$56 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$52 = {
	  tag: 'span'
	};

	var InputGroupText = function InputGroupText(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'input-group-text'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	InputGroupText.propTypes = propTypes$56;
	InputGroupText.defaultProps = defaultProps$52;

	var propTypes$55 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  addonType: PropTypes.oneOf(['prepend', 'append']).isRequired,
	  children: PropTypes.node,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$51 = {
	  tag: 'div'
	};

	var InputGroupAddon = function InputGroupAddon(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      addonType = props.addonType,
	      children = props.children,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'addonType', 'children']);


	  var classes = mapToCssModules(classNames(className, 'input-group-' + addonType), cssModule);

	  // Convenience to assist with transition
	  if (typeof children === 'string') {
	    return React__default.createElement(
	      Tag,
	      _extends({}, attributes, { className: classes }),
	      React__default.createElement(InputGroupText, { children: children })
	    );
	  }

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes, children: children }));
	};

	InputGroupAddon.propTypes = propTypes$55;
	InputGroupAddon.defaultProps = defaultProps$51;

	var propTypes$57 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  addonType: PropTypes.oneOf(['prepend', 'append']).isRequired,
	  children: PropTypes.node,
	  groupClassName: PropTypes.string,
	  groupAttributes: PropTypes.object,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var InputGroupButton = function InputGroupButton(props) {
	  warnOnce('The "InputGroupButton" component has been deprecated.\nPlease use component "InputGroupAddon".');

	  var children = props.children,
	      groupClassName = props.groupClassName,
	      groupAttributes = props.groupAttributes,
	      propsWithoutGroup = objectWithoutProperties(props, ['children', 'groupClassName', 'groupAttributes']);


	  if (typeof children === 'string') {
	    var cssModule = propsWithoutGroup.cssModule,
	        tag = propsWithoutGroup.tag,
	        addonType = propsWithoutGroup.addonType,
	        attributes = objectWithoutProperties(propsWithoutGroup, ['cssModule', 'tag', 'addonType']);


	    var allGroupAttributes = _extends({}, groupAttributes, {
	      cssModule: cssModule,
	      tag: tag,
	      addonType: addonType
	    });

	    return React__default.createElement(
	      InputGroupAddon,
	      _extends({}, allGroupAttributes, { className: groupClassName }),
	      React__default.createElement(Button, _extends({}, attributes, { children: children }))
	    );
	  }

	  return React__default.createElement(InputGroupAddon, _extends({}, props, { children: children }));
	};

	InputGroupButton.propTypes = propTypes$57;

	var propTypes$58 = {
	  addonType: PropTypes.oneOf(['prepend', 'append']).isRequired,
	  children: PropTypes.node
	};

	var InputGroupButtonDropdown = function InputGroupButtonDropdown(props) {
	  return React__default.createElement(Dropdown, props);
	};

	InputGroupButtonDropdown.propTypes = propTypes$58;

	var colWidths$1 = ['xs', 'sm', 'md', 'lg', 'xl'];

	var stringOrNumberProp$1 = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

	var columnProps$1 = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({
	  size: stringOrNumberProp$1,
	  push: deprecated(stringOrNumberProp$1, 'Please use the prop "order"'),
	  pull: deprecated(stringOrNumberProp$1, 'Please use the prop "order"'),
	  order: stringOrNumberProp$1,
	  offset: stringOrNumberProp$1
	})]);

	var propTypes$59 = {
	  children: PropTypes.node,
	  hidden: PropTypes.bool,
	  check: PropTypes.bool,
	  size: PropTypes.string,
	  for: PropTypes.string,
	  tag: PropTypes.string,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  xs: columnProps$1,
	  sm: columnProps$1,
	  md: columnProps$1,
	  lg: columnProps$1,
	  xl: columnProps$1,
	  widths: PropTypes.array
	};

	var defaultProps$53 = {
	  tag: 'label',
	  widths: colWidths$1
	};

	var getColumnSizeClass$1 = function getColumnSizeClass(isXs, colWidth, colSize) {
	  if (colSize === true || colSize === '') {
	    return isXs ? 'col' : 'col-' + colWidth;
	  } else if (colSize === 'auto') {
	    return isXs ? 'col-auto' : 'col-' + colWidth + '-auto';
	  }

	  return isXs ? 'col-' + colSize : 'col-' + colWidth + '-' + colSize;
	};

	var Label = function Label(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      hidden = props.hidden,
	      widths = props.widths,
	      Tag = props.tag,
	      check = props.check,
	      size = props.size,
	      htmlFor = props.for,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'hidden', 'widths', 'tag', 'check', 'size', 'for']);


	  var colClasses = [];

	  widths.forEach(function (colWidth, i) {
	    var columnProp = props[colWidth];

	    delete attributes[colWidth];

	    if (!columnProp && columnProp !== '') {
	      return;
	    }

	    var isXs = !i;
	    var colClass = void 0;

	    if (isobject(columnProp)) {
	      var _classNames;

	      var colSizeInterfix = isXs ? '-' : '-' + colWidth + '-';
	      colClass = getColumnSizeClass$1(isXs, colWidth, columnProp.size);

	      colClasses.push(mapToCssModules(classNames((_classNames = {}, defineProperty(_classNames, colClass, columnProp.size || columnProp.size === ''), defineProperty(_classNames, 'order' + colSizeInterfix + columnProp.order, columnProp.order || columnProp.order === 0), defineProperty(_classNames, 'offset' + colSizeInterfix + columnProp.offset, columnProp.offset || columnProp.offset === 0), _classNames))), cssModule);
	    } else {
	      colClass = getColumnSizeClass$1(isXs, colWidth, columnProp);
	      colClasses.push(colClass);
	    }
	  });

	  var classes = mapToCssModules(classNames(className, hidden ? 'sr-only' : false, check ? 'form-check-label' : false, size ? 'col-form-label-' + size : false, colClasses, colClasses.length ? 'col-form-label' : false), cssModule);

	  return React__default.createElement(Tag, _extends({ htmlFor: htmlFor }, attributes, { className: classes }));
	};

	Label.propTypes = propTypes$59;
	Label.defaultProps = defaultProps$53;

	var propTypes$60 = {
	  body: PropTypes.bool,
	  bottom: PropTypes.bool,
	  children: PropTypes.node,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  heading: PropTypes.bool,
	  left: PropTypes.bool,
	  list: PropTypes.bool,
	  middle: PropTypes.bool,
	  object: PropTypes.bool,
	  right: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  top: PropTypes.bool
	};

	var Media = function Media(props) {
	  var body = props.body,
	      bottom = props.bottom,
	      className = props.className,
	      cssModule = props.cssModule,
	      heading = props.heading,
	      left = props.left,
	      list = props.list,
	      middle = props.middle,
	      object = props.object,
	      right = props.right,
	      tag = props.tag,
	      top = props.top,
	      attributes = objectWithoutProperties(props, ['body', 'bottom', 'className', 'cssModule', 'heading', 'left', 'list', 'middle', 'object', 'right', 'tag', 'top']);


	  var defaultTag = void 0;
	  if (heading) {
	    defaultTag = 'h4';
	  } else if (attributes.href) {
	    defaultTag = 'a';
	  } else if (attributes.src || object) {
	    defaultTag = 'img';
	  } else if (list) {
	    defaultTag = 'ul';
	  } else {
	    defaultTag = 'div';
	  }
	  var Tag = tag || defaultTag;

	  var classes = mapToCssModules(classNames(className, {
	    'media-body': body,
	    'media-heading': heading,
	    'media-left': left,
	    'media-right': right,
	    'media-top': top,
	    'media-bottom': bottom,
	    'media-middle': middle,
	    'media-object': object,
	    'media-list': list,
	    media: !body && !heading && !left && !right && !top && !bottom && !middle && !object && !list
	  }), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	Media.propTypes = propTypes$60;

	var propTypes$61 = {
	  children: PropTypes.node,
	  className: PropTypes.string,
	  listClassName: PropTypes.string,
	  cssModule: PropTypes.object,
	  size: PropTypes.string,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  listTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  'aria-label': PropTypes.string
	};

	var defaultProps$54 = {
	  tag: 'nav',
	  listTag: 'ul',
	  'aria-label': 'pagination'
	};

	var Pagination = function Pagination(props) {
	  var className = props.className,
	      listClassName = props.listClassName,
	      cssModule = props.cssModule,
	      size = props.size,
	      Tag = props.tag,
	      ListTag = props.listTag,
	      label = props['aria-label'],
	      attributes = objectWithoutProperties(props, ['className', 'listClassName', 'cssModule', 'size', 'tag', 'listTag', 'aria-label']);


	  var classes = mapToCssModules(classNames(className), cssModule);

	  var listClasses = mapToCssModules(classNames(listClassName, 'pagination', defineProperty({}, 'pagination-' + size, !!size)), cssModule);

	  return React__default.createElement(
	    Tag,
	    { className: classes, 'aria-label': label },
	    React__default.createElement(ListTag, _extends({}, attributes, { className: listClasses }))
	  );
	};

	Pagination.propTypes = propTypes$61;
	Pagination.defaultProps = defaultProps$54;

	var propTypes$62 = {
	  active: PropTypes.bool,
	  children: PropTypes.node,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  disabled: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
	};

	var defaultProps$55 = {
	  tag: 'li'
	};

	var PaginationItem = function PaginationItem(props) {
	  var active = props.active,
	      className = props.className,
	      cssModule = props.cssModule,
	      disabled = props.disabled,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['active', 'className', 'cssModule', 'disabled', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'page-item', {
	    active: active,
	    disabled: disabled
	  }), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	PaginationItem.propTypes = propTypes$62;
	PaginationItem.defaultProps = defaultProps$55;

	var propTypes$63 = {
	  'aria-label': PropTypes.string,
	  children: PropTypes.node,
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  next: PropTypes.bool,
	  previous: PropTypes.bool,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
	};

	var defaultProps$56 = {
	  tag: 'a'
	};

	var PaginationLink = function PaginationLink(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      next = props.next,
	      previous = props.previous,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'next', 'previous', 'tag']);


	  var classes = mapToCssModules(classNames(className, 'page-link'), cssModule);

	  var defaultAriaLabel = void 0;
	  if (previous) {
	    defaultAriaLabel = 'Previous';
	  } else if (next) {
	    defaultAriaLabel = 'Next';
	  }
	  var ariaLabel = props['aria-label'] || defaultAriaLabel;

	  var defaultCaret = void 0;
	  if (previous) {
	    defaultCaret = '\xAB';
	  } else if (next) {
	    defaultCaret = '\xBB';
	  }

	  var children = props.children;
	  if (children && Array.isArray(children) && children.length === 0) {
	    children = null;
	  }

	  if (!attributes.href && Tag === 'a') {
	    Tag = 'button';
	  }

	  if (previous || next) {
	    children = [React__default.createElement(
	      'span',
	      {
	        'aria-hidden': 'true',
	        key: 'caret'
	      },
	      children || defaultCaret
	    ), React__default.createElement(
	      'span',
	      {
	        className: 'sr-only',
	        key: 'sr'
	      },
	      ariaLabel
	    )];
	  }

	  return React__default.createElement(
	    Tag,
	    _extends({}, attributes, {
	      className: classes,
	      'aria-label': ariaLabel
	    }),
	    children
	  );
	};

	PaginationLink.propTypes = propTypes$63;
	PaginationLink.defaultProps = defaultProps$56;

	var propTypes$64 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  activeTab: PropTypes.any,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$57 = {
	  tag: 'div'
	};

	var childContextTypes$2 = {
	  activeTabId: PropTypes.any
	};

	var TabContent = function (_Component) {
	  inherits(TabContent, _Component);
	  createClass(TabContent, null, [{
	    key: 'getDerivedStateFromProps',
	    value: function getDerivedStateFromProps(nextProps, prevState) {
	      if (prevState.activeTab !== nextProps.activeTab) {
	        return {
	          activeTab: nextProps.activeTab
	        };
	      }
	      return null;
	    }
	  }]);

	  function TabContent(props) {
	    classCallCheck(this, TabContent);

	    var _this = possibleConstructorReturn(this, (TabContent.__proto__ || Object.getPrototypeOf(TabContent)).call(this, props));

	    _this.state = {
	      activeTab: _this.props.activeTab
	    };
	    return _this;
	  }

	  createClass(TabContent, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        activeTabId: this.state.activeTab
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          cssModule = _props.cssModule,
	          Tag = _props.tag;


	      var attributes = omit(this.props, Object.keys(propTypes$64));

	      var classes = mapToCssModules(classNames('tab-content', className), cssModule);

	      return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	    }
	  }]);
	  return TabContent;
	}(React.Component);

	reactLifecyclesCompat.polyfill(TabContent);
	TabContent.propTypes = propTypes$64;
	TabContent.defaultProps = defaultProps$57;
	TabContent.childContextTypes = childContextTypes$2;

	var propTypes$65 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.string,
	  cssModule: PropTypes.object,
	  tabId: PropTypes.any
	};

	var defaultProps$58 = {
	  tag: 'div'
	};

	var contextTypes$3 = {
	  activeTabId: PropTypes.any
	};

	function TabPane(props, context) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      tabId = props.tabId,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tabId', 'tag']);

	  var classes = mapToCssModules(classNames('tab-pane', className, { active: tabId === context.activeTabId }), cssModule);
	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	}
	TabPane.propTypes = propTypes$65;
	TabPane.defaultProps = defaultProps$58;
	TabPane.contextTypes = contextTypes$3;

	var propTypes$66 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  fluid: PropTypes.bool,
	  className: PropTypes.string,
	  cssModule: PropTypes.object
	};

	var defaultProps$59 = {
	  tag: 'div'
	};

	var Jumbotron = function Jumbotron(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      fluid = props.fluid,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'fluid']);


	  var classes = mapToCssModules(classNames(className, 'jumbotron', fluid ? 'jumbotron-fluid' : false), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	Jumbotron.propTypes = propTypes$66;
	Jumbotron.defaultProps = defaultProps$59;

	var propTypes$67 = {
	  children: PropTypes.node,
	  className: PropTypes.string,
	  closeClassName: PropTypes.string,
	  closeAriaLabel: PropTypes.string,
	  cssModule: PropTypes.object,
	  color: PropTypes.string,
	  fade: PropTypes.bool,
	  isOpen: PropTypes.bool,
	  toggle: PropTypes.func,
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  transition: PropTypes.shape(Fade.propTypes),
	  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
	};

	var defaultProps$60 = {
	  color: 'success',
	  isOpen: true,
	  tag: 'div',
	  closeAriaLabel: 'Close',
	  fade: true,
	  transition: _extends({}, Fade.defaultProps, {
	    unmountOnExit: true
	  })
	};

	function Alert(props) {
	  var className = props.className,
	      closeClassName = props.closeClassName,
	      closeAriaLabel = props.closeAriaLabel,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      color = props.color,
	      isOpen = props.isOpen,
	      toggle = props.toggle,
	      children = props.children,
	      transition = props.transition,
	      fade = props.fade,
	      innerRef = props.innerRef,
	      attributes = objectWithoutProperties(props, ['className', 'closeClassName', 'closeAriaLabel', 'cssModule', 'tag', 'color', 'isOpen', 'toggle', 'children', 'transition', 'fade', 'innerRef']);


	  var classes = mapToCssModules(classNames(className, 'alert', 'alert-' + color, { 'alert-dismissible': toggle }), cssModule);

	  var closeClasses = mapToCssModules(classNames('close', closeClassName), cssModule);

	  var alertTransition = _extends({}, Fade.defaultProps, transition, {
	    baseClass: fade ? transition.baseClass : '',
	    timeout: fade ? transition.timeout : 0
	  });

	  return React__default.createElement(
	    Fade,
	    _extends({}, attributes, alertTransition, { tag: Tag, className: classes, 'in': isOpen, role: 'alert', innerRef: innerRef }),
	    toggle ? React__default.createElement(
	      'button',
	      { type: 'button', className: closeClasses, 'aria-label': closeAriaLabel, onClick: toggle },
	      React__default.createElement(
	        'span',
	        { 'aria-hidden': 'true' },
	        '\xD7'
	      )
	    ) : null,
	    children
	  );
	}

	Alert.propTypes = propTypes$67;
	Alert.defaultProps = defaultProps$60;

	var _transitionStatusToCl;

	var propTypes$68 = _extends({}, Transition.propTypes, {
	  isOpen: PropTypes.bool,
	  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.node,
	  navbar: PropTypes.bool,
	  cssModule: PropTypes.object,
	  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])
	});

	var defaultProps$61 = _extends({}, Transition.defaultProps, {
	  isOpen: false,
	  appear: false,
	  enter: true,
	  exit: true,
	  tag: 'div',
	  timeout: TransitionTimeouts.Collapse
	});

	var transitionStatusToClassHash = (_transitionStatusToCl = {}, defineProperty(_transitionStatusToCl, TransitionStatuses.ENTERING, 'collapsing'), defineProperty(_transitionStatusToCl, TransitionStatuses.ENTERED, 'collapse show'), defineProperty(_transitionStatusToCl, TransitionStatuses.EXITING, 'collapsing'), defineProperty(_transitionStatusToCl, TransitionStatuses.EXITED, 'collapse'), _transitionStatusToCl);

	function getTransitionClass(status) {
	  return transitionStatusToClassHash[status] || 'collapse';
	}

	function getHeight(node) {
	  return node.scrollHeight;
	}

	var Collapse = function (_Component) {
	  inherits(Collapse, _Component);

	  function Collapse(props) {
	    classCallCheck(this, Collapse);

	    var _this = possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

	    _this.state = {
	      height: null
	    };

	    ['onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach(function (name) {
	      _this[name] = _this[name].bind(_this);
	    });
	    return _this;
	  }

	  createClass(Collapse, [{
	    key: 'onEntering',
	    value: function onEntering(node, isAppearing) {
	      this.setState({ height: getHeight(node) });
	      this.props.onEntering(node, isAppearing);
	    }
	  }, {
	    key: 'onEntered',
	    value: function onEntered(node, isAppearing) {
	      this.setState({ height: null });
	      this.props.onEntered(node, isAppearing);
	    }
	  }, {
	    key: 'onExit',
	    value: function onExit(node) {
	      this.setState({ height: getHeight(node) });
	      this.props.onExit(node);
	    }
	  }, {
	    key: 'onExiting',
	    value: function onExiting(node) {
	      // getting this variable triggers a reflow
	      var _unused = node.offsetHeight; // eslint-disable-line no-unused-vars
	      this.setState({ height: 0 });
	      this.props.onExiting(node);
	    }
	  }, {
	    key: 'onExited',
	    value: function onExited(node) {
	      this.setState({ height: null });
	      this.props.onExited(node);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          Tag = _props.tag,
	          isOpen = _props.isOpen,
	          className = _props.className,
	          navbar = _props.navbar,
	          cssModule = _props.cssModule,
	          children = _props.children,
	          innerRef = _props.innerRef,
	          otherProps = objectWithoutProperties(_props, ['tag', 'isOpen', 'className', 'navbar', 'cssModule', 'children', 'innerRef']);
	      var height = this.state.height;

	      // In NODE_ENV=production the Transition.propTypes are wrapped which results in an
	      // empty object "{}". This is the result of the `react-transition-group` babel
	      // configuration settings. Therefore, to ensure that production builds work without
	      // error, we can either explicitly define keys or use the Transition.defaultProps.
	      // Using the Transition.defaultProps excludes any required props. Thus, the best
	      // solution is to explicitly define required props in our utilities and reference these.
	      // This also gives us more flexibility in the future to remove the prop-types
	      // dependency in distribution builds (Similar to how `react-transition-group` does).
	      // Note: Without omitting the `react-transition-group` props, the resulting child
	      // Tag component would inherit the Transition properties as attributes for the HTML
	      // element which results in errors/warnings for non-valid attributes.

	      var transitionProps = pick(otherProps, TransitionPropTypeKeys);
	      var childProps = omit(otherProps, TransitionPropTypeKeys);
	      return React__default.createElement(
	        Transition,
	        _extends({}, transitionProps, {
	          'in': isOpen,
	          onEntering: this.onEntering,
	          onEntered: this.onEntered,
	          onExit: this.onExit,
	          onExiting: this.onExiting,
	          onExited: this.onExited
	        }),
	        function (status) {
	          var collapseClass = getTransitionClass(status);
	          var classes = mapToCssModules(classNames(className, collapseClass, navbar && 'navbar-collapse'), cssModule);
	          var style = height === null ? null : { height: height };
	          return React__default.createElement(
	            Tag,
	            _extends({}, childProps, {
	              style: _extends({}, childProps.style, style),
	              className: classes,
	              ref: _this2.props.innerRef
	            }),
	            children
	          );
	        }
	      );
	    }
	  }]);
	  return Collapse;
	}(React.Component);

	Collapse.propTypes = propTypes$68;
	Collapse.defaultProps = defaultProps$61;

	var propTypes$69 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  active: PropTypes.bool,
	  disabled: PropTypes.bool,
	  color: PropTypes.string,
	  action: PropTypes.bool,
	  className: PropTypes.any,
	  cssModule: PropTypes.object
	};

	var defaultProps$62 = {
	  tag: 'li'
	};

	var handleDisabledOnClick = function handleDisabledOnClick(e) {
	  e.preventDefault();
	};

	var ListGroupItem = function ListGroupItem(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      active = props.active,
	      disabled = props.disabled,
	      action = props.action,
	      color = props.color,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'active', 'disabled', 'action', 'color']);

	  var classes = mapToCssModules(classNames(className, active ? 'active' : false, disabled ? 'disabled' : false, action ? 'list-group-item-action' : false, color ? 'list-group-item-' + color : false, 'list-group-item'), cssModule);

	  // Prevent click event when disabled.
	  if (disabled) {
	    attributes.onClick = handleDisabledOnClick;
	  }
	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	ListGroupItem.propTypes = propTypes$69;
	ListGroupItem.defaultProps = defaultProps$62;

	var propTypes$70 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.any,
	  cssModule: PropTypes.object
	};

	var defaultProps$63 = {
	  tag: 'h5'
	};

	var ListGroupItemHeading = function ListGroupItemHeading(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'list-group-item-heading'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	ListGroupItemHeading.propTypes = propTypes$70;
	ListGroupItemHeading.defaultProps = defaultProps$63;

	var propTypes$71 = {
	  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	  className: PropTypes.any,
	  cssModule: PropTypes.object
	};

	var defaultProps$64 = {
	  tag: 'p'
	};

	var ListGroupItemText = function ListGroupItemText(props) {
	  var className = props.className,
	      cssModule = props.cssModule,
	      Tag = props.tag,
	      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

	  var classes = mapToCssModules(classNames(className, 'list-group-item-text'), cssModule);

	  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
	};

	ListGroupItemText.propTypes = propTypes$71;
	ListGroupItemText.defaultProps = defaultProps$64;

	var UncontrolledAlert = function (_Component) {
	  inherits(UncontrolledAlert, _Component);

	  function UncontrolledAlert(props) {
	    classCallCheck(this, UncontrolledAlert);

	    var _this = possibleConstructorReturn(this, (UncontrolledAlert.__proto__ || Object.getPrototypeOf(UncontrolledAlert)).call(this, props));

	    _this.state = { isOpen: true };
	    _this.toggle = _this.toggle.bind(_this);
	    return _this;
	  }

	  createClass(UncontrolledAlert, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.setState({ isOpen: !this.state.isOpen });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React__default.createElement(Alert, _extends({ isOpen: this.state.isOpen, toggle: this.toggle }, this.props));
	    }
	  }]);
	  return UncontrolledAlert;
	}(React.Component);

	var UncontrolledButtonDropdown = function (_Component) {
	  inherits(UncontrolledButtonDropdown, _Component);

	  function UncontrolledButtonDropdown(props) {
	    classCallCheck(this, UncontrolledButtonDropdown);

	    var _this = possibleConstructorReturn(this, (UncontrolledButtonDropdown.__proto__ || Object.getPrototypeOf(UncontrolledButtonDropdown)).call(this, props));

	    _this.state = { isOpen: false };
	    _this.toggle = _this.toggle.bind(_this);
	    return _this;
	  }

	  createClass(UncontrolledButtonDropdown, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.setState({ isOpen: !this.state.isOpen });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React__default.createElement(ButtonDropdown, _extends({ isOpen: this.state.isOpen, toggle: this.toggle }, this.props));
	    }
	  }]);
	  return UncontrolledButtonDropdown;
	}(React.Component);

	var propTypes$72 = {
	  toggler: PropTypes.string.isRequired,
	  toggleEvents: PropTypes.arrayOf(PropTypes.string)
	};

	var defaultProps$65 = {
	  toggleEvents: defaultToggleEvents
	};

	var UncontrolledCollapse = function (_Component) {
	  inherits(UncontrolledCollapse, _Component);

	  function UncontrolledCollapse(props) {
	    classCallCheck(this, UncontrolledCollapse);

	    var _this = possibleConstructorReturn(this, (UncontrolledCollapse.__proto__ || Object.getPrototypeOf(UncontrolledCollapse)).call(this, props));

	    _this.togglers = null;
	    _this.removeEventListeners = null;
	    _this.toggle = _this.toggle.bind(_this);

	    _this.state = {
	      isOpen: false
	    };
	    return _this;
	  }

	  createClass(UncontrolledCollapse, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.togglers = findDOMElements(this.props.toggler);
	      if (this.togglers.length) {
	        this.removeEventListeners = addMultipleEventListeners(this.togglers, this.toggle, this.props.toggleEvents);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.togglers.length && this.removeEventListeners) {
	        this.removeEventListeners();
	      }
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle(e) {
	      this.setState(function (_ref) {
	        var isOpen = _ref.isOpen;
	        return { isOpen: !isOpen };
	      });
	      e.preventDefault();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          toggleEvents = _props.toggleEvents,
	          rest = objectWithoutProperties(_props, ['toggleEvents']);

	      return React__default.createElement(Collapse, _extends({ isOpen: this.state.isOpen }, rest));
	    }
	  }]);
	  return UncontrolledCollapse;
	}(React.Component);

	UncontrolledCollapse.propTypes = propTypes$72;
	UncontrolledCollapse.defaultProps = defaultProps$65;

	var UncontrolledDropdown = function (_Component) {
	  inherits(UncontrolledDropdown, _Component);

	  function UncontrolledDropdown(props) {
	    classCallCheck(this, UncontrolledDropdown);

	    var _this = possibleConstructorReturn(this, (UncontrolledDropdown.__proto__ || Object.getPrototypeOf(UncontrolledDropdown)).call(this, props));

	    _this.state = { isOpen: false };
	    _this.toggle = _this.toggle.bind(_this);
	    return _this;
	  }

	  createClass(UncontrolledDropdown, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.setState({ isOpen: !this.state.isOpen });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React__default.createElement(Dropdown, _extends({ isOpen: this.state.isOpen, toggle: this.toggle }, this.props));
	    }
	  }]);
	  return UncontrolledDropdown;
	}(React.Component);

	var UncontrolledNavDropdown = function UncontrolledNavDropdown(props) {
	  warnOnce('The "UncontrolledNavDropdown" component has been deprecated.\nPlease use component "UncontrolledDropdown" with nav prop.');

	  return React__default.createElement(UncontrolledDropdown, _extends({ nav: true }, props));
	};

	var UncontrolledTooltip = function (_Component) {
	  inherits(UncontrolledTooltip, _Component);

	  function UncontrolledTooltip(props) {
	    classCallCheck(this, UncontrolledTooltip);

	    var _this = possibleConstructorReturn(this, (UncontrolledTooltip.__proto__ || Object.getPrototypeOf(UncontrolledTooltip)).call(this, props));

	    _this.state = { isOpen: false };
	    _this.toggle = _this.toggle.bind(_this);
	    return _this;
	  }

	  createClass(UncontrolledTooltip, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.setState({ isOpen: !this.state.isOpen });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React__default.createElement(Tooltip, _extends({ isOpen: this.state.isOpen, toggle: this.toggle }, this.props));
	    }
	  }]);
	  return UncontrolledTooltip;
	}(React.Component);

	exports.Alert = Alert;
	exports.Container = Container;
	exports.Row = Row;
	exports.Col = Col;
	exports.Navbar = Navbar;
	exports.NavbarBrand = NavbarBrand;
	exports.NavbarToggler = NavbarToggler;
	exports.Nav = Nav;
	exports.NavItem = NavItem;
	exports.NavDropdown = NavDropdown;
	exports.NavLink = NavLink;
	exports.Breadcrumb = Breadcrumb;
	exports.BreadcrumbItem = BreadcrumbItem;
	exports.Button = Button;
	exports.ButtonDropdown = ButtonDropdown;
	exports.ButtonGroup = ButtonGroup;
	exports.ButtonToolbar = ButtonToolbar;
	exports.Dropdown = Dropdown;
	exports.DropdownItem = DropdownItem;
	exports.DropdownMenu = DropdownMenu;
	exports.DropdownToggle = DropdownToggle;
	exports.Fade = Fade;
	exports.Badge = Badge;
	exports.Card = Card;
	exports.CardLink = CardLink;
	exports.CardGroup = CardGroup;
	exports.CardDeck = CardDeck;
	exports.CardColumns = CardColumns;
	exports.CardBody = CardBody;
	exports.CardBlock = CardBlock;
	exports.CardFooter = CardFooter;
	exports.CardHeader = CardHeader;
	exports.CardImg = CardImg;
	exports.CardImgOverlay = CardImgOverlay;
	exports.Carousel = Carousel;
	exports.UncontrolledCarousel = UncontrolledCarousel;
	exports.CarouselControl = CarouselControl;
	exports.CarouselItem = CarouselItem;
	exports.CarouselIndicators = CarouselIndicators;
	exports.CarouselCaption = CarouselCaption;
	exports.CardSubtitle = CardSubtitle;
	exports.CardText = CardText;
	exports.CardTitle = CardTitle;
	exports.Popover = Popover;
	exports.PopoverContent = PopoverContent;
	exports.PopoverBody = PopoverBody;
	exports.PopoverTitle = PopoverTitle;
	exports.PopoverHeader = PopoverHeader;
	exports.Progress = Progress;
	exports.Modal = Modal;
	exports.ModalHeader = ModalHeader;
	exports.ModalBody = ModalBody;
	exports.ModalFooter = ModalFooter;
	exports.PopperContent = PopperContent;
	exports.PopperTargetHelper = PopperTargetHelper;
	exports.Tooltip = Tooltip;
	exports.Table = Table;
	exports.ListGroup = ListGroup;
	exports.Form = Form;
	exports.FormFeedback = FormFeedback;
	exports.FormGroup = FormGroup;
	exports.FormText = FormText;
	exports.Input = Input;
	exports.InputGroup = InputGroup;
	exports.InputGroupAddon = InputGroupAddon;
	exports.InputGroupButton = InputGroupButton;
	exports.InputGroupButtonDropdown = InputGroupButtonDropdown;
	exports.InputGroupText = InputGroupText;
	exports.Label = Label;
	exports.CustomInput = CustomInput;
	exports.Media = Media;
	exports.Pagination = Pagination;
	exports.PaginationItem = PaginationItem;
	exports.PaginationLink = PaginationLink;
	exports.TabContent = TabContent;
	exports.TabPane = TabPane;
	exports.Jumbotron = Jumbotron;
	exports.Collapse = Collapse;
	exports.ListGroupItem = ListGroupItem;
	exports.ListGroupItemText = ListGroupItemText;
	exports.ListGroupItemHeading = ListGroupItemHeading;
	exports.UncontrolledAlert = UncontrolledAlert;
	exports.UncontrolledButtonDropdown = UncontrolledButtonDropdown;
	exports.UncontrolledCollapse = UncontrolledCollapse;
	exports.UncontrolledDropdown = UncontrolledDropdown;
	exports.UncontrolledNavDropdown = UncontrolledNavDropdown;
	exports.UncontrolledTooltip = UncontrolledTooltip;
	exports.Util = utils;
	//# sourceMappingURL=reactstrap.cjs.js.map


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (false) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(11)();
	}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = __webpack_require__(12);

	function emptyFunction() {}

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2017 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg) && arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright JS Foundation and other contributors <https://js.foundation/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    nullTag = '[object Null]',
	    proxyTag = '[object Proxy]',
	    undefinedTag = '[object Undefined]';

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var Symbol = root.Symbol,
	    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isFunction;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = require("react-dom");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var react = __webpack_require__(3);
	var PropTypes = _interopDefault(__webpack_require__(10));
	var PopperJS = _interopDefault(__webpack_require__(18));

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var objectWithoutProperties = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var Manager = function (_Component) {
	  inherits(Manager, _Component);

	  function Manager() {
	    var _ref;

	    var _temp, _this, _ret;

	    classCallCheck(this, Manager);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Manager.__proto__ || Object.getPrototypeOf(Manager)).call.apply(_ref, [this].concat(args))), _this), _this._setTargetNode = function (node) {
	      _this._targetNode = node;
	    }, _this._getTargetNode = function () {
	      return _this._targetNode;
	    }, _temp), possibleConstructorReturn(_this, _ret);
	  }

	  createClass(Manager, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        popperManager: {
	          setTargetNode: this._setTargetNode,
	          getTargetNode: this._getTargetNode
	        }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          tag = _props.tag,
	          children = _props.children,
	          restProps = objectWithoutProperties(_props, ['tag', 'children']);

	      if (tag !== false) {
	        return react.createElement(tag, restProps, children);
	      } else {
	        return children;
	      }
	    }
	  }]);
	  return Manager;
	}(react.Component);

	Manager.childContextTypes = {
	  popperManager: PropTypes.object.isRequired
	};
	Manager.propTypes = {
	  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
	};
	Manager.defaultProps = {
	  tag: 'div'
	};

	var Target = function Target(props, context) {
	  var _props$component = props.component,
	      component = _props$component === undefined ? 'div' : _props$component,
	      innerRef = props.innerRef,
	      children = props.children,
	      restProps = objectWithoutProperties(props, ['component', 'innerRef', 'children']);
	  var popperManager = context.popperManager;

	  var targetRef = function targetRef(node) {
	    popperManager.setTargetNode(node);
	    if (typeof innerRef === 'function') {
	      innerRef(node);
	    }
	  };

	  if (typeof children === 'function') {
	    var targetProps = { ref: targetRef };
	    return children({ targetProps: targetProps, restProps: restProps });
	  }

	  var componentProps = _extends({}, restProps);

	  if (typeof component === 'string') {
	    componentProps.ref = targetRef;
	  } else {
	    componentProps.innerRef = targetRef;
	  }

	  return react.createElement(component, componentProps, children);
	};

	Target.contextTypes = {
	  popperManager: PropTypes.object.isRequired
	};

	Target.propTypes = {
	  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	  innerRef: PropTypes.func,
	  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
	};

	var placements = PopperJS.placements;

	var Popper = function (_Component) {
	  inherits(Popper, _Component);

	  function Popper() {
	    var _ref;

	    var _temp, _this, _ret;

	    classCallCheck(this, Popper);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Popper.__proto__ || Object.getPrototypeOf(Popper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._setArrowNode = function (node) {
	      _this._arrowNode = node;
	    }, _this._getTargetNode = function () {
	      if (_this.props.target) {
	        return _this.props.target;
	      } else if (!_this.context.popperManager || !_this.context.popperManager.getTargetNode()) {
	        throw new Error('Target missing. Popper must be given a target from the Popper Manager, or as a prop.');
	      }
	      return _this.context.popperManager.getTargetNode();
	    }, _this._getOffsets = function (data) {
	      return Object.keys(data.offsets).map(function (key) {
	        return data.offsets[key];
	      });
	    }, _this._isDataDirty = function (data) {
	      if (_this.state.data) {
	        return JSON.stringify(_this._getOffsets(_this.state.data)) !== JSON.stringify(_this._getOffsets(data));
	      } else {
	        return true;
	      }
	    }, _this._updateStateModifier = {
	      enabled: true,
	      order: 900,
	      fn: function fn(data) {
	        if (_this._isDataDirty(data)) {
	          _this.setState({ data: data });
	        }
	        return data;
	      }
	    }, _this._getPopperStyle = function () {
	      var data = _this.state.data;


	      if (!_this._popper || !data) {
	        return {
	          position: 'absolute',
	          pointerEvents: 'none',
	          opacity: 0
	        };
	      }

	      return _extends({
	        position: data.offsets.popper.position
	      }, data.styles);
	    }, _this._getPopperPlacement = function () {
	      return _this.state.data ? _this.state.data.placement : undefined;
	    }, _this._getPopperHide = function () {
	      return !!_this.state.data && _this.state.data.hide ? '' : undefined;
	    }, _this._getArrowStyle = function () {
	      if (!_this.state.data || !_this.state.data.offsets.arrow) {
	        return {};
	      } else {
	        var _this$state$data$offs = _this.state.data.offsets.arrow,
	            top = _this$state$data$offs.top,
	            left = _this$state$data$offs.left;

	        return { top: top, left: left };
	      }
	    }, _this._handlePopperRef = function (node) {
	      _this._popperNode = node;
	      if (node) {
	        _this._createPopper();
	      } else {
	        _this._destroyPopper();
	      }
	      if (_this.props.innerRef) {
	        _this.props.innerRef(node);
	      }
	    }, _this._scheduleUpdate = function () {
	      _this._popper && _this._popper.scheduleUpdate();
	    }, _temp), possibleConstructorReturn(_this, _ret);
	  }

	  createClass(Popper, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        popper: {
	          setArrowNode: this._setArrowNode,
	          getArrowStyle: this._getArrowStyle
	        }
	      };
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(lastProps) {
	      if (lastProps.placement !== this.props.placement || lastProps.eventsEnabled !== this.props.eventsEnabled || lastProps.target !== this.props.target) {
	        this._destroyPopper();
	        this._createPopper();
	      }
	      if (lastProps.children !== this.props.children) {
	        this._scheduleUpdate();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._destroyPopper();
	    }
	  }, {
	    key: '_createPopper',
	    value: function _createPopper() {
	      var _this2 = this;

	      var _props = this.props,
	          placement = _props.placement,
	          eventsEnabled = _props.eventsEnabled,
	          positionFixed = _props.positionFixed;

	      var modifiers = _extends({}, this.props.modifiers, {
	        applyStyle: { enabled: false },
	        updateState: this._updateStateModifier
	      });
	      if (this._arrowNode) {
	        modifiers.arrow = _extends({}, this.props.modifiers.arrow || {}, {
	          element: this._arrowNode
	        });
	      }
	      this._popper = new PopperJS(this._getTargetNode(), this._popperNode, {
	        placement: placement,
	        positionFixed: positionFixed,
	        eventsEnabled: eventsEnabled,
	        modifiers: modifiers
	      });

	      // TODO: look into setTimeout scheduleUpdate call, without it, the popper will not position properly on creation
	      setTimeout(function () {
	        return _this2._scheduleUpdate();
	      });
	    }
	  }, {
	    key: '_destroyPopper',
	    value: function _destroyPopper() {
	      if (this._popper) {
	        this._popper.destroy();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          component = _props2.component,
	          innerRef = _props2.innerRef,
	          placement = _props2.placement,
	          eventsEnabled = _props2.eventsEnabled,
	          positionFixed = _props2.positionFixed,
	          modifiers = _props2.modifiers,
	          children = _props2.children,
	          restProps = objectWithoutProperties(_props2, ['component', 'innerRef', 'placement', 'eventsEnabled', 'positionFixed', 'modifiers', 'children']);

	      var popperStyle = this._getPopperStyle();
	      var popperPlacement = this._getPopperPlacement();
	      var popperHide = this._getPopperHide();

	      if (typeof children === 'function') {
	        var popperProps = {
	          ref: this._handlePopperRef,
	          style: popperStyle,
	          'data-placement': popperPlacement,
	          'data-x-out-of-boundaries': popperHide
	        };
	        return children({
	          popperProps: popperProps,
	          restProps: restProps,
	          scheduleUpdate: this._scheduleUpdate
	        });
	      }

	      var componentProps = _extends({}, restProps, {
	        style: _extends({}, restProps.style, popperStyle),
	        'data-placement': popperPlacement,
	        'data-x-out-of-boundaries': popperHide
	      });

	      if (typeof component === 'string') {
	        componentProps.ref = this._handlePopperRef;
	      } else {
	        componentProps.innerRef = this._handlePopperRef;
	      }

	      return react.createElement(component, componentProps, children);
	    }
	  }]);
	  return Popper;
	}(react.Component);

	Popper.contextTypes = {
	  popperManager: PropTypes.object
	};
	Popper.childContextTypes = {
	  popper: PropTypes.object.isRequired
	};
	Popper.propTypes = {
	  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	  innerRef: PropTypes.func,
	  placement: PropTypes.oneOf(placements),
	  eventsEnabled: PropTypes.bool,
	  positionFixed: PropTypes.bool,
	  modifiers: PropTypes.object,
	  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	  target: PropTypes.oneOfType([
	  // the following check is needed for SSR
	  PropTypes.instanceOf(typeof Element !== 'undefined' ? Element : Object), PropTypes.shape({
	    getBoundingClientRect: PropTypes.func.isRequired,
	    clientWidth: PropTypes.number.isRequired,
	    clientHeight: PropTypes.number.isRequired
	  })])
	};
	Popper.defaultProps = {
	  component: 'div',
	  placement: 'bottom',
	  eventsEnabled: true,
	  positionFixed: false,
	  modifiers: {}
	};

	var Arrow = function Arrow(props, context) {
	  var _props$component = props.component,
	      component = _props$component === undefined ? 'span' : _props$component,
	      innerRef = props.innerRef,
	      children = props.children,
	      restProps = objectWithoutProperties(props, ['component', 'innerRef', 'children']);
	  var popper = context.popper;

	  var arrowRef = function arrowRef(node) {
	    popper.setArrowNode(node);
	    if (typeof innerRef === 'function') {
	      innerRef(node);
	    }
	  };
	  var arrowStyle = popper.getArrowStyle();

	  if (typeof children === 'function') {
	    var arrowProps = {
	      ref: arrowRef,
	      style: arrowStyle
	    };
	    return children({ arrowProps: arrowProps, restProps: restProps });
	  }

	  var componentProps = _extends({}, restProps, {
	    style: _extends({}, arrowStyle, restProps.style)
	  });

	  if (typeof component === 'string') {
	    componentProps.ref = arrowRef;
	  } else {
	    componentProps.innerRef = arrowRef;
	  }

	  return react.createElement(component, componentProps, children);
	};

	Arrow.contextTypes = {
	  popper: PropTypes.object.isRequired
	};

	Arrow.propTypes = {
	  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	  innerRef: PropTypes.func,
	  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
	};

	exports.Manager = Manager;
	exports.Target = Target;
	exports.Popper = Popper;
	exports.placements = placements;
	exports.Arrow = Arrow;
	//# sourceMappingURL=react-popper.js.map


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**!
	 * @fileOverview Kickass library to create and place poppers near their reference elements.
	 * @version 1.14.3
	 * @license
	 * Copyright (c) 2016 Federico Zivolo and contributors
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Popper = factory());
	}(this, (function () { 'use strict';

	var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

	var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
	var timeoutDuration = 0;
	for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
	  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
	    timeoutDuration = 1;
	    break;
	  }
	}

	function microtaskDebounce(fn) {
	  var called = false;
	  return function () {
	    if (called) {
	      return;
	    }
	    called = true;
	    window.Promise.resolve().then(function () {
	      called = false;
	      fn();
	    });
	  };
	}

	function taskDebounce(fn) {
	  var scheduled = false;
	  return function () {
	    if (!scheduled) {
	      scheduled = true;
	      setTimeout(function () {
	        scheduled = false;
	        fn();
	      }, timeoutDuration);
	    }
	  };
	}

	var supportsMicroTasks = isBrowser && window.Promise;

	/**
	* Create a debounced version of a method, that's asynchronously deferred
	* but called in the minimum time possible.
	*
	* @method
	* @memberof Popper.Utils
	* @argument {Function} fn
	* @returns {Function}
	*/
	var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

	/**
	 * Check if the given variable is a function
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Any} functionToCheck - variable to check
	 * @returns {Boolean} answer to: is a function?
	 */
	function isFunction(functionToCheck) {
	  var getType = {};
	  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	/**
	 * Get CSS computed property of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Eement} element
	 * @argument {String} property
	 */
	function getStyleComputedProperty(element, property) {
	  if (element.nodeType !== 1) {
	    return [];
	  }
	  // NOTE: 1 DOM access here
	  var css = getComputedStyle(element, null);
	  return property ? css[property] : css;
	}

	/**
	 * Returns the parentNode or the host of the element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} parent
	 */
	function getParentNode(element) {
	  if (element.nodeName === 'HTML') {
	    return element;
	  }
	  return element.parentNode || element.host;
	}

	/**
	 * Returns the scrolling parent of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} scroll parent
	 */
	function getScrollParent(element) {
	  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
	  if (!element) {
	    return document.body;
	  }

	  switch (element.nodeName) {
	    case 'HTML':
	    case 'BODY':
	      return element.ownerDocument.body;
	    case '#document':
	      return element.body;
	  }

	  // Firefox want us to check `-x` and `-y` variations as well

	  var _getStyleComputedProp = getStyleComputedProperty(element),
	      overflow = _getStyleComputedProp.overflow,
	      overflowX = _getStyleComputedProp.overflowX,
	      overflowY = _getStyleComputedProp.overflowY;

	  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
	    return element;
	  }

	  return getScrollParent(getParentNode(element));
	}

	var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
	var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

	/**
	 * Determines if the browser is Internet Explorer
	 * @method
	 * @memberof Popper.Utils
	 * @param {Number} version to check
	 * @returns {Boolean} isIE
	 */
	function isIE(version) {
	  if (version === 11) {
	    return isIE11;
	  }
	  if (version === 10) {
	    return isIE10;
	  }
	  return isIE11 || isIE10;
	}

	/**
	 * Returns the offset parent of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} offset parent
	 */
	function getOffsetParent(element) {
	  if (!element) {
	    return document.documentElement;
	  }

	  var noOffsetParent = isIE(10) ? document.body : null;

	  // NOTE: 1 DOM access here
	  var offsetParent = element.offsetParent;
	  // Skip hidden elements which don't have an offsetParent
	  while (offsetParent === noOffsetParent && element.nextElementSibling) {
	    offsetParent = (element = element.nextElementSibling).offsetParent;
	  }

	  var nodeName = offsetParent && offsetParent.nodeName;

	  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
	    return element ? element.ownerDocument.documentElement : document.documentElement;
	  }

	  // .offsetParent will return the closest TD or TABLE in case
	  // no offsetParent is present, I hate this job...
	  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
	    return getOffsetParent(offsetParent);
	  }

	  return offsetParent;
	}

	function isOffsetContainer(element) {
	  var nodeName = element.nodeName;

	  if (nodeName === 'BODY') {
	    return false;
	  }
	  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
	}

	/**
	 * Finds the root node (document, shadowDOM root) of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} node
	 * @returns {Element} root node
	 */
	function getRoot(node) {
	  if (node.parentNode !== null) {
	    return getRoot(node.parentNode);
	  }

	  return node;
	}

	/**
	 * Finds the offset parent common to the two provided nodes
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element1
	 * @argument {Element} element2
	 * @returns {Element} common offset parent
	 */
	function findCommonOffsetParent(element1, element2) {
	  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
	  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
	    return document.documentElement;
	  }

	  // Here we make sure to give as "start" the element that comes first in the DOM
	  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
	  var start = order ? element1 : element2;
	  var end = order ? element2 : element1;

	  // Get common ancestor container
	  var range = document.createRange();
	  range.setStart(start, 0);
	  range.setEnd(end, 0);
	  var commonAncestorContainer = range.commonAncestorContainer;

	  // Both nodes are inside #document

	  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
	    if (isOffsetContainer(commonAncestorContainer)) {
	      return commonAncestorContainer;
	    }

	    return getOffsetParent(commonAncestorContainer);
	  }

	  // one of the nodes is inside shadowDOM, find which one
	  var element1root = getRoot(element1);
	  if (element1root.host) {
	    return findCommonOffsetParent(element1root.host, element2);
	  } else {
	    return findCommonOffsetParent(element1, getRoot(element2).host);
	  }
	}

	/**
	 * Gets the scroll value of the given element in the given side (top and left)
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @argument {String} side `top` or `left`
	 * @returns {number} amount of scrolled pixels
	 */
	function getScroll(element) {
	  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

	  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
	  var nodeName = element.nodeName;

	  if (nodeName === 'BODY' || nodeName === 'HTML') {
	    var html = element.ownerDocument.documentElement;
	    var scrollingElement = element.ownerDocument.scrollingElement || html;
	    return scrollingElement[upperSide];
	  }

	  return element[upperSide];
	}

	/*
	 * Sum or subtract the element scroll values (left and top) from a given rect object
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} rect - Rect object you want to change
	 * @param {HTMLElement} element - The element from the function reads the scroll values
	 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
	 * @return {Object} rect - The modifier rect object
	 */
	function includeScroll(rect, element) {
	  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var scrollTop = getScroll(element, 'top');
	  var scrollLeft = getScroll(element, 'left');
	  var modifier = subtract ? -1 : 1;
	  rect.top += scrollTop * modifier;
	  rect.bottom += scrollTop * modifier;
	  rect.left += scrollLeft * modifier;
	  rect.right += scrollLeft * modifier;
	  return rect;
	}

	/*
	 * Helper to detect borders of a given element
	 * @method
	 * @memberof Popper.Utils
	 * @param {CSSStyleDeclaration} styles
	 * Result of `getStyleComputedProperty` on the given element
	 * @param {String} axis - `x` or `y`
	 * @return {number} borders - The borders size of the given axis
	 */

	function getBordersSize(styles, axis) {
	  var sideA = axis === 'x' ? 'Left' : 'Top';
	  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

	  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
	}

	function getSize(axis, body, html, computedStyle) {
	  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
	}

	function getWindowSizes() {
	  var body = document.body;
	  var html = document.documentElement;
	  var computedStyle = isIE(10) && getComputedStyle(html);

	  return {
	    height: getSize('Height', body, html, computedStyle),
	    width: getSize('Width', body, html, computedStyle)
	  };
	}

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();





	var defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	/**
	 * Given element offsets, generate an output similar to getBoundingClientRect
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Object} offsets
	 * @returns {Object} ClientRect like output
	 */
	function getClientRect(offsets) {
	  return _extends({}, offsets, {
	    right: offsets.left + offsets.width,
	    bottom: offsets.top + offsets.height
	  });
	}

	/**
	 * Get bounding client rect of given element
	 * @method
	 * @memberof Popper.Utils
	 * @param {HTMLElement} element
	 * @return {Object} client rect
	 */
	function getBoundingClientRect(element) {
	  var rect = {};

	  // IE10 10 FIX: Please, don't ask, the element isn't
	  // considered in DOM in some circumstances...
	  // This isn't reproducible in IE10 compatibility mode of IE11
	  try {
	    if (isIE(10)) {
	      rect = element.getBoundingClientRect();
	      var scrollTop = getScroll(element, 'top');
	      var scrollLeft = getScroll(element, 'left');
	      rect.top += scrollTop;
	      rect.left += scrollLeft;
	      rect.bottom += scrollTop;
	      rect.right += scrollLeft;
	    } else {
	      rect = element.getBoundingClientRect();
	    }
	  } catch (e) {}

	  var result = {
	    left: rect.left,
	    top: rect.top,
	    width: rect.right - rect.left,
	    height: rect.bottom - rect.top
	  };

	  // subtract scrollbar size from sizes
	  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
	  var width = sizes.width || element.clientWidth || result.right - result.left;
	  var height = sizes.height || element.clientHeight || result.bottom - result.top;

	  var horizScrollbar = element.offsetWidth - width;
	  var vertScrollbar = element.offsetHeight - height;

	  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
	  // we make this check conditional for performance reasons
	  if (horizScrollbar || vertScrollbar) {
	    var styles = getStyleComputedProperty(element);
	    horizScrollbar -= getBordersSize(styles, 'x');
	    vertScrollbar -= getBordersSize(styles, 'y');

	    result.width -= horizScrollbar;
	    result.height -= vertScrollbar;
	  }

	  return getClientRect(result);
	}

	function getOffsetRectRelativeToArbitraryNode(children, parent) {
	  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var isIE10 = isIE(10);
	  var isHTML = parent.nodeName === 'HTML';
	  var childrenRect = getBoundingClientRect(children);
	  var parentRect = getBoundingClientRect(parent);
	  var scrollParent = getScrollParent(children);

	  var styles = getStyleComputedProperty(parent);
	  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
	  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

	  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
	  if (fixedPosition && parent.nodeName === 'HTML') {
	    parentRect.top = Math.max(parentRect.top, 0);
	    parentRect.left = Math.max(parentRect.left, 0);
	  }
	  var offsets = getClientRect({
	    top: childrenRect.top - parentRect.top - borderTopWidth,
	    left: childrenRect.left - parentRect.left - borderLeftWidth,
	    width: childrenRect.width,
	    height: childrenRect.height
	  });
	  offsets.marginTop = 0;
	  offsets.marginLeft = 0;

	  // Subtract margins of documentElement in case it's being used as parent
	  // we do this only on HTML because it's the only element that behaves
	  // differently when margins are applied to it. The margins are included in
	  // the box of the documentElement, in the other cases not.
	  if (!isIE10 && isHTML) {
	    var marginTop = parseFloat(styles.marginTop, 10);
	    var marginLeft = parseFloat(styles.marginLeft, 10);

	    offsets.top -= borderTopWidth - marginTop;
	    offsets.bottom -= borderTopWidth - marginTop;
	    offsets.left -= borderLeftWidth - marginLeft;
	    offsets.right -= borderLeftWidth - marginLeft;

	    // Attach marginTop and marginLeft because in some circumstances we may need them
	    offsets.marginTop = marginTop;
	    offsets.marginLeft = marginLeft;
	  }

	  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
	    offsets = includeScroll(offsets, parent);
	  }

	  return offsets;
	}

	function getViewportOffsetRectRelativeToArtbitraryNode(element) {
	  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var html = element.ownerDocument.documentElement;
	  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
	  var width = Math.max(html.clientWidth, window.innerWidth || 0);
	  var height = Math.max(html.clientHeight, window.innerHeight || 0);

	  var scrollTop = !excludeScroll ? getScroll(html) : 0;
	  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

	  var offset = {
	    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
	    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
	    width: width,
	    height: height
	  };

	  return getClientRect(offset);
	}

	/**
	 * Check if the given element is fixed or is inside a fixed parent
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @argument {Element} customContainer
	 * @returns {Boolean} answer to "isFixed?"
	 */
	function isFixed(element) {
	  var nodeName = element.nodeName;
	  if (nodeName === 'BODY' || nodeName === 'HTML') {
	    return false;
	  }
	  if (getStyleComputedProperty(element, 'position') === 'fixed') {
	    return true;
	  }
	  return isFixed(getParentNode(element));
	}

	/**
	 * Finds the first parent of an element that has a transformed property defined
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} first transformed parent or documentElement
	 */

	function getFixedPositionOffsetParent(element) {
	  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
	  if (!element || !element.parentElement || isIE()) {
	    return document.documentElement;
	  }
	  var el = element.parentElement;
	  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
	    el = el.parentElement;
	  }
	  return el || document.documentElement;
	}

	/**
	 * Computed the boundaries limits and return them
	 * @method
	 * @memberof Popper.Utils
	 * @param {HTMLElement} popper
	 * @param {HTMLElement} reference
	 * @param {number} padding
	 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
	 * @param {Boolean} fixedPosition - Is in fixed position mode
	 * @returns {Object} Coordinates of the boundaries
	 */
	function getBoundaries(popper, reference, padding, boundariesElement) {
	  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  // NOTE: 1 DOM access here

	  var boundaries = { top: 0, left: 0 };
	  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

	  // Handle viewport case
	  if (boundariesElement === 'viewport') {
	    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
	  } else {
	    // Handle other cases based on DOM element used as boundaries
	    var boundariesNode = void 0;
	    if (boundariesElement === 'scrollParent') {
	      boundariesNode = getScrollParent(getParentNode(reference));
	      if (boundariesNode.nodeName === 'BODY') {
	        boundariesNode = popper.ownerDocument.documentElement;
	      }
	    } else if (boundariesElement === 'window') {
	      boundariesNode = popper.ownerDocument.documentElement;
	    } else {
	      boundariesNode = boundariesElement;
	    }

	    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

	    // In case of HTML, we need a different computation
	    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
	      var _getWindowSizes = getWindowSizes(),
	          height = _getWindowSizes.height,
	          width = _getWindowSizes.width;

	      boundaries.top += offsets.top - offsets.marginTop;
	      boundaries.bottom = height + offsets.top;
	      boundaries.left += offsets.left - offsets.marginLeft;
	      boundaries.right = width + offsets.left;
	    } else {
	      // for all the other DOM elements, this one is good
	      boundaries = offsets;
	    }
	  }

	  // Add paddings
	  boundaries.left += padding;
	  boundaries.top += padding;
	  boundaries.right -= padding;
	  boundaries.bottom -= padding;

	  return boundaries;
	}

	function getArea(_ref) {
	  var width = _ref.width,
	      height = _ref.height;

	  return width * height;
	}

	/**
	 * Utility used to transform the `auto` placement to the placement with more
	 * available space.
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
	  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

	  if (placement.indexOf('auto') === -1) {
	    return placement;
	  }

	  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

	  var rects = {
	    top: {
	      width: boundaries.width,
	      height: refRect.top - boundaries.top
	    },
	    right: {
	      width: boundaries.right - refRect.right,
	      height: boundaries.height
	    },
	    bottom: {
	      width: boundaries.width,
	      height: boundaries.bottom - refRect.bottom
	    },
	    left: {
	      width: refRect.left - boundaries.left,
	      height: boundaries.height
	    }
	  };

	  var sortedAreas = Object.keys(rects).map(function (key) {
	    return _extends({
	      key: key
	    }, rects[key], {
	      area: getArea(rects[key])
	    });
	  }).sort(function (a, b) {
	    return b.area - a.area;
	  });

	  var filteredAreas = sortedAreas.filter(function (_ref2) {
	    var width = _ref2.width,
	        height = _ref2.height;
	    return width >= popper.clientWidth && height >= popper.clientHeight;
	  });

	  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

	  var variation = placement.split('-')[1];

	  return computedPlacement + (variation ? '-' + variation : '');
	}

	/**
	 * Get offsets to the reference element
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} state
	 * @param {Element} popper - the popper element
	 * @param {Element} reference - the reference element (the popper will be relative to this)
	 * @param {Element} fixedPosition - is in fixed position mode
	 * @returns {Object} An object containing the offsets which will be applied to the popper
	 */
	function getReferenceOffsets(state, popper, reference) {
	  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
	  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
	}

	/**
	 * Get the outer sizes of the given element (offset size + margins)
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Object} object containing width and height properties
	 */
	function getOuterSizes(element) {
	  var styles = getComputedStyle(element);
	  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
	  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
	  var result = {
	    width: element.offsetWidth + y,
	    height: element.offsetHeight + x
	  };
	  return result;
	}

	/**
	 * Get the opposite placement of the given one
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement
	 * @returns {String} flipped placement
	 */
	function getOppositePlacement(placement) {
	  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash[matched];
	  });
	}

	/**
	 * Get offsets to the popper
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} position - CSS position the Popper will get applied
	 * @param {HTMLElement} popper - the popper element
	 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
	 * @param {String} placement - one of the valid placement options
	 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
	 */
	function getPopperOffsets(popper, referenceOffsets, placement) {
	  placement = placement.split('-')[0];

	  // Get popper node sizes
	  var popperRect = getOuterSizes(popper);

	  // Add position, width and height to our offsets object
	  var popperOffsets = {
	    width: popperRect.width,
	    height: popperRect.height
	  };

	  // depending by the popper placement we have to compute its offsets slightly differently
	  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
	  var mainSide = isHoriz ? 'top' : 'left';
	  var secondarySide = isHoriz ? 'left' : 'top';
	  var measurement = isHoriz ? 'height' : 'width';
	  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

	  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
	  if (placement === secondarySide) {
	    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
	  } else {
	    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
	  }

	  return popperOffsets;
	}

	/**
	 * Mimics the `find` method of Array
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Array} arr
	 * @argument prop
	 * @argument value
	 * @returns index or -1
	 */
	function find(arr, check) {
	  // use native find if supported
	  if (Array.prototype.find) {
	    return arr.find(check);
	  }

	  // use `filter` to obtain the same behavior of `find`
	  return arr.filter(check)[0];
	}

	/**
	 * Return the index of the matching object
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Array} arr
	 * @argument prop
	 * @argument value
	 * @returns index or -1
	 */
	function findIndex(arr, prop, value) {
	  // use native findIndex if supported
	  if (Array.prototype.findIndex) {
	    return arr.findIndex(function (cur) {
	      return cur[prop] === value;
	    });
	  }

	  // use `find` + `indexOf` if `findIndex` isn't supported
	  var match = find(arr, function (obj) {
	    return obj[prop] === value;
	  });
	  return arr.indexOf(match);
	}

	/**
	 * Loop trough the list of modifiers and run them in order,
	 * each of them will then edit the data object.
	 * @method
	 * @memberof Popper.Utils
	 * @param {dataObject} data
	 * @param {Array} modifiers
	 * @param {String} ends - Optional modifier name used as stopper
	 * @returns {dataObject}
	 */
	function runModifiers(modifiers, data, ends) {
	  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

	  modifiersToRun.forEach(function (modifier) {
	    if (modifier['function']) {
	      // eslint-disable-line dot-notation
	      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
	    }
	    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
	    if (modifier.enabled && isFunction(fn)) {
	      // Add properties to offsets to make them a complete clientRect object
	      // we do this before each modifier to make sure the previous one doesn't
	      // mess with these values
	      data.offsets.popper = getClientRect(data.offsets.popper);
	      data.offsets.reference = getClientRect(data.offsets.reference);

	      data = fn(data, modifier);
	    }
	  });

	  return data;
	}

	/**
	 * Updates the position of the popper, computing the new offsets and applying
	 * the new style.<br />
	 * Prefer `scheduleUpdate` over `update` because of performance reasons.
	 * @method
	 * @memberof Popper
	 */
	function update() {
	  // if popper is destroyed, don't perform any further update
	  if (this.state.isDestroyed) {
	    return;
	  }

	  var data = {
	    instance: this,
	    styles: {},
	    arrowStyles: {},
	    attributes: {},
	    flipped: false,
	    offsets: {}
	  };

	  // compute reference element offsets
	  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

	  // compute auto placement, store placement inside the data object,
	  // modifiers will be able to edit `placement` if needed
	  // and refer to originalPlacement to know the original value
	  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

	  // store the computed placement inside `originalPlacement`
	  data.originalPlacement = data.placement;

	  data.positionFixed = this.options.positionFixed;

	  // compute the popper offsets
	  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

	  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

	  // run the modifiers
	  data = runModifiers(this.modifiers, data);

	  // the first `update` will call `onCreate` callback
	  // the other ones will call `onUpdate` callback
	  if (!this.state.isCreated) {
	    this.state.isCreated = true;
	    this.options.onCreate(data);
	  } else {
	    this.options.onUpdate(data);
	  }
	}

	/**
	 * Helper used to know if the given modifier is enabled.
	 * @method
	 * @memberof Popper.Utils
	 * @returns {Boolean}
	 */
	function isModifierEnabled(modifiers, modifierName) {
	  return modifiers.some(function (_ref) {
	    var name = _ref.name,
	        enabled = _ref.enabled;
	    return enabled && name === modifierName;
	  });
	}

	/**
	 * Get the prefixed supported property name
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} property (camelCase)
	 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
	 */
	function getSupportedPropertyName(property) {
	  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
	  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

	  for (var i = 0; i < prefixes.length; i++) {
	    var prefix = prefixes[i];
	    var toCheck = prefix ? '' + prefix + upperProp : property;
	    if (typeof document.body.style[toCheck] !== 'undefined') {
	      return toCheck;
	    }
	  }
	  return null;
	}

	/**
	 * Destroy the popper
	 * @method
	 * @memberof Popper
	 */
	function destroy() {
	  this.state.isDestroyed = true;

	  // touch DOM only if `applyStyle` modifier is enabled
	  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
	    this.popper.removeAttribute('x-placement');
	    this.popper.style.position = '';
	    this.popper.style.top = '';
	    this.popper.style.left = '';
	    this.popper.style.right = '';
	    this.popper.style.bottom = '';
	    this.popper.style.willChange = '';
	    this.popper.style[getSupportedPropertyName('transform')] = '';
	  }

	  this.disableEventListeners();

	  // remove the popper if user explicity asked for the deletion on destroy
	  // do not use `remove` because IE11 doesn't support it
	  if (this.options.removeOnDestroy) {
	    this.popper.parentNode.removeChild(this.popper);
	  }
	  return this;
	}

	/**
	 * Get the window associated with the element
	 * @argument {Element} element
	 * @returns {Window}
	 */
	function getWindow(element) {
	  var ownerDocument = element.ownerDocument;
	  return ownerDocument ? ownerDocument.defaultView : window;
	}

	function attachToScrollParents(scrollParent, event, callback, scrollParents) {
	  var isBody = scrollParent.nodeName === 'BODY';
	  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
	  target.addEventListener(event, callback, { passive: true });

	  if (!isBody) {
	    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
	  }
	  scrollParents.push(target);
	}

	/**
	 * Setup needed event listeners used to update the popper position
	 * @method
	 * @memberof Popper.Utils
	 * @private
	 */
	function setupEventListeners(reference, options, state, updateBound) {
	  // Resize event listener on window
	  state.updateBound = updateBound;
	  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

	  // Scroll event listener on scroll parents
	  var scrollElement = getScrollParent(reference);
	  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
	  state.scrollElement = scrollElement;
	  state.eventsEnabled = true;

	  return state;
	}

	/**
	 * It will add resize/scroll events and start recalculating
	 * position of the popper element when they are triggered.
	 * @method
	 * @memberof Popper
	 */
	function enableEventListeners() {
	  if (!this.state.eventsEnabled) {
	    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
	  }
	}

	/**
	 * Remove event listeners used to update the popper position
	 * @method
	 * @memberof Popper.Utils
	 * @private
	 */
	function removeEventListeners(reference, state) {
	  // Remove resize event listener on window
	  getWindow(reference).removeEventListener('resize', state.updateBound);

	  // Remove scroll event listener on scroll parents
	  state.scrollParents.forEach(function (target) {
	    target.removeEventListener('scroll', state.updateBound);
	  });

	  // Reset state
	  state.updateBound = null;
	  state.scrollParents = [];
	  state.scrollElement = null;
	  state.eventsEnabled = false;
	  return state;
	}

	/**
	 * It will remove resize/scroll events and won't recalculate popper position
	 * when they are triggered. It also won't trigger onUpdate callback anymore,
	 * unless you call `update` method manually.
	 * @method
	 * @memberof Popper
	 */
	function disableEventListeners() {
	  if (this.state.eventsEnabled) {
	    cancelAnimationFrame(this.scheduleUpdate);
	    this.state = removeEventListeners(this.reference, this.state);
	  }
	}

	/**
	 * Tells if a given input is a number
	 * @method
	 * @memberof Popper.Utils
	 * @param {*} input to check
	 * @return {Boolean}
	 */
	function isNumeric(n) {
	  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
	}

	/**
	 * Set the style to the given popper
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element - Element to apply the style to
	 * @argument {Object} styles
	 * Object with a list of properties and values which will be applied to the element
	 */
	function setStyles(element, styles) {
	  Object.keys(styles).forEach(function (prop) {
	    var unit = '';
	    // add unit if the value is numeric and is one of the following
	    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
	      unit = 'px';
	    }
	    element.style[prop] = styles[prop] + unit;
	  });
	}

	/**
	 * Set the attributes to the given popper
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element - Element to apply the attributes to
	 * @argument {Object} styles
	 * Object with a list of properties and values which will be applied to the element
	 */
	function setAttributes(element, attributes) {
	  Object.keys(attributes).forEach(function (prop) {
	    var value = attributes[prop];
	    if (value !== false) {
	      element.setAttribute(prop, attributes[prop]);
	    } else {
	      element.removeAttribute(prop);
	    }
	  });
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} data.styles - List of style properties - values to apply to popper element
	 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The same data object
	 */
	function applyStyle(data) {
	  // any property present in `data.styles` will be applied to the popper,
	  // in this way we can make the 3rd party modifiers add custom styles to it
	  // Be aware, modifiers could override the properties defined in the previous
	  // lines of this modifier!
	  setStyles(data.instance.popper, data.styles);

	  // any property present in `data.attributes` will be applied to the popper,
	  // they will be set as HTML attributes of the element
	  setAttributes(data.instance.popper, data.attributes);

	  // if arrowElement is defined and arrowStyles has some properties
	  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
	    setStyles(data.arrowElement, data.arrowStyles);
	  }

	  return data;
	}

	/**
	 * Set the x-placement attribute before everything else because it could be used
	 * to add margins to the popper margins needs to be calculated to get the
	 * correct popper offsets.
	 * @method
	 * @memberof Popper.modifiers
	 * @param {HTMLElement} reference - The reference element used to position the popper
	 * @param {HTMLElement} popper - The HTML element used as popper
	 * @param {Object} options - Popper.js options
	 */
	function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
	  // compute reference element offsets
	  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

	  // compute auto placement, store placement inside the data object,
	  // modifiers will be able to edit `placement` if needed
	  // and refer to originalPlacement to know the original value
	  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

	  popper.setAttribute('x-placement', placement);

	  // Apply `position` to popper before anything else because
	  // without the position applied we can't guarantee correct computations
	  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

	  return options;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function computeStyle(data, options) {
	  var x = options.x,
	      y = options.y;
	  var popper = data.offsets.popper;

	  // Remove this legacy support in Popper.js v2

	  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
	    return modifier.name === 'applyStyle';
	  }).gpuAcceleration;
	  if (legacyGpuAccelerationOption !== undefined) {
	    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
	  }
	  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

	  var offsetParent = getOffsetParent(data.instance.popper);
	  var offsetParentRect = getBoundingClientRect(offsetParent);

	  // Styles
	  var styles = {
	    position: popper.position
	  };

	  // Avoid blurry text by using full pixel integers.
	  // For pixel-perfect positioning, top/bottom prefers rounded
	  // values, while left/right prefers floored values.
	  var offsets = {
	    left: Math.floor(popper.left),
	    top: Math.round(popper.top),
	    bottom: Math.round(popper.bottom),
	    right: Math.floor(popper.right)
	  };

	  var sideA = x === 'bottom' ? 'top' : 'bottom';
	  var sideB = y === 'right' ? 'left' : 'right';

	  // if gpuAcceleration is set to `true` and transform is supported,
	  //  we use `translate3d` to apply the position to the popper we
	  // automatically use the supported prefixed version if needed
	  var prefixedProperty = getSupportedPropertyName('transform');

	  // now, let's make a step back and look at this code closely (wtf?)
	  // If the content of the popper grows once it's been positioned, it
	  // may happen that the popper gets misplaced because of the new content
	  // overflowing its reference element
	  // To avoid this problem, we provide two options (x and y), which allow
	  // the consumer to define the offset origin.
	  // If we position a popper on top of a reference element, we can set
	  // `x` to `top` to make the popper grow towards its top instead of
	  // its bottom.
	  var left = void 0,
	      top = void 0;
	  if (sideA === 'bottom') {
	    top = -offsetParentRect.height + offsets.bottom;
	  } else {
	    top = offsets.top;
	  }
	  if (sideB === 'right') {
	    left = -offsetParentRect.width + offsets.right;
	  } else {
	    left = offsets.left;
	  }
	  if (gpuAcceleration && prefixedProperty) {
	    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
	    styles[sideA] = 0;
	    styles[sideB] = 0;
	    styles.willChange = 'transform';
	  } else {
	    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
	    var invertTop = sideA === 'bottom' ? -1 : 1;
	    var invertLeft = sideB === 'right' ? -1 : 1;
	    styles[sideA] = top * invertTop;
	    styles[sideB] = left * invertLeft;
	    styles.willChange = sideA + ', ' + sideB;
	  }

	  // Attributes
	  var attributes = {
	    'x-placement': data.placement
	  };

	  // Update `data` attributes, styles and arrowStyles
	  data.attributes = _extends({}, attributes, data.attributes);
	  data.styles = _extends({}, styles, data.styles);
	  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

	  return data;
	}

	/**
	 * Helper used to know if the given modifier depends from another one.<br />
	 * It checks if the needed modifier is listed and enabled.
	 * @method
	 * @memberof Popper.Utils
	 * @param {Array} modifiers - list of modifiers
	 * @param {String} requestingName - name of requesting modifier
	 * @param {String} requestedName - name of requested modifier
	 * @returns {Boolean}
	 */
	function isModifierRequired(modifiers, requestingName, requestedName) {
	  var requesting = find(modifiers, function (_ref) {
	    var name = _ref.name;
	    return name === requestingName;
	  });

	  var isRequired = !!requesting && modifiers.some(function (modifier) {
	    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
	  });

	  if (!isRequired) {
	    var _requesting = '`' + requestingName + '`';
	    var requested = '`' + requestedName + '`';
	    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
	  }
	  return isRequired;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function arrow(data, options) {
	  var _data$offsets$arrow;

	  // arrow depends on keepTogether in order to work
	  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
	    return data;
	  }

	  var arrowElement = options.element;

	  // if arrowElement is a string, suppose it's a CSS selector
	  if (typeof arrowElement === 'string') {
	    arrowElement = data.instance.popper.querySelector(arrowElement);

	    // if arrowElement is not found, don't run the modifier
	    if (!arrowElement) {
	      return data;
	    }
	  } else {
	    // if the arrowElement isn't a query selector we must check that the
	    // provided DOM node is child of its popper node
	    if (!data.instance.popper.contains(arrowElement)) {
	      console.warn('WARNING: `arrow.element` must be child of its popper element!');
	      return data;
	    }
	  }

	  var placement = data.placement.split('-')[0];
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

	  var len = isVertical ? 'height' : 'width';
	  var sideCapitalized = isVertical ? 'Top' : 'Left';
	  var side = sideCapitalized.toLowerCase();
	  var altSide = isVertical ? 'left' : 'top';
	  var opSide = isVertical ? 'bottom' : 'right';
	  var arrowElementSize = getOuterSizes(arrowElement)[len];

	  //
	  // extends keepTogether behavior making sure the popper and its
	  // reference have enough pixels in conjuction
	  //

	  // top/left side
	  if (reference[opSide] - arrowElementSize < popper[side]) {
	    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
	  }
	  // bottom/right side
	  if (reference[side] + arrowElementSize > popper[opSide]) {
	    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
	  }
	  data.offsets.popper = getClientRect(data.offsets.popper);

	  // compute center of the popper
	  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

	  // Compute the sideValue using the updated popper offsets
	  // take popper margin in account because we don't have this info available
	  var css = getStyleComputedProperty(data.instance.popper);
	  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
	  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
	  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

	  // prevent arrowElement from being placed not contiguously to its popper
	  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

	  data.arrowElement = arrowElement;
	  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

	  return data;
	}

	/**
	 * Get the opposite placement variation of the given one
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement variation
	 * @returns {String} flipped placement variation
	 */
	function getOppositeVariation(variation) {
	  if (variation === 'end') {
	    return 'start';
	  } else if (variation === 'start') {
	    return 'end';
	  }
	  return variation;
	}

	/**
	 * List of accepted placements to use as values of the `placement` option.<br />
	 * Valid placements are:
	 * - `auto`
	 * - `top`
	 * - `right`
	 * - `bottom`
	 * - `left`
	 *
	 * Each placement can have a variation from this list:
	 * - `-start`
	 * - `-end`
	 *
	 * Variations are interpreted easily if you think of them as the left to right
	 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
	 * is right.<br />
	 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
	 *
	 * Some valid examples are:
	 * - `top-end` (on top of reference, right aligned)
	 * - `right-start` (on right of reference, top aligned)
	 * - `bottom` (on bottom, centered)
	 * - `auto-right` (on the side with more space available, alignment depends by placement)
	 *
	 * @static
	 * @type {Array}
	 * @enum {String}
	 * @readonly
	 * @method placements
	 * @memberof Popper
	 */
	var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

	// Get rid of `auto` `auto-start` and `auto-end`
	var validPlacements = placements.slice(3);

	/**
	 * Given an initial placement, returns all the subsequent placements
	 * clockwise (or counter-clockwise).
	 *
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement - A valid placement (it accepts variations)
	 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
	 * @returns {Array} placements including their variations
	 */
	function clockwise(placement) {
	  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var index = validPlacements.indexOf(placement);
	  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
	  return counter ? arr.reverse() : arr;
	}

	var BEHAVIORS = {
	  FLIP: 'flip',
	  CLOCKWISE: 'clockwise',
	  COUNTERCLOCKWISE: 'counterclockwise'
	};

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function flip(data, options) {
	  // if `inner` modifier is enabled, we can't use the `flip` modifier
	  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
	    return data;
	  }

	  if (data.flipped && data.placement === data.originalPlacement) {
	    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
	    return data;
	  }

	  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

	  var placement = data.placement.split('-')[0];
	  var placementOpposite = getOppositePlacement(placement);
	  var variation = data.placement.split('-')[1] || '';

	  var flipOrder = [];

	  switch (options.behavior) {
	    case BEHAVIORS.FLIP:
	      flipOrder = [placement, placementOpposite];
	      break;
	    case BEHAVIORS.CLOCKWISE:
	      flipOrder = clockwise(placement);
	      break;
	    case BEHAVIORS.COUNTERCLOCKWISE:
	      flipOrder = clockwise(placement, true);
	      break;
	    default:
	      flipOrder = options.behavior;
	  }

	  flipOrder.forEach(function (step, index) {
	    if (placement !== step || flipOrder.length === index + 1) {
	      return data;
	    }

	    placement = data.placement.split('-')[0];
	    placementOpposite = getOppositePlacement(placement);

	    var popperOffsets = data.offsets.popper;
	    var refOffsets = data.offsets.reference;

	    // using floor because the reference offsets may contain decimals we are not going to consider here
	    var floor = Math.floor;
	    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

	    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
	    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
	    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
	    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

	    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

	    // flip the variation if required
	    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

	    if (overlapsRef || overflowsBoundaries || flippedVariation) {
	      // this boolean to detect any flip loop
	      data.flipped = true;

	      if (overlapsRef || overflowsBoundaries) {
	        placement = flipOrder[index + 1];
	      }

	      if (flippedVariation) {
	        variation = getOppositeVariation(variation);
	      }

	      data.placement = placement + (variation ? '-' + variation : '');

	      // this object contains `position`, we want to preserve it along with
	      // any additional property we may add in the future
	      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

	      data = runModifiers(data.instance.modifiers, data, 'flip');
	    }
	  });
	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function keepTogether(data) {
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var placement = data.placement.split('-')[0];
	  var floor = Math.floor;
	  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	  var side = isVertical ? 'right' : 'bottom';
	  var opSide = isVertical ? 'left' : 'top';
	  var measurement = isVertical ? 'width' : 'height';

	  if (popper[side] < floor(reference[opSide])) {
	    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
	  }
	  if (popper[opSide] > floor(reference[side])) {
	    data.offsets.popper[opSide] = floor(reference[side]);
	  }

	  return data;
	}

	/**
	 * Converts a string containing value + unit into a px value number
	 * @function
	 * @memberof {modifiers~offset}
	 * @private
	 * @argument {String} str - Value + unit string
	 * @argument {String} measurement - `height` or `width`
	 * @argument {Object} popperOffsets
	 * @argument {Object} referenceOffsets
	 * @returns {Number|String}
	 * Value in pixels, or original string if no values were extracted
	 */
	function toValue(str, measurement, popperOffsets, referenceOffsets) {
	  // separate value from unit
	  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
	  var value = +split[1];
	  var unit = split[2];

	  // If it's not a number it's an operator, I guess
	  if (!value) {
	    return str;
	  }

	  if (unit.indexOf('%') === 0) {
	    var element = void 0;
	    switch (unit) {
	      case '%p':
	        element = popperOffsets;
	        break;
	      case '%':
	      case '%r':
	      default:
	        element = referenceOffsets;
	    }

	    var rect = getClientRect(element);
	    return rect[measurement] / 100 * value;
	  } else if (unit === 'vh' || unit === 'vw') {
	    // if is a vh or vw, we calculate the size based on the viewport
	    var size = void 0;
	    if (unit === 'vh') {
	      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    } else {
	      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	    }
	    return size / 100 * value;
	  } else {
	    // if is an explicit pixel unit, we get rid of the unit and keep the value
	    // if is an implicit unit, it's px, and we return just the value
	    return value;
	  }
	}

	/**
	 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
	 * @function
	 * @memberof {modifiers~offset}
	 * @private
	 * @argument {String} offset
	 * @argument {Object} popperOffsets
	 * @argument {Object} referenceOffsets
	 * @argument {String} basePlacement
	 * @returns {Array} a two cells array with x and y offsets in numbers
	 */
	function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
	  var offsets = [0, 0];

	  // Use height if placement is left or right and index is 0 otherwise use width
	  // in this way the first offset will use an axis and the second one
	  // will use the other one
	  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

	  // Split the offset string to obtain a list of values and operands
	  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
	  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
	    return frag.trim();
	  });

	  // Detect if the offset string contains a pair of values or a single one
	  // they could be separated by comma or space
	  var divider = fragments.indexOf(find(fragments, function (frag) {
	    return frag.search(/,|\s/) !== -1;
	  }));

	  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
	    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
	  }

	  // If divider is found, we divide the list of values and operands to divide
	  // them by ofset X and Y.
	  var splitRegex = /\s*,\s*|\s+/;
	  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

	  // Convert the values with units to absolute pixels to allow our computations
	  ops = ops.map(function (op, index) {
	    // Most of the units rely on the orientation of the popper
	    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
	    var mergeWithPrevious = false;
	    return op
	    // This aggregates any `+` or `-` sign that aren't considered operators
	    // e.g.: 10 + +5 => [10, +, +5]
	    .reduce(function (a, b) {
	      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
	        a[a.length - 1] = b;
	        mergeWithPrevious = true;
	        return a;
	      } else if (mergeWithPrevious) {
	        a[a.length - 1] += b;
	        mergeWithPrevious = false;
	        return a;
	      } else {
	        return a.concat(b);
	      }
	    }, [])
	    // Here we convert the string values into number values (in px)
	    .map(function (str) {
	      return toValue(str, measurement, popperOffsets, referenceOffsets);
	    });
	  });

	  // Loop trough the offsets arrays and execute the operations
	  ops.forEach(function (op, index) {
	    op.forEach(function (frag, index2) {
	      if (isNumeric(frag)) {
	        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
	      }
	    });
	  });
	  return offsets;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @argument {Number|String} options.offset=0
	 * The offset value as described in the modifier description
	 * @returns {Object} The data object, properly modified
	 */
	function offset(data, _ref) {
	  var offset = _ref.offset;
	  var placement = data.placement,
	      _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var basePlacement = placement.split('-')[0];

	  var offsets = void 0;
	  if (isNumeric(+offset)) {
	    offsets = [+offset, 0];
	  } else {
	    offsets = parseOffset(offset, popper, reference, basePlacement);
	  }

	  if (basePlacement === 'left') {
	    popper.top += offsets[0];
	    popper.left -= offsets[1];
	  } else if (basePlacement === 'right') {
	    popper.top += offsets[0];
	    popper.left += offsets[1];
	  } else if (basePlacement === 'top') {
	    popper.left += offsets[0];
	    popper.top -= offsets[1];
	  } else if (basePlacement === 'bottom') {
	    popper.left += offsets[0];
	    popper.top += offsets[1];
	  }

	  data.popper = popper;
	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function preventOverflow(data, options) {
	  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

	  // If offsetParent is the reference element, we really want to
	  // go one step up and use the next offsetParent as reference to
	  // avoid to make this modifier completely useless and look like broken
	  if (data.instance.reference === boundariesElement) {
	    boundariesElement = getOffsetParent(boundariesElement);
	  }

	  // NOTE: DOM access here
	  // resets the popper's position so that the document size can be calculated excluding
	  // the size of the popper element itself
	  var transformProp = getSupportedPropertyName('transform');
	  var popperStyles = data.instance.popper.style; // assignment to help minification
	  var top = popperStyles.top,
	      left = popperStyles.left,
	      transform = popperStyles[transformProp];

	  popperStyles.top = '';
	  popperStyles.left = '';
	  popperStyles[transformProp] = '';

	  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

	  // NOTE: DOM access here
	  // restores the original style properties after the offsets have been computed
	  popperStyles.top = top;
	  popperStyles.left = left;
	  popperStyles[transformProp] = transform;

	  options.boundaries = boundaries;

	  var order = options.priority;
	  var popper = data.offsets.popper;

	  var check = {
	    primary: function primary(placement) {
	      var value = popper[placement];
	      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
	        value = Math.max(popper[placement], boundaries[placement]);
	      }
	      return defineProperty({}, placement, value);
	    },
	    secondary: function secondary(placement) {
	      var mainSide = placement === 'right' ? 'left' : 'top';
	      var value = popper[mainSide];
	      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
	        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
	      }
	      return defineProperty({}, mainSide, value);
	    }
	  };

	  order.forEach(function (placement) {
	    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
	    popper = _extends({}, popper, check[side](placement));
	  });

	  data.offsets.popper = popper;

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function shift(data) {
	  var placement = data.placement;
	  var basePlacement = placement.split('-')[0];
	  var shiftvariation = placement.split('-')[1];

	  // if shift shiftvariation is specified, run the modifier
	  if (shiftvariation) {
	    var _data$offsets = data.offsets,
	        reference = _data$offsets.reference,
	        popper = _data$offsets.popper;

	    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
	    var side = isVertical ? 'left' : 'top';
	    var measurement = isVertical ? 'width' : 'height';

	    var shiftOffsets = {
	      start: defineProperty({}, side, reference[side]),
	      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
	    };

	    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
	  }

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function hide(data) {
	  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
	    return data;
	  }

	  var refRect = data.offsets.reference;
	  var bound = find(data.instance.modifiers, function (modifier) {
	    return modifier.name === 'preventOverflow';
	  }).boundaries;

	  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
	    // Avoid unnecessary DOM access if visibility hasn't changed
	    if (data.hide === true) {
	      return data;
	    }

	    data.hide = true;
	    data.attributes['x-out-of-boundaries'] = '';
	  } else {
	    // Avoid unnecessary DOM access if visibility hasn't changed
	    if (data.hide === false) {
	      return data;
	    }

	    data.hide = false;
	    data.attributes['x-out-of-boundaries'] = false;
	  }

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function inner(data) {
	  var placement = data.placement;
	  var basePlacement = placement.split('-')[0];
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

	  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

	  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

	  data.placement = getOppositePlacement(placement);
	  data.offsets.popper = getClientRect(popper);

	  return data;
	}

	/**
	 * Modifier function, each modifier can have a function of this type assigned
	 * to its `fn` property.<br />
	 * These functions will be called on each update, this means that you must
	 * make sure they are performant enough to avoid performance bottlenecks.
	 *
	 * @function ModifierFn
	 * @argument {dataObject} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {dataObject} The data object, properly modified
	 */

	/**
	 * Modifiers are plugins used to alter the behavior of your poppers.<br />
	 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
	 * needed by the library.
	 *
	 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
	 * All the other properties are configurations that could be tweaked.
	 * @namespace modifiers
	 */
	var modifiers = {
	  /**
	   * Modifier used to shift the popper on the start or end of its reference
	   * element.<br />
	   * It will read the variation of the `placement` property.<br />
	   * It can be one either `-end` or `-start`.
	   * @memberof modifiers
	   * @inner
	   */
	  shift: {
	    /** @prop {number} order=100 - Index used to define the order of execution */
	    order: 100,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: shift
	  },

	  /**
	   * The `offset` modifier can shift your popper on both its axis.
	   *
	   * It accepts the following units:
	   * - `px` or unitless, interpreted as pixels
	   * - `%` or `%r`, percentage relative to the length of the reference element
	   * - `%p`, percentage relative to the length of the popper element
	   * - `vw`, CSS viewport width unit
	   * - `vh`, CSS viewport height unit
	   *
	   * For length is intended the main axis relative to the placement of the popper.<br />
	   * This means that if the placement is `top` or `bottom`, the length will be the
	   * `width`. In case of `left` or `right`, it will be the height.
	   *
	   * You can provide a single value (as `Number` or `String`), or a pair of values
	   * as `String` divided by a comma or one (or more) white spaces.<br />
	   * The latter is a deprecated method because it leads to confusion and will be
	   * removed in v2.<br />
	   * Additionally, it accepts additions and subtractions between different units.
	   * Note that multiplications and divisions aren't supported.
	   *
	   * Valid examples are:
	   * ```
	   * 10
	   * '10%'
	   * '10, 10'
	   * '10%, 10'
	   * '10 + 10%'
	   * '10 - 5vh + 3%'
	   * '-10px + 5vh, 5px - 6%'
	   * ```
	   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
	   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
	   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  offset: {
	    /** @prop {number} order=200 - Index used to define the order of execution */
	    order: 200,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: offset,
	    /** @prop {Number|String} offset=0
	     * The offset value as described in the modifier description
	     */
	    offset: 0
	  },

	  /**
	   * Modifier used to prevent the popper from being positioned outside the boundary.
	   *
	   * An scenario exists where the reference itself is not within the boundaries.<br />
	   * We can say it has "escaped the boundaries" — or just "escaped".<br />
	   * In this case we need to decide whether the popper should either:
	   *
	   * - detach from the reference and remain "trapped" in the boundaries, or
	   * - if it should ignore the boundary and "escape with its reference"
	   *
	   * When `escapeWithReference` is set to`true` and reference is completely
	   * outside its boundaries, the popper will overflow (or completely leave)
	   * the boundaries in order to remain attached to the edge of the reference.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  preventOverflow: {
	    /** @prop {number} order=300 - Index used to define the order of execution */
	    order: 300,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: preventOverflow,
	    /**
	     * @prop {Array} [priority=['left','right','top','bottom']]
	     * Popper will try to prevent overflow following these priorities by default,
	     * then, it could overflow on the left and on top of the `boundariesElement`
	     */
	    priority: ['left', 'right', 'top', 'bottom'],
	    /**
	     * @prop {number} padding=5
	     * Amount of pixel used to define a minimum distance between the boundaries
	     * and the popper this makes sure the popper has always a little padding
	     * between the edges of its container
	     */
	    padding: 5,
	    /**
	     * @prop {String|HTMLElement} boundariesElement='scrollParent'
	     * Boundaries used by the modifier, can be `scrollParent`, `window`,
	     * `viewport` or any DOM element.
	     */
	    boundariesElement: 'scrollParent'
	  },

	  /**
	   * Modifier used to make sure the reference and its popper stay near eachothers
	   * without leaving any gap between the two. Expecially useful when the arrow is
	   * enabled and you want to assure it to point to its reference element.
	   * It cares only about the first axis, you can still have poppers with margin
	   * between the popper and its reference element.
	   * @memberof modifiers
	   * @inner
	   */
	  keepTogether: {
	    /** @prop {number} order=400 - Index used to define the order of execution */
	    order: 400,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: keepTogether
	  },

	  /**
	   * This modifier is used to move the `arrowElement` of the popper to make
	   * sure it is positioned between the reference element and its popper element.
	   * It will read the outer size of the `arrowElement` node to detect how many
	   * pixels of conjuction are needed.
	   *
	   * It has no effect if no `arrowElement` is provided.
	   * @memberof modifiers
	   * @inner
	   */
	  arrow: {
	    /** @prop {number} order=500 - Index used to define the order of execution */
	    order: 500,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: arrow,
	    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
	    element: '[x-arrow]'
	  },

	  /**
	   * Modifier used to flip the popper's placement when it starts to overlap its
	   * reference element.
	   *
	   * Requires the `preventOverflow` modifier before it in order to work.
	   *
	   * **NOTE:** this modifier will interrupt the current update cycle and will
	   * restart it if it detects the need to flip the placement.
	   * @memberof modifiers
	   * @inner
	   */
	  flip: {
	    /** @prop {number} order=600 - Index used to define the order of execution */
	    order: 600,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: flip,
	    /**
	     * @prop {String|Array} behavior='flip'
	     * The behavior used to change the popper's placement. It can be one of
	     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
	     * placements (with optional variations).
	     */
	    behavior: 'flip',
	    /**
	     * @prop {number} padding=5
	     * The popper will flip if it hits the edges of the `boundariesElement`
	     */
	    padding: 5,
	    /**
	     * @prop {String|HTMLElement} boundariesElement='viewport'
	     * The element which will define the boundaries of the popper position,
	     * the popper will never be placed outside of the defined boundaries
	     * (except if keepTogether is enabled)
	     */
	    boundariesElement: 'viewport'
	  },

	  /**
	   * Modifier used to make the popper flow toward the inner of the reference element.
	   * By default, when this modifier is disabled, the popper will be placed outside
	   * the reference element.
	   * @memberof modifiers
	   * @inner
	   */
	  inner: {
	    /** @prop {number} order=700 - Index used to define the order of execution */
	    order: 700,
	    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
	    enabled: false,
	    /** @prop {ModifierFn} */
	    fn: inner
	  },

	  /**
	   * Modifier used to hide the popper when its reference element is outside of the
	   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
	   * be used to hide with a CSS selector the popper when its reference is
	   * out of boundaries.
	   *
	   * Requires the `preventOverflow` modifier before it in order to work.
	   * @memberof modifiers
	   * @inner
	   */
	  hide: {
	    /** @prop {number} order=800 - Index used to define the order of execution */
	    order: 800,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: hide
	  },

	  /**
	   * Computes the style that will be applied to the popper element to gets
	   * properly positioned.
	   *
	   * Note that this modifier will not touch the DOM, it just prepares the styles
	   * so that `applyStyle` modifier can apply it. This separation is useful
	   * in case you need to replace `applyStyle` with a custom implementation.
	   *
	   * This modifier has `850` as `order` value to maintain backward compatibility
	   * with previous versions of Popper.js. Expect the modifiers ordering method
	   * to change in future major versions of the library.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  computeStyle: {
	    /** @prop {number} order=850 - Index used to define the order of execution */
	    order: 850,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: computeStyle,
	    /**
	     * @prop {Boolean} gpuAcceleration=true
	     * If true, it uses the CSS 3d transformation to position the popper.
	     * Otherwise, it will use the `top` and `left` properties.
	     */
	    gpuAcceleration: true,
	    /**
	     * @prop {string} [x='bottom']
	     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
	     * Change this if your popper should grow in a direction different from `bottom`
	     */
	    x: 'bottom',
	    /**
	     * @prop {string} [x='left']
	     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
	     * Change this if your popper should grow in a direction different from `right`
	     */
	    y: 'right'
	  },

	  /**
	   * Applies the computed styles to the popper element.
	   *
	   * All the DOM manipulations are limited to this modifier. This is useful in case
	   * you want to integrate Popper.js inside a framework or view library and you
	   * want to delegate all the DOM manipulations to it.
	   *
	   * Note that if you disable this modifier, you must make sure the popper element
	   * has its position set to `absolute` before Popper.js can do its work!
	   *
	   * Just disable this modifier and define you own to achieve the desired effect.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  applyStyle: {
	    /** @prop {number} order=900 - Index used to define the order of execution */
	    order: 900,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: applyStyle,
	    /** @prop {Function} */
	    onLoad: applyStyleOnLoad,
	    /**
	     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
	     * @prop {Boolean} gpuAcceleration=true
	     * If true, it uses the CSS 3d transformation to position the popper.
	     * Otherwise, it will use the `top` and `left` properties.
	     */
	    gpuAcceleration: undefined
	  }
	};

	/**
	 * The `dataObject` is an object containing all the informations used by Popper.js
	 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
	 * @name dataObject
	 * @property {Object} data.instance The Popper.js instance
	 * @property {String} data.placement Placement applied to popper
	 * @property {String} data.originalPlacement Placement originally defined on init
	 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
	 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
	 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
	 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
	 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
	 * @property {Object} data.boundaries Offsets of the popper boundaries
	 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
	 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
	 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
	 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
	 */

	/**
	 * Default options provided to Popper.js constructor.<br />
	 * These can be overriden using the `options` argument of Popper.js.<br />
	 * To override an option, simply pass as 3rd argument an object with the same
	 * structure of this object, example:
	 * ```
	 * new Popper(ref, pop, {
	 *   modifiers: {
	 *     preventOverflow: { enabled: false }
	 *   }
	 * })
	 * ```
	 * @type {Object}
	 * @static
	 * @memberof Popper
	 */
	var Defaults = {
	  /**
	   * Popper's placement
	   * @prop {Popper.placements} placement='bottom'
	   */
	  placement: 'bottom',

	  /**
	   * Set this to true if you want popper to position it self in 'fixed' mode
	   * @prop {Boolean} positionFixed=false
	   */
	  positionFixed: false,

	  /**
	   * Whether events (resize, scroll) are initially enabled
	   * @prop {Boolean} eventsEnabled=true
	   */
	  eventsEnabled: true,

	  /**
	   * Set to true if you want to automatically remove the popper when
	   * you call the `destroy` method.
	   * @prop {Boolean} removeOnDestroy=false
	   */
	  removeOnDestroy: false,

	  /**
	   * Callback called when the popper is created.<br />
	   * By default, is set to no-op.<br />
	   * Access Popper.js instance with `data.instance`.
	   * @prop {onCreate}
	   */
	  onCreate: function onCreate() {},

	  /**
	   * Callback called when the popper is updated, this callback is not called
	   * on the initialization/creation of the popper, but only on subsequent
	   * updates.<br />
	   * By default, is set to no-op.<br />
	   * Access Popper.js instance with `data.instance`.
	   * @prop {onUpdate}
	   */
	  onUpdate: function onUpdate() {},

	  /**
	   * List of modifiers used to modify the offsets before they are applied to the popper.
	   * They provide most of the functionalities of Popper.js
	   * @prop {modifiers}
	   */
	  modifiers: modifiers
	};

	/**
	 * @callback onCreate
	 * @param {dataObject} data
	 */

	/**
	 * @callback onUpdate
	 * @param {dataObject} data
	 */

	// Utils
	// Methods
	var Popper = function () {
	  /**
	   * Create a new Popper.js instance
	   * @class Popper
	   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
	   * @param {HTMLElement} popper - The HTML element used as popper.
	   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
	   * @return {Object} instance - The generated Popper.js instance
	   */
	  function Popper(reference, popper) {
	    var _this = this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    classCallCheck(this, Popper);

	    this.scheduleUpdate = function () {
	      return requestAnimationFrame(_this.update);
	    };

	    // make update() debounced, so that it only runs at most once-per-tick
	    this.update = debounce(this.update.bind(this));

	    // with {} we create a new object with the options inside it
	    this.options = _extends({}, Popper.Defaults, options);

	    // init state
	    this.state = {
	      isDestroyed: false,
	      isCreated: false,
	      scrollParents: []
	    };

	    // get reference and popper elements (allow jQuery wrappers)
	    this.reference = reference && reference.jquery ? reference[0] : reference;
	    this.popper = popper && popper.jquery ? popper[0] : popper;

	    // Deep merge modifiers options
	    this.options.modifiers = {};
	    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
	      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
	    });

	    // Refactoring modifiers' list (Object => Array)
	    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
	      return _extends({
	        name: name
	      }, _this.options.modifiers[name]);
	    })
	    // sort the modifiers by order
	    .sort(function (a, b) {
	      return a.order - b.order;
	    });

	    // modifiers have the ability to execute arbitrary code when Popper.js get inited
	    // such code is executed in the same order of its modifier
	    // they could add new properties to their options configuration
	    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
	    this.modifiers.forEach(function (modifierOptions) {
	      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
	        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
	      }
	    });

	    // fire the first update to position the popper in the right place
	    this.update();

	    var eventsEnabled = this.options.eventsEnabled;
	    if (eventsEnabled) {
	      // setup event listeners, they will take care of update the position in specific situations
	      this.enableEventListeners();
	    }

	    this.state.eventsEnabled = eventsEnabled;
	  }

	  // We can't use class properties because they don't get listed in the
	  // class prototype and break stuff like Sinon stubs


	  createClass(Popper, [{
	    key: 'update',
	    value: function update$$1() {
	      return update.call(this);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy$$1() {
	      return destroy.call(this);
	    }
	  }, {
	    key: 'enableEventListeners',
	    value: function enableEventListeners$$1() {
	      return enableEventListeners.call(this);
	    }
	  }, {
	    key: 'disableEventListeners',
	    value: function disableEventListeners$$1() {
	      return disableEventListeners.call(this);
	    }

	    /**
	     * Schedule an update, it will run on the next UI update available
	     * @method scheduleUpdate
	     * @memberof Popper
	     */


	    /**
	     * Collection of utilities useful when writing custom modifiers.
	     * Starting from version 1.7, this method is available only if you
	     * include `popper-utils.js` before `popper.js`.
	     *
	     * **DEPRECATION**: This way to access PopperUtils is deprecated
	     * and will be removed in v2! Use the PopperUtils module directly instead.
	     * Due to the high instability of the methods contained in Utils, we can't
	     * guarantee them to follow semver. Use them at your own risk!
	     * @static
	     * @private
	     * @type {Object}
	     * @deprecated since version 1.8
	     * @member Utils
	     * @memberof Popper
	     */

	  }]);
	  return Popper;
	}();

	/**
	 * The `referenceObject` is an object that provides an interface compatible with Popper.js
	 * and lets you use it as replacement of a real DOM node.<br />
	 * You can use this method to position a popper relatively to a set of coordinates
	 * in case you don't have a DOM node to use as reference.
	 *
	 * ```
	 * new Popper(referenceObject, popperNode);
	 * ```
	 *
	 * NB: This feature isn't supported in Internet Explorer 10
	 * @name referenceObject
	 * @property {Function} data.getBoundingClientRect
	 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
	 * @property {number} data.clientWidth
	 * An ES6 getter that will return the width of the virtual reference element.
	 * @property {number} data.clientHeight
	 * An ES6 getter that will return the height of the virtual reference element.
	 */


	Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
	Popper.placements = placements;
	Popper.Defaults = Defaults;

	return Popper;

	})));
	//# sourceMappingURL=popper.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	function componentWillMount() {
	  // Call this.constructor.gDSFP to support sub-classes.
	  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
	  if (state !== null && state !== undefined) {
	    this.setState(state);
	  }
	}

	function componentWillReceiveProps(nextProps) {
	  // Call this.constructor.gDSFP to support sub-classes.
	  // Use the setState() updater to ensure state isn't stale in certain edge cases.
	  function updater(prevState) {
	    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
	    return state !== null && state !== undefined ? state : null;
	  }
	  // Binding "this" is important for shallow renderer support.
	  this.setState(updater.bind(this));
	}

	function componentWillUpdate(nextProps, nextState) {
	  try {
	    var prevProps = this.props;
	    var prevState = this.state;
	    this.props = nextProps;
	    this.state = nextState;
	    this.__reactInternalSnapshotFlag = true;
	    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
	      prevProps,
	      prevState
	    );
	  } finally {
	    this.props = prevProps;
	    this.state = prevState;
	  }
	}

	// React may warn about cWM/cWRP/cWU methods being deprecated.
	// Add a flag to suppress these warnings for this special case.
	componentWillMount.__suppressDeprecationWarning = true;
	componentWillReceiveProps.__suppressDeprecationWarning = true;
	componentWillUpdate.__suppressDeprecationWarning = true;

	function polyfill(Component) {
	  var prototype = Component.prototype;

	  if (!prototype || !prototype.isReactComponent) {
	    throw new Error('Can only polyfill class components');
	  }

	  if (
	    typeof Component.getDerivedStateFromProps !== 'function' &&
	    typeof prototype.getSnapshotBeforeUpdate !== 'function'
	  ) {
	    return Component;
	  }

	  // If new component APIs are defined, "unsafe" lifecycles won't be called.
	  // Error if any of these lifecycles are present,
	  // Because they would work differently between older and newer (16.3+) versions of React.
	  var foundWillMountName = null;
	  var foundWillReceivePropsName = null;
	  var foundWillUpdateName = null;
	  if (typeof prototype.componentWillMount === 'function') {
	    foundWillMountName = 'componentWillMount';
	  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
	    foundWillMountName = 'UNSAFE_componentWillMount';
	  }
	  if (typeof prototype.componentWillReceiveProps === 'function') {
	    foundWillReceivePropsName = 'componentWillReceiveProps';
	  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
	    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
	  }
	  if (typeof prototype.componentWillUpdate === 'function') {
	    foundWillUpdateName = 'componentWillUpdate';
	  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
	    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
	  }
	  if (
	    foundWillMountName !== null ||
	    foundWillReceivePropsName !== null ||
	    foundWillUpdateName !== null
	  ) {
	    var componentName = Component.displayName || Component.name;
	    var newApiName =
	      typeof Component.getDerivedStateFromProps === 'function'
	        ? 'getDerivedStateFromProps()'
	        : 'getSnapshotBeforeUpdate()';

	    throw Error(
	      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
	        componentName +
	        ' uses ' +
	        newApiName +
	        ' but also contains the following legacy lifecycles:' +
	        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
	        (foundWillReceivePropsName !== null
	          ? '\n  ' + foundWillReceivePropsName
	          : '') +
	        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
	        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
	        'https://fb.me/react-async-component-lifecycle-hooks'
	    );
	  }

	  // React <= 16.2 does not support static getDerivedStateFromProps.
	  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
	  // Newer versions of React will ignore these lifecycles if gDSFP exists.
	  if (typeof Component.getDerivedStateFromProps === 'function') {
	    prototype.componentWillMount = componentWillMount;
	    prototype.componentWillReceiveProps = componentWillReceiveProps;
	  }

	  // React <= 16.2 does not support getSnapshotBeforeUpdate.
	  // As a workaround, use cWU to invoke the new lifecycle.
	  // Newer versions of React will ignore that lifecycle if gSBU exists.
	  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
	    if (typeof prototype.componentDidUpdate !== 'function') {
	      throw new Error(
	        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
	      );
	    }

	    prototype.componentWillUpdate = componentWillUpdate;

	    var componentDidUpdate = prototype.componentDidUpdate;

	    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
	      prevProps,
	      prevState,
	      maybeSnapshot
	    ) {
	      // 16.3+ will not execute our will-update method;
	      // It will pass a snapshot value to did-update though.
	      // Older versions will require our polyfilled will-update value.
	      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
	      // Because for <= 15.x versions this might be a "prevContext" object.
	      // We also can't just check "__reactInternalSnapshot",
	      // Because get-snapshot might return a falsy value.
	      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
	      var snapshot = this.__reactInternalSnapshotFlag
	        ? this.__reactInternalSnapshot
	        : maybeSnapshot;

	      componentDidUpdate.call(this, prevProps, prevState, snapshot);
	    };
	  }

	  return Component;
	}

	exports.polyfill = polyfill;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t(__webpack_require__(3)):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.Pager=t(require("react")):e.Pager=t(e.react)}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(e){if(l===setTimeout)return setTimeout(e,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function a(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function o(){y&&d&&(y=!1,d.length?h=d.concat(h):v=-1,h.length&&u())}function u(){if(!y){var e=i(o);y=!0;for(var t=h.length;t;){for(d=h,h=[];++v<t;)d&&d[v].run();v=-1,t=h.length}d=null,y=!1,a(e)}}function s(e,t){this.fun=e,this.array=t}function c(){}var l,f,p=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(e){l=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}}();var d,h=[],y=!1,v=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new s(e,t)),1!==h.length||y||i(u)},s.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=c,p.addListener=c,p.once=c,p.off=c,p.removeListener=c,p.removeAllListeners=c,p.emit=c,p.prependListener=c,p.prependOnceListener=c,p.listeners=function(e){return[]},p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(e,t,n){"use strict";function r(e){return function(){return e}}var i=function(){};i.thatReturns=r,i.thatReturnsFalse=r(!1),i.thatReturnsTrue=r(!0),i.thatReturnsNull=r(null),i.thatReturnsThis=function(){return this},i.thatReturnsArgument=function(e){return e},e.exports=i},function(e,t,n){"use strict";(function(t){function n(e,t,n,i,a,o,u,s){if(r(t),!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,i,a,o,u,s],f=0;c=new Error(t.replace(/%s/g,function(){return l[f++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}}var r=function(e){};"production"!==t.env.NODE_ENV&&(r=function(e){if(void 0===e)throw new Error("invariant requires an error message argument")}),e.exports=n}).call(t,n(0))},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";(function(t){var r=n(1),i=r;"production"!==t.env.NODE_ENV&&function(){var e=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var i=0,a="Warning: "+e.replace(/%s/g,function(){return n[i++]});"undefined"!=typeof console&&console.error(a);try{throw new Error(a)}catch(e){}};i=function(t,n){if(void 0===n)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==n.indexOf("Failed Composite propType: ")&&!t){for(var r=arguments.length,i=Array(r>2?r-2:0),a=2;a<r;a++)i[a-2]=arguments[a];e.apply(void 0,[n].concat(i))}}}(),e.exports=i}).call(t,n(0))},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){for(var n=[],r=e;r<t;r++)n.push(r);return n}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(6),l=r(c),f=n(7),p=r(f),d={first:"First",prev:"«",prevSet:"...",nextSet:"...",next:"»",last:"Last"},h=function(e){function t(e){i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleFirstPage=n.handleFirstPage.bind(n),n.handlePreviousPage=n.handlePreviousPage.bind(n),n.handleNextPage=n.handleNextPage.bind(n),n.handleLastPage=n.handleLastPage.bind(n),n.handleMorePrevPages=n.handleMorePrevPages.bind(n),n.handleMoreNextPages=n.handleMoreNextPages.bind(n),n.handlePageChanged=n.handlePageChanged.bind(n),n}return o(t,e),s(t,[{key:"getTitles",value:function(e){return this.props.titles[e]||d[e]}},{key:"calcBlocks",value:function(){var e=this.props,t=e.total,n=e.visiblePages,r=e.current+1;return{total:Math.ceil(t/n),current:Math.ceil(r/n)-1,size:n}}},{key:"isPrevDisabled",value:function(){return this.props.current<=0}},{key:"isNextDisabled",value:function(){return this.props.current>=this.props.total-1}},{key:"isPrevMoreHidden",value:function(){var e=this.calcBlocks();return 1===e.total||0===e.current}},{key:"isNextMoreHidden",value:function(){var e=this.calcBlocks();return 1===e.total||e.current===e.total-1}},{key:"visibleRange",value:function(){var e=this.calcBlocks(),t=e.current*e.size,n=this.props.total-t;return[t+1,t+(n>e.size?e.size:n)+1]}},{key:"handleFirstPage",value:function(){this.isPrevDisabled()||this.handlePageChanged(0)}},{key:"handlePreviousPage",value:function(){this.isPrevDisabled()||this.handlePageChanged(this.props.current-1)}},{key:"handleNextPage",value:function(){this.isNextDisabled()||this.handlePageChanged(this.props.current+1)}},{key:"handleLastPage",value:function(){this.isNextDisabled()||this.handlePageChanged(this.props.total-1)}},{key:"handleMorePrevPages",value:function(){var e=this.calcBlocks();this.handlePageChanged(e.current*e.size-1)}},{key:"handleMoreNextPages",value:function(){var e=this.calcBlocks();this.handlePageChanged((e.current+1)*e.size)}},{key:"handlePageChanged",value:function(e){var t=this.props.onPageChanged;t&&t(e)}},{key:"renderPages",value:function(e){var t=this;return u(e[0],e[1]).map(function(e,n){var r=e-1,i=t.handlePageChanged.bind(t,r),a=t.props.current===r;return l.default.createElement(y,{key:n,index:n,isActive:a,className:"page-item",onClick:i},e)})}},{key:"render",value:function(){var e=this.getTitles.bind(this),t="pagination";return this.props.className&&(t+=" "+this.props.className),l.default.createElement("nav",null,l.default.createElement("ul",{className:t},l.default.createElement(y,{className:"page-item",key:"btn-first-page",isDisabled:this.isPrevDisabled(),onClick:this.handleFirstPage},e("first")),l.default.createElement(y,{className:"page-item",key:"btn-prev-more",isHidden:this.isPrevMoreHidden(),onClick:this.handleMorePrevPages},e("prevSet")),this.renderPages(this.visibleRange()),l.default.createElement(y,{className:"page-item",key:"btn-next-more",isHidden:this.isNextMoreHidden(),onClick:this.handleMoreNextPages},e("nextSet")),l.default.createElement(y,{className:"page-item",key:"btn-next-page",isDisabled:this.isNextDisabled(),onClick:this.handleNextPage},e("next")),l.default.createElement(y,{className:"page-item",key:"btn-last-page",isDisabled:this.isNextDisabled(),onClick:this.handleLastPage},e("last"))))}}]),t}(l.default.Component);h.propTypes={current:p.default.number.isRequired,total:p.default.number.isRequired,visiblePages:p.default.number.isRequired,titles:p.default.object,onPageChanged:p.default.func},h.defaultProps={titles:d};var y=function(e){if(e.isHidden)return null;var t=e.className?e.className+" ":"",n=t+(e.isActive?" active":"")+(e.isDisabled?" disabled":"");return l.default.createElement("li",{key:e.index,className:n},l.default.createElement("button",{className:"page-link",onClick:e.onClick},e.children))};y.propTypes={isHidden:p.default.bool,isActive:p.default.bool,isDisabled:p.default.bool,className:p.default.string,onClick:p.default.func},t.default=h},function(t,n){t.exports=e},function(e,t,n){(function(t){if("production"!==t.env.NODE_ENV){var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,i=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r};e.exports=n(8)(i,!0)}else e.exports=n(10)()}).call(t,n(0))},function(e,t,n){"use strict";(function(t){var r=n(1),i=n(2),a=n(4),o=n(3),u=n(9);e.exports=function(e,n){function s(e){var t=e&&(E&&e[E]||e[T]);if("function"==typeof t)return t}function c(e,t){return e===t?0!==e||1/e==1/t:e!==e&&t!==t}function l(e){this.message=e,this.stack=""}function f(e){function r(r,c,f,p,d,h,y){if(p=p||O,h=h||f,y!==o)if(n)i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if("production"!==t.env.NODE_ENV&&"undefined"!=typeof console){var v=p+":"+f;!u[v]&&s<3&&(a(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",h,p),u[v]=!0,s++)}return null==c[f]?r?new l(null===c[f]?"The "+d+" `"+h+"` is marked as required in `"+p+"`, but its value is `null`.":"The "+d+" `"+h+"` is marked as required in `"+p+"`, but its value is `undefined`."):null:e(c,f,p,d,h)}if("production"!==t.env.NODE_ENV)var u={},s=0;var c=r.bind(null,!1);return c.isRequired=r.bind(null,!0),c}function p(e){function t(t,n,r,i,a,o){var u=t[n];if(x(u)!==e)return new l("Invalid "+i+" `"+a+"` of type `"+k(u)+"` supplied to `"+r+"`, expected `"+e+"`.");return null}return f(t)}function d(e){function t(t,n,r,i,a){if("function"!=typeof e)return new l("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var u=t[n];if(!Array.isArray(u)){return new l("Invalid "+i+" `"+a+"` of type `"+x(u)+"` supplied to `"+r+"`, expected an array.")}for(var s=0;s<u.length;s++){var c=e(u,s,r,i,a+"["+s+"]",o);if(c instanceof Error)return c}return null}return f(t)}function h(e){function t(t,n,r,i,a){if(!(t[n]instanceof e)){var o=e.name||O;return new l("Invalid "+i+" `"+a+"` of type `"+w(t[n])+"` supplied to `"+r+"`, expected instance of `"+o+"`.")}return null}return f(t)}function y(e){function n(t,n,r,i,a){for(var o=t[n],u=0;u<e.length;u++)if(c(o,e[u]))return null;return new l("Invalid "+i+" `"+a+"` of value `"+o+"` supplied to `"+r+"`, expected one of "+JSON.stringify(e)+".")}return Array.isArray(e)?f(n):("production"!==t.env.NODE_ENV&&a(!1,"Invalid argument supplied to oneOf, expected an instance of array."),r.thatReturnsNull)}function v(e){function t(t,n,r,i,a){if("function"!=typeof e)return new l("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var u=t[n],s=x(u);if("object"!==s)return new l("Invalid "+i+" `"+a+"` of type `"+s+"` supplied to `"+r+"`, expected an object.");for(var c in u)if(u.hasOwnProperty(c)){var f=e(u,c,r,i,a+"."+c,o);if(f instanceof Error)return f}return null}return f(t)}function g(e){function n(t,n,r,i,a){for(var u=0;u<e.length;u++){if(null==(0,e[u])(t,n,r,i,a,o))return null}return new l("Invalid "+i+" `"+a+"` supplied to `"+r+"`.")}if(!Array.isArray(e))return"production"!==t.env.NODE_ENV&&a(!1,"Invalid argument supplied to oneOfType, expected an instance of array."),r.thatReturnsNull;for(var i=0;i<e.length;i++){var u=e[i];if("function"!=typeof u)return a(!1,"Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.",N(u),i),r.thatReturnsNull}return f(n)}function m(e){function t(t,n,r,i,a){var u=t[n],s=x(u);if("object"!==s)return new l("Invalid "+i+" `"+a+"` of type `"+s+"` supplied to `"+r+"`, expected `object`.");for(var c in e){var f=e[c];if(f){var p=f(u,c,r,i,a+"."+c,o);if(p)return p}}return null}return f(t)}function b(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(b);if(null===t||e(t))return!0;var n=s(t);if(!n)return!1;var r,i=n.call(t);if(n!==t.entries){for(;!(r=i.next()).done;)if(!b(r.value))return!1}else for(;!(r=i.next()).done;){var a=r.value;if(a&&!b(a[1]))return!1}return!0;default:return!1}}function P(e,t){return"symbol"===e||("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}function x(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":P(t,e)?"symbol":t}function k(e){if(void 0===e||null===e)return""+e;var t=x(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function N(e){var t=k(e);switch(t){case"array":case"object":return"an "+t;case"boolean":case"date":case"regexp":return"a "+t;default:return t}}function w(e){return e.constructor&&e.constructor.name?e.constructor.name:O}var E="function"==typeof Symbol&&Symbol.iterator,T="@@iterator",O="<<anonymous>>",_={array:p("array"),bool:p("boolean"),func:p("function"),number:p("number"),object:p("object"),string:p("string"),symbol:p("symbol"),any:function(){return f(r.thatReturnsNull)}(),arrayOf:d,element:function(){function t(t,n,r,i,a){var o=t[n];if(!e(o)){return new l("Invalid "+i+" `"+a+"` of type `"+x(o)+"` supplied to `"+r+"`, expected a single ReactElement.")}return null}return f(t)}(),instanceOf:h,node:function(){function e(e,t,n,r,i){return b(e[t])?null:new l("Invalid "+r+" `"+i+"` supplied to `"+n+"`, expected a ReactNode.")}return f(e)}(),objectOf:v,oneOf:y,oneOfType:g,shape:m};return l.prototype=Error.prototype,_.checkPropTypes=u,_.PropTypes=_,_}}).call(t,n(0))},function(e,t,n){"use strict";(function(t){function r(e,n,r,s,c){if("production"!==t.env.NODE_ENV)for(var l in e)if(e.hasOwnProperty(l)){var f;try{i("function"==typeof e[l],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",s||"React class",r,l),f=e[l](n,l,s,r,null,o)}catch(e){f=e}if(a(!f||f instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",s||"React class",r,l,typeof f),f instanceof Error&&!(f.message in u)){u[f.message]=!0;var p=c?c():"";a(!1,"Failed %s type: %s%s",r,f.message,null!=p?p:"")}}}if("production"!==t.env.NODE_ENV)var i=n(2),a=n(4),o=n(3),u={};e.exports=r}).call(t,n(0))},function(e,t,n){"use strict";var r=n(1),i=n(2),a=n(3);e.exports=function(){function e(e,t,n,r,o,u){u!==a&&i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t};return n.checkPropTypes=r,n.PropTypes=n,n}}])});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var hasValue = __webpack_require__(5);

	function FilterAndSort(array, options) {
		array = array || [];
		var filter = options.filter,
		    exactFilters = options.exactFilters,
		    sort = options.sort,
		    sortDir = options.sortDir,
		    stickySorting = options.stickySorting,
		    fields = options.fields;


		var filterableFields = fields.filter(function (field) {
			return field.inputFilterable;
		});

		var records = !hasValue(filter) ? array : array.filter(function (record) {
			// create array of filterable fields, then use Array.some to return the value, instead of having an OR for each one.
			return filterableFields.some(function (field) {
				var recordValue = hasValue(record[field.name]) ? record[field.name].toString() : '';
				return hasValue(recordValue) && recordValue.toLowerCase().indexOf(filter.toLowerCase()) > -1;
			});
		});

		// Check exact filters
		if (exactFilters.length > 0) {
			records = records.filter(function (record) {
				return exactFilters.every(function (exactFilter) {
					if (Array.isArray(record[exactFilter.fieldname])) {
						// The field we're filtering on is an array. See if the array has our filter value in it.
						return hasValue(record[exactFilter.fieldname]) && record[exactFilter.fieldname].indexOf(exactFilter.value) > -1;
					} else {
						// Just compare values
						// I know it's called "ExactFilter", but we're not going to compare case. Lowercase them both.
						var recordValue = hasValue(record[exactFilter.fieldname]) ? record[exactFilter.fieldname].toString().toLowerCase() : '';
						var exactFilterValue = exactFilter.value.toString().toLowerCase();
						return recordValue === exactFilterValue;
					}
				});
			});
		}

		// Sort records if need be
		if (hasValue(sort)) {
			records = records.sort(function (a, b) {

				var recordA = a[sort];
				var recordB = b[sort];

				if (stickySorting) {

					// Special rules for sorting different data types
					// Empty things should always sort last
					if (typeof a[sort] === "string" || typeof b[sort] === "string") {
						// If desc, set it to 0 so it ends up at the end.
						// If asc, set to a bunch of zzzz so it ends up at the end.
						var emptySortCompare = !sortDir ? "0" : "zzzzzzzzzzzz";
						// For strings, set both to lowercase for comparison
						recordA = hasValue(a[sort]) ? a[sort].toLowerCase() : emptySortCompare;
						recordB = hasValue(b[sort]) ? b[sort].toLowerCase() : emptySortCompare;
					} else if (hasValue(a[sort]) && typeof a[sort].getMonth === "function" || hasValue(b[sort]) && typeof b[sort].getMonth === "function") {
						// For dates, we'll need different "emptySortCompare" values
						// If desc, set to some really early date, like 1/1/1000.
						// If asc, set to some really late date, like 1/1/2999.
						var _emptySortCompare = !hasValue(sortDir) ? new Date("1/1/1000") : new Date("1/1/2999");
						recordA = hasValue(a[sort]) ? a[sort] : _emptySortCompare;
						recordB = hasValue(b[sort]) ? b[sort] : _emptySortCompare;
					} else if (typeof a[sort] === "number" || typeof b[sort] === "number") {
						// If desc, set to negative infinity
						// If asc, set to positive infinity
						var _emptySortCompare2 = !sortDir ? -Infinity : Infinity;
						recordA = hasValue(a[sort]) ? a[sort] : _emptySortCompare2;
						recordB = hasValue(b[sort]) ? b[sort] : _emptySortCompare2;
					}
				}

				if (sortDir) {
					// Asc
					if (recordA < recordB) {
						return -1;
					}
					if (recordA > recordB) {
						return 1;
					}
				} else {
					// Desc
					if (recordA > recordB) {
						return -1;
					}
					if (recordA < recordB) {
						return 1;
					}
				}

				return 0;
			});
		}
		return records;
	}

	module.exports = FilterAndSort;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(25);
	var bind = __webpack_require__(26);
	var Axios = __webpack_require__(27);
	var defaults = __webpack_require__(28);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(46);
	axios.CancelToken = __webpack_require__(47);
	axios.isCancel = __webpack_require__(43);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(48);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(26);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(28);
	var utils = __webpack_require__(25);
	var InterceptorManager = __webpack_require__(40);
	var dispatchRequest = __webpack_require__(41);
	var isAbsoluteURL = __webpack_require__(44);
	var combineURLs = __webpack_require__(45);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(25);
	var normalizeHeaderName = __webpack_require__(30);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(31);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(31);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(25);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(25);
	var settle = __webpack_require__(32);
	var buildURL = __webpack_require__(35);
	var parseHeaders = __webpack_require__(36);
	var isURLSameOrigin = __webpack_require__(37);
	var createError = __webpack_require__(33);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(38);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (("production") !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(39);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(33);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(34);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(25);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(25);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(25);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ }),
/* 38 */
/***/ (function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(25);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(25);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(25);
	var transformData = __webpack_require__(42);
	var isCancel = __webpack_require__(43);
	var defaults = __webpack_require__(28);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(25);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(46);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

	"use strict";

	/*
	 * Credit to Dan (http://stackoverflow.com/users/139361)
	 * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport#answer-7557433
	 */

	function isElementInViewport(el) {
		if (el === undefined || el === null) {
			return false;
		}

		//special bonus for those using jQuery
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}

		var rect = el.getBoundingClientRect();

		return rect.top >= 0;
	}

	module.exports = isElementInViewport;

/***/ })
/******/ ])
});
;