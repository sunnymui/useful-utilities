export const compareLetterNumber = (a, b) => {
  if (!a || !b) {
    return null;
  }
  // easy alphanumeric comparison w/ localecompare, coerce values to -1, 1, 0 with math.sign
  return Math.sign(a.localeCompare(b, "en", { numeric: true }));
};

export const fastCompareLetterNumber = (a, b, numStart = 1) => {
  if (!a || !b) {
    return null;
  }
  // imperatively optimized code for this compare function to extract numbers and convert
  // and see which one comes first with a string combining letter + numbers
  const aKeyNumber = parseInt(a.slice(numStart), 10);
  const bKeyNumber = parseInt(b.slice(numStart), 10);
  return aKeyNumber === bKeyNumber ? 0 : aKeyNumber > bKeyNumber ? 1 : -1;
};

export const formatNumber = (value) => {
  const isNumber = typeof value === "number";

  if (isNumber) {
    // round to integer and display as comma'ed number
    return Number(Math.round(value)).toLocaleString("en");
  } else {
    return value;
  }
};

export const fastFormatNumber = (value) => {
  // optimized performance imperative number formatter to add commas
  // using math functions, string ops, and for loops
  const isNumber = typeof value === "number";

  if (isNumber) {
    // round to integer
    const roundedValue = Math.round(value);
    const isNegative = Math.sign(roundedValue) === -1;
    const sign = isNegative ? "-" : "";
    const absoluteValue = Math.abs(roundedValue);
    const valueString = absoluteValue.toString();
    const digitLength = valueString.length;
    // how many digits to allow between comma separations
    const commaSeparateAt = 3;
    // if value less than our comma separating length, we don't have to do anything
    if (digitLength < commaSeparateAt) {
      return roundedValue;
    }

    // loop backwards through the number so we start adding commas every 3 digits starting from the end
    let formattedRestDigits = "";
    for (let i = digitLength - 1; i >= 0; i--) {
      // add the digit to the string first
      formattedRestDigits = valueString[i] + formattedRestDigits;
      // dont add a comma before the beginning or the at end of the string
      if (i === 0 || i === digitLength - 1) {
        continue;
      }
      // the index starting from the last digit so we add a comma before every 3 digits starting from end
      const indexFromEnd = Math.abs(i - digitLength);
      if (indexFromEnd % commaSeparateAt === 0) {
        formattedRestDigits = "," + formattedRestDigits;
      }
    }
    // add the appropriate +/- sign
    const formattedNumber = sign + formattedRestDigits;

    return formattedNumber;
  } else {
    return value;
  }
};

export const abbreviateNumber = (number = 0) => {
  const isNumber = typeof number === "number";
  const formattedNumber = isNumber ? number : Number(number);

  const numberOfDigits = `${formattedNumber}`.length;
  const isNumberOverThousand = numberOfDigits > 3;
  // divide by thousand and round if over 1k
  const abbreviatedNumber = isNumberOverThousand
    ? formattedNumber / 1000
    : formattedNumber;

  return isNumberOverThousand
    ? `${Math.round(abbreviatedNumber)}k`
    : `${Math.round(formattedNumber)}`;
};

export const formatPercent = (number) => {
  const isNumber = typeof value === "number";

  if (isNumber) {
    const roundedNumber = number.toFixed(2);
    return `${roundedNumber * 100}%`;
  } else {
    const formattedNumber = Number.parseFloat(number) || 0;
    // multiply to remove the decimals, use toFixed to deal with imprecise floating point math
    // creating long decimals in the result
    const percentFormattedNumber = (formattedNumber * 100).toFixed(0);

    return `${percentFormattedNumber}%`;
  }
};

export const countDigitsNoDecimals = (value) => {
  const isNumber = typeof value === "number";

  if (isNumber) {
    return Math.trunc(value).toString().length;
  } else {
    return value.length;
  }
};

export const capitalCaseWord = (word = "") => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const formatDate = (date = "", separator = "-") => {
  // format a date from 2020-01-22 to Jan 22
  const [year, mon, day] = date.split(separator);
  const monthNameTable = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedMonth = monthNameTable[Number(mon)];
  // strip any leading 0's
  const formattedDay = Number(day);

  return `${formattedMonth} ${formattedDay}`;
};

export const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

export const removePunctuation = (words) => {
  const matchingPunctuation = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
  const matchingSpaces = / +/g;
  const withoutPunctuation = words.replace(matchingPunctuation, "");
  // remove any extra spaces in the string after removing punctuation
  const withoutExtraSpaces = withoutPunctuation
    .replace(matchingSpaces, " ")
    .trim();

  return withoutExtraSpaces;
};

export const makeCssSafeName = (name) => {
  // copy to prevent mutation on original
  const nameCopy = name.slice();
  const firstLetterIsNumber = nameCopy[0].match(/[0-9]/g);
  const punctuationRegex = /[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~\s]/g;
  const depunctuatedName = nameCopy.replace(punctuationRegex, "");
  return firstLetterIsNumber ? `-${depunctuatedName}` : depunctuatedName;
};
