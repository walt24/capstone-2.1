function init(){
	console.log('js launched')
	$.get('https://protected-tor-19699.herokuapp.com/dashboard/offers').done((data)=>{
		$('#offers').append(renderOffers(data));
	})

	$('#offers').on('click','#deleteOffer',function(e){
		e.preventDefault();
		let id = $(e.target).attr('data_id');
		
		$.ajax('https://protected-tor-19699.herokuapp.com/dashboard/offer',{
			method: 'post',
			data: {
				_id: id
			}
		}).done(function(data,status,xhr){
			window.location.replace('/dashboard')
		})
	})

}

function renderOffers(arr){
	let html = ""
	for(let x = 0; x < arr.length; x++){
		html+= `<p>Title: ${arr[x].title}</p>
						<p>Banner: ${arr[x].banner}</p>
						<p>Category: ${arr[x].category}</p>
						<a href='' id="deleteOffer" data_id=${arr[x]._id}>Delete Offer</a>
						<br>
						<br>
		`
	}
	return html
}
$(init())
