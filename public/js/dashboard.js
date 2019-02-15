function init(){
	$('#newOfferForm').append(offerForm)
	$('main').on('click','#submitNewOffer',function(e){
		e.preventDefault();
		$.ajax({

		})
	})

}

$(init())