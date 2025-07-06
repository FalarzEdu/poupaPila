import TextTransactionRow from "@components/inputs/TextTransactionRow";
import SelectInput from "@components/inputs/SelectInput";
import type { FC } from "react";
import DateInput from "@components/inputs/DateInput";
import ToggleSliderInput from "@components/inputs/ToggleSliderInput";
import CurrencyInput from "@components/inputs/CurrencyInput";
import ColourInput from "@components/inputs/ColourInput";

export interface NewTransactionRowProps {
  placeholder: string
  icon: any
}

interface CompoundComponent extends FC<NewTransactionRowProps> {
  Text: typeof TextTransactionRow;
  Select: typeof SelectInput,
  Date: typeof DateInput,
  Slider: typeof ToggleSliderInput,
  Currency: typeof CurrencyInput,
  Colour: typeof ColourInput,
}

const CustomInput = TextTransactionRow as CompoundComponent;
CustomInput.Text = TextTransactionRow;
CustomInput.Currency = CurrencyInput;
CustomInput.Select = SelectInput;
CustomInput.Date = DateInput;
CustomInput.Slider = ToggleSliderInput;
CustomInput.Colour = ColourInput;

export default CustomInput;