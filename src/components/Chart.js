import { Component } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export default class ChartComponent extends Component {
  state = {
    stockPrices: [],
  };

  componentDidMount = () => {
    axios
      .get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => {
        console.log(response);

        const prices = response.data[`Time Series (Daily)`];

        for (let key in prices) {
          prices[key] = prices[key]["4.close"];
        }
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
            label: "Stock Value - last 30 days",
            backgroundColor: "rgb(235, 99, 132, 0.3)",
            borderColor: "rgb(255, 99, 132)",
            data: Object.values(this.state.stockPrices),
            fill: true,
          },
        ],
      },
    });
  };

  render() {
    return (
      <div>
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}
