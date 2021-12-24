const config = {
    env: process.env.NODE_ENV || 'development',
    port : process.env.PORT || 3001,
    jwtScret : process.env.JWT_SECRET || "Your_secret_key",
    db_name : "eshopay",
    db_username : "postgres",
    db_password : "admin",
    URL_DOMAIN : ""
}

export default config