
import { createContext, useContext, useRef, type ReactNode } from "react";
import { Toast } from "primereact/toast";

type ToastContextType = {
    showToast: (options: {
        severity: "success" | "info" | "error";
        summary: string;
        detail: string;
        life?: number;
    }) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const toastRef = useRef<Toast>(null);

    const show = (options: {
        severity: "success" | "info" | "error";
        summary: string;
        detail: string;
        life?: number;
    }) => {
        toastRef.current?.show(options);
    };

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <Toast ref={toastRef} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
};