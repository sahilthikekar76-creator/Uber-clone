const socketIO=require('socket.io');
const userModel=require('./models/userModel');
const captainModel=require('./models/captainModel');


let io;

function initializeSocket(server){
    io=socketIO(server,{
        cors:{
            origin:'*',
            method:['GET','POST']
        }
    });
    io.on('connection',(socket)=>{
        console.log(`Client connected:${socket.id}`);

        socket.on('join',async(data)=>{
            const{userId,userType}=data;
            if(userType==='user'){
                await userModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                });
            }else if(userType==='captain'){
                await captainModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                });
            }
        });
        socket.on("update-location-captain", async (data) => {
            const { userId, location } = data;

            if (
                !location ||
                typeof location.lng !== "number" ||
                typeof location.lat !== "number"
            ) {
                return socket.emit("error", { message: "Invalid location data" });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                type: "Point",
                coordinates: [location.lng, location.lat], // ✅ lng FIRST
                },
                status: "active",
                isAvailable: true,
            });
        });

        socket.on('disconnect',()=>{
            console.log(`Client disconnected:${socket.id}`);
        });
        socket.on("captain-status-change", async ({ captainId, status }) => {
            await captainModel.findByIdAndUpdate(captainId, {
            status,
            socketId: socket.id,
        });
    });
    
    });
}

function sendMessageToSocketId(socketId,message){
    if(io){
        io.to(socketId).emit('message',message);
    }else{
        console.log('Socket.io not iinitialized');
    }
}
function sendRideToCaptain(socketId, ride) {
    if (io && socketId) {
        io.to(socketId).emit("new-ride", ride);
    }
}

module.exports={initializeSocket,sendMessageToSocketId,sendRideToCaptain};