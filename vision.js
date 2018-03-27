var http = require('http');
var jsonexport = require('jsonexport');

module.exports = function (context, myBlob) {

    var visionApiKey = '<INSERT YOUR KEY HERE>';

    context.log("JavaScript blob trigger function processed image \n Name:", context.bindingData.name, "\n Image Size:", myBlob.length, "Bytes");
    var options = {
        host: 'northeurope.api.cognitive.microsoft.com',
        port: 80,
        path: '/vision/v1.0/analyze?visualFeatures=Tags,Faces,Categories,Description,Color',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': visionApiKey
        }
    };

    var visionReq = http.request(options, function(res) {
        res.on('data', function (chunk) {
            context.log('Response: ' + chunk);
            var jsonResponse = JSON.parse(chunk);
            jsonResponse.filename = context.bindingData.name;
            jsonResponse.uri = context.bindingData.uri;

            jsonexport(jsonResponse, {verticalOutput: false}, function(err, csv){
                if(err) return context.log(err);
                context.log(csv);
                context.bindings.outputBlob = csv;
                context.done();
            });
        });
    });

    // post the blob
    visionReq.write('{"url":"'+context.bindingData.uri+'"}');
    visionReq.end();
};