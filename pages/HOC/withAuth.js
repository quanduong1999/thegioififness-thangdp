import Cookies from "js-cookie";
import { useRouter } from "next/router"

const withAuth = (WrappedComponent) => {
    return (props) => {
        // checks whether we are on client / browser or server
        if (typeof window !== "undefined") {
            const Router = useRouter();
            const token = Cookies.get("token");
            if (!token) {
                Router.replace("/login");
                return null;
            }
            return <WrappedComponent {...props }
            /> 
        } else {
            // if we are on server, return null
            return null;
        }
    }
}

export default withAuth;