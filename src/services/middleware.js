export default {
    auth(to, from, next)
    {
        console.log(to);

        const token = localStorage.token;
        if(!token)
        {
            next('/');
        }

        next();
    },

    redirectIfAuth(to, from, next)
    {
        const token = localStorage.token;
        if(token)
        {
            next('/home');
        }

        next();
    }
}