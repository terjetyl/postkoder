var http = require('http'), csv = require('csv'), redis = require("redis");

var client = redis.createClient(9707, "spadefish.redistogo.com");
client.auth("01572d665d1588b325a694b83d1a2b5b", function() {console.log("Connected!");});

client.on('error', function(err) {
  console.log(err);
});

exports.findAll = function(req, res) {
    res.send("all");
};
 
exports.findById = function(req, res) {
    client.get(req.params.id, function(err, reply) {
        res.send(reply);
    });
};

function importToRedis() {
    http.get('http://fil.nrk.no/yr/viktigestader/postnummer.txt', function(response){
        csv().from(response, {delimiter:"\t", columns: true}).to(console.log).transform(function(data, index){
            
            client.set(data.Postnr, data.Poststad, redis.print);
            return data.Postnr + " " + data.Poststad + "\n";
        }).on('end', function(){ console.log('done') });
    });
}