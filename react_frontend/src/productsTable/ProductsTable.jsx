import { forwardRef } from "react";

// MUI (UI components)
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

const columns = [
  {
    width: 30,
    label: "Product Number",
    dataKey: "productId",
    fontSize: 11
  },
  {
    width: 25,
    label: "Product Name",
    dataKey: "productName",
    fontSize: 14
  },
  {
    width: 25,
    label: "Owner",
    dataKey: "productOwnerName",
    fontSize: 14
  },
  {
    width: 25,
    label: "Scrum Master",
    dataKey: "scrumMasterName",
    fontSize: 14
  },
  {
    width: 55,
    label: "Developers",
    dataKey: "developers",
    fontSize: 12
  },
  {
    width: 15,
    label: "Start Date",
    dataKey: "startDate",
    fontSize: 14
  },
  {
    width: 15,
    label: "Methodology",
    dataKey: "methodology",
    fontSize: 14
  },
  {
    width: 30,
    label: "Location",
    dataKey: "location",
    fontSize: 12
  },
  {
    width: 5,
    label: "Edit",
    dataKey: "edit",
    fontSize: 12
  }
];

// Determines which table components to use from Virtuoso table library
const VirtuosoTableComponents = {
  Scroller: forwardRef((props, ref) => (
    <TableContainer
      component={Paper}
      {...props}
      ref={ref}
    />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: (props) => (
    <TableHead
      {...props}
      sx={{ boxShadow: "0px 1px 3px 0px #989898", WebkitBoxShadow: "0px 1px 3px 0px #989898" }}
    />
  ),
  TableRow,
  TableBody: forwardRef((props, ref) => (
    <TableBody
      {...props}
      ref={ref}
    />
  ))
};

// Generates table headers
function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          style={{ width: column.width }}
          sx={{
            backgroundColor: "grey.300",
            fontSize: "htmlFontSize",
            fontWeight: "fontWeightMedium",
            padding: "14px 4px 10px 16px",
            lineHeight: "1"
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

// Generates content of each cell by mapping columns against rows of data
function itemContent(_index, row) {
  return (
    <>
      {columns.map((column) => {
        if (column.dataKey === "developers") {
          // Separates developer names with bullet and stops line break occuring inside a name
          return (
            <TableCell
              key={column.dataKey}
              sx={{ fontSize: column.fontSize }}
            >
              {row[column.dataKey].map((developerName) => {
                developerName = developerName.replace(/ /g, "\u00A0");
                return <span>{`\u2022${developerName} `}</span>;
              })}
            </TableCell>
          );
        }
        // Other columns
        return (
          <TableCell
            key={column.dataKey}
            sx={{ fontSize: column.fontSize }}
          >
            {row[column.dataKey]}
          </TableCell>
        );
      })}
    </>
  );
}

// React component that renders the table
export default function ProductsTable({ products }) {
  return (
    <TableVirtuoso
      data={products}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={itemContent}
    />
  );
}
