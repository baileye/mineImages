var http = require('https');
var jsonexport = require('jsonexport');

module.exports = function (context, myBlob) {

    var projectId = '<CUSTOM VISION PROJECT ID>'; 
    var predictionKey = '<CUSTOM VISION API KEY>';

    context.log("JavaScript blob trigger function processed image \n Name:", context.bindingData.name, "\n Image Size:", myBlob.length, "Bytes");
    var options = {
        host: 'southcentralus.api.cognitive.microsoft.com',
        path: '/customvision/v1.1/Prediction/'+projectId+'/url',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Prediction-key': predictionKey
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
    visionReq.write('{"Url":"'+context.bindingData.uri+'"}');
    visionReq.end();
};