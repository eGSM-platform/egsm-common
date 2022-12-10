var DYNAMO = require('../database/dynamoconnector')

const DATABASE_HOST = 'localhost'
const DATABASE_PORT = '9000'
const DATABASE_REGION = 'local'
const DATABASE_ACCESS_KEY_ID = 'fakeMyKeyId'
const DATABASE_SECRET_ACCESS_KEY = 'fakeSecretAccessKey'

var tables = [
    { name: 'ARTIFACT_DEFINITION', pk: 'ARTIFACT_TYPE', sk: 'ARTIFACT_ID' },
    { name: 'ARTIFACT_USAGE', pk: 'ARTIFACT_NAME', sk: 'CASE_ID' },
    { name: 'ARTIFACT_EVENT', pk: 'ARTIFACT_NAME', sk: 'EVENT_ID', secondaryindex: { indexname: 'PROCESSED_INDEX', pk: { name: 'ENTRY_PROCESSED', type: 'N' } } },
    { name: 'PROCESS_TYPE', pk: 'PROCESS_TYPE_NAME', sk: undefined },
    { name: 'STAKEHOLDERS', pk: 'STAKEHOLDER_ID', sk: undefined },
    { name: 'PROCESS_INSTANCE', pk: 'PROCESS_TYPE_NAME', sk: 'INSTANCE_ID' },
    { name: 'PROCESS_GROUP_DEFINITION', pk: 'NAME', sk: undefined },

    { name: 'STAGE_EVENT', pk: 'PROCESS_NAME', sk: 'EVENT_ID' },
]

function initDatabaseConnection() {
    DYNAMO.initDynamo(DATABASE_ACCESS_KEY_ID, DATABASE_SECRET_ACCESS_KEY, DATABASE_REGION, 'http://' + DATABASE_HOST + ':' + DATABASE_PORT)
}

async function initTables() {
    var promises = []
    await Promise.all(promises)
    promises = []

    tables.forEach(element => {
        try {
            promises.push(DYNAMO.initTable(element.name, element.pk, element.sk, element?.secondaryindex || undefined))
            console.log(element.name + ' created')
        } catch (error) {
            console.error(element.name + ' could not be created')
        }
    });

    await Promise.all(promises)
}

async function deleteTables() {
    var promises = []
    tables.forEach(element => {
        try {
            promises.push(DYNAMO.deleteTable(element.name))
            console.log(element.name + ' deleted')
        } catch (error) {
            console.error(element.name + ' could not be deleted')
        }
    });
    await Promise.all(promises)
}

module.exports = {
    initDatabaseConnection: initDatabaseConnection,
    initTables: initTables,
    deleteTables: deleteTables
}