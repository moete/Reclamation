const authenticate = require("../controllers/auth.controller");
const db = require("../models");
const User = db.user;
const Role = db.role;
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("../config/auth.config");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const moment = require("moment");

const ResetPassword = require("../models/resetPassword") ;
module.exports = function(app) {
  
  
  
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  router.post("api/auth/store-password", (req, res, next) => {
    //handles the new password from the front
    const userId = req.body.userId;
    const token = req.body.token;
    const password = req.body.password;
    ResetPassword.findOne({ userId: userId }).then(function(Resetpassword) {
      if (!ResetPassword) {
        next(Error("Invalid or expired reset token."));
      }
      bcrypt.compare(token, resetPassword.token, function(errBcrypt, resBcrypt) {
        // the token and the hashed token in the db are verified befor updating the password
        let expireTime = moment.utc(ResetPassword.expire);
        let currentTime = new Date();
        User.findById(userId)
          .then(user => {
            if (user != null) {
              user
                .setPassword(password)
                .then(user => {
                  user.save();
                  ResetPassword.deleteOne({ _id: ResetPassword._id })
                    .then(msg => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json({
                        success: true,
                        message: "Password Updated successfully."
                      });
                    })
                    .catch(err => {
                      next(err);
                    });
                })
                .catch(err => {
                  next(err);
                });
            }
          })
          .catch(err => {
            next(err);
          });
      });
    });
  });
  

  app.post('/api/auth/reset-password', function (req, res,next) {
    const email = req.body.email
    User
        .findOne({
            email: email,//checking if the email address sent by client is present in the db(valid)
        })
        .then(function (user) {
            if (!user) {
              next(Error("No user found with that email address."));
            }
            ResetPassword
                .findOne({
                userId: user._id,
                }).then(function (resetpassword) {
                if (ResetPassword)
                ResetPassword.deleteOne({
                        
                            _id: ResetPassword._id
                      
                    })
                token = crypto.randomBytes(32).toString('hex')//creating the token to be sent to the forgot password form (react)
                bcrypt
                .genSalt(10)
                .then(salt => {
                  bcrypt
                    .hash(token, salt, null)
                    .then(hash => {
                      //hashing the password to store in the db node.js
                      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                      var transporter = nodemailer.createTransport({
                        host: 'smtp.ethereal.email',
                        port: 587,
                        auth: {
                          user: 'immanuel.heaney88@ethereal.email',
                          pass: 'P4YBByFyGe8HKyM99N'
                      }
                    });
    
                      ResetPassword.create({
                        userId: user._id,
                        resetPasswordToken: hash,
                        expire: moment.utc().add(config.tokenExpiry, "seconds")
                      })
                        .then(function(item) {
                          if (!item)
                            return Error(
                              "Oops problem in creating new password record"
                            );
                          let mailOptions = {
                            from: config.emailUser,
                            to: user.email,
                            subject: "Reset your account password",
                            html:
                              "<h4><b>Reset Password</b></h4>" +
                              "<p>To reset your password, complete this form:</p>" +
                              '<a href="http://' +
                              config.clientUrl +
                              "reset?id=" +
                              user.id +
                              "&token=" +
                              token +
                              '">Click here to reset your password!</a>' +
                              "<br><br>" +
                              "<p>--Moetez & Mourad  Support</p>"
                          };
                          transporter
                            .sendMail(mailOptions)
                            .then(info => {
                              res.statusCode = 200;
                              res.setHeader("Content-Type", "application/json");
                              res.json({
                                success: true,
                                message: "Check your mail to reset your password."
                              });
                            })
                            .catch(err => {
                              next(err);
                            });
                        })
                        .catch(err => {
                          next(err);
                        });
                    })
                    .catch(err => {
                      next(err);
                    });
                })
            });
        })
 })
  
  //signup
  app.post(
    "/api/auth/signup",
       (req, res, next) => {
        User.register(
        new User({
          username: req.body.username,
          email: req.body.email,
        }),
        req.body.password,
        
        (err, user) => {
          if (err) {
            console.log(err);
            let message = "";
            if (err.message) message = err.message;
            if (err.errors) {
              Object.keys(err.errors).forEach(key => {
                message += err["errors"][key].message + " , ";
              });
            }
            res.statusCode = 403;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: { message: message } });
          } else {
            passport.authenticate("local")(req, res, () => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ success: true, status: "Registration Successful!" });
            });
          }
        }



  ) }); 

  app.post("/api/auth/signin", //controller.signin
  (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err); // will generate a 500 error
      }
      if (!user) {
        res.statusCode = 403;
        return res.send({ err: { message: "username or password are incorrect!" } });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        const token = authenticate.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        let user = req.user.toObject();
        delete user.hash;
        delete user.salt;
  
        return res.json({ success: true, token: token, user: user });
      });
    })(req, res, next);
  }

  );



  

}
