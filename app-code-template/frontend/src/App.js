import "./App.css";
import React, { useState } from "react";

function App() {
  const [currentInventory, setCurrentInventory] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);

  const addInventory = async () => {
    try {
      const response = await fetch("/api/add");
      const data = await response.json();
      setCurrentInventory(data.count);
      setCurrentAmount(data.amount);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const checkInventory = async () => {
    try {
      const response = await fetch("/api/check");
      const data = await response.json();
      setCurrentInventory(data.count);
      setCurrentAmount(data.amount);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const sellInventory = async () => {
    try {
      const response = await fetch("/api/sell");
      const data = await response.json();
      setCurrentInventory(data.count);
      setCurrentAmount(data.amount);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  return (
    <div className="App">
      <header>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        ></link>
      </header>
      <body>
        <div className="container">
          <div className="row well mb-3">
            <div className="col-md-3 col-sm-3">
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={addInventory}
              >
                Add Inventory
              </button>
            </div>
            <div className="col-md-3 col-sm-3">
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={checkInventory}
              >
                Check Inventory
              </button>
            </div>
            <div className="col-md-3 col-sm-3">
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={sellInventory}
              >
                Sell Items
              </button>
            </div>
          </div>

          <div className="row well mb-3">
            <div className="col-md-6">
              <h5>
                There are {currentInventory} items in Mason's inventory and they
                cost ${currentAmount}.
              </h5>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
