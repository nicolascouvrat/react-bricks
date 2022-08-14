import React from "react";
import Field from "../Field";

export interface TableValueHeader {
  key: string;
  valueType: string;
}

export interface TableRowProps {
  index: number;
  editable: boolean;
  onEdit: (v: string) => void;
  data: object;
  header: Array<TableValueHeader>;
}

export interface TableRowState {
  data: object;
}

class TableRow extends React.Component<TableRowProps, TableRowState> {
  constructor(props: TableRowProps) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  render() {
    const { index, header, editable } = this.props;
    const { data } = this.state;
    const dataCells = header.map((vh: TableValueHeader) => {
      const value = data[vh.key];
      const valueType = vh.valueType;
      return (
        <td>
          <Field value={value} valueType={valueType} editable={editable} />
        </td>
      );
    });

    return <tr key={index}>{dataCells}</tr>;
  }
}

export default TableRow;
