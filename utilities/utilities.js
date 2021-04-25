const customersAPI = 'https://9ubtq56487.execute-api.eu-west-2.amazonaws.com/dev/';

const createCustomer = async (customerBody) => {
    const request = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(customerBody),
    };

    return fetch(customersAPI, request)
        .then(onfulfilled => {
            return onfulfilled.json()
                .then(queryResult => {
                    return queryResult;
                })
                .catch(reasonForError => {
                    throw new Error(reasonForError);
                });
        })
        .catch(reasonForError => {
            throw new Error(reasonForError);
        });
}

const getCustomer = (customerSearchBody) => {
    const request = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            "Content-Type": 'application/json',
        },
    };

    const queryString = getQueryString(customerSearchBody);
    const pathString = `${customersAPI}/customers?${queryString}`

    console.log(pathString);

    return fetch(pathString, request)
        .then(onfulfilled => {
            return onfulfilled.json()
                .then(queryResult => {
                    return queryResult;
                })
                .catch(reasonForError => {
                    throw new Error(reasonForError);
                });
        })
        .catch(reasonForError => {
            throw new Error(reasonForError);
        });
}

const getQueryString = searchBody => {
    let queryString = ''

    Object.keys(searchBody).forEach((key, index) => {
        if(index === 0) {
            queryString = `${key}="${searchBody[key]}"`;
        }
        else {
            queryString = `${queryString}&${key}=${searchBody[key]}`;
        }
    });

    return queryString;
}