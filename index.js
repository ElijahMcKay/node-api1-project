// implement your API here
const express = require('express'); 

const users = require('./data/db'); 

const server = express(); 

server.use(express.json()); 


// GET Requests
server.get("/api/users", (req, res) => {
    users.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(500).json({
          message: "Cannot access users data"
        });
      });
  });

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id; 
    users.findById(id)
        .then(user => {
            res.status(200).json(user); 
        })
        .catch(err => {
            res.status(500).json({
                message: "Cannot access user data"
            });
        })
})


// ============= POST Requests =============
server.post('/api/users', (req, res) => {
    
    users.insert(req.body) 
        .then(user => {
            res.status(201).json(user); 
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to add new user"
            }); 
        })
})

// ============ PUT Requests ==============
server.put('/api/users/:id', (req, res) => {
    users.update(req.params.id, req.body)
        .then(user => {
            res.status(201).json(user); 
        })
        .catch(err => {
            res.status(500).json({
                message: "Cannot access users data"
            });
        })

})

// =========== DELETE Requests =============
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    users.remove(id)
        .then(user => {
            res.status(201).json(user); 
            console.log(users); 
        })
        .catch(err => console.log(err)); 
})


server.listen(5000, () => console.log('API is running on port 5000!'))