"use client";
import "react-phone-number-input/style.css";
import { Select, SelectItem, SelectProps } from "@heroui/react";
import { ChangeEvent } from "react";
import { getCountries } from "react-phone-number-input/input";
import fr from "react-phone-number-input/locale/fr.json";
import flags from "react-phone-number-input/flags";

interface SelectCountryProps
  extends Omit<SelectProps, "onChange" | "children"> {
  value: string;
  setValue: (value: string) => void;
  labels?: { [key: string]: string };
}

export const FlagWrapper: React.FC<{ countryCode: keyof typeof flags }> = ({
  countryCode,
}) => {
  const FlagComponent = flags[countryCode];

  return FlagComponent ? (
    <div style={{ width: "20px", height: "20px" }}>
      <FlagComponent title={countryCode} />
    </div>
  ) : null;
};

export const fetchCountries = ({
  labels,
}: {
  labels: { [key: string]: string };
}) => {
  return getCountries().map((countryCode) => {
    const code = countryCode as keyof typeof flags;

    return {
      value: countryCode,
      label: labels[countryCode],
      flag: <FlagWrapper countryCode={code} />,
    };
  });
};

export const SelectCountry = ({
  value,
  setValue,
  labels = fr,
  ...rest
}: SelectCountryProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };
  const countries = fetchCountries({ labels: labels });

  return (
    <Select
      className="max-w-xs"
      {...rest}
      aria-label="Contry Select"
      selectedKeys={[value]}
      onChange={handleChange}
    >
      {countries.map((country) => (
        <SelectItem
          key={country.value}
          color="primary"
          startContent={country.flag}
          textValue={country.label}
        >
          {country.label}
        </SelectItem>
      ))}
    </Select>
  );
};
