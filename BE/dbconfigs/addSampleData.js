const mongoose = require('./connectDB');
const SubService = require('../models/subService');
const Service = require('../models/service');
const FormData = require('../models/formData');

const Manicure = [
  { name: 'Basic Manicure', description: 'Basic nail care', price: 20, duration: 30 },
  { name: 'Deluxe Manicure', description: 'Deluxe nail care', price: 40, duration: 60 }
];

const Pedicure = [
  { name: 'Basic Pedicure', description: 'Basic foot care', price: 25, duration: 45 },
  { name: 'Deluxe Pedicure', description: 'Deluxe foot care', price: 50, duration: 75 }
];

const sampleServices = [
  {uid:1, name: 'Manicure', subServices: Manicure },
  { name: 'Pedicure', subServices: Pedicure }
];

const sampleFormData = {
  services: [],
  availableTimes: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00']
};

const seedData = async () => {
  try {
    // Clear existing data
    await FormData.deleteMany({});
    await Service.deleteMany({});
    await SubService.deleteMany({});

    // Create sub services
    const createdSubServices = await SubService.create([...Manicure, ...Pedicure]);

    // Create services and link subServices
    const createdServices = await Promise.all(sampleServices.map(async (service) => {
      const subServiceIds = service.subServices.map(subService => {
        return createdSubServices.find(sub => sub.name === subService.name)._id;
      });
      const newService = new Service({ name: service.name, subServices: subServiceIds });
      return await newService.save();
    }));

    // Update FormData with service references
    sampleFormData.services = createdServices.map(service => ({
      name: service.name,
      subServices: service.subServices
    }));

    // Save FormData to database
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
