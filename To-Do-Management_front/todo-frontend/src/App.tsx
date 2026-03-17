import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AppRoutes } from "./routes/AppRoutes";
import {ToastProvider} from "./context/ToastContext.tsx";

function App() {
    return (
        <ToastProvider>
            <AppRoutes />
        </ToastProvider>
    )
}

export default App;
