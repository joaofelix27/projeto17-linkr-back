import joi from 'joi';

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    picture: joi.string()
    .pattern(new RegExp('\.(jpg|jpeg|png|webp|avif|gif|svg)$'))
    .required()
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})