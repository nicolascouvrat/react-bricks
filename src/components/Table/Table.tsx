import React from "react";
import TableRow from "components/Table/TableRow";
import "./Table.scss";

export interface TableProps {
  data: Array<object>;
  header: Array<ColumnProps>;
}

export interface ColumnProps {
  key: string;
  valueType: string;
  name: string;
}

class Table extends React.Component<TableProps> {
  constructor(props: TableProps) {
    super(props);
  }

  render() {
    const { data } = this.props;
    console.log(data);
    const rows = data.map((o: object, i: number) => {
      console.log(o);
      return (
        <TableRow
          index={i}
          editable={true}
          data={o}
          header={[
            { key: "deviceId", valueType: "text" },
            { key: "optionCode", valueType: "text" },
          ]}
        />
      );
    });
    return (
      <table className="table table-bordered">
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default Table;
