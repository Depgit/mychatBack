const tokenobj = require('./middleware/jwt')
const fun = async () =>{
    const t = await tokenobj.VarifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ4dmlkZW9zNS5jb20iLCJpYXQiOjE2MTQyNzc5MjIsImV4cCI6MTYxNDI4ODcyMn0.WbrMQNuO1j9vYWmDEHLj0O2kqVnSPy2FoyxDoyPgQuk");
    console.log(t);
}
fun();
