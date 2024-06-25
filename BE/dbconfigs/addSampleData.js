const mongoose = require('mongoose');
const Customer = require('../models/customer');
const Employee = require('../models/employee');
const Service = require('../models/service');
const Subservice = require('../models/subServices');
const FormData = require('../models/formData');

const manicureSubServices = [
  { name: 'Basic Manicure', description: 'Basic nail care', price: 20 },
  { name: 'Deluxe Manicure', description: 'Deluxe nail care', price: 40 }
];

const pedicureSubServices = [
  { name: 'Basic Pedicure', description: 'Basic foot care', price: 25 },
  { name: 'Deluxe Pedicure', description: 'Deluxe foot care', price: 50 }
];

const sampleServices = [
  { name: 'Manicure', description: 'Manicure service description', subServices: manicureSubServices },
  { name: 'Pedicure', description: 'Pedicure service description', subServices: pedicureSubServices }
];

// const sampleCustomers = [
//   { _id: mongoose.Types.ObjectId(), name: 'John Doe', phone: '123456789', email: 'john@example.com' },
//   { _id: mongoose.Types.ObjectId(), name: 'Jane Doe', phone: '987654321', email: 'jane@example.com' }
// ];

const sampleEmployees = [
  { name: 'Alice', position: 'Manager', phone: '111111111', email: 'alice@example.com' },
  { name: 'Bob', position: 'Technician', phone: '222222222', email: 'bob@example.com' }
];

const sampleFormData = {
  services: [],
  availableTimes: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00']
};

const seedData = async () => {
  try {
    // Clear existing data
    await Customer.deleteMany({});
    await Employee.deleteMany({});
    await FormData.deleteMany({});
    await Service.deleteMany({});
    await Subservice.deleteMany({});

    // Add customers
    // await Customer.create(sampleCustomers);

    // Add employees
    await Employee.create(sampleEmployees);

    // Create services and subservices
    for (const serviceData of sampleServices) {
      // Create service
      const service = new Service({
        name: serviceData.name,
        description: serviceData.description
      });
      await service.save();

      // Create subservices and link to service
      const subServiceIds = [];
      for (const subServiceData of serviceData.subServices) {
        const subService = new Subservice({
          ...subServiceData,
          service: service._id
        });
        const savedSubService = await subService.save();
        subServiceIds.push(savedSubService._id);
      }

      // Add service to form data
      sampleFormData.services.push({
        name: service.name,
        subServices: subServiceIds
      });
    }

    // Save form data to database
    const formData = new FormData(sampleFormData);
    await formData.save();

    console.log('Sample data added successfully');
  } catch (error) {
    console.error('Error adding sample data:', error);
  } finally {
    mongoose.connection.close(); // Close connection after seeding
  }
};

module.exports = seedData;