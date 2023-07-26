import React, { useState, useEffect } from "react";
import { addExpence, editExpense, setExpences } from "../../actions";
import { useDispatch } from "react-redux";
import ExpenceInput from "./ExpenceInput";
import ExpenceListing from "./ExpenceListing";
import { v4 as uuid } from "uuid";
import { firestore } from "../../firebase";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { Container, Typography, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { removeExpence } from "../../actions";
import { doc, deleteDoc, updateDoc } from "@firebase/firestore";
import Loader from "../Loader";
import { getTotalAmount } from "../../reducers";
import { connect } from "react-redux";

function Expences({ totalAmount }) {
  const ScreenWidth = window.screen.width;
  const ref = collection(firestore, "enverX_expences"); // Firebase creates this automatically
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [expenceDescription, setExpenceDescription] = useState("");
  const [expenceAmount, setExpenceAmount] = useState("");
  const [expenceCategory, setExpenceCategory] = useState("");
  const [isAddExpenceModal, setIsAddExpenceModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isEditMode, setIsEditMode] = useState("");
  useEffect(() => {
    fethExpenceCollection();
  }, []);

  const fethExpenceCollection = async () => {
    await getDocs(collection(firestore, "enverX_expences")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const action = setExpences(newData);
        dispatch(action);
        // console.log("expences", newData);
      }
    );
  };

  const handleAddExpence = (e) => {
    setLoader(true);
    e.preventDefault();

    // Basic form validation
    if (!expenceDescription.trim()) {
      setErrors({ expenceDescription: "Description is required" });
      return;
    }

    if (!expenceCategory.trim()) {
      setErrors({ expenceCategory: "Category is required" });
      return;
    }

    if (!expenceAmount.trim() || isNaN(expenceAmount)) {
      setErrors({ expenceAmount: "Valid amount is required" });
      return;
    }
    const expenceData = {
      description: expenceDescription,
      category: expenceCategory,
      amount: expenceAmount,
      id: uuid(),
    };
    if (isEditMode === "") {
      const action = addExpence(expenceData);
      addDoc(ref, expenceData)
        .then(() => {
          dispatch(action);
          setExpenceDescription("");
          setExpenceAmount(0);
          setExpenceCategory("");
          setErrors({});
          setIsAddExpenceModal(false);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    } else {
      const ref = doc(firestore, "enverX_expences", isEditMode);
      updateDoc(ref, {
        description: expenceDescription,
        category: expenceCategory,
        amount: expenceAmount,
        id: isEditMode,
      })
        .then(() => {
          fethExpenceCollection();
          setIsEditMode("");
          setIsAddExpenceModal(false);
          setExpenceDescription("");
          setExpenceAmount(0);
          setExpenceCategory("");
          setErrors({});
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  };

  const handleDelete = async (id) => {
    setLoader(true);
    await deleteDoc(doc(firestore, "enverX_expences", id))
      .then(() => {
        const action = removeExpence(id);
        dispatch(action);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const handleEdit = async (expense) => {
    setIsEditMode(expense?.id);
    setIsAddExpenceModal(true);
    setExpenceDescription(expense.description);
    setExpenceAmount(expense.amount);
    setExpenceCategory(expense.category);
  };

  const closeModal = () => {
    setIsAddExpenceModal(false);
    setExpenceDescription("");
    setExpenceAmount("");
    setExpenceCategory("");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={2}>
        <Typography variant="h4" align="center" gutterBottom>
          EnverX Expense Tracker
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box />
        {`You have spent ${totalAmount}$ so far`}
      </Box>
      <ExpenceInput
        {...{
          handleAddExpence,
          errors,
          setExpenceDescription,
          expenceDescription,
          setExpenceAmount,
          expenceAmount,
          setExpenceCategory,
          expenceCategory,
          setErrors,
          setIsAddExpenceModal,
          isAddExpenceModal,
          loader,
          totalAmount,
          isEditMode,
          closeModal,
        }}
      />
      {loader ? (
        <Loader />
      ) : (
        <ExpenceListing
          handleDelete={handleDelete}
          setIsEditMode={setIsEditMode}
          handleEdit={handleEdit}
        />
      )}

      <div
        style={{
          position: ScreenWidth > 720 && "fixed",
          width: ScreenWidth < 720 && "100%",
          bottom: ScreenWidth > 720 ? 26 : 10,
          right: ScreenWidth > 720 && 56,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth={ScreenWidth < 720}
          onClick={() => setIsAddExpenceModal(true)}
        >
          Add Expense
        </Button>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  totalAmount: getTotalAmount(state),
});

export default connect(mapStateToProps, {})(Expences);
