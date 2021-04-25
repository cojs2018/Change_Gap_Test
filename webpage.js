const handleSubmit = async () => {
    let responseDialog = document.getElementById('resultSection');

    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerCountry = document.getElementById('customerCountry').value;

    const customer = {
        customerName,
        customerAddress,
        customerPhone,
        customerCountry
    };

    return createCustomer({ customer })
        .then(responseFromDB => {
            console.log(responseFromDB);
            responseDialog.innerHTML = alertbar(responseFromDB.message, responseFromDB.status);
        })
        .catch(reasonForError => {
            responseDialog.innerHTML = alertbar(reasonForError.message, 500);
        });
};

const handleSearch = async () => {
    let responseDialog = document.getElementById('resultSection');

    const customer = {};

    const arrayOfInputFields = document.getElementsByClassName('inputField');
    
    Object.keys(arrayOfInputFields)
        .forEach(key => {
            const inputField = arrayOfInputFields[key];
            
            if (inputField.value !== "") {
                customer[inputField.id] = inputField.value;
            };
        });

    return getCustomer(customer)
        .then(responseFromDB => {

            console.log(responseFromDB);

            let message = `${responseFromDB.message}<div>${constructTable(responseFromDB.items)}</div>`;

            responseDialog.innerHTML = alertbar(message, responseFromDB.status);
        })
        .catch(reasonForError => {

            console.log(reasonForError);
            responseDialog.innerHTML = alertbar(reasonForError.message, 500);
        });
};

const constructTable = itemsArray => {
    console.log(itemsArray);
    let table = `<table>${constructHead()}`;

    itemsArray.forEach(itemFound => {
        table = `${table}${constructRow(itemFound)}`;
    })

    table = `${table}</table>`;
    return table;
}

const constructHead = () => {
    let row = `<tr>`;
    const keys = [
        "customerName",
        "customerAddress",
        "customerPhone",
        "customerCountry"
    ]
        
    keys.forEach(objectKey => {
        row = `${row}<th>${objectKey}</th>`;
    });

    row = `${row}</tr>`
    return row;
}

const constructRow = itemObject => {
    let row = `<tr>`;
    const values = [
        itemObject["customerName"],
        itemObject["customerAddress"],
        itemObject["customerPhone"],
        itemObject["customerCountry"]
    ]

    values.forEach(objectValue => {
        row = `${row}<td>${objectValue}</td>`;
    });

    row = `${row}</tr>`
    return row;
}

const alertbar = (messageAsHTML, status) => {
    if (status === 500) {
        return `<div id="alertbar" class="error"><i class="material-icons">priority_high</i>${messageAsHTML}</div>`;
    }

    return `<div id="alertbar" class="success"><i class="material-icons">done</i>${messageAsHTML}</div>`;
}