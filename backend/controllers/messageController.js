import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res) => {
    try {
        const senderId = req.id;  // middleware isAuthenticated se
        const receiverId = req.params.id; 
        const {message} = req.body;
        
        let gotConversation = await Conversation.findOne({   //let becz if not find we create
            participants:{$all : [senderId, receiverId]},
        });

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };
        

        await Promise.all([gotConversation.save(), newMessage.save()]);
         
        // SOCKET IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json({
            newMessage          //yeh wla send message wla dabba me ja rha hai
        })
    } catch (error) {
        console.log(error);
    }
}
export const getMessage = async (req,res) => {      //kya kya message mai bat hua
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]}
        }).populate("messages");     // in ids ka jitna message hai sab ko display kar deta hai populate
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
}