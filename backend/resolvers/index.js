const User = require('../models/User');
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await User.findById(user.id);
    },

    employees: async (_, { page = 1, limit = 10, sortBy = 'name' }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      const skip = (page - 1) * limit;
      return await Employee.find()
        .sort(sortBy)
        .skip(skip)
        .limit(limit);
    },

    employee: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await Employee.findById(id);
    },
  },

  Mutation: {
    registerUser: async (_, { username, email, password, role }) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error('Email already registered');
      const user = await User.create({ username, email, password, role });
      const token = generateToken(user);
      return { ...user._doc, id: user._id, token };
    },

    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = generateToken(user);
      return { ...user._doc, id: user._id, token };
    },

    addEmployee: async (_, args, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new AuthenticationError('Only admin can add employees');
      }
      return await Employee.create(args);
    },

    updateEmployee: async (_, { id, ...rest }, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new AuthenticationError('Only admin can update employees');
      }
      return await Employee.findByIdAndUpdate(id, rest, { new: true });
    },
    deleteEmployee: async (_, { id }, { user }) => {
  if (!user || user.role !== 'admin') {
    throw new AuthenticationError('Only admin can delete employees');
  }

  const deleted = await Employee.findByIdAndDelete(id);
  return !!deleted;
},

  },
};

module.exports = resolvers;
