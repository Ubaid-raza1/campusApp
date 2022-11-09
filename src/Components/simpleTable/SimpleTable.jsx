import React from "react";

const SimpleTable = ({apply}) => {
    
  return (
    <div className="table-main">
      <table className="table">
        <thead>
          <tr>
            <th id="table-th">No</th>
            <th id="table-th">Job Cateogeory</th>
            <th id="table-th">Education</th>
            <th id="table-th">Experiance</th>
            <th id="table-th">Apply</th>
          </tr>
        </thead>
        <tbody>
          {apply?.map((ele, i) => {
            return (
              <>
                <tr>
                  <td id="table-td">{i + 1}</td>
                  <td id="table-td">{ele.jobCateogeory}</td>
                  <td id="table-td">{ele.education}</td>
                  <td id="table-td">{ele.experiance}</td>
                  <td id="table-td">Applied</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
