import React, { SyntheticEvent } from "react";
import "./Field.scss";

export interface FieldProps {
  value: string;
  valueType: string;
  editable: boolean;
  onEdit: (v: string) => void;
}

export interface FieldState {
  value: string;
  isBeingEdited: boolean;
}

class Field extends React.Component<FieldProps, FieldState> {
  constructor(props: FieldProps) {
    super(props);
    this.state = {
      value: this.props.value,
      isBeingEdited: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick(event: React.MouseEvent<HTMLElement>) {
    if (event.detail === 2) {
      this.setState({ isBeingEdited: true });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      this.setState({ isBeingEdited: false });
      this.props.onEdit(event.target.value);
    }
  }

  render() {
    const { editable, valueType } = this.props;
    const { value, isBeingEdited } = this.state;
    if (!editable) {
      return <div>{value}</div>;
    }

    if (!isBeingEdited) {
      return <div onClick={this.handleClick}>{value}</div>;
    }

    return (
      <input
        type={valueType}
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default Field;
