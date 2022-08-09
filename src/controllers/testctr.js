export async function hello(req,res){
    try {
        res.status(200).send('hello');
    } catch (error) {
        res.sendStatus(500);
    }
}