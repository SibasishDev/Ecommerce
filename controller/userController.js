const User = require("../models/userModel");
const Uuid = require("../models/uuids.model");
const moment = require("moment");
const asyncHandler = require("express-async-handler");
const userValidation = require("../utils/user.validation");
const { success, error, validation } = require("../utils/response.handler");
const { encryptPassword, matchPassword } = require("../utils/bcrypt.service");
const {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.service");
const { createUuid } = require("../utils/uuid.service");
class userController {
  async createUser (req, res,next) {
    try {
      const { value, error } = await userValidation.userSchema.validateAsync(
        req.body
      );
      if (error) return res.status(400).json(validation(error));
      const findUser = User.findOne({ email: value.email });
      if (!findUser) {
        const password = encryptPassword(value.password);
        value.password = password;
        delete value.repeatPassword;
        const createUser = User.create(value);
        return res
          .status(200)
          .json(success("User Successfully Created", 201, createUser));
      } else {
        return res.status(400).json(error("User already exists", 403));
      }
    } catch (error) {
      next(error);
    }
  };

  userLogin = asyncHandler(async (req, res) => {
    try {
      const { value, error } = await userValidation.loginSchema.validateAsync(
        req.body
      );
      if (error) return res.status(400).json(validation(error));
      const checkExists = User.findOne({ email: value.email });
      if (!checkExists)
        return res.status(400).json(error("User not found", 404));
      const match = matchPassword({
        password: value.password,
        hash: checkExists.password,
      });

      if (!match)
        return res
          .status(400)
          .json(error("Worng password,Please try again.", 400));

      if (match) {
        const uuid = createUuid();

        const generateAccessToken = createAccessToken({
          user: checkExists,
          uuid,
        });

        const generateRefreshToken = createRefreshToken(uuid);

        const CREATED_AT = new Date().getTime();

        const EXPIRES_AT = CREATED_AT + 24 * 60 * 60 * 1000;

        const ifUuidExist = await Uuid.findOne({ userId: checkExists._id });
        if (!ifUuidExist) {
          const uuidCreate = new Uuid({
            userId: checkExists._id,
            uuid: [
              {
                _id: uuid,
                token: generateAccessToken,
                createdAt: CREATED_AT,
                expiresAt: EXPIRES_AT,
              },
            ],
          });

          const insertUuid = await uuidCreate.save();

          if (!insertUuid)
            throw new Error(
              `Error occurred in insert uuid  due to -- ${e.message}`
            );

          return res.status(200).json(
            success("Login successfull", 200, {
              id: checkExists._id,
              token: { generateAccessToken, generateRefreshToken },
            })
          );
        }

        const arr = ifUuidExist.uuid;

        arr.push({
          _id: uuid,
          token: accessToken,
          createdAt: CREATED_AT,
          expiresAt: EXPIRES_AT,
        });

        const updateUuid = await Uuid.updateOne(
          { _id: ifUuidExist._id },
          {
            $set: {
              uuid: arr,
            },
          }
        );

        if (updateUuid)
          return res.status(200).json(
            success("Login successfull", 200, {
              id: checkExists._id,
              token: { generateAccessToken, generateRefreshToken },
            })
          );

        throw new Error(`Something went wrong`);
      }
    } catch (e) {
      throw new Error(
        `Error occurred in userLogin function due to -- ${e.message}`
      );
    }
  });
}




module.exports = new userController();
