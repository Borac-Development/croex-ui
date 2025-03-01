"use client";

import Image from "next/image";
import { Euro } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

type Currency = {
  code: string;
  name: string;
  flag?: string;
  icon?: React.ReactNode;
};

type ExchangeRates = {
  [key: string]: {
    [key: string]: number;
  };
};

export default function Home() {
  const currencies: Currency[] = [
    {
      code: "USD",
      name: "US Dollar",
      flag: "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png",
    },
    { code: "EUR", name: "Euro", icon: <Euro color="blue" /> },
    {
      code: "JPY",
      name: "Japanese Yen",
      flag: "https://cdn.countryflags.com/thumbs/japan/flag-square-250.png",
    },
    {
      code: "GBP",
      name: "British Pound",
      flag: "https://cdn.countryflags.com/thumbs/united-kingdom/flag-square-250.png",
    },
    {
      code: "CHF",
      name: "Swiss Franc",
      flag: "https://cdn.countryflags.com/thumbs/switzerland/flag-square-250.png",
    },
  ];

  const ratesData: ExchangeRates = useMemo(
    () => ({
      USD: {
        USD: 1,
        EUR: 0.9616,
        JPY: 150.6,
        GBP: 0.7926,
        CHF: 0.8996,
      },
      EUR: {
        USD: 1 / 0.9616,
        EUR: 1,
        JPY: 150.6 / 0.9616,
        GBP: 0.7926 / 0.9616,
        CHF: 0.8996 / 0.9616,
      },
      JPY: {
        USD: 1 / 150.6,
        EUR: 0.9616 / 150.6,
        JPY: 1,
        GBP: 0.7926 / 150.6,
        CHF: 0.8996 / 150.6,
      },
      GBP: {
        USD: 1 / 0.7926,
        EUR: 0.9616 / 0.7926,
        JPY: 150.6 / 0.7926,
        GBP: 1,
        CHF: 0.8996 / 0.7926,
      },
      CHF: {
        USD: 1 / 0.8996,
        EUR: 0.9616 / 0.8996,
        JPY: 150.6 / 0.8996,
        GBP: 0.7926 / 0.8996,
        CHF: 1,
      },
    }),
    []
  );

  const [fromCurrency, setFromCurrency] = useState<Currency>(currencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(currencies[1]);
  const [amount, setAmount] = useState<string>("1000.00");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(ratesData.USD.EUR);

  const formatAmount = (value: string): string => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Split by decimal point
    const parts = numericValue.split(".");

    // Format the integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Join with decimal part if it exists
    return parts.length > 1 ? `${parts[0]}.${parts[1].slice(0, 2)}` : parts[0];
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    setAmount(formatAmount(value));
  };

  useEffect(() => {
    const numericAmount = parseFloat(amount.replace(/,/g, "")) || 0;
    setConvertedAmount(numericAmount * exchangeRate);
  }, [amount, exchangeRate]);

  // Update exchange rate when currencies change
  useEffect(() => {
    const rate = ratesData[fromCurrency.code][toCurrency.code];
    setExchangeRate(rate);
  }, [fromCurrency, toCurrency, ratesData]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleFromCurrencyChange = (value: string) => {
    const selected = currencies.find((currency) => currency.code === value);
    if (selected) setFromCurrency(selected);
  };

  const handleToCurrencyChange = (value: string) => {
    const selected = currencies.find((currency) => currency.code === value);
    if (selected) setToCurrency(selected);
  };

  // Format the converted amount
  const formattedConvertedAmount = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);

  const fee = convertedAmount * 0.005;
  const formattedFee = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(fee);

  return (
    <div className="w-full h-dvh p-4 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl overflow-hidden">
      <div className="max-w-[1920px] mx-auto p-6 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">
          Exchange rates
        </h1>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">From Currency</label>
            <span className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-300">
              Popular currencies
            </span>
          </div>

          <Select
            value={fromCurrency.code}
            onValueChange={handleFromCurrencyChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                <div className="flex items-center gap-3">
                  {fromCurrency.flag ? (
                    <Image
                      src={fromCurrency.flag}
                      alt={`${fromCurrency.code} Flag`}
                      width={24}
                      height={24}
                      className="rounded-full object-cover shadow-sm"
                    />
                  ) : (
                    fromCurrency.icon
                  )}
                  <div>
                    <span className="font-bold">{fromCurrency.code}</span>
                    <span className="ml-2 text-gray-600">
                      {fromCurrency.name}
                    </span>
                  </div>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-3">
                    {currency.flag ? (
                      <Image
                        src={currency.flag}
                        alt={`${currency.code} Flag`}
                        width={24}
                        height={24}
                        className="rounded-full object-cover shadow-sm"
                      />
                    ) : (
                      currency.icon
                    )}
                    <div>
                      <span className="font-bold">{currency.code}</span>
                      <span className="ml-2 text-gray-600">
                        {currency.name}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Amount</label>
            <span className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-300">
              Use all balance
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="font-medium text-gray-500">
                {fromCurrency.code}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center my-4">
          <button
            className="bg-white p-2 rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-110"
            onClick={handleSwapCurrencies}
          >
            <ArrowUpDown color="blue" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">To Currency</label>
            <span className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-300">
              Compare rates
            </span>
          </div>

          <Select
            value={toCurrency.code}
            onValueChange={handleToCurrencyChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                <div className="flex items-center gap-3">
                  {toCurrency.flag ? (
                    <Image
                      src={toCurrency.flag}
                      alt={`${toCurrency.code} Flag`}
                      width={24}
                      height={24}
                      className="rounded-full object-cover shadow-sm"
                    />
                  ) : (
                    toCurrency.icon
                  )}
                  <div>
                    <span className="font-bold">{toCurrency.code}</span>
                    <span className="ml-2 text-gray-600">
                      {toCurrency.name}
                    </span>
                  </div>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-3">
                    {currency.flag ? (
                      <Image
                        src={currency.flag}
                        alt={`${currency.code} Flag`}
                        width={24}
                        height={24}
                        className="rounded-full object-cover shadow-sm"
                      />
                    ) : (
                      currency.icon
                    )}
                    <div>
                      <span className="font-bold">{currency.code}</span>
                      <span className="ml-2 text-gray-600">
                        {currency.name}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Converted Amount</label>
            <span className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-300">
              Refresh rate
            </span>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-800">
              {toCurrency.code === "EUR"
                ? "€"
                : toCurrency.code === "USD"
                ? "$"
                : ""}
              {formattedConvertedAmount}
            </div>
            <div className="text-sm text-gray-600">
              1 {fromCurrency.code} = {exchangeRate} {toCurrency.code}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 -mx-6 -mb-6 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-600">Exchange fee</div>
              <div className="font-medium">
                {toCurrency.code === "EUR"
                  ? "€"
                  : toCurrency.code === "USD"
                  ? "$"
                  : ""}
                {formattedFee} (0.5%)
              </div>
            </div>
            <details>
              <summary className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-300 text-sm list-none">
                Fee details
              </summary>
              <div className="mt-2 text-xs text-gray-600">
                Base fee: 0.3%
                <br />
                Network fee: 0.2%
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
