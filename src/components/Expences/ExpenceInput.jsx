import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import AddExpenceModal from "../AddExpenceModal";

function ExpenceInput({
  handleAddExpence,
  setErrors,
  errors,
  setExpenceDescription,
  expenceDescription,
  setExpenceAmount,
  expenceAmount,
  setExpenceCategory,
  expenceCategory,
  setIsAddExpenceModal,
  isAddExpenceModal,
  totalAmount,
  isEditMode,
  closeModal,
}) {
  return (
    <AddExpenceModal
      open={isAddExpenceModal}
      onClose={() => closeModal(false)}
      title={"Add Expenses"}
    >
      <Typography
        sx={{ color: "darkgray" }}
        variant="p"
      >{`Beware of your expenses, you have reached on total of $ ${totalAmount}`}</Typography>
      <form
        onSubmit={(e) => {
          handleAddExpence(e);
        }}
      >
        <Box mt={2}>
          <TextField
            label="Write your expense description"
            variant="outlined"
            fullWidth
            value={expenceDescription}
            onChange={(e) => setExpenceDescription(e.target.value)}
            error={!!errors.expenceDescription}
            helperText={errors.expenceDescription}
          />
        </Box>

        <Box mt={2}>
          <TextField
            label="Category of your expense"
            variant="outlined"
            fullWidth
            value={expenceCategory}
            onChange={(e) => setExpenceCategory(e.target.value)}
            error={!!errors.expenceCategory}
            helperText={errors.expenceCategory}
          />
        </Box>

        <Box mt={2}>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            value={expenceAmount}
            onChange={(e) => setExpenceAmount(e.target.value)}
            error={!!errors.expenceAmount}
            helperText={errors.expenceAmount}
          />
        </Box>

        <Box mt={3}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            {isEditMode ? "Edit Expense" : "Add Expense"}
          </Button>
        </Box>
      </form>
    </AddExpenceModal>
  );
}

export default ExpenceInput;
