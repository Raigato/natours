import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe("pk_test_BffBAlozAfz3eBkViSORIUfv");

export const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert("error", err);
  }
};
