import joi from "joi";

export const postSchema = joi.object({
    link: joi.string().uri().required(),
    body: joi.string().allow(null, ""),
    hashtags: joi.array().items(),
});
