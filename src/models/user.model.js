import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const roleValues = ['guest', 'admin', 'moderator', 'user'];

const userSchema = mongoose.Schema({
    email: { 
        type: String,
        unique: [true, 'Email is already in use'],
        required: [true, 'Please enter a source'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
      },
    password: { 
      type: String,
      required: [true, 'Please enter a password'],
      minLength: [6, 'Password must be 6 characters or longer']
    },
    firstName: {
      type: String,
      required: [true, 'Please enter a first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter a last name'],
    },
    business: {
      type: String,
      required: [true, 'Please enter a business'],
    },
    role: {
      type: String,
      required: [true, 'Please enter a role'],
      validate: [(val) => (roleValues.indexOf(val) > -1), 'Please choose a valid role'],
    },
    lastLoggedIn: {
      type: Date,
    }
});

const User = mongoose.model('User', userSchema);
export default User;