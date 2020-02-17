const redirect = ({ status, url, res }) => res.redirect(status || 301, url);

export default redirect;
