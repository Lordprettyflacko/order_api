import { employeeCard, storeCard } from "./component.js";
const $container = $("#container");
const $display = $("#display");
const ENV = "production";
const config = require("./config")[process.env.NODE_ENV || "dev"]
const express = require('express');
const PORT = config.port;

const app = express();

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`your front end server that serves up static files, is listening on ${PORT}`);
})
//const ENV = "dev";

let ApiUrl = ENV == "dev" ? "http://localhost:3000" : "https://front-end-nq0x.onrender.com";

//create function to clear page
function clear() {
  const $card = $(".card");
  $card.remove();
}

//Have page start with data from random city
function start() {
  fetch("http://localhost:3000/api/store")
    .then((response) => response.json())
    .then((stores) => displayStores(stores))
    .catch((error) => console.log("error", error));
}
start();

function displayStores(stores) {
  clear();
  stores.forEach((store) => {
    let card = storeCard(store);
    $display.append(card);
  });
}

//   for (var i = 0; i < data.length; i++) {
//             //rebuild card
//             const $container = $("#container");
//             const $display = $("#display");
//             const $card = $('<div class="card"></div>')
//             const $h2 = $(`<h2 class="storeName" data-id=${data[i].id}>${data[i].name}</h2>`);
//             $h2.on("click", (e) => {
//                 console.log(e.target.getAttribute("data-id"));
//                 let id = e.target.getAttribute("data-id");
//                 $.get("http://127.0.0.1:3000/api/employee/" + id , (data) => {
//                     for (var j = 0; j < data.length; j++) {
//                 //rebuild card
//                 clear();
//                 const $container = $("#container");
//                 const $display = $("#display");
//                 const $post = $('<button>Create</button>')
//                 const $card = $('<div class="employeeCard"></div>')
//                 const $h2 = $(`<h2 class="employeeName">${data[j].name}</h2>`);
//                 const $editbtn = $('<button>Edit</button>');
//                 const $h3 = $(`<h1 class="employeePositon">"${data[j].position}"</h1>`);
//                 const $editbtn2 = $('<button>Edit</button>');
//                 const $h4 = $(`<h1 class="availability">"${data[j].full_or_part}"</h1>`);
//                 const $editbtn3 = $('<button>Edit</button>');
//                 const $btn = $('<button>Delete</button>')

//                 //append card to the body
//                 $("body").append($container);
//                 $container.append($post);
//                 $container.append($display);
//                 $display.append($card);
//                 $card.append($h2);
//                 $h2.append($editbtn);
//                 //$card.append($img);
//                 $card.append($h3);
//                 $h3.append($editbtn2);
//                 $card.append($h3);
//                 $card.append($h4);
//                 $h4.append($editbtn3);
//                 $card.append($btn);
//             }
//         })

//             })
//             const $editbtn = $('<button>Edit</button>');
//             const $editbtn2 = $('<button>Edit</button>');
//             //const $img = $(`<img class="img" src="${data.img}">`);
//             const $h3 = $(`<h3 class="storeLocation">"${data[i].location}"</h3>`);
//             const $btn = $('<button class="deletebtn">Delete</button>')

//             //append card to the body
//             $("body").append($container);
//             $container.append($display);
//             $display.append($card);
//             $card.append($h2);
//             $h2.append($editbtn);
//             $h3.append($editbtn2);
//             //$card.append($img);
//             $card.append($h3);
//             $card.append($btn);
//   }
