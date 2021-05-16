'use strict'

//  Global ..................................
const tableContainer = document.getElementById('tableContainer')
const form = document.getElementById('form')
const clear = document.getElementById('clear')

let table = document.createElement('table');
tableContainer.appendChild(table);

let thead = document.createElement('thead');
table.appendChild(thead);


let tbody = document.createElement('tbody');
table.appendChild(tbody);

//  table head render ..................................
function tableHeadRender() {
    let tableHeadContent = ['# Image', 'Name', 'Season']

    let headRow = document.createElement('tr');
    thead.appendChild(headRow);

    for (let i = 0; i < tableHeadContent.length; i++) {
        let headData = document.createElement('th');
        headRow.appendChild(headData);
        headData.textContent = tableHeadContent[i];
    }
}
tableHeadRender()

//  constrictor function ..................................
function Flower(flowerImg, name, season) {
    this.flowerImg = flowerImg;
    this.name = name;
    this.season = season;
    Flower.all.push(this);
}

Flower.all = [];

//  prototype render function ..................................
Flower.prototype.tableRender = function() {

    let bodyRow = document.createElement('tr');
    tbody.appendChild(bodyRow);

    let imageData = document.createElement('td');
    bodyRow.appendChild(imageData);

    let deleteRow = document.createElement('button');
    imageData.appendChild(deleteRow)
    deleteRow.textContent = 'X';

    let imageRender = document.createElement('img');
    imageData.appendChild(imageRender)
    imageRender.src = this.flowerImg;

    let nameData = document.createElement('td');
    bodyRow.appendChild(nameData);
    nameData.textContent = this.name;

    let seasonData = document.createElement('td');
    bodyRow.appendChild(seasonData);
    seasonData.textContent = this.season;
}

//  form listener ..................................
form.addEventListener('submit', formFlower)

function formFlower(event) {
    event.preventDefault()

    let flowerImg = event.target.image.value;
    let name = event.target.name.value;
    let season = event.target.season.value;

    let newFlower = new Flower(flowerImg, name, season)

    newFlower.tableRender();
    saveData()
}

//  save data function ..................................
function saveData() {
    localStorage.setItem('flowerData', JSON.stringify(Flower.all))
}

//  get data function ..................................
function getDate() {
    let data = JSON.parse(localStorage.getItem('flowerData'))
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let newData = new Flower(data[i].flowerImg, data[i].name, data[i].season);
            newData.tableRender();
        }
    }
}

getDate()


//  clear data function ..................................
clear.addEventListener('click', removeData)

function removeData() {
    localStorage.clear();
    tbody.innerHTML = '';
    Flower.all = [];
}