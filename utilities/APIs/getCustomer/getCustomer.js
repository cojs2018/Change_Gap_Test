const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-2',
})

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const {
        querystring
    } = event.params;

    Object.keys(querystring)
        .forEach(customerKey => {
            querystring[customerKey] = querystring[customerKey].replace('"', '').replace('"', '');
        })

    const customer = querystring;

    let filterExpression = '';
    let expressionAttributeValues = {};

    Object.keys(customer).forEach((key, index) => {
        const expression = `${key} = :${key}`

        if(index === 0) {
            filterExpression = expression;
        }
        else {
            filterExpression = `${filterExpression} and ${expression}`;
        }

        expressionAttributeValues[`:${key}`] = customer[key];
    })

    const scanParameters = {
        TableName: 'customercluster',
        FilterExpression: filterExpression,
        ExpressionAttributeValues: expressionAttributeValues,
    }

    return dynamodb.scan(scanParameters).promise()
        .then(queryResult => {
            const customersMatchingSearch = queryResult.Items;

            return {
                status: 200,
                message: `${customersMatchingSearch.length} customers found.`,
                items: customersMatchingSearch,
            }
        })
        .catch(error => {
            return {
                status: 500,
                message: error,
            }
        })
}