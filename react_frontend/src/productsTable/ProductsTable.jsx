import { Container, Box } from "@mui/material";
import { useState, useEffect, forwardRef } from "react";
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
    width: 200,
    label: "Product Number",
    dataKey: "productId"
  },
  {
    width: 120,
    label: "Product Name",
    dataKey: "productName"
  },
  {
    width: 120,
    label: "Owner",
    dataKey: "productOwnerName"
  },
  {
    width: 120,
    label: "Scrum Master",
    dataKey: "scrumMasterName"
  },
  {
    width: 120,
    label: "Developers",
    dataKey: "developers"
  },
  {
    width: 120,
    label: "Start Date",
    dataKey: "startDate"
  },
  {
    width: 120,
    label: "Methodology",
    dataKey: "methodology"
  },
  {
    width: 120,
    label: "Location",
    dataKey: "location"
  }
];

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
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: forwardRef((props, ref) => (
    <TableBody
      {...props}
      ref={ref}
    />
  ))
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper"
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <>
      {columns.map((column) => (
        <TableCell key={column.dataKey}>{row[column.dataKey]}</TableCell>
      ))}
    </>
  );
}

export default function ProductsTable({ products }) {
  return (
    <TableVirtuoso
      data={products}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={rowContent}
    />
  );
}
