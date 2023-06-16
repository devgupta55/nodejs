exports.error404 = (request, response, next) => {
    response.status(404).render('error404', {pageTitle: 'Page Not Found', path: null});
};