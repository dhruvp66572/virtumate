const { AccessToken } = require("livekit-server-sdk");
const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

 const generateToken = (roomName, userId, host) => {

  if (!roomName || !userId) {
    return res.status(400).json({ error: "Missing roomName or userId" });
  }

  try {
    const token = new AccessToken(apiKey, apiSecret, { identity: userId });
    token.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
    token.addGrant({ room: roomName, canPublishData: true });
    token.addGrant({ room: roomName, canPublishAudio: true });
    token.addGrant({ room: roomName, canPublishVideo: true });
    token.addGrant({ room: roomName, canPublishScreenShare: true });
    token.addGrant({ room: roomName, canSubscribeToAudio: true });
    token.addGrant({ room: roomName, canSubscribeToVideo: true });
    token.addGrant({ room: roomName, canSubscribeToScreenShare: true });
    token.addGrant({ room: roomName, canSubscribeToData: true });
    token.addGrant({ room: roomName, canSubscribeToAll: true });
    token.addGrant({ room: roomName, canPublishToAll: true });
    token.addGrant({ room: roomName, canManage: true });
    token.addGrant({ room: roomName, canManageParticipants: true });
    token.addGrant({ room: roomName, canManageRecording: true });
    token.addGrant({ room: roomName, canManageData: true });
    token.addGrant({ room: roomName, canManageAudio: true });
    token.addGrant({ room: roomName, canManageVideo: true });
    token.addGrant({ room: roomName, canManageScreenShare: true });


    return token.toJwt();

  } catch (error) {
   return error;
  }
};

module.exports = {
  generateToken,
};