import React, { Component } from "react";
class Counter extends Component {
  // state = {
  //   count: this.props.counter.value
  // };
  // constructor() {
  //   super();
  //   this.handleIncrement = this.handleIncrement.bind(this);
  // }

  render() {
    return (
      <div>
        <span className={this.generateBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.onIncrement(this.props.counter)}
        >
          Increment
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
      </div>
    );
  }

  formatCount() {
    const count = this.props.counter.value;
    return count === 0 ? "zero" : count;
  }
  generateBadgeClasses() {
    const count = this.props.counter.value;
    let classes = "badge m-2 badge-";
    return (classes += count === 0 ? "warning" : "primary");
  }
}

export default Counter;
