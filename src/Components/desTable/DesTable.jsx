import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DesTable = ({ user }) => {
  const data = user.map((item, index) => {
    return { ...item, id: index + 1 };
  });
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 460 },
  ];

  return (
    <>
      <div style={{ height: 215, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={2}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};

export default DesTable;
