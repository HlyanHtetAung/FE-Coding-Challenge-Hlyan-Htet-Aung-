import "./App.css";
import SwapForm from "./components/forms/SwapForm/SwapForm";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <div className="min-h-screen w-full flex items-center justify-center">
        <SwapForm />
      </div>
    </>
  );
}

export default App;
