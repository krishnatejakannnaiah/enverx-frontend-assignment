import React from "react";
import { useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NoData from "../NoData";
import EditIcon from "@mui/icons-material/Edit";

const ExpenceListing = ({ handleDelete, handleEdit }) => {
  const expences = useSelector((state) => state.expences);

  return (
    <List>
      {expences?.length > 0 ? (
        expences.map((expense) => (
          <ListItem key={expense.id}>
            <ListItemText
              primary={expense.description}
              secondary={expense.category}
            />
            <ListItemText
              sx={{ marginRight: "50px" }}
              primary={`$ ${expense.amount}`}
              align="right"
            />
            <ListItemSecondaryAction sx={{ marginRight: "30px" }}>
              <IconButton
                edge="start"
                aria-label="edit"
                onClick={() => {
                  handleEdit(expense);
                }}
              >
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(expense.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      ) : (
        <NoData />
      )}
    </List>
  );
};

export default ExpenceListing;
