import { where } from "sequelize";
import db from "../models/index";

const userValidate = {
  checkUserName: (username) => {
    if (!username) {
      return {
        EM: "Please enter your username!",
        EC: 1,
      };
    } else {
      return {
        EC: 0,
      };
    }
  },
  checkEmail: async (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.(com)$/;
    if (!email) {
      return {
        EM: "Please enter your email!",
        EC: 1,
      };
    }
    if (!regex.test(email)) {
      return {
        EM: "Incorrect email format!",
        EC: 1,
      };
    }
    const existed = await db.User.findOne({ where: { email: email } });
    if (existed) {
      return {
        EM: "The email address you entered is already in use. Please try a different email address!",
        EC: 1,
      };
    } else {
      return {
        EC: 0,
      };
    }
  },
  checkPhone: (phone) => {
    const regex = /^0[0-9]{9,10}$/;
    if (!phone) {
      return {
        EM: "Please enter your phone number!",
        EC: 1,
      };
    } else if (!regex.test(phone)) {
      return {
        EM: "A phone number that begins with 0 and is 10 or 11 digits long",
        EC: 1,
      };
    } else {
      return {
        EC: 0,
      };
    }
  },
  checkPassword: (password) => {
    if (!password) {
      return {
        EM: "Please enter your password!",
        EC: 1,
      };
    } else {
      return {
        EC: 0,
      };
    }
  },
  checkRegister: async (user) => {
    const userNameCheck = userValidate.checkUserName(user.username);
    if (userNameCheck.EC === 1) {
      return userNameCheck;
    }

    const emailCheck = await userValidate.checkEmail(user.email);
    if (emailCheck.EC === 1) {
      return emailCheck;
    }

    const phoneCheck = userValidate.checkPhone(user.phone);
    if (phoneCheck.EC === 1) {
      return phoneCheck;
    }

    const passwordCheck = userValidate.checkPassword(user.password);
    if (passwordCheck.EC === 1) {
      return passwordCheck;
    }
    return {
      EC: 0,
    };
  },
};
module.exports = userValidate;
