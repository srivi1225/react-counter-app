import React, { Component } from "react";
class MultiSelect extends Component {
  state = {
    original: [
      { name: "item1", value: 1 },
      { name: "item2", value: 2 },
      { name: "item3", value: 3 },
      { name: "item4", value: 4 },
      { name: "item5", value: 5 }
    ],
    left: [],
    right: []
  };
  handleSelectToRight = () => {
    console.log("move to right");
    console.log(this.refs);
    let select = this.refs.selectRef;
    let values = [].filter
      .call(select.options, o => o.selected)
      .map(o => o.value);

    console.log(values);
  };
  componentWillMount = () => {
    console.log("mounted");
    const left = this.state.original;
    this.setState({ left });
  };
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-xs-5 m-3">
            <select
              name="from[]"
              id="multiselect"
              class="form-control"
              size="8"
              multiple="multiple"
            >
              {this.state.left.map(item => (
                <option value={item.value}>{item.name}</option>
              ))}
            </select>
          </div>

          <div class="col-xs-2 m-3">
            <button
              type="button"
              id="multiselect_rightAll"
              class="btn btn-block"
              onClick={() => this.handleSelectToRight()}
            >
              &gt;
            </button>
            <button
              type="button"
              id="multiselect_rightSelected"
              class="btn btn-block"
            >
              &gt;&gt;
            </button>
            <button
              type="button"
              id="multiselect_leftSelected"
              class="btn btn-block"
            >
              &lt;&lt;
            </button>
            <button
              type="button"
              id="multiselect_leftAll"
              class="btn btn-block"
            >
              &lt;
            </button>
          </div>

          <div class="col-xs-5 m-3">
            <select
              name="to[]"
              id="multiselect_to"
              class="form-control"
              size="8"
              multiple="multiple"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MultiSelect;
