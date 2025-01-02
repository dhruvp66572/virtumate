const { db, admin } = require("../config/firebase");

const check = (req, res) => {
  res.json({
    message: "Hello from Auth Controller",
  });
};

const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      role,
      displayName: name,
    });

    // Add user to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: userRecord.uid,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, idToken } = req.body;

    if (idToken) {
      // Verify the ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;

      // Retrieve user data from Firestore
      const userDoc = await db.collection('users').doc(uid).get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userData = userDoc.data();

      return res.status(200).json({
        message: 'User authenticated using ID token',
        userData,
      });
    } else if (email && password) {
      // Firebase does not provide password verification via Admin SDK.
      // Use Firebase Client SDK on the frontend to handle sign-in.
      return res.status(400).json({ error: 'Use Firebase Client SDK for email/password login' });
    } else {
      return res.status(400).json({ error: 'ID token or email/password is required' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const userDocs = await db.collection('users').get();
    const users = userDocs.docs.map((doc) => doc.data());

    res.status(200).json({
      message: 'All users retrieved successfully',
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  check,
  register,
  login,
  getAllUser,
};
