'use strict';

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _LineGraph = require('./LineGraph');

var _LineGraph2 = _interopRequireDefault(_LineGraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LineGraphContainer = function (_Component) {
  (0, _inherits3.default)(LineGraphContainer, _Component);

  function LineGraphContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LineGraphContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LineGraphContainer.__proto__ || (0, _getPrototypeOf2.default)(LineGraphContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      data: _this.createData(12).sort(function (a, b) {
        return a[a.length - 1] - b[b.length - 1];
      })
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LineGraphContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var i = 0;
      setInterval(function () {
        _this2.updateData(i);
        i++;
      }, 5000);
    }
  }, {
    key: 'createData',
    value: function createData(num) {
      var data = [];
      for (var i = 0; i < num; i++) {
        var tempArr = [];
        var d = new Date();
        var randomNum = Math.floor(Math.random() * 1000 + 1);
        var randomNumTwo = Math.floor(Math.random() * 1000 + 1);
        var randomNumThree = Math.floor(Math.random() * 1000 + 1);
        d = d.getTime() - i * 3000;
        tempArr.push(randomNum, randomNumTwo, randomNumThree, d);
        data.push(tempArr);
      }

      return data;
    }
  }, {
    key: 'updateData',
    value: function updateData(i) {
      var randomNumber = Math.floor(Math.random() * 20) + 10;
      var data = this.createData(12).sort(function (a, b) {
        return a[a.length - 1] - b[b.length - 1];
      });

      this.setState({
        data: data,
        xAxisLabel: '' + i,
        yAxisLabel: '' + i
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = {
        margin: {
          top: 30,
          right: 20,
          bottom: 75,
          left: 65
        },
        height: 300,
        width: 800,
        labelOffsetY: 55,
        labelOffsetX: 65,
        axisOffset: 16,
        timeFormat: '%I:%M:%S',
        yAxisLabel: this.state.yAxisLabel,
        xAxisLabel: this.state.xAxisLabel,
        data: this.state.data,
        onHover: (0, _react3.action)('Hover'),
        id: this.props.id,
        containerId: this.props.containerId,
        drawLine: this.props.drawLine
      };

      return _react2.default.createElement(_LineGraph2.default, props);
    }
  }]);
  return LineGraphContainer;
}(_react.Component);

(0, _react3.storiesOf)('LineGraph', module).addWithInfo('Updating', '\n      Line Graph.\n    ', function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(LineGraphContainer, {
      onHover: (0, _react3.action)('Hover'),
      onMouseOut: (0, _react3.action)('Mouseout')
    }),
    _react2.default.createElement(LineGraphContainer, {
      id: 'two',
      containerId: 'test-two',
      onHover: (0, _react3.action)('Hover'),
      onMouseOut: (0, _react3.action)('Mouseout')
    })
  );
}).addWithInfo('Updating without drawing line', '\n      Line Graph without draw line animation.\n    ', function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(LineGraphContainer, {
      onHover: (0, _react3.action)('Hover'),
      onMouseOut: (0, _react3.action)('Mouseout'),
      drawLine: false
    }),
    _react2.default.createElement(LineGraphContainer, {
      id: 'two',
      containerId: 'test-two',
      onHover: (0, _react3.action)('Hover'),
      onMouseOut: (0, _react3.action)('Mouseout'),
      drawLine: false
    })
  );
}).addWithInfo('Static', ' Static Example. ', function () {
  return _react2.default.createElement(_LineGraph2.default, {
    data: [[48.633333333333, 1507563000000], [12, 1507563900000], [53.733333333333, 1507564800000]],
    onHover: (0, _react3.action)('Hover'),
    onMouseOut: (0, _react3.action)('Mouseout')
  });
}).addWithInfo('Empty', ' Empty Example. ', function () {
  return _react2.default.createElement(_LineGraph2.default, { onHover: (0, _react3.action)('Hover'), onMouseOut: (0, _react3.action)('Mouseout') });
});