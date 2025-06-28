import TextTransactionRow from "@components/transaction/NewTransactionRow/TextTransactionRow";
import SelectTransactionRow from "@components/transaction/NewTransactionRow/SelectTransactionRow";
import type { FC } from "react";
import DateTransactionRow from "@components/transaction/NewTransactionRow/DateTransactionRow";
import SliderTransactionRow from "@components/transaction/NewTransactionRow/SliderTransactionRow";
import CurrencyTransactionRow from "@components/transaction/NewTransactionRow/CurrencyTransactionRow";

export interface NewTransactionRowProps {
  placeholder: string
  icon: any
}

interface CompoundComponent extends FC<NewTransactionRowProps> {
  Text: typeof TextTransactionRow;
  Select: typeof SelectTransactionRow,
  Date: typeof DateTransactionRow,
  Slider: typeof SliderTransactionRow,
  Currency: typeof CurrencyTransactionRow,
}

const NewTransactionRow = TextTransactionRow as CompoundComponent;
NewTransactionRow.Text = TextTransactionRow;
NewTransactionRow.Currency = CurrencyTransactionRow;
NewTransactionRow.Select = SelectTransactionRow;
NewTransactionRow.Date = DateTransactionRow;
NewTransactionRow.Slider = SliderTransactionRow;

export default NewTransactionRow;