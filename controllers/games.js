var Game = require("../models/game")


module.exports = {
  index:            index,
  show:             show,
  create:           create,
  addInstruction:   addInstruction,
  destroy:          destroy
}

function index(req, res, next){
  console.log('index contoller function WORKED')
  Game.find({}, function(err, games){
    if(err) res.json(err);
    res.json(games)
  });
}

function show (req, res, next) {
  console.log("show controller")
  var id = req.params.id
  Game.find({_id: id}, function(err, game){
    if(err) res.json(err);
    res.json(game)
  });
}

function create (req, res, next) {
  console.log("create controller")
  var newGame = new Game(req.body);
  //the curr. user will be host of this game
  newGame.save(function(err, savedGame){
    if(err) res.json(err);
    res.json(savedGame);
  });
}

function addInstruction(req, res, next){
  console.log("Adding Instruction controller")
  var id = req.params.id
  Game.findById(id, function(err, game){
    if(err || !game){
      res.json(err)
    }else{
      var instruction = {
        task: req.body.task,
        level: req.body.level
      }
      game.instructions.push(instruction)
      game.save(function(err, updatedGame){
        if(err) res.json(err)
        console.log('Added Instruction')
        res.json(updatedGame)
      })
    }
  })
}

function destroy(req, res, next){
    var id = req.params.id
  console.log("Deleting game", id)
  Game.remove({_id: id}, function(err, game){
    if(err) res.json(err)
    res.json({message: "Game deleted", _id: id})
  })
}






