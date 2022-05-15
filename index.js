const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

// Declare board Object
const boardSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

let connection = null;
const connect = () => {
  if (connection && mongoose.connection.readyState === 1) {
    return Promise.resolve(connection);
  } else {
    return mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(
      conn => {
        connection = conn;
        return connection;
      }
    );
  }
};

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let operation = event.httpMethod;
  let Board = mongoose.model('board', boardSchema);
  let proxy, password;
  switch (operation) {
    case 'POST':
      /*
        path: /board
        param: {"name", "content", "password"}
        Write post
      */
      let lastId = 0; // post id of latest post
      connect().then(() =>
        Board.findOne({})
          .sort({id: -1})
          .exec(function(err, board) {
            if (err) {
              context.done(null, {
                'statusCode': 500,
                'body': err
              });
            } else {
              lastId = board ? board.id : 0;
              const { name, content, password } = 
                JSON.parse(event.body);
              const newBoard = new Board({
                name, content, password
              });
              newBoard.date = new Date(); // required
              newBoard.id = lastId + 1;   // required
              // Make new post
              newBoard.save(function(err,board) {
                if (err) {
                  callback(null, {
                    'statusCode': 500,
                    'body': err
                  });
                } else {
                  callback(null, {
                    'statusCode': 200,
                    'body': JSON.stringify(lastId + 1)
                  })
                }
              })
            }
          })
      );
      
      
      break;
    case 'GET':
      /*
        path: /board
        Calls all post info
      */
      if (event.pathParameters === null) {
        let query = {};
        if (event.queryStringParameters !== null) {
          if (event.queryStringParameters.name) {
          query.name = {
            $regex:event.queryStringParameters.name,
            $option: 'i'
          };
          }
          if (event.queryStringParameters.content) {
            query.content = {
              $regex:event.queryStringParameters.content,
              $option: 'i'
            };
          }
        }
        
        // Show search results in descending order
        connect().then(() => {
          Board.find(query)
            .select("-password")
            .sort({id: -1})
            .exec(function(err, boards) {
              if (err) {
                callback(null, {
                  'statusCode': 500,
                  'body': err
                });
              } else {
                callback(null, {
                  'statusCode': 200,
                  'body': JSON.stringify(boards)
                });
              }
            })
        });
      }
      
      /* 
        path: /board
        Calls specific post info
      */
      else {
        proxy = event.pathParameters.proxy;
        connect().then(() => {
          Board.findOne({id:proxy})
            .select("-password")
            .sort({id: -1})
            .exec(function(err, board) {
              if (err) {
                callback(null, {
                  'statusCode': 500,
                  'body': err
                });
              } else if (!board) {
                // ie. invalid id
                callback(null, {
                  'statusCode': 500,
                  'body': JSON.stringify("Board not found.")
                });
              } else {
                callback(null, {
                  'statusCode': 200,
                  'body': JSON.stringify(board)
                });
              }
            })
        });
      }
      break;
    case 'PUT':
      /*
        path: /board/:id
        header: password: "current password"
        param: {"name", "content", "password"}
        Edits a post
      */
      proxy = event.pathParameters.proxy;
      password = event.headers.password;
      // Find post with id
      proxy = event.pathParameters.proxy;
      connect().then(() => {
        Board.findOne({id:proxy})
          .exec(function(err, board) {
            if (err) {
              callback(null, {
                'statusCode': 500,
                'body': err
              });
            } else if (!board) {
              // ie. invalid id
              callback(null, {
                'statusCode': 500,
                'body': JSON.stringify("Board not found.")
              });
            } else {
              if (board.password !== password) {
                callback(null, {
                  'statusCode': 500,
                  'body': JSON.stringify("Password is incorrect.")
                });
              } else {
                const { name, content, password } =
                  JSON.parse(event.body);
                Board.findOneAndUpdate({id:proxy},
                  {name, content, password}
                ).exec(function(err, board) {
                  if (err) {
                    callback(null, {
                      'statusCode': 500,
                      'body': err
                    });
                  } else {
                    callback(null, {
                      'statusCode': 200,
                      'body': JSON.stringify('Success')
                    });
                  }
                })
              }
            }
          })
        });
      break;
    case 'DELETE':
      /*
        path: /board/:id
        header: password: "current password"
        Deletes a post
      */
      proxy = event.pathParameters.proxy;
      password = event.headers.password;
      // find post with id
      connect().then(() => {
      Board.findOne({id:proxy})
        .exec(function(err, board) {
          if (err) {
            callback(null, {
              'statusCode': 500,
              'body': err
            });
          } else if (!board) {
            // ie. invalid id
            callback(null, {
              'statusCode': 500,
              'body': JSON.stringify("Board not found.")
            });
          } else {
            if (board.password !== password) {
              callback(null, {
                'statusCode': 500,
                'body': JSON.stringify("Password is incorrect.")
              });
            } else {
              Board.findOneAndRemove(
                {id:proxy}
              ).exec(function(err, board) {
                if (err) {
                  callback(null, {
                    'statusCode': 500,
                    'body': err
                  });
                } else {
                  callback(null, {
                    'statusCode': 200,
                    'body': JSON.stringify('Success')
                  });
                }
              })
            }
          }
        })
      });
      break;
    default:
      callback(new Error(`Unrecognized operation "${operation}"`));
  }
};