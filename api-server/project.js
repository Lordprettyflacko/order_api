const express = require('express');
const app = express();
const port = 3000;
let cors = require("cors");
app.use(cors());
app.use(express.json());

const { Client } = require('pg');
const config = require('./config.json')[process.env.NODE_ENV || "dev"]


const client = new Client({
    connectionString: config.connectionString
});
client.connect();

//displays all stores
app.get('/api/store', (req, res, next) => {
    async function getStore() {
        try {
            const result = await client.query('SELECT * FROM store');
            if (result.rows.length === 0) {
                res.status(404).send('Size not found!') 
                console.log('hello');
            } else {
                
            res.send(result.rows);
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        };
    };
    getStore();
})

//displays stores by id
app.get('/api/store/:id', (req, res, next) => {
    async function getStoreById() {
        try {
            const result = await client.query(`SELECT * FROM store WHERE id = ${req.params.id} `);
            if (result.rows.length === 0) {res.status(404).send('There is no person with that id!') 
            } else { 
            res.send(result.rows);
            }
        } catch (e) {
            next(e);
        };
    };
    getStoreById();
});


//get all employees 
app.get('/api/employee', (req, res, next) => {
    async function getEmployee() {
        try {
            const result = await client.query('SELECT * FROM employee');
            if (result.rows.length === 0) {res.status(404).send('There is no person with that id!') 
            } else { 
            res.send(result.rows);
            }
        } catch (e) {
            next(e);
        };
    };
    getEmployee();
});



//get employee by store id
app.get('/api/employee/:store_id', (req, res, next) => {
    async function getEmployeeByStoreId() {
        try {
            const result = await client.query(`SELECT * FROM employee WHERE store_id = ${req.params.store_id}`);
            if (result.rows.length === 0) {res.status(404).send('There is no person with that id!') 
            } else { 
            res.send(result.rows);
            }
        } catch (e) {
            console.log(e);
            next(e);
        };
    };
    getEmployeeByStoreId();
});

//create a new store
app.post('/api/store', (req, res, next) => {
    let store = req.body;
    let storeName = store.name;
    let storeLocation = store.location;
    async function newStore() {
        try {
            const result = await client.query(`INSERT INTO store (name, location) VALUES ('${storeName}', '${storeLocation}') RETURNING *`);
            if (result.rows.length === 0) {res.status(404).send('No sizes found!')
        } else {
            res.send(result.rows);
        }
        } catch (e) {
            next(e);
        };
    };
    newStore();

});

//create an employee
app.post('/api/employee', (req, res, next) => {
    let employee = req.body;
    let employeeName = employee.name;
    let employeePostion = employee.position;
    let employeeAvail = employee.full_or_part;
    let storeId = employee.store_id;
    console.log(employee);
    async function newEmployee() {
        try {
            const result = await client.query(`INSERT INTO employee (name, position, full_or_part, store_id) VALUES ('${employeeName}', '${employeePostion}', '${employeeAvail}', ${storeId}) RETURNING *`);
            if (result.rows.length === 0) {res.status(404).send('No sizes found!')
        } else {
            res.send(result.rows);
        }
        } catch (e) {
            next(e);
        };
    };
    newEmployee();

});

//delete a store
app.delete('/api/store', (req,res, next) => {
    async function deleteStoreById() {
        try {
            const query = await client.query(`SELECT * FROM store WHERE id = ${req.params.id}`);
            if (query.rows.length === 0) {res.status(404).send('No sizes found for that id!') 
        } else {
            const result = await client.query(`DELETE FROM swag WHERE id = ${req.params.id}`);
            res.send(result.rows);
        }
        } catch (e) {
            next(e);
        };
    };
    deleteStoreById();
});

//delete an employee
app.delete('/api/employee/:id', (req,res, next) => {
    async function deleteEmployeeById() {
        try {
            const query = await client.query(`SELECT * FROM employee WHERE id = ${req.params.id}`);
            if (query.rows.length === 0) {res.status(404).send('No employee found for that id!') 
        } else {
            const result = await client.query(`DELETE FROM employee WHERE id = ${req.params.id}`);
            res.send(result.rows);
        }
        } catch (e) {
            console.log(e);
            next(e);
        };
    };
    deleteEmployeeById();
})

//update store information
app.patch('/api/store/:id', (req, res, next) => {
    let store = req.body;
    let storeName = store.name;
    let storeLocation = store.location;
    async function updateStore() {
        try {
            client.query(`UPDATE swag SET
            name = COALESCE(NULLIF('${storeName}', ''), name),
            location = COALESCE(NULLIF('${storeLocation}', ''), location)
          WHERE id = ${req.params.id};`)

            const result = await client.query(`SELECT * FROM swag WHERE id = ${req.params.id}`);
            res.status(201).send('the query is okay');
        } catch (e) {
            next(e);
        };
    };
    updateStore();
})

//update employee information
app.patch('/api/employee/:id', (req, res, next) => {
    let employee = req.body;
    let employeeName = employee.name;
    let employeePostion = employee.position;
    let employeeAvail = employee.full_or_part;
    let storeId = employee.store_id;
    async function updateEmployee() {
        try {
            client.query(`UPDATE employee SET
            name = COALESCE(NULLIF('${employeeName}', ''), name),
            position = COALESCE(NULLIF('${employeePostion}', ''), position),
            full_or_part = COALESCE(NULLIF('${employeeAvail}', ''), full_or_part),
            store_id = COALESCE(NULLIF('${storeId}', ''), store_id)

          WHERE id = ${req.params.id};`)

            const result = await client.query(`SELECT * FROM employee WHERE id = ${req.params.id}`);
            res.status(201).send('the query is okay');
        } catch (e) {
            next(e);
        };
    };
    updateEmployee();
})


app.use((e, req, res, next) =>{
    res.status(500).json(e);
});


app.listen(port, () => {
    console.log(`listening on port ${port}`)
});