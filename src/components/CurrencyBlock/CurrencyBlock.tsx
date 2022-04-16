import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import GetCurrencyInput from "../GetCurrencyInput/GetCurrencyInput";

import { TCurrencyBlock } from "./@types";
import "./CurrencyBlock.scss";

export default function CurrencyBlock(props: TCurrencyBlock) {
  const { currency } = props;

  //First input params
  const [firstValue, setFirstValue] = useState("0");
  const [showfirstList, setShowFirstList] = useState(false);
  const [firstCurrencyName, setFirstCurrencyName] = useState("UAH");
  const firstInputRef = useRef<any>(null);

  //Second input params
  const [secondtValue, setSecondValue] = useState("0");
  const [showSecondList, setShowSecondList] = useState(false);
  const [secondCurrencyName, setSecondCurrencyName] = useState("USD");
  const secondInputRef = useRef<any>(null);

  const onlyNumberAndDot = /^$|^[0-9]+\.?[0-9]*$/;

  const getCurrency = async (base: string, amount: string, symbols: string) => {
    const { data } = await axios.get(
      `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}&amount=${amount}`
    );
    return Object.values(data.rates);
  };

  const validateValue = (value: string) => {
    const doubleValue = /^0[0-9]/;
    value = value.replace(doubleValue, value.split("").join("."));
    return value;
  };

  //Set value by input name
  const setValue = async (value: string, type: string, name?: string) => {
    if (onlyNumberAndDot.test(value)) {
      value = validateValue(value);
      let currency;
      switch (type) {
        case "firstInput":
          setFirstValue(value);

          if (typeof value !== "undefined" && value && Number(value) > 0) {
            currency = await getCurrency(
              name ? name : firstCurrencyName,
              value,
              secondCurrencyName
            ).then((value) => value.join());

            return setSecondValue(currency);
          }
          setSecondValue("0");
          break;

        case "secondInput":
          setSecondValue(value);

          if (typeof value !== "undefined" && value && Number(value) > 0) {
            currency = await getCurrency(
              name ? name : secondCurrencyName,
              value,
              firstCurrencyName
            ).then((value) => value.join());
            return setFirstValue(currency);
          }
          setFirstValue("0");
          break;
      }
    }
  };

  const handleClickOutside = (event: Event) => {
    if (firstInputRef && firstInputRef.current) {
      if (!firstInputRef.current.contains(event.target)) {
        setShowFirstList(false);
      }
    }

    if (!secondInputRef.current.contains(event.target)) {
      setShowSecondList(false);
    }
  };

  /**Check if ckick on non focus element */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <GetCurrencyInput
        currency={currency}
        inputType={"firstInput"}
        inputValue={firstValue}
        inputCallback={setValue}
        showList={showfirstList}
        setShowList={setShowFirstList}
        currancyName={firstCurrencyName}
        setCurrencyName={setFirstCurrencyName}
        opositeCurrancyName={secondCurrencyName}
        refElem={firstInputRef}
      />

      <GetCurrencyInput
        currency={currency}
        inputType={"secondInput"}
        inputValue={secondtValue}
        inputCallback={setValue}
        showList={showSecondList}
        setShowList={setShowSecondList}
        currancyName={secondCurrencyName}
        setCurrencyName={setSecondCurrencyName}
        opositeCurrancyName={firstCurrencyName}
        refElem={secondInputRef}
      />
    </>
  );
}
