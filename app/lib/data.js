import { Patient, User, Test } from "./models";
import { connectToDB } from "./utils";
export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchPatients = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = await Patient.find({ name: { $regex: regex } }).count();
    const patients = await Patient.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
      return { count, patients };
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch patients!");
    }
  };
  
  // Fetch a single patient by ID
  export const fetchPatient = async (id) => {
    try {
      connectToDB();
      const patient = await Patient.findById(id);
      return patient;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch patient!");
    }
  };
  
  export const fetchTests = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 2;
  
    try {
      connectToDB();
      const count = await Test.find({ testName: { $regex: regex } }).count();
      const tests = await Test.find({ testName: { $regex: regex } })
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));
      return { count, tests };
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch tests!");
    }
  };
  
  // Fetch a single test by ID
  export const fetchTest = async (id) => {
    try {
      connectToDB();
      const test = await Test.findById(id);
      return test;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch test!");
    }
  };
// DUMMY DATA

// export const cards = [
//   {
//     id: 1,
//     title: "Employees",
//     number: User.countDocuments,
//     change: 12,
//   },
//   {
//     id: 2,
//     title: "Patient",
//     number: Patient.length,
//     change: -2,
//   },
//   {
//     id: 3,
//     title: "Test",
//     number: Test.length,
//     change: 18,
//   },
// ];
// export const fetchCardsData = async () => {
//   connectToDB();
  
//   try {
//     const userCount = await User.countDocuments();
//     const patientCount = await Patient.countDocuments();
//     const testCount = await Test.countDocuments();
    
//     const cards = [
//       {
//         id: 1,
//         title: "Employees",
//         number: userCount,
//         change: 12, // Or some dynamic value
//       },
//       {
//         id: 2,
//         title: "Patients",
//         number: patientCount,
//         change: -2, // Or some dynamic value
//       },
//       {
//         id: 3,
//         title: "Tests",
//         number: testCount,
//         change: 18, // Or some dynamic value
//       },
//     ];

//     return cards;
//   } catch (err) {
//     console.error(err);
//     throw new Error("Failed to fetch card data.");
//   }
// };
const getStartOfWeek = () => {
  const now = new Date();
  const firstDayOfWeek = now.getDate() - now.getDay(); // Sunday as the first day of the week
  return new Date(now.setDate(firstDayOfWeek));
};

const getEndOfWeek = () => {
  const now = new Date();
  const lastDayOfWeek = now.getDate() - now.getDay() + 6; // Saturday as the last day of the week
  return new Date(now.setDate(lastDayOfWeek));
};

export const fetchCardsData = async () => {
  connectToDB();
  
  try {
    const userCount = await User.countDocuments();
    
    // Get start and end of the current week
    const startOfWeek = getStartOfWeek();
    const endOfWeek = getEndOfWeek();

    // Count patients added or updated this week
    const patientCount = await Patient.countDocuments({
      createdAt: { $gte: startOfWeek, $lte: endOfWeek }
    });
    
    const testCount = await Test.countDocuments();
    
    const cards = [
      {
        id: 1,
        title: "Employees",
        number: userCount,
      },
      {
        id: 2,
        title: "Patients",
        number: patientCount,
      },
      {
        id: 3,
        title: "Tests",
        number: testCount,
      },
    ];

    return cards;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch card data.");
  }
};