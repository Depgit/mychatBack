const tokenobj = require('./middleware/jwt')

const Authentication = (req, res, next) => {
    const { user_id } = req.cookies;
    if (user_id == undefined) {
        res.send({isVarified: false, massage: 'user is not Authentication'});
    } else {
        const cookieobj = await tokenobj.VarifyToken(user_id);
        if (!cookieobj.isVarified) {
            res.send({isVarified: false})
        } else {
            next();
        }
    }
}

module.exports = Authentication;