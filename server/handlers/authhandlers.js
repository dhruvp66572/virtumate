const {User} = require('../models/User');
const {createJWT, hashPassword, comparePassword} = require('../module/auth');

const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    const hashedPassword = await hashPassword(password);
    const user = new User({name, email, password: hashedPassword});
    try {
        await user.save();
        const token = createJWT(user);
        res.json({token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        return res.status(400).json({error: "User Not Found"});
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
        return res.status(400).json({error: "Invalid email or password"});
    }

    const token = createJWT(user);

    user.lastLogin.push(new Date());
    await user.save();
    

    res.json({token});
}

const logoutUser = async (req, res) => {
    res.json({message: "Logged out successfully"});
}

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

const getUserById = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({error: "User Not Found"});
    }

    res.json(user);
}

const updateUserById = async (req, res) => {
    const {id} = req.params;
    const {
        name,
        email
    } = req.body;

    const user = await User.findByIdAndUpdate(id, {name, email}, {new: true});

    if (!user) {
        return res.status(404).json({error: "User Not Found"});
    }

    res.json(user);
}

const deleteUserById = async (req, res) => {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).json({error: "User Not Found"});
    }

    res.json(user);
}

const getprofile = async (req, res) => {
    const user = req.user;
    res.json(user);
}

const updateprofile = async (req, res) => {
    const user = req.user;
    const {name, email} = req.body;
    const updatedUser = await User.findByIdAndUpdate(user.id, {name, email}, {new: true});
    res.json(updatedUser);
}

module.exports = {createUser, loginUser, logoutUser, getAllUsers, getUserById, updateUserById, deleteUserById, getprofile, updateprofile};
