import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login/login";
import ProductList from "./views/Dashboard/ProductList";
import MainLayout from "./views/Loader/mainLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
