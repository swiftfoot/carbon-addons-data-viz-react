'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  data: _propTypes2.default.array,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  id: _propTypes2.default.string,
  containerId: _propTypes2.default.string,
  margin: _propTypes2.default.object,
  labelOffsetX: _propTypes2.default.number,
  labelOffsetY: _propTypes2.default.number,
  axisOffset: _propTypes2.default.number,
  timeFormat: _propTypes2.default.string,
  xAxisLabel: _propTypes2.default.string,
  yAxisLabel: _propTypes2.default.string,
  onHover: _propTypes2.default.func,
  onMouseOut: _propTypes2.default.func,
  emptyText: _propTypes2.default.string,
  isUTC: _propTypes2.default.bool,
  color: _propTypes2.default.array,
  drawLine: _propTypes2.default.bool
};

var defaultProps = {
  data: [[12, 1507563900000]],
  height: 300,
  width: 800,
  id: 'container',
  containerId: 'graph-container',
  margin: {
    top: 30,
    right: 20,
    bottom: 70,
    left: 65
  },
  labelOffsetX: 65,
  labelOffsetY: 55,
  axisOffset: 16,
  timeFormat: '%I:%M:%S',
  xAxisLabel: 'X Axis',
  yAxisLabel: 'Y Axis',
  onHover: function onHover() {},
  onMouseOut: function onMouseOut() {},
  emptyText: 'There is currently no data available for the parameters selected. Please try a different combination.',
  isUTC: false,
  color: ['#00a68f', '#3b1a40', '#473793', '#3c6df0', '#56D2BB'],
  drawLine: true
};

var LineGraph = function (_Component) {
  (0, _inherits3.default)(LineGraph, _Component);

  function LineGraph() {
    (0, _classCallCheck3.default)(this, LineGraph);
    return (0, _possibleConstructorReturn3.default)(this, (LineGraph.__proto__ || (0, _getPrototypeOf2.default)(LineGraph)).apply(this, arguments));
  }

  (0, _createClass3.default)(LineGraph, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          width = _props.width,
          height = _props.height,
          margin = _props.margin,
          id = _props.id,
          containerId = _props.containerId,
          emptyText = _props.emptyText;


      if (data.length > 0) {
        this.totalLines = data[0].length - 1;
      }

      this.emptyContainer = d3.select('#' + containerId + ' .bx--line-graph-empty-text').text(emptyText).style('position', 'absolute').style('top', '50%').style('left', '50%').style('text-align', 'center').style('transform', 'translate(-50%, -50%)');

      this.svg = d3.select('#' + containerId + ' svg').attr('class', 'bx--graph').attr('width', width).attr('height', height).append('g').attr('class', 'bx--group-container').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      this.width = width - (margin.left + margin.right);
      this.height = height - (margin.top + margin.bottom);

      this.initialRender();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (this.x) {
        this.x.domain(d3.extent(nextProps.data, function (d) {
          return d[d.length - 1];
        }));
        this.y.domain([0, d3.max(nextProps.data, function (d) {
          return d3.max(d.slice(0, d.length - 1));
        })]);

        this.updateEmptyState(nextProps.data);
        this.updateData(nextProps);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.data !== nextProps.data;
    }
  }, {
    key: 'updateEmptyState',
    value: function updateEmptyState(data) {
      var emptyText = this.props.emptyText;


      if (data.length < 2) {
        this.svg.style('opacity', '.3');
        this.emptyContainer.style('display', 'inline-block');
      } else {
        this.svg.style('opacity', '1');
        this.emptyContainer.style('display', 'none');
      }
    }
  }, {
    key: 'updateData',
    value: function updateData(nextProps) {
      var data = nextProps.data,
          axisOffset = nextProps.axisOffset,
          xAxisLabel = nextProps.xAxisLabel,
          yAxisLabel = nextProps.yAxisLabel;


      for (var i = 0; i < this.totalLines; i++) {
        this.svg.selectAll('g[data-line="' + i + '"]').remove();
      }

      if (data.length > 0) {
        this.totalLines = data[0].length - 1;
      }

      this.svg.select('.bx--axis--y').transition().call(this.yAxis).selectAll('text').attr('x', -axisOffset);

      this.svg.select('.bx--axis--y .bx--graph-label').text(yAxisLabel);

      this.svg.select('.bx--axis--x').transition().call(this.xAxis).selectAll('.bx--axis--x .tick text').attr('y', axisOffset).style('text-anchor', 'end').attr('transform', 'rotate(-65)');

      this.svg.select('.bx--axis--x .bx--graph-label').text(xAxisLabel);

      this.updateStyles();
    }
  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      this.svg.selectAll('.bx--axis--y path').style('display', 'none');
      this.svg.selectAll('.bx--axis path').attr('stroke', '#5A6872');
      this.svg.selectAll('.tick line').attr('stroke', '#5A6872');
      this.svg.selectAll('.tick text').attr('fill', '#5A6872');
    }
  }, {
    key: 'initialRender',
    value: function initialRender() {
      var _this2 = this;

      var _props2 = this.props,
          data = _props2.data,
          timeFormat = _props2.timeFormat,
          xScale = _props2.xScale,
          isUTC = _props2.isUTC;


      this.updateEmptyState(data);

      if (isUTC) {
        this.x = d3.scaleUtc().range([0, this.width]).domain(d3.extent(data, function (d) {
          return d[d.length - 1];
        }));
      } else {
        this.x = d3.scaleTime().range([0, this.width]).domain(d3.extent(data, function (d) {
          return d[d.length - 1];
        }));
      }

      this.y = d3.scaleLinear().range([this.height, 0]).domain([0, d3.max(data, function (d) {
        return d3.max(d.slice(0, d.length - 1));
      })]);

      this.line = d3.line().x(function (d) {
        return _this2.x(d[d.length - 1]);
      }).y(function (d) {
        return _this2.y(d[_this2.count]);
      }).defined(function (d) {
        return !isNaN(d[_this2.count]);
      });

      this.xAxis = d3.axisBottom().scale(this.x).tickSize(0).tickFormat(d3.timeFormat(timeFormat));

      this.yAxis = d3.axisLeft().ticks(4).tickSize(-this.width).scale(this.y.nice());

      this.renderAxes();
      this.renderLabels();
      this.renderOverlay();

      if (this.x) {
        this.renderLine();
      }
    }
  }, {
    key: 'renderAxes',
    value: function renderAxes() {
      var _props3 = this.props,
          data = _props3.data,
          axisOffset = _props3.axisOffset,
          timeFormat = _props3.timeFormat;


      this.svg.append('g').attr('class', 'bx--axis bx--axis--y').attr('stroke-dasharray', '4').call(this.yAxis).selectAll('text').attr('x', -axisOffset);

      this.svg.append('g').attr('class', 'bx--axis bx--axis--x').attr('transform', 'translate(0, ' + this.height + ')').call(this.xAxis).selectAll('text').attr('y', axisOffset).style('text-anchor', 'end').attr('transform', 'rotate(-65)');

      this.updateStyles();
    }
  }, {
    key: 'renderLabels',
    value: function renderLabels() {
      var _props4 = this.props,
          labelOffsetY = _props4.labelOffsetY,
          labelOffsetX = _props4.labelOffsetX,
          xAxisLabel = _props4.xAxisLabel,
          yAxisLabel = _props4.yAxisLabel;


      var yLabel = this.svg.select('.bx--axis--y').append('text').text('' + yAxisLabel).attr('class', 'bx--graph-label').attr('transform', 'translate(' + -labelOffsetY + ', ' + this.height / 2 + ') rotate(-90)');

      var xLabel = this.svg.select('.bx--axis--x').append('text').text('' + xAxisLabel).attr('class', 'bx--graph-label').attr('transform', 'translate(' + this.width / 2 + ', ' + labelOffsetX + ')');

      this.svg.selectAll('.bx--graph-label').attr('font-size', '10').attr('font-weight', '700').attr('fill', '#5A6872').attr('text-anchor', 'middle');
    }
  }, {
    key: 'renderLine',
    value: function renderLine() {
      var _props5 = this.props,
          data = _props5.data,
          drawLine = _props5.drawLine;

      var color = d3.scaleOrdinal(this.props.color);

      this.count = 0;
      if (data.length > 0) {
        for (var i = 0; i < data[0].length - 1; i++) {
          var path = this.svg.append('g').attr('data-line', i).datum(data).append('path').attr('class', 'bx--line').attr('stroke', color(i)).attr('stroke-width', 2).attr('fill', 'none').attr('pointer-events', 'none').attr('d', this.line);

          var totalLength = path.node().getTotalLength();

          if (drawLine) {
            path.attr('stroke-dasharray', 0 + ' ' + totalLength).transition().ease(d3.easeSin).duration(1000).attr('stroke-dasharray', totalLength + ' ' + 0);
          } else {
            path.attr('stroke-dasharray', 0 + ' ' + totalLength).attr('stroke-dasharray', totalLength + ' ' + 0);
          }

          this.count++;
        }
      }
    }
  }, {
    key: 'renderOverlay',
    value: function renderOverlay() {
      var _this3 = this;

      var data = this.props.data;


      var overlay = this.svg.append('rect').attr('width', this.width).attr('height', this.height).attr('class', 'overlay').style('fill', 'none').style('pointer-events', 'all').on('mousemove', function () {
        _this3.onMouseMove();
      }).on('mouseout', function () {
        _this3.onMouseOut();
      });
    }
  }, {
    key: 'onMouseOut',
    value: function onMouseOut() {
      if (this.props.data.length > 2) {
        this.props.onMouseOut();
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove() {
      var _props6 = this.props,
          margin = _props6.margin,
          id = _props6.id,
          data = _props6.data;

      var bisectDate = d3.bisector(function (d) {
        return d[d.length - 1];
      }).right;

      if (data.length > 2) {
        var mouse = d3.mouse(this.id)[0] - margin.left;
        var timestamp = this.x.invert(mouse);
        var index = bisectDate(data, timestamp);
        var d0 = data[index - 1];
        var d1 = data[index];

        var d = void 0,
            mouseData = void 0;
        if (d0 && d1) {
          d = timestamp - d0[d0.length - 1] > d1[d1.length - 1] - timestamp ? d1 : d0;

          mouseData = {
            data: d,
            pageX: d3.event.pageX,
            pageY: d3.event.pageY,
            graphX: this.x(d[d.length - 1]),
            graphY: this.y(d[0])
          };
        }

        this.props.onHover(mouseData);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props7 = this.props,
          id = _props7.id,
          containerId = _props7.containerId;

      if (this.x) {
        this.renderLine();
      }

      return _react2.default.createElement(
        'div',
        {
          className: 'bx--graph-container',
          id: containerId,
          style: { position: 'relative' }
        },
        _react2.default.createElement('p', { className: 'bx--line-graph-empty-text' }),
        _react2.default.createElement('svg', { id: id, ref: function ref(id) {
            return _this4.id = id;
          } })
      );
    }
  }]);
  return LineGraph;
}(_react.Component);

LineGraph.propTypes = propTypes;
LineGraph.defaultProps = defaultProps;

exports.default = LineGraph;