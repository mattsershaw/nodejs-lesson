const Todo = require('../model/Todo');

const TodoRepository = function(connection) {
    this.connection = connection;
}

TodoRepository.prototype.getAll = async function() {
    const sql = 'select * from todos';

    // axios.get('url').then(() => {})

    // const result = await axios.get('url');
    
    return new Promise((resolve, reject) => {　 // axiosのような自前関数
        // if (err) {
        //     reject('error!!!')
        // }else {
        //     resolve('success!!');
        // }
        this.connection.query(sql, (err, results) => {
            if (err) return reject(err.message);

            const todos = results.map((todo) => new Todo(todo.id, todo.title, todo.description));
            
            return resolve(todos);

            // const todo = new Todo(results[0].id, rsults[0].title, results[0].description) // 'モデルが入る'

            // {
            //     reject(err.message);
            // } else {
            //     resolve(results);
            // }
        });
    });

    // promise.then((result) => {

    // }).catch((err)=>{

    // })

    
}

TodoRepository.prototype.get = function(id) {
    const sql = 'select * from todos where ?';
    
    return new Promise((resolve, reject) => {
        this.connection.query(sql, {id: id}, (err, results) => {
            if (err) return reject(err.message);
            if(results.length !== 1) return reject(('not data'));

            const todo = new Todo(results[0].id, results[0].title, results[0].description);
            return resolve(todo);

            // const todos = results.map((todo) => new Todo(todo.id, todo.title, todo.description));
            // return resolve(todos);
        });
    });
}

TodoRepository.prototype.create = function(todo) {
    const sql = 'insert into todos set ?';

    delete todo.id;
    
    
    return new Promise((resolve, reject) => {
        this.connection.query(sql, todo, (err, result) => {
            return err ? reject(err.message) : resolve(result.insertId); // 下の2行と内容同じ
            // if (err) return reject(err.message);
            // return resolve(result, insertId);
        });
    });
}

TodoRepository.prototype.update = function(todo) {
    const sql = 'update todos set ? where ?';
    const id = todo.id;
    delete todo.id;
    return new Promise((resolve, reject) => {
        this.connection.query(sql, [todo, {id: id}], (err, result) => {
            return err ? reject(err.message) : resolve(result);
        });
    });
}

TodoRepository.prototype.delete = function(id) {
    const sql = 'delete from todos where ?';
    return new Promise((resolve, reject) => {
        this.connection.query(sql, {id: id}, (err, result) => {
            return err ? reject(err.message) : resolve(result);
        });
    });
}

module.exports = TodoRepository;