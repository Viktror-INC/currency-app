import "./App.scss";
import CurrencyBlock from "./components/CurrencyBlock/CurrencyBlock";
import Header from "./components/Header/Header";

const mainCurrency = [{ name: "UAH" }, { name: "USD" }, { name: "EUR" }];

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <main className="mainContent">
          <div className="leftBlock">
            <span className="leftBlockTitle">
              Find the <span className="blueText">best way</span> to exchange
              <span className="violetText"> your currency</span>
            </span>
          </div>
          <div className="rightBlock">
            <h2>Choose your currency</h2>
            <div className="currencyChooseWrap">
              <CurrencyBlock currency={mainCurrency} title={"First currency"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
