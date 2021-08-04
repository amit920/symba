import React, { Component } from "react";
import { renderTextField, renderSelectField } from "../util/form-fields";

export default class ComboField extends Component {
  constructor(props) {
    super(props);

    this.state = { textInput: false };
  }

  componentWillMount() {
    const selected = this.props.options.find((opt) => {
      return opt.value == this.props.input.value;
    });

    if (!selected && this.props.value) {
      this.setState({ textInput: true });
    }
  }

  componentWillReceiveProps(props) {
    if (props.value == "Other") {
      this.setState({ textInput: true });
      this.props.clearValue();
    }
  }

  renderField = () => {
    if (this.state.textInput) {
      const textProps = { ...this.props };
      if (this.props.className && this.props.className.includes("combo-sm")) {
        textProps.className += " text-sm";
      }
      textProps.placeholder = "*Other";
      return renderTextField(textProps, this.resetToSelect);
    } else {
      if (this.props.className && this.props.className.includes("combo-sm")) {
        textProps.className += " select-sm";
      }
      return renderSelectField(this.props);
    }
  };

  resetToSelect = () => {
    this.props.clearValue();
    this.setState({ textInput: false });
  };

  render() {
    return this.renderField();
  }
}
