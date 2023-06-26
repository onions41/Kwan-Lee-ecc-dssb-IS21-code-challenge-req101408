import { forwardRef, useState } from "react";

// MUI (UI components)
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

// Internal imports
import EditProductModal from "./editProductModal/EditProductModal";

const columns = [
  {
    width: 5,
    label: "Row #",
    dataKey: "row#",
    fontSize: 14
  },
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
  TableHead: forwardRef((props, ref) => (
    <TableHead
      {...props}
      ref={ref}
      sx={{ boxShadow: "0px 1px 3px 0px #989898", WebkitBoxShadow: "0px 1px 3px 0px #989898" }}
    />
  )),
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
            textAlign: column.dataKey === "row#" ? "center" : "left",
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
function itemContent(setEditProdModalState, index, row) {
  return (
    <>
      {columns.map((column) => {
        // Row # column
        if (column.dataKey === "row#") {
          // Developers column
          // Separates developer names with bullet and stops line break occuring inside a name
          return (
            <TableCell
              key={column.dataKey}
              sx={{ fontSize: column.fontSize, textAlign: "center" }}
            >
              {index + 1}
            </TableCell>
          );
        }
        if (column.dataKey === "developers") {
          // Developers column
          // Separates developer names with bullet and stops line break occuring inside a name
          return (
            <TableCell
              key={column.dataKey}
              sx={{ fontSize: column.fontSize }}
            >
              {row[column.dataKey].map((developerName, i) => {
                developerName = developerName.replace(/ /g, "\u00A0");
                return <span key={`${column.dataKey}-${i}`}>{`\u2022${developerName} `}</span>;
              })}
            </TableCell>
          );
        }
        // Location column. Cells are links
        if (column.dataKey === "location") {
          return (
            <TableCell
              key={column.dataKey}
              sx={{ fontSize: column.fontSize }}
            >
              <Link
                href={row[column.dataKey]}
                target="_blank"
                rel="noopener"
                underline="hover"
              >
                {row[column.dataKey]}
              </Link>
            </TableCell>
          );
        }
        // Edit column (contains button to edit each row)
        if (column.dataKey === "edit") {
          // Shape the product object to be flat
          const { developers, ...rest } = row;
          const product = {
            ...rest,
            developer1Name: developers[0] ? developers[0] : "",
            developer2Name: developers[1] ? developers[1] : "",
            developer3Name: developers[2] ? developers[2] : "",
            developer4Name: developers[3] ? developers[3] : "",
            developer5Name: developers[4] ? developers[4] : ""
          };
          return (
            <TableCell
              key={column.dataKey}
              sx={{ fontSize: column.fontSize }}
            >
              <Button
                color="warning"
                size="small"
                onClick={() => setEditProdModalState({ isOpen: true, product })}
              >
                Edit
              </Button>
            </TableCell>
          );
        }
        // All other columns
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
export default function ProductsTable({ products, dispatch }) {
  const [editProdModalState, setEditProdModalState] = useState({ isOpen: false, product: {} });

  return (
    <>
      <TableVirtuoso
        data={products}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={itemContent.bind({}, setEditProdModalState)}
      />
      <EditProductModal
        isOpen={editProdModalState.isOpen}
        product={editProdModalState.product}
        setModalState={setEditProdModalState}
        dispatch={dispatch}
      />
    </>
  );
}
