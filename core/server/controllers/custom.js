/**
 * Custom Controller for Ghost Frontend
 */

var mailer      = require('../mail'),
	errors      = require('../errorHandling'),
	config      = require('../config'),
	customControllers;

customControllers = {
	'github': function (req, res, next) {
        var spawn = require('child_process').spawn,
            deploy = spawn('sh', [ config().paths.corePath+'/github/deploy.sh' ]);

        console.log(req.body)
        deploy.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });
    },
    'about': function (req, res, next) {
        res.sendfile(config().paths.contentPath+'/static/about.html');
    },
    'doContact': function (req, res, next) {
        var message = {
            to: config().adminEmail,
            subject: 'New Contact',
            html: ''
        };

        if(req.body.name&&req.body.email&&req.body.message) {
            message.html = '<p><strong>Hello!</strong></p>' +
                      '<p>Someone has contacted you! Here is the info:</p>' +
                      '<p><strong>Name:</strong> '+req.body.name+'<br/>' +
                      '<strong>Email:</strong> '+req.body.email+'<br/>' +
                      '<strong>Message:</strong> '+req.body.message+'</p>' +
                      '<p>LM-Ghost</p>';
            mailer.send(message).otherwise(function (error) {
                errors.logError(
                    error.message,
                    "Unable to send new contact email.",
                    "This error was generated on the doContact method in the frontend controller."
                );
            });
            res.json(200, {message: 'Email was sent!', error: 0});
        } else {
            res.json(200, {message: 'There was an error', error: 1});
        }
    }
};

module.exports = customControllers;