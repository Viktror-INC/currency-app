import { MutableRefObject, RefObject } from "react";
import { TDataCurrancy } from "../../../@types/dataCurrancy";

export type TgetCurrencyInput = {
  currency: TDataCurrancy;
  inputType: string;
  inputValue: string;
  inputCallback: (value: string, type: string, name?: string) => void;
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
  currancyName: string;
  setCurrencyName: React.Dispatch<React.SetStateAction<string>>;
  opositeCurrancyName: string;
  refElem?: RefObject<HTMLDivElement> | MutableRefObject<undefined>;
};
