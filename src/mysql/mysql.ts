import * as Mysql from "mysql";

export default class DbWrapper {
    private static _instance:DbWrapper;

    cnn: Mysql.Connection;

    private connected:boolean = false;

    constructor() {
        this.cnn = Mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
        });

        this.connectDB();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }


    public static executeQuery(query: string, callback: Function) {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Query err', err);

                return callback(err);
            }

            if (results.length === 0) {
                callback('No data');
            }

            callback(null, results);
        });
    }

    private connectDB() {
        this.cnn.connect((err: Mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }

            this.connected = true;
            console.log('Connected to db')
        })
    }
}