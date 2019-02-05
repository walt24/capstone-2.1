function init(){
	console.log("Jquery init called")
	clearOfferDiv();
	clearOffersDiv();
	
	$.get('http://protected-tor-19699.herokuapp.com/offers',function(data,status,xhr){
		if(data){
			loadOffers(data)
		}
	});


	$("#allOffers").on("click",function(event){
		event.preventDefault();
		clearOfferDiv();
		clearOffersDiv();
		$.get('http://protected-tor-19699.herokuapp.com/offers',function(data,status,xhr){
			if(data){
				loadOffers(data)
			}
		});
	})

	$("#form1").on("submit",function(event){
		event.preventDefault();
		console.log("Form submitted")
		clearOfferDiv();
		clearOffersDiv();
		let category = $("#searchKey").val();
		let search = $("input[name='searchVal']").val();
		$.get(`http://protected-tor-19699.herokuapp.com/offers/${category}-${search}`,function(data,status,xhr){
			if(data){
				loadOffers(data)
			}
		});
	})


	$("main").on("click",".singleOffer",function(event){
		event.preventDefault();
		clearOfferDiv()
		clearOffersDiv()
		let _id = $(this).attr("data-id");
		$.get(`http://protected-tor-19699.herokuapp.com/offer/${_id}`,function(data,status,xhr){
			if(data){
				singleoffer(data)
			}
		});
	})

	$("main").on("click",".searchByCategory",function(event){
		event.preventDefault();
		clearOfferDiv()
		clearOffersDiv()
		let category = $(this).text()
		console.log(category)
		$.get(`http://protected-tor-19699.herokuapp.com/offers/category-${category}`,function(data,status,xhr){
			if(data){
				loadOffers(data)
			}
		});
	})

	$("main").on("click",".searchByLocation",function(event){
		event.preventDefault();
		clearOfferDiv()
		clearOffersDiv()
		let location = $(this).text()
		$.get(`http://protected-tor-19699.herokuapp.com/offers/location-${location}`,function(data,status,xhr){
			if(data){
				loadOffers(data)
			}
		});
	})
	

	let basePicUrl = "https://picsum.photos/250/?image="

	function clearOffersDiv(){
		$("#offersDiv").html("")
	}
	function clearOfferDiv(){
		$("#offerDiv").html("")
	}


	function singleoffer(offer){
		$("#offerDiv").append(`
				<div class="offer">
					<div class="offerTitle">
						<a href="" class="singleOffer" data-id ="${offer._id}"><h4>${offer.title}</h4></a>
					</div>
					<div class="offerImage">	
						<img src="${basePicUrl}">
					</div>
					<div class="offerDescription">		
						<p>${offer.description}</p>
					</div>
					<div class="OfferLocation">
						<p>${offer.location}</p>
					</div>
					<div class="offerCategories">
						<a href="" class="searchByCategory">${offer.category}</a>
					</div>
				</div>
				`)
	}
	
	function loadOffers(offer){
		for(let x = 0; x < offer.length; x++){
			let randomPicUrl = `${basePicUrl}${x+1}`;
			$("#offersDiv").append(`
				<div class="offer">
					<div class="offerTitle">
						<a href="" class="singleOffer" data-id ="${offer[x]._id}"><h4>${offer[x].title}</h4></a>
					</div>
					<div class="offerImage">	
						<img src="${randomPicUrl}">
					</div>
					<div class="offerBanner">		
						<p>${offer[x].banner}</p>
					</div>
					<div class="OfferLocation">
						<p><a href="" class="searchByLocation">${offer[x].location}</a></p>
					</div>
					<div class="offerCategories">
						<a href="" class="searchByCategory">${offer[x].category}</a>
					</div>
				</div>
				`)
		}
	}
}

$(init())