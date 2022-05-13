export default {
    auth(to, from, next)
    {
        const token = localStorage.token;
        if(!token)
        {
            next('/');
        }

        next();
        console.log(token);
        console.log(to, from, next)
    }
}