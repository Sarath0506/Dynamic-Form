import React from "react";
import DynamicForm from "./components/DynamicForm";
import TableGrid from "./components/TableGrid";

const App = () => {
  return (
    
    <div className="flex flex-col min-h-screen">

      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-center text-2xl font-bold">Dynamic Form Application</h1>
      </header>

      <main className="flex-grow pb-6 bg-gray-50">
        <DynamicForm />
        <TableGrid />
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>Dynamic Form App &copy; 2024</p>
      </footer>
      
    </div>
   
  );
};

export default App;
