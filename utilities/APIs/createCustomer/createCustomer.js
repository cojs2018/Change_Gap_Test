const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

AWS.config.update({
    region: 'eu-west-2',
})

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const {
        customer
    } = event;

    customer['customerId'] = uuid();

    const putParameters = {
        TableName: 'customercluster',
        Item: customer,
    }

    return dynamodb.put(putParameters).promise()
        .then(() => {
            return {
                status: 201,
                message: 'Customer created successfully',
            }
        })
        .catch(error => {
            return {
                status: 500,
                message: error,
            }
        })
}