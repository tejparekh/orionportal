/**
 * @author Tej Parekh 
 * @date 22 Aug 2015 
 * Custom Scripts for all the form handler and their validation through Jquery validation tags
 */
var click 	= false;
$(document).ready(function(){
	
	$(".submenu li a").each(function(){
        if($(this).attr("href")==window.location)

        	$(this).closest('li').addClass('active').parents('li').addClass("active open");
    })

})

$.validator.addMethod("noSpace", function(value, element) { 
     return value.indexOf(" ") < 0 && value != ""; 
  }, "Space are not allowed");
		
		$.validator.addMethod('mypassword', function(value, element) {
        return this.optional(element) || (value.match(/[a-zA-Z]/) && value.match(/[0-9]/));
}, 'Password must contain at least one numeric and one alphabetic character.');

$.validator.addMethod('filesize', function(value, element, param) {
	    // param = size (en bytes) 
	    // element = element to validate (<input>)
	    // value = value of the element (file name)
	    return this.optional(element) || (element.files[0].size <= param) 
});

$.validator.addMethod('futuredate', function(value, element, param) {
		
		if(new Date(value) >= new Date())
		{
			return false;
		}
		else
		{
			return true;
		}
},'Please enter a date that is less than today.');
$( "#subscriber-register-form" ).validate({
								  rules: { 
						  			first_name: "required",
						            last_name: "required",
						            
						            username: { required: true, noSpace: true },
									dob		  : {futuredate:true},										
						            password: {
						                required: true,
						                minlength: 6,
						                mypassword:true
						            },
						            password_confirmation: {
						                required: true,
						                minlength: 6,
						                equalTo : "#password"
						            },
						    		file: {
						      			accept: "image/*"
						    }
					  }
					});


/*Device Add new Page JS*/

$( "#device-register-form" ).validate({
								  rules: { 
										model         : "required",
										imei          : "required",
										build_number  : "required",
										os_version    : "required",	  			
										kernel_version: "required",	  			

					  }
					});
