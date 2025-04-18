const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf file
const packageDefinition = protoLoader.loadSync('service.proto');
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const userService = grpcObject.UserService;

// Create a client for gRPC communication
const client = new userService('localhost:50051', grpc.credentials.createInsecure());

// Define the data to be sent
const userData = {
  name: 'Jugal',
  email: 'jugal@example.com',
  password: '12345',
};

// Make the CreateUser request
client.CreateUser(userData, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Response:', response.message);
  }
});
