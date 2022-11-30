import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./desTable.css";

const DesTable = ({ user }) => {
  const data = user?.map((item, index) => {
    return { ...item, id: index + 1 };
  });
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
  ];
  return (
    <div style={{ height: 250 }}>
      <DataGrid
        rows={data ? data : []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default DesTable;
