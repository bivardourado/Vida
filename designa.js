// Variável para armazenar as pessoas cadastradas

const people = [];

// Bloco 1: Seleciona os elementos HTML relevantes

const peopleForm = document.getElementById('people-form');
const nameInput = document.getElementById('name-input');
const genderSelect = document.getElementById('gender-select');
const skillLevelSelect = document.getElementById('skill-level-select');
const generatePairsButton = document.getElementById('generate-pairs-btn');
const pairsList = document.getElementById('pairs-list');
const removePersonButton = document.getElementById('remove-person-btn');
const peopleList = document.getElementById('people-list');

// Define a função para gerar pares

function generatePairs() {
    const name = nameInput.value;
    const gender = genderSelect.value;
    const skillLevel = skillLevelSelect.value;

    // Verifica se todos os campos foram preenchidos

    if (name && gender && skillLevel) { // Cria um novo item de lista para exibir o par gerado

        const newPair = document.createElement('li');
        newPair.innerText = `Nome: ${name} | Gênero: ${gender} | Nível de habilidade: ${skillLevel}`;
        pairsList.appendChild(newPair);

        // Limpa o formulário para que o usuário possa adicionar outro par

        nameInput.value = '';
        genderSelect.value = '';
        skillLevelSelect.value = '';
    } else { alert('Por favor, preencha todos os campos!'); }
} // Bloco 2: Define a função para adicionar uma pessoa

function submitForm(event) {
    event.preventDefault();


    const name = nameInput.value;
    const gender = genderSelect.value;
    const skillLevel = skillLevelSelect.value;

    // Verifica se todos os campos foram preenchidos

    if (name && gender && skillLevel) { // Adiciona a nova pessoa à lista de pessoas

        const newPerson = { name, gender, skillLevel };
        people.push(newPerson);

        // Atualiza a lista de pessoas exibida na página

        renderPeopleList();

        // Limpa o formulário para que o usuário possa adicionar outra pessoa

        nameInput.value = '';
        genderSelect.value = '';
        skillLevelSelect.value = '';
    } else { alert('Por favor, preencha todos os campos!'); }
}

// Define a função para exibir a lista de pessoas

function renderPeopleList() { // Limpa a lista de pessoas atual

    peopleList.innerHTML = '';

    // Adiciona cada pessoa à lista de pessoas

    people.forEach(person => {
        const newPerson = document.createElement('li');
        newPerson.innerText = `Nome: ${person.name} | Gênero: ${person.gender} | Nível de habilidade: ${person.skillLevel}`;
        peopleList.appendChild(newPerson);
    });
}

// Bloco 3: Define a função para remover uma pessoa

function removePerson() { // Verifica se a lista de pessoas está vazia

    if (people.length === 0) { alert('Não há pessoas cadastradas para remover!'); return; }

    // Cria uma lista de opções de pessoas a serem removidas

    const optionsList = document.createElement('select');
    optionsList.id = 'options-list';

    // Adiciona uma opção vazia

    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.innerText = 'Selecione uma pessoa';
    optionsList.appendChild(emptyOption);

    // Adiciona as opções das pessoas cadastradas

    people.forEach(person => {
        const option = document.createElement('option');
        option.value = person.name;
        option.innerText = person.name;
        optionsList.appendChild(option);
    });

    // Exibe um prompt para o usuário escolher a pessoa a ser removida

    const selectedPerson = prompt('Qual pessoa deseja remover?', '');
    if (!selectedPerson) { return; }

    // Remove a pessoa selecionada da lista de pessoas

    const index = people.findIndex(person => person.name === selectedPerson);
    if (index !== -1) { people.splice(index, 1); }

    // Atualiza a lista de pessoas exibida na página

    renderPeopleList();

    // Limpa a lista de opções de pessoas a serem removidas

    optionsList.remove();
}

// Bloco 4: Adiciona um listener para o botão de gerar pares

generatePairsButton.addEventListener('click', generatePairs);

// Bloco 5: Adiciona um listener para o formulário de adicionar pessoas

peopleForm.addEventListener('submit', submitForm);

// Bloco 6: Adiciona um listener para o botão de remover pessoa

removePersonButton.addEventListener('click', removePerson);


function generatePairs() {
    const name = nameInput.value;
    const gender = genderSelect.value;
    const skillLevel = skillLevelSelect.value;

    // Verifica se todos os campos foram preenchidos e se a pessoa é do mesmo sexo de alguém da lista
    if (name && gender && skillLevel) {
        const sameGenderPeople = people.filter(person => person.gender === gender);
        const shuffledPeople = shuffle(sameGenderPeople);

        if (shuffledPeople.length >= 2) {
            const pair1 = shuffledPeople[0];
            const pair2 = shuffledPeople[1];

            const newPair = document.createElement('li');
            newPair.innerText = `Par: ${pair1.name} e ${pair2.name} | Nível de habilidade: ${pair1.skillLevel} e ${pair2.skillLevel}`;
            pairsList.appendChild(newPair);

            // Remove as pessoas emparelhadas da lista de pessoas cadastradas
            const index1 = people.findIndex(person => person.name === pair1.name);
            people.splice(index1, 1);
            const index2 = people.findIndex(person => person.name === pair2.name);
            people.splice(index2, 1);

            // Atualiza a lista de pessoas exibida na página
            renderPeopleList();
        } else {
            alert('Não há pessoas suficientes do mesmo sexo para formar pares.');
        }

        // Limpa o formulário para que o usuário possa adicionar outra pessoa
        nameInput.value = '';
        genderSelect.value = '';
        skillLevelSelect.value = '';
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}




function removePerson() {
    const selectedPerson = prompt('Digite o nome da pessoa que deseja remover:');
    const index = people.findIndex(person => person.name === selectedPerson);

    if (index === -1) {
        alert('Não foi possível encontrar a pessoa selecionada.');
        return;
    }

    people.splice(index, 1); // Remove a pessoa do array de pessoas cadastradas

    // Remove a pessoa da lista de pessoas na página
    const peopleListItems = Array.from(peopleList.children);
    const listItemToRemove = peopleListItems.find(item => item.innerText.includes(selectedPerson));
    peopleList.removeChild(listItemToRemove);

    // Remove os pares que incluem a pessoa removida
    pairs = pairs.filter(pair => pair.person1.name !== selectedPerson && pair.person2.name !== selectedPerson);

    // Remove os pares da lista de pares na página
    const pairsListItems = Array.from(pairsList.children);
    pairsListItems.forEach(item => {
        if (item.innerText.includes(selectedPerson)) {
            pairsList.removeChild(item);
        }
    });
    people.forEach(person => {
        console.log(person.name + " - " + person.skill);
    });

}