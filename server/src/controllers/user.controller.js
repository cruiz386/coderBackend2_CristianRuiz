import Controllers from "./controller.manager.js";
import { userService } from '../services/user.service.js';
import { userDTO } from '../dtos/user.dto.js';
import { sendGmailRegister } from "../controllers/email.controller.js";

class UserController extends Controllers {
  constructor() {
    super(userService)
  }

  register = async (req, res, next) => {
    try {
      const user = await this.service.register(req.body);
      await sendGmailRegister({
        body: {
          dest: user.email,
          name: user.first_name,
        },
      }, res);

      res.render('profile', { user: user.toObject() });
    } catch (error) {
      next(error);
    }
  };


  login = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      res.cookie('token', token, { httpOnly: true });

      const user = await this.service.getUserByEmail(req.body.email);

      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.render('profile', { user: user.toObject() });
    } catch (error) {
      next(error);
    }
  };

  privateData = (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error("No se puede acceder a los datos del usuario");
      }

      const userData = userDTO(req.user);
      res.json({
        user: userData,
      });
    } catch (error) {
      next(error);
    }
  };

}

export const userController = new UserController();