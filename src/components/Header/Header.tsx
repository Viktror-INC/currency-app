import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Header.scss";

export default function Header() {
  const [headerCurrency, setHeaderCurrency] =
    useState<Array<{ name: [x: string]; price: string }>>();

  const getCurrency = async (base: string, amount: string, symbols: string) => {
    const { data } = await axios.get(
      `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}&amount=${amount}`
    );
    return Object.values(data.rates);
  };

  useEffect(() => {
    let fullDataCurrency: { name: [x: string]; price: string }[] = [];
    const getFullData = async () => {
      const getCurrencyData = async (name: string) => {
        fullDataCurrency = [
          ...fullDataCurrency,
          {
            name: [name],
            price: (await getCurrency(name, "1", "UAH")).join(),
          },
        ];
      };

      await getCurrencyData("USD");
      await getCurrencyData("EUR");
      setHeaderCurrency(fullDataCurrency);
    };

    getFullData();
  }, []);

  return (
    <header className="header">
      <span className="logo">Currency Exchange App</span>
      <ul className="currencyBlockHeader">
        {headerCurrency &&
          headerCurrency.map((item, index) => {
            return (
              <li className="currencyItem" key={index}>
                <span className="nameCurrency">{item.name}</span>
                <span className="priceCurrency">
                  {item.price.slice(0, 5)} UAH
                </span>
              </li>
            );
          })}
      </ul>
    </header>
  );
}
