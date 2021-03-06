const mongoose = require('mongoose');
// const faker = require('faker');

const mongodbURI = process.env.DB;
mongoose.connect(mongodbURI, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', () => {
  // we're connected!
  console.log('mongodb connected');
});

const Schema = mongoose.Schema;

const dogSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  breed: String,
  age: { type: Number, min: 0, max: 30 },
  pictures: [String], //blobs //filestack api
  owner: { type: Schema.Types.ObjectId, ref: 'Owners' },
});

const ownerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  location: String,
  age: { type: Number, min: 18, max: 101 },
  picture: String,
  bio: String,
  rating: Number,
  dogs: [{ type: Schema.Types.ObjectId, ref: 'Dogs' }],
  dogsSeen: [{ type: Schema.Types.ObjectId, ref: 'Dogs' }],
  dogsLiked: [{ type: Schema.Types.ObjectId, ref: 'Dogs' }],
});

const roomSchema = new Schema({
  _id: Schema.Types.ObjectId,
  users: [String],
  uids: [String],
  messages: [{
    user: String,
    text: String,
    // createdAt: new Date(),
  }],
});

const Rooms = mongoose.model('Rooms', roomSchema);
const Owners = mongoose.model('Owners', ownerSchema);
const Dogs = mongoose.model('Dogs', dogSchema);

// ==== DROP DATA EXAMPLE ====
// db.dropCollection('owners', (err) => {
//   if (err) {
//     console.log('owners collection did not delete', err);
//     return;
//   }
//   console.log('owners collection deleted');
// });

// db.dropCollection('dogs', (err) => {
//   if (err) {
//     console.log('dogs collection did not delete', err);
//     return;
//   }
//   seed();
//   console.log('dogs collection deleted');
// });

// ==== SEED DATA ====
// function getRandomInt(minimum, maximum) {
//   let min = Math.ceil(minimum);
//   let max = Math.floor(maximum);
//   return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
// }

// for (let i = 0; i < 10; i++) {
//   const dog_id = new mongoose.Types.ObjectId();

//   const owner = new Owners({
//     _id: new mongoose.Types.ObjectId(),
//     name: faker.name.findName(),
//     age: getRandomInt(18, 101),
//     location: faker.address.zipCode(),
//     picture: faker.image.avatar(),
//     bio: faker.lorem.paragraph(),
//     rating: getRandomInt(1, 6),
//   });

//   owner.dogs.push(dog_id);

//   owner.save((err) => {
//     if (err) {
//       console.error('Could not save owner', err);
//       return;
//     }

// const dog = new Dogs({
//   _id: dog_id,
//   name: faker.name.findName(),
//   owner: owner._id,
//   age: getRandomInt(0, 30),
// });

//     dog.pictures.push(faker.image.cats());

//     dog.save((err) => {
//       if (err) {
//         console.error('Could not save dog', err);
//       }
//     });
//   });
// }

module.exports = {
  Owners,
  Dogs,
  Rooms,
  db,
};
