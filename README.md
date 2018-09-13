# trust_web

Just has a basic form for now. 

Basically the way it works is that each step of the form has a callback that it triggers to verify the data before proceeding to the next step. 

Usually I store all the form fields and validate them as they continue, and then the last step is to call a serverside function named 'CheckCaptcha' which verified their captcha as a part of the payload. I've included a template of that function as well for reference.

I'm not really sure what your data set will need to be like coming from the form but you should be able to follow the syntax. The main thing is that the angular controller has what's called a model, and anything in the model has to be declared as a sub-object of the `$scope` object.

EX: 
Declaration in the JS file:

`$scope.test = 'Lou';`

Then in the html you can write 

`<p>{{test}}<p>`

which will output 

`<p>Lou<p>`

# Recaptcha

I've also included a valid key for testing with the recaptcha script in checkCaptcha Template.js