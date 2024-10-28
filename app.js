// ------------------------ API's ------------------------

const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer');

// ------------------------ Variables------------------------

let number;
let allCustomers;
const username = prompt('What is your name? ');

// ------------------------ DATABASE FUNCTIONS ------------------------

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
};

const addCustomer = async (newCustomerName, newCustomerAge) => {
    await Customer.create({
        name: newCustomerName,
        age: newCustomerAge,
    });
    console.log('Customer added successfully');

    await startCRM();
    await checkChoice();
};

const listOfCustomers = async () => {
    allCustomers = await Customer.find({});

    console.log('\nCustomers:\n');
    allCustomers.forEach((customer) => {
        console.log(
            `id: ${customer.id} -- Name: ${customer.name} -- Age: ${customer.age}`,
        );
    });

    prompt();
    await checkChoice();
};

const updateCustomer = async () => {
    allCustomers = await Customer.find({});

    console.log('\nCustomers:\n');
    allCustomers.forEach((customer) => {
        console.log(
            `id: ${customer.id} -- Name: ${customer.name} -- Age: ${customer.age}`,
        );
    });

    console.log(
        'Copy and paste the id of the customer you would like to update here:',
    );
    const id = prompt();
    const customer = await Customer.findById(id);

    customer.name = prompt('What is the customers new name? ');
    customer.age = prompt('What is the customers new age? ');

    console.log(
        `Updated customer info:\nid: ${customer.id} -- Name: ${customer.name} -- Age: ${customer.age}`,
    );

    await customer.save();

    prompt();
    await checkChoice();
};

const deleteCustomer = async () => {
    allCustomers = await Customer.find({});

    console.log('\nCustomers:\n');
    allCustomers.forEach((customer) => {
        console.log(
            `id: ${customer.id} -- Name: ${customer.name} -- Age: ${customer.age}`,
        );
    });

    console.log('Copy and paste the id of the customer you would like to delete here:')
    const id = prompt();
       

    await Customer.findByIdAndDelete(id);

    console.log('Customer deleted successfully');

    prompt();
    await checkChoice();
};

const disconnect = async () => {
    console.log('exiting. . .');
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    process.exit();
};

// ------------------------ APP FUNCTIONS ------------------------

const startCRM = () => {
    console.log(`
Welcome to the CRM

What would you like to do ${username}?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. quit

Number of action to run: `);
    return prompt();
};

const checkChoice = async () => {
    const number = await startCRM();

    if (number === '1') {
        const newCustomerName = prompt('Customer name: ');
        const newCustomerAge = prompt('Customers Age: ');
        await addCustomer(newCustomerName, newCustomerAge);
    } else if (number === '2') {
        await listOfCustomers();
    } else if (number === '3') {
        await updateCustomer();
    } else if (number === '4') {
        await deleteCustomer();
    } else if (number === '5') {
        await disconnect();
    }
};

// ------------------------ CODE ------------------------
connect();
checkChoice();
