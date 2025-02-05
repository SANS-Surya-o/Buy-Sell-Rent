import axios from "axios";
import { LOGOUT_URL } from "../constants";
import { toast } from "react-toastify";

const Logout = async () => {
    try {
        await axios.post(LOGOUT_URL, {}, {
            withCredentials: true,
        });
        window.location.href = "/";
    } catch (error) {
        toast("An error occurred. Please try again later.");
        return 1;
    }
}

export default Logout;