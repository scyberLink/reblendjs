import Reblend from "reblendjs";
import BrowserRouter from "./BrowserRouter";
function MemoryRouter({ children }) {
    return <BrowserRouter memory>{children}</BrowserRouter>;
}
export default MemoryRouter;
