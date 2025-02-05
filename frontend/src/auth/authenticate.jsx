import { toast } from "react-toastify";


const Authenticate = () => {
    const cookies = document.cookie;
    console.log(cookies);
    if (cookies.includes('jwt')) {
        return true;
    } else {
        setTimeout(() => {
            toast.error("You are not authenticated. Please login to continue");
        }, 0);
        return false;
    }

}

export default Authenticate;
    

