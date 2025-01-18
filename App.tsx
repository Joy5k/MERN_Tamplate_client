
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <div className="">
    
      <ProtectedRoute>
    <MainLayout></MainLayout>
  
    </ProtectedRoute>
     
    </div>
  );
}

export default App;
