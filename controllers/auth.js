exports.getLogin = (request, response, next) => {
    // const isLoggedIn = request
    // .get('Cookie')
    // .split(';')[0]
    // .trim()
    // .split('=')[1];
    console.log(request.session.isLoggedIn);
    response.render('auth/login', {
        path : "/login",
        pageTitle : 'Login',
        isAuthenticated: false
    })
}

exports.postLogin = (request, response, next) => {
    request.session.isLoggedIn = true;
    response.redirect('/');
}
