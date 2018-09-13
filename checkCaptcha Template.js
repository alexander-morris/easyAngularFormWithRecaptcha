exports.checkCaptcha = function (req, res) {
    var response = req.body.response
    console.log(req.body);
    console.log("recaptcha response", response)

	    rp({
	        uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
	        method: 'POST',
	        formData: {
	            secret: '6LfdDHAUAAAAALbB27pRHZsUDLHBktCHO592oFSr',
	            response: response
	        },
	        json: true
	    }).then(result => {
	    	// return { error : NOT_AUTHENTICATED };
	        console.log("recaptcha result", result)
	        if (result.success) {
	        	console.log('success: true')
	            sendMail(req.body, res);	        	


	        } else {
	        	console.log('success: false')
	            return res.status(200).send("Recaptcha verification failed. Are you a robot?")
	        }

	    }).catch(reason => {
	        console.log("Recaptcha request failure", reason)
	        return ("Recaptcha request failed.")
	    })

}