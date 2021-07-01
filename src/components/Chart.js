import { Component } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export default class ChartComponent extends Component {
  state = {
    stockPrices: [],
    startDate: "",
    endDate: "",
  };

  componentDidMount = () => {
    axios
      .get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => {
        console.log(response);

        let prices = response.data.bpi;

        //Try to understand why Pedro has used it during the exemplo and here in the exercise, it hurts the performance.
        // for (let key in prices) {
        //   prices[key] = prices[key]["4.close"];
        // }
        this.setState({ stockPrices: { ...prices } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidUpdate = () => {
    const chart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: Object.keys(this.state.stockPrices),
        datasets: [
          {
            label: "Stock Value",
            backgroundColor: "rgb(235, 99, 132, 0.3)",
            borderColor: "rgb(255, 99, 132)",
            data: Object.values(this.state.stockPrices),
            fill: true,
          },
        ],
      },
    });
  };
  //      handleChange (event)=> {
  //    this.setState({[event.target.date]: event.target.value})
  //      }

  render() {
    return (
      <div>
        <div className="mb-5">
          <h1>Filters</h1>
          <div className="d-flex">
            <p>From:</p>
            <input
              type="date"
              name={this.name}
              value={this.value}
              onChange={this.startDate}
            />
            <p>To:</p>
            <input
              type="date"
              name={this.name}
              value={this.value}
              onChange={this.endDate}
            />
          </div>
        </div>
        {/* <div>
            <h2> Currency:</h2>
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                  <button className="dropdown-item" type="button">
                    USD
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    EUR
                  </button>
                </li>
              </ul>
            </div>
          </div> */}

        {/* <div d-flex>
          <h1>Values</h1>
          <p>Max: {}</p>
          <p>Min: {}</p>
        </div> */}
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}
