"use server";

import { revalidatePath } from "next/cache";
import { Patient, User, Test } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { auth } from "@/app/auth";
export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/employees");
  redirect("/dashboard/employees");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin } =
    Object.fromEntries(formData);
    
  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updateFields = {
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/employees");
  redirect("/dashboard/employees");
};

export const deleteUser = async (id) => {

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/employees");
};

// Add a patient
// export const addPatient = async (formData) => {
//   const { user } = await auth();
//   console.log(user.username);
//   const { name, ageSex, tests, costTotal, transactionMode, doctorReferred, place } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const newPatient = new Patient({
//       name,
//       ageSex,
//       tests,
//       costTotal,
//       transactionMode,
//       doctorReferred,
//       place,
//       addedBy:user.username,
//     });

//     await newPatient.save();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create patient!");
//   }

//   revalidatePath("/dashboard/patients");
//   redirect("/dashboard/patients");
// };
export const addPatient = async (formData) => {
  const { user } = await auth();
  console.log(user.username);
  const {
    name,
    age,
    sex,
    tests,
    test2,
    testType,
    costTotal,
    transactionMode,
    doctorReferred,
    place,
  } = Object.fromEntries(formData);

  try {
    connectToDB();
    const newPatient = new Patient({
      name,
      ageSex: `${age}/${sex}`, // Combining age and sex into one field as per schema
      tests: `${tests}`, // Combining the tests fields
      testType,
      costTotal,
      transactionMode,
      doctorReferred,
      place,
      addedBy: user.username,
    });

    await newPatient.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create patient!");
  }

  revalidatePath("/dashboard/patients");
  redirect("/dashboard/patients");
};

export const updatePatient = async (formData) => {
  const {
    id,
    name,
    age,
    sex,
    tests,
    test2,
    testType,
    costTotal,
    transactionMode,
    doctorReferred,
    place,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      name,
      ageSex: `${age}/${sex}`,
      tests: `${tests}`,
      testType,
      costTotal,
      transactionMode,
      doctorReferred,
      place,
    };

    // Remove empty or undefined fields
    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );

    await Patient.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update patient!");
  }

  revalidatePath("/dashboard/patients");
  redirect("/dashboard/patients");
};

// export const addPatient = async (formData) => {
//   const { user } = await auth();
//   const data = Object.fromEntries(formData.entries());

//   try {
//     await connectToDB();

//     const newPatient = new Patient({
//       ...data,
//       addedBy: user.username,
//     });

//     await newPatient.save();
//   } catch (err) {
//     console.error(err);
//     throw new Error("Failed to create patient!");
//   }

//   revalidatePath("/dashboard/patients");
//   redirect("/dashboard/patients");
// };


// Update a patient
// export const updatePatient = async (formData) => {
//   const { id, name, ageSex, tests, costTotal, transactionMode, doctorReferred, place } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const updateFields = {
//       name,
//       ageSex,
//       tests,
//       costTotal,
//       transactionMode,
//       doctorReferred,
//       place,
//     };

//     Object.keys(updateFields).forEach(
//       (key) =>
//         (updateFields[key] === "" || undefined) && delete updateFields[key]
//     );

//     await Patient.findByIdAndUpdate(id, updateFields);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to update patient!");
//   }

//   revalidatePath("/dashboard/patients");
//   redirect("/dashboard/patients");
// };

// Delete a patient
export const deletePatient = async (id) => {
  try {
    connectToDB();
    await Patient.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete patient!");
  }

  revalidatePath("/dashboard/patients");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
// Add a test
export const addTest = async (formData) => {
  const { user } = await auth(); // Get the current user for the addedBy field
  const { testName, inventoryStatus, chemicalCost, areaRate, regularCost, profit, nightCost, nightProfit, wholesaleCost, wholesaleProfit } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newTest = new Test({
      testName,
      inventoryStatus,
      chemicalCost,
      areaRate,
      regularCost,
      profit,
      nightCost,
      nightProfit, // Include if required
      wholesaleCost,
      wholesaleProfit, // Include if required
      testAddedBy: user.username,
    });

    await newTest.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create test!");
  }

  revalidatePath("/dashboard/tests");
  redirect("/dashboard/tests");
};
export const updateTest = async (formData) => {
  const { id, testName, inventoryStatus, chemicalCost, areaRate, regularCost, profit, nightCost, nightProfit, wholesaleCost, wholesaleProfit } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      testName,
      inventoryStatus,
      chemicalCost,
      areaRate,
      regularCost,
      profit,
      nightCost,
      nightProfit, // Include if required
      wholesaleCost,
      wholesaleProfit, // Include if required
    };

    // Remove empty or undefined fields
    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );

    await Test.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update test!");
  }

  revalidatePath("/dashboard/tests");
  redirect("/dashboard/tests");
};


// Delete a test
export const deleteTest = async (id) => {
  try {
    connectToDB();
    await Test.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete test!");
  }

  revalidatePath("/dashboard/tests");
};
