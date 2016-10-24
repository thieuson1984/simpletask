var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://sonson:son123@ds031893.mlab.com:31893/taskmanager_db', ['tasks']);

//Basic function
//Get all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

//Get single task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
}); 

//Save task
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({'message':'Nothing to add!'});
    }else{
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json({'task': task, 'message':'Added new task!'});
        });
    }
});

//Delete task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json({
            'deletedId':req.params.id,
            'message':'Task has been deleted!'
        });
    });
});

//Update task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};

    if(task.isDone){updTask.isDone = task.isDone}

    if(task.title){updTask.title = task.title}

    if(!updTask){
        res.status(400);
        res.json({'message':'Nothing to update'});
    }else{
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }
            if(updTask.isDone == true){
                res.json({'message':'Task completed!'});
            }else{
                res.json({'message':'Task recovered!'});
            }
        });
    }

});

module.exports = router;