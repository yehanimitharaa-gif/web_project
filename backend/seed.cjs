const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/unipath';

const sampleCourses = [
  {
    name: 'BSc in Computer Science',
    university: 'University of Colombo',
    shortName: 'UoC',
    stream: 'Physical Science',
    district: 'Colombo',
    cutoffZ: 1.65,
    faculty: 'Faculty of Science / UCSC',
    duration: '3-4 years',
    medium: 'English',
    jobDemand: 'High'
  },
  {
    name: 'BSc Engineering (Hons)',
    university: 'University of Moratuwa',
    shortName: 'UoM',
    stream: 'Physical Science',
    district: 'Colombo',
    cutoffZ: 1.85,
    faculty: 'Faculty of Engineering',
    duration: '4 years',
    medium: 'English',
    jobDemand: 'High'
  },
  {
    name: 'BSc in Business Administration',
    university: 'University of Sri Jayewardenepura',
    shortName: 'USJ',
    stream: 'Commerce',
    district: 'Colombo',
    cutoffZ: 1.45,
    faculty: 'Faculty of Management Studies & Commerce',
    duration: '4 years',
    medium: 'English / Sinhala',
    jobDemand: 'Medium'
  },
  {
    name: 'MBBS (Medicine)',
    university: 'University of Peradeniya',
    shortName: 'UoP',
    stream: 'Biological Science',
    district: 'Colombo',
    cutoffZ: 1.90,
    faculty: 'Faculty of Medicine',
    duration: '5 years',
    medium: 'English',
    jobDemand: 'High'
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to DB for seeding...');
    await Course.deleteMany({});
    await Course.insertMany(sampleCourses);
    console.log('✅ Sample courses seeded successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });