const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    fullName: {type: String},
    location: {type: String},
    bio: {type: String},
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audition' }] 
});

//encrypt password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', UserSchema);

module.exports = User;