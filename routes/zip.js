var http = require('http'), csv = require('csv'), redis = require("redis");

// set up redis client
var rtg = require("url").parse(process.env.REDISTOGO_URL);
var client = redis.createClient(rtg.port, rtg.hostname);
client.auth(rtg.auth.split(":")[1]);

client.on('error', function(err) {
  console.log(err);
});

// /zip/0556
exports.findById = function(req, res) {
    importToRedis();
    
    client.get(req.params.id, function(err, reply) {
        res.send(reply);
    });
};

// download csv file, parse the data and save zipcode and postal address to Redis
function importToRedis() {
    http.get('http://fil.nrk.no/yr/viktigestader/postnummer.txt', function(response){
        csv().from(response, {delimiter:"\t", columns: true}).to(console.log).transform(function(data, index){
            client.set(data.Postnr, data.Poststad, redis.print);
            return data.Postnr + " " + data.Poststad + "\n";
        }).on('end', function(){ console.log('done') });
    });
}