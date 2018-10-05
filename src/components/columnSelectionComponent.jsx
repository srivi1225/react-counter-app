import React, { Component } from "react";
import PropTypes from "prop-types";
import { ColumnSelectorPanelComponent } from "ui/userViews/components/columnSelection";
import { sortByString } from "utils/collections";
import { getInvalidColumns } from "stores/reducers/utils";
import { TooltipButton } from "ui/common/components";

const selectedKey = "selected";
class ColumnSelectionComponent extends Component {
  static PropTypes = {
    updateSelection: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    selectedColumns: PropTypes.array.isRequired,
    additionalLegFields: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.selectedColumnsClicked = this.selectedColumnsClicked.bind(this);
    this.availableColumnsClicked = this.availableColumnsClicked.bind(this);
    this.addToSelectedColumns = this.addToSelectedColumns.bind(this);
    this.removeFromSelectedColumns = this.removeFromSelectedColumns.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.removeFromSelectedColumns = this.removeFromSelectedColumns.bind(this);
    this.getSelectedItemList = this.getSelectedItemList.bind(this);
    this.selectAllClicked = this.selectAllClicked.bind(this);
    this.clearClicked = this.clearClicked.bind(this);
    this.state = {
      availableColumnsQueue: [],
      selectedColumnsQueue: [],
      availableColumns: [],
      selectedColumns: [],
      columnSelectionChanged: false
    };
  }

  getSelectedItemList = arry => {
    const queue = [];
    for (let index = arry.length - 1; index >= 0; index -= 1) {
      const item = arry[index];
      if (item[selectedKey] === true) {
        delete item[selectedKey];
        arry.splice(index, 1);
        queue.push(item);
      }
    }
    queue.reverse();
    return queue;
  };

  addToSelectedColumns = () => {
    const selectedColumns = this.state.selectedColumns;
    const availableColumns = this.state.availableColumns;

    const addQueue = this.getSelectedItemList(availableColumns);
    const updatedColumns = selectedColumns.concat(addQueue);
    this.setState({
      selectedColumns: updatedColumns,
      availableColumns: availableColumns
    });
    const { updateSelection } = this.props;
    updateSelection(updatedColumns);
  };

  removeFromSelectedColumns = () => {
    const selectedColumns = this.state.selectedColumns;
    const availableColumns = this.state.availableColumns;

    const removeQueue = this.getSelectedItemList(selectedColumns);
    const updatedColumns = availableColumns.concat(
      this.removeInvalidFields(removeQueue)
    );
    this.setState({
      selectedColumns: selectedColumns,
      availableColumns: updatedColumns
    });
    const { updateSelection } = this.props;
    updateSelection(selectedColumns);
  };

  removeInvalidFields = removeQueue => {
    const invalidColumns = getInvalidColumns(
      this.props.selectedColumns,
      this.props.additionalLegFields
    ).map(item => {
      const splitItem = item.split(":");
      return splitItem[1];
    });
    const newQueue = [];
    removeQueue.forEach(item => {
      if (!invalidColumns.includes(item.label)) {
        newQueue.push(item);
      }
    });
    return newQueue;
  };

  selectAllClicked = columns => {
    const addQueue = [];
    columns.forEach(item => {
      item[selectedKey] = true;
      addQueue.push(item);
    });
    this.setState({
      columnSelectionChanged: true
    });
  };

  clearClicked = columns => {
    columns.forEach(item => {
      item[selectedKey] = false;
    });
    this.setState({
      columnSelectionChanged: true
    });
  };

  availableColumnsClicked = item => {
    item[selectedKey] = this.toggleSelection(item[selectedKey]);
    this.setState({
      availableColumns: this.state.availableColumns
    });
  };

  selectedColumnsClicked = item => {
    item[selectedKey] = this.toggleSelection(item[selectedKey]);
    this.setState({
      selectedColumns: this.state.selectedColumns
    });
  };

  toggleSelection = selected => {
    if (selected === true) {
      return false;
    } else {
      return true;
    }
  };

  componentWillMount() {
    const { columns, selectedColumns } = this.props;
    this.setState({
      availableColumns: columns,
      selectedColumns: [...selectedColumns]
    });
  }

  render() {
    const { updateSelection, additionalLegFields } = this.props;
    const availableColumns = this.state.availableColumns.sort((a, b) => {
      return sortByString(a.label, b.label);
    });
    const selectedColumns = this.state.selectedColumns;

    const invalidColumns = getInvalidColumns(
      selectedColumns,
      additionalLegFields
    ).map(item => {
      const splitItem = item.split(":");
      return splitItem[1];
    });
    return (
      <div>
        <div className="row">
          <h2>Column Selection</h2>
        </div>
        <div className="row">
          <div className="col-lg-5 field-selection-panel--left">
            <ColumnSelectorPanelComponent
              selectionChanged={this.availableColumnsClicked}
              selectAllAction={this.selectAllClicked}
              clearAllAction={this.clearClicked}
              header="Available Columns"
              columns={availableColumns}
              isFilterable={true}
              movablePosition={false}
            />
          </div>
          <div className="col-lg-1">
            <div className="center-button-group">
              <TooltipButton
                className="spark-btn spark-btn--xs spark-btn--secondary spark-pad-.5 add-selected-columns-button"
                aria-label="ADD SELECTED COLUMNS"
                tooltip="ADD SELECTED COLUMNS"
                onClick={() => {
                  this.addToSelectedColumns();
                }}
              >
                <i className="spark-icon spark-icon-arrow-basic-right spark-icon--lg" />
              </TooltipButton>
              <TooltipButton
                className="spark-btn spark-btn--xs spark-btn--secondary spark-pad-.5 spark-mar-t-1 remove-selected-columns-button"
                aria-label="REMOVE SELECTED COLUMNS"
                tooltip="REMOVE SELECTED COLUMNS"
                onClick={() => {
                  this.removeFromSelectedColumns();
                }}
              >
                <i className="spark-icon spark-icon-arrow-basic-left spark-icon--lg" />
              </TooltipButton>
            </div>
          </div>
          <div className="col-lg-6 field-selection-panel--right">
            <ColumnSelectorPanelComponent
              movablePosition={true}
              selectionChanged={this.selectedColumnsClicked}
              selectAllAction={this.selectAllClicked}
              clearAllAction={this.clearClicked}
              header="Selected Columns"
              columns={selectedColumns}
              updateSelection={updateSelection}
              invalidColumns={invalidColumns}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ColumnSelectionComponent;
