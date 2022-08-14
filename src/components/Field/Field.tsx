import React, { SyntheticEvent } from "react";
import "./Field.scss";

export interface FieldProps<T, R> {
  value: any;
  valueType: FieldType<T, R>;
  editable: boolean;
  onEdit: (v: R) => void;
}

export interface FieldState<T> {
  value: T;
  isBeingEdited: boolean;
}

export interface FieldType<T, R> {
  htmlInputType: string;
  inputFormat: (raw: any) => T;
  htmlInputValueFormat: (formatted: T) => string;
  displayFormat: (formatted: T) => string;
  outputFormat: (formatted: T) => R;
}

/**
 * Expects an ISO UTC date as input, and will display the date in local time. It will return an ISO
 * UTC date as output.
 */
export const ISODateFieldType: FieldType<Date, string> = {
  htmlInputType: "date",
  inputFormat: (raw: string) => new Date(raw),
  htmlInputValueFormat: (date: Date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0],
  displayFormat: (date: Date) => date.toLocaleString("fr-FR"),
  outputFormat: (date: Date) => date.toISOString(),
};

export const TextFieldType: FieldType<string, string> = {
  htmlInputType: "text",
  inputFormat: (raw: any) => String(raw),
  htmlInputValueFormat: (s: string) => s,
  outputFormat: (s: string) => s,
  displayFormat: (s: string) => s,
};

export class Field<T, R> extends React.Component<
  FieldProps<T, R>,
  FieldState<T>
> {
  constructor(props: FieldProps<T, R>) {
    super(props);
    this.state = {
      value: this.props.valueType.inputFormat(this.props.value),
      isBeingEdited: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick(event: React.MouseEvent<HTMLElement>) {
    if (event.detail === 2) {
      this.setState({ isBeingEdited: true });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: this.props.valueType.inputFormat(event.target.value),
    });
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      this.stopEdit(event.target.value);
    }
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    this.stopEdit(event.target.value);
  }

  stopEdit(finalValue: string) {
    const outputFormat = this.props.valueType.outputFormat;
    const inputFormat = this.props.valueType.inputFormat;
    this.setState({ isBeingEdited: false });
    this.props.onEdit(outputFormat(inputFormat(finalValue)));
  }

  render() {
    const { editable, valueType } = this.props;
    const { value, isBeingEdited } = this.state;
    const displayFormat = valueType.displayFormat;
    console.log(value);
    if (!editable) {
      return <div>{displayFormat(value)}</div>;
    }

    if (!isBeingEdited) {
      return <div onClick={this.handleClick}>{displayFormat(value)}</div>;
    }

    const inputType = valueType.htmlInputType;
    const valueFormat = valueType.htmlInputValueFormat;
    return (
      <input
        autoFocus
        className="border-0"
        type={inputType}
        value={valueFormat(value)}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
      />
    );
  }
}
