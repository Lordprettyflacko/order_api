function employeeCard(employee) {

    const $card = $('<div class="employeeCard"></div>')
    const $h2 = $(`<h2 class="employeeName">${employee.name}</h2>`);
    const $h3 = $(`<h1 class="employeePositon">"${employee.position}"</h1>`);
    const $h4 = $(`<h1 class="availability">"${employee.full_or_part}"</h1>`);
    const $btn = $('<button>Delete</button>')

    //append card
    $card.append($h2);
    $card.append($h3);
    $card.append($h4);
    $card.append($btn);
    return $card
}

function storeCard(store) {

    const $card = $('<div class="employeeCard"></div>')
    const $h2 = $(`<h2 class="employeeName">${store.name}</h2>`);
    const $h3 = $(`<h1 class="employeePositon">"${store.location}"</h1>`);
    const $btn = $(`<button id="${store.id}">Delete</button>`)
    $btn.on('click', (e) =>{
        console.log(e.currentTarget.id);
        
    })

    //append card
    $card.append($h2);
    $card.append($h3);
    $card.append($btn);
    return $card
}



export{employeeCard, storeCard}

