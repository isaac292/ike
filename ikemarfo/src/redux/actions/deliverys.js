import axios from "axios";
import { server } from "../../server";

// get all deliverys --- admin
export const getAllDeliverys = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllDeliverysRequest",
    });

    const { data } = await axios.get(`${server}/rider/admin-all-deliverys`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllDeliverysSuccess",
      payload: data.deliverys,
    });
  } catch (error) {
    dispatch({
      type: "getAllDeliveryFailed",
    //   payload: error.response.data.message,
    });
  }
};
