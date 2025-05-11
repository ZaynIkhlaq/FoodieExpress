import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  phone: {
    type: String,
    trim: true
  },
  addresses: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    zipCode: {
      type: String,
      required: true,
      trim: true
    },
    default: {
      type: Boolean,
      default: false
    }
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  image: {
    type: String,
    default: 'https://via.placeholder.com/150'
  }
}, {
  timestamps: true
});
userSchema.pre('save', function(next) {
  if (this.isModified('addresses') && this.addresses.length > 0) {
    const hasDefaultAddress = this.addresses.some(address => address.default);
    if (!hasDefaultAddress && this.addresses.length > 0) {
      this.addresses[0].default = true;
    }
  }
  next();
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User; 