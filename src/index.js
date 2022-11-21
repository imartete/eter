const formNode = document.querySelector(".bill-form");
const formTitle = document.querySelector(".form-title");
const sendBillBtn = formNode.elements.submit;

const sendCurrentCountersBtn = document.createElement("button");
const sendPrevCountersBtn = document.createElement("button");

// const counter = {};
let billedAmount;
// TODO: BUTTONS DISABLED, RETURN BUTTON

sendBillBtn.addEventListener("click", (event) => {
  event.preventDefault();

  billedAmount = parseFloat(
    formNode?.elements?.bill?.value.replace(",", ".").trim()
  );

  const displayedBill = document.createElement("p");
  displayedBill.textContent = `Сума за рахунком: ${billedAmount}`;
  formTitle.insertAdjacentElement("beforebegin", displayedBill);

  createForm(sendCurrentCountersBtn, "Далі", "ПОТОЧНІ");

  //TODO: save current counters values into Local storage with key flat and currentValue
});

sendCurrentCountersBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createForm(sendPrevCountersBtn, "Обчислити", "ПОПЕРЕДНІ");
});

sendPrevCountersBtn.addEventListener("click", () => {
  formTitle.textContent = `Результат`;
  formNode.remove();
});

function createForm(button, buttonText, counterState) {
  let allEl = "";
  for (let i = 0; i < 13; i += 1) {
    allEl += `<label>
    ${i + 1} квартира
    <input name="$counter${i + 1} type="text" />
  </label>`;
  }
  formNode.innerHTML = allEl;

  formTitle.textContent = `Введіть ${counterState} показники всіx лічильників`;

  button.textContent = buttonText;
  button.type = "submit";
  formNode.insertAdjacentElement("beforeend", button);
}
