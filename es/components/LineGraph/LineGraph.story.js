import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import { storiesOf, action } from '@storybook/react';
import LineGraph from './LineGraph';

var LineGraphContainer = function (_Component) {
  _inherits(LineGraphContainer, _Component);

  function LineGraphContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LineGraphContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LineGraphContainer.__proto__ || _Object$getPrototypeOf(LineGraphContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      data: _this.createData(12).sort(function (a, b) {
        return a[a.length - 1] - b[b.length - 1];
      })
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LineGraphContainer, [{
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
        onHover: action('Hover'),
        id: this.props.id,
        containerId: this.props.containerId,
        drawLine: this.props.drawLine
      };

      return React.createElement(LineGraph, props);
    }
  }]);

  return LineGraphContainer;
}(Component);

storiesOf('LineGraph', module).addWithInfo('Updating', '\n      Line Graph.\n    ', function () {
  return React.createElement(
    'div',
    null,
    React.createElement(LineGraphContainer, {
      onHover: action('Hover'),
      onMouseOut: action('Mouseout')
    }),
    React.createElement(LineGraphContainer, {
      id: 'two',
      containerId: 'test-two',
      onHover: action('Hover'),
      onMouseOut: action('Mouseout')
    })
  );
}).addWithInfo('Updating without drawing line', '\n      Line Graph without draw line animation.\n    ', function () {
  return React.createElement(
    'div',
    null,
    React.createElement(LineGraphContainer, {
      onHover: action('Hover'),
      onMouseOut: action('Mouseout'),
      drawLine: false
    }),
    React.createElement(LineGraphContainer, {
      id: 'two',
      containerId: 'test-two',
      onHover: action('Hover'),
      onMouseOut: action('Mouseout'),
      drawLine: false
    })
  );
}).addWithInfo('Static', ' Static Example. ', function () {
  return React.createElement(LineGraph, {
    data: [[48.633333333333, 1507563000000], [12, 1507563900000], [53.733333333333, 1507564800000]],
    onHover: action('Hover'),
    onMouseOut: action('Mouseout')
  });
}).addWithInfo('Empty', ' Empty Example. ', function () {
  return React.createElement(LineGraph, { onHover: action('Hover'), onMouseOut: action('Mouseout') });
});