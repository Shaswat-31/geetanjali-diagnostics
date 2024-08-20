import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);
// models.js

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ageSex: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    tests: {
      type: String,
      required: true,
    },
    costTotal: {
      type: Number,
      required: true,
    },
    transactionMode: {
      type: String,
      required: true,
    },
    doctorReferred: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const TestSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  inventoryStatus: { type: String, required: true },
  chemicalCost: { type: Number, required: true },
  areaRate: { type: Number, required: true },
  regularCost: { type: Number, required: true },
  profit: { type: Number, required: true },
  nightCost: { type: Number, required: true },
  wholesaleCost: { type: Number, required: true },
  testAddedBy: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Test = mongoose.models.Test || mongoose.model('Test', TestSchema);
export const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
