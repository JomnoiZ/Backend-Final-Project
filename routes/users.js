const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const usersController = require('../controllers/users');

/**
* @swagger
* tags:
*   name: Users
*   description: User management API endpoints
*/

/**
* @swagger
* components:
*   schemas:
*     UpdateUser:
*       type: object
*       properties:
*         name:
*           type: string
*           description: Name of user
*         email:
*           type: string
*           description: Email of user
*         tel:
*           type: string
*           description: Telephone number of user
*         oldPassword:
*           type: string
*           description: Old password of user 
*         newPassword:
*           type: string
*           description: New password of user 
*         confirmNewPassword:
*           type: string
*           description: Confrm new password of user 
*/

/**
* @swagger
* /users:
*   patch:
*     summary: Update user
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UpdateUser'
*     responses:
*       200:
*         description: User updated successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   $ref: '#/components/schemas/User'
*       401:
*         description: Unauthorized
*       404:
*         description: User not found
*/

router.route('/')
  .patch(protect, usersController.updateUser);

module.exports = router;