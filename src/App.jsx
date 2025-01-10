import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import { API_URL } from "./utils";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch your data here
    fetchData();
  }, []);

  if (loading) {
    return <div>Fetching data...</div>;
  }

  return (
    <>
      <Table data={data} />
    </>
  );
}

export default App;
