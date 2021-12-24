const configdb = {
    database: 'd4pqtbf2ccbeto',
    username: 'xiyepkihcpaunc',
    password: '7a691a6969b5c569f6c56b8e95440d3d94c36c46e93ef20550163875cf741741',
    host: 'ec2-184-73-25-2.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default configdb