import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class YearFilter extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    selectedValue: PropTypes.any
  }

  static defaultProps = {
    onChange: () => {}
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const {
      onChange
    } = this.props

    onChange(event.target.value)
  }

  render() {
    return (
      <div>
        Año
        <select onChange={this.onChange}>
          {this.renderYears()}
        </select>
      </div>
    )
  }

  renderYears() {
    const {
      selectedValue
    } = this.props
    const years = []
    const date = new Date()
    for (var i = date.getFullYear()+2; i > 1900; i--) {
      years.push(i)
    }
    return years.map((year) => {
      const selected = year === selectedValue
      return (
        <option key={year} value={year} selected={selected}>{year}</option>
      )
    })
  }
}
