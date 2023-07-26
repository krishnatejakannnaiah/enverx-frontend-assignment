import { put, takeEvery, all } from "redux-saga/effects";
import { actionsConstants } from "../constants/actionsConstants";
import { app } from "../firebase";
function* fetchExpencesSaga() {
  try {
    const snapshot = yield app.firestore().collection("enverX_expences").get();
    const expences = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    yield put({ type: actionsConstants.SET_EXPENCES, payload: expences });
  } catch (error) {
    console.log("Error fetching expences:", error);
  }
}

function* watchFetchExpences() {
  yield takeEvery(actionsConstants.FETCH_EXPENCES, fetchExpencesSaga);
}

export default function* rootSaga() {
  yield all([watchFetchExpences()]);
}
