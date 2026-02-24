import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const query = location.state?.query;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h2 className="text-3xl mb-4">
        Результати для: <span className="text-pink-500">{query}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          Тут будуть товари
        </div>
      </div>
    </div>
  );
};

export default Results;