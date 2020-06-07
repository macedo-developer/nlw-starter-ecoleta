document.querySelector("select[name=uf]").addEventListener("change", getCities);

function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((response) => response.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUfs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = `<option value="0">Selecione a cidade</option>`;
  citySelect.disabled = true;

  fetch(url)
    .then((response) => response.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex((item) => item === itemId);

  if (alreadySelected != -1) {
    const filteredItems = selectedItems.filter((item) => item != itemId);

    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  collectItems.value = selectedItems;
}
