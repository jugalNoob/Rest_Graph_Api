const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fetch = require('node-fetch');

// Load the protobuf file
const packageDefinition = protoLoader.loadSync('service.proto');
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const userService = grpcObject.UserService;
const myService = grpcObject.MyService;

// Implement the CreateUser method (from UserService)
const createUser = (call, callback) => {
  const { name, email, password } = call.request;
  console.log("Received:", name, email, password);

  // Respond with a success message
  callback(null, { message: `User ${name} created successfully` });
};

// localhost:50051

// Implement the GetHello method (from MyService) ----------- simpler 
// const getHello = (call, callback) => {
//     https://jsonplaceholder.typicode.com/albums
//   // Sending a simple "hello world" message in the response
//   callback(null, { message: "Hello world" });
// };

//-- Fetch api modelue 






const getHello = async (call, callback) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      const albums = await response.json();
  
      const topAlbums = albums.slice(0, 50).map(album => ({
        userId: album.userId,
        id: album.id,
        title: album.title,
      }));
  
      // Must return exactly what's defined in HelloResponse
      callback(null, { albums: topAlbums });
    } catch (error) {
      console.error("Error in getHello:", error);
      callback({
        code: grpc.status.UNKNOWN,
        message: "Internal server error: " + error.message
      });
    }
  };
  



// Create a gRPC server and add both services
const server = new grpc.Server();
// server.addService(userService.service, { CreateUser: createUser });
server.addService(myService.service, { GetHello: getHello });

// Start the server on port 50051
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running at http://0.0.0.0:50051');
  server.start();
});
