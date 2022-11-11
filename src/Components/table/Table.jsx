import { Check } from "@mui/icons-material";
import "./Table.css";

const Table = ({
  data,
  Delete,
  Edit,
  IconButton,
  BorderColorIcon,
  DeleteIcon,
  Cheack,
  AppsSharpIcon,
}) => {
  return (
    <div className="table-main">
      <table className="table">
        <thead>
          <tr>
            <th id="table-th">No</th>
            <th id="table-th">Job Cateogeory</th>
            <th id="table-th">Education</th>
            <th id="table-th">Experiance</th>
            {!IconButton && <th id="table-th">Applied</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((ele, i) => {
            return (
              <>
                <tr>
                  <td id="table-td">{i + 1}</td>
                  <td id="table-td">{ele.jobCateogeory}</td>
                  <td id="table-td">{ele.education}</td>
                  <td id="table-td">{ele.experiance}</td>

                  {IconButton ? (
                    <>
                      <td>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => Delete(ele.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                      <td>
                        <IconButton
                          aria-label="delete"
                          color="success"
                          onClick={() => Edit(ele, ele.id)}
                        >
                          <BorderColorIcon />
                        </IconButton>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <AppsSharpIcon
                          onClick={() => Cheack(ele.studentId, i + 1)}
                        />
                      </td>
                    </>
                  )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
