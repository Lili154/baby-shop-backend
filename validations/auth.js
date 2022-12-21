import { body }  from 'express-validator';

export const loginValidation = [
	body('email', 'Format is wrong').isEmail(),
	body('password', 'Password must have at least 5 characters').isLength({ min: 5 }),
  ];

export const registerValidation = [
	body('email','Format is wrong').isEmail(),
	body('password','Password must have at least 5 characters ').isLength({min:5}),
	body('name','Enter your name').isLength({min:3}),
	body('lastName','Enter your last name').isLength({min:3}),
	body('userName','Enter your user name').isLength({min:3})
];

export const productCreateValidation = [
	body('title').isLength({ min: 3 }).isString(),
	body('desc').isLength({ min: 3 }).isString(),
	body('price').optional().isString(),
	body('count').optional().isString(),
  ];