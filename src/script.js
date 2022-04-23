const form = document.querySelector("#form");
const depositType = document.querySelector("#deposit-type");
const depositTerms = document.querySelector("#deposit-terms");
const depositSum = document.querySelector("#deposit-sum");
const resultTextArea = document.querySelector("#calc-result-text");

const createOptions = (terms) => (
      terms.map((term) => {
      const option = document.createElement("option");
      option.value = term;
      option.text = term === 3 ? '3 месяца' :
      term === 6 ? '6 месяцев' : term === 9 ? '9 месяцев' : term === 12 ? '1 год' :
      `${term / 12} года`;
      return option;
      })
);

const onDepositTypeChange = (e) => {
  let options;
  depositTerms.innerHTML = '';
  switch(depositType.value) {
      case("replenishable"):
      options = createOptions([6, 12, 18, 24]);
      for(let opt of options) {
        depositTerms.options.add(opt);
      }
      break;
      case("term"):
      options = createOptions([3, 6, 9, 12, 18, 24]);
      for(let opt of options) {
        depositTerms.options.add(opt);
      }
      break;
    default:
      break;
  }
};

const calculateTotalSumReturn = (sum, term, depositType) => {
  let result;
  if(depositType === "replenishable") {
    switch(term) {
      case(6):
          result = sum + (sum * 0.2 / 2); 
          break;
      case(12):
          result = sum + (sum * 0.22);
          break;
      case(18):
          result = sum + (sum * 0.15 * 1.5);
          break;
      case(24):
          result = sum + (sum * 0.1 * 2);
          break;
    }
  } else if(depositType === "term") {
        switch(term) {
      case(3):
          result = sum + (sum * 0.2 / 4); 
          break;
      case(6):
          result = sum + (sum * 0.22 / 2);
          break;
	  case(9):
	      result = sum + ((sum * 0.23 / 4) * 3);
          break;
	  case(12):
          result = sum + (sum * 0.24);
          break;
      case(18):
          result = sum + (sum * 0.18 * 1.5);
          break;
	  case(24):
          result = sum + (sum * 0.15 * 2);
          break;
        }
  };
    return result;
}

const checkIsDepositTypeSelected = () => {
  if(depositType.value !== "replenishable" && depositType.value !== "term") alert("Выберите вид депозита");
}

const formatToRubles = (num) => Intl.NumberFormat('Ru-ru', { style: 'currency', currency: 'RUB' }).format(num);

const onFormSubmit = (e) => {
  e.preventDefault();
  const totalSum = calculateTotalSumReturn(+depositSum.value, +depositTerms.value, depositType.value);
  const depositName = depositType.options[depositType.selectedIndex].text;
  const depositTerm = depositTerms.options[depositTerms.selectedIndex].text;
  resultTextArea.innerText = `
    Вклад "${depositName}" на срок "${depositTerm}" на сумму ${formatToRubles(+depositSum.value)}
    
    В конце срока вы получите ${formatToRubles(+totalSum)}
  `
}

depositType.addEventListener("change", onDepositTypeChange);
form.addEventListener("submit", onFormSubmit);
depositTerms.addEventListener("mousedown", checkIsDepositTypeSelected);