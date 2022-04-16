import classNames from "classnames";
import React, { RefObject } from "react";
import { TgetCurrencyInput } from "./@types";

import "./GetCurrencyInput.scss";

export default function GetCurrencyInput(props: TgetCurrencyInput) {
  const {
    currency,
    inputType,
    inputValue,
    inputCallback,
    showList,
    setShowList,
    currencyName,
    setCurrencyName,
    opositeCurrencyName,
    refElem,
  } = props;

  return (
    <div className="currencyBlock" ref={refElem as RefObject<HTMLDivElement>}>
      <div className="chooseCurrencyWrap">
        <span
          onClick={() => {
            setShowList(!showList);
          }}
          className="chooseCurrency"
        >
          {currencyName}
          <img
            className={classNames("arrowMenu", { arrowMenuActive: showList })}
            src="/images/arrow.png"
            alt="arrow"
            width={15}
            height={15}
          />
        </span>
        <ul
          className={classNames("currencyListWrap", {
            currencyListWrapActive: showList,
          })}
        >
          {currency
            .filter((item) => item.name !== opositeCurrencyName)
            .map((item, index) => {
              return (
                <li key={index}>
                  <span
                    onClick={() => {
                      setCurrencyName(item.name);
                      setShowList(!showList);
                      inputCallback(inputValue, inputType, item.name);
                    }}
                  >
                    {item.name}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
      <input
        placeholder="Write your value"
        value={inputValue}
        onChange={(event) => inputCallback(event.target.value, inputType)}
      />
    </div>
  );
}
