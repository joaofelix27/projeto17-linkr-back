export const authValidator = (schema) => {
    return (req,res,next) => {
        const { error } = schema.validate(req.body,{abortEarly:false});

        if(error) return res.status(422).send(error.details.map(detail => detail.message));

        next();
    }
}