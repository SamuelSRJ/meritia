import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ScrollToTop } from "./components/scrollToTop/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Results from "./pages/results/Results";
import Upload from "./pages/upload/Upload";

function App() {
  return (
    <>
      <div className="">
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-[80vh]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                {/* <Route path='/login' element={<Login />} /> */}
                <Route
                  path="/upload"
                  element={
                    // <PrivateRoute>
                    <Upload />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path="/results"
                  element={
                    // <PrivateRoute>
                    <Results />
                    // </PrivateRoute>
                  }
                />

                {/* <Route path='/login' element={<Login />} /> */}
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
