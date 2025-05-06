const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf file
const packageDefinition = protoLoader.loadSync('service.proto');
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const myService = grpcObject.MyService;

// Create a client to interact with the gRPC server
const client = new myService('localhost:50051', grpc.credentials.createInsecure());

// Make a request to GetHello
client.GetHello({}, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Response:', response.message);  // "Hello world"
  }
});
