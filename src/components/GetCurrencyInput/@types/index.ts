import { MutableRefObject, RefObject } from "react";
import { TDataCurrency } from "../../../@types/dataCurrency";

export type TgetCurrencyInput = {
  currency: TDataCurrency;
  inputType: string;
  inputValue: string;
  inputCallback: (value: string, type: string, name?: string) => void;
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
  currencyName: string;
  setCurrencyName: React.Dispatch<React.SetStateAction<string>>;
  opositeCurrencyName: string;
  refElem?: RefObject<HTMLDivElement> | MutableRefObject<undefined>;
};
