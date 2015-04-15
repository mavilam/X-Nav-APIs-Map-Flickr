var map;

function chooseAddr(lat, lng, type) {
		var location = new L.LatLng(lat, lng);
		map.panTo(location);

		if (type == 'city' || type == 'administrative') {
		    map.setZoom(11);
		} else {
		    map.setZoom(13);
		}
		addimgs();
}

function addimgs(){

	$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?&tagmode="+$('#searchButt').val()+"&format=json&jsoncallback=?",function(data){
		
		for(i in data.items){
			
			html= "<button type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target=#pic"+i+">Pic</button>";

			html+= "<div class='modal fade' id=pic"+i+" tabindex='-1'role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>";
			html+="<div class='modal-dialog'>";
			html+="<div class='modal-content'>";
			html+="<div class='modal-header'>";
			html+="<h4>"+data.items[i].title+"";
			
			html+="<div class='modal-body'>";
			html+="<img src="+data.items[i].media.m+">";

			

			$("#imgs").append(html);
			if(i == 4){
				break;
			}
		}
	});
}

$(document).ready(function() {
	map = L.map('map');

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18
	}).addTo(map);

	map.setView([40.2838, -3.8215], 15);

	 
	function popUpName(feature, layer) {
	
		if (feature.properties && feature.properties.Name) {
			layer.bindPopup(feature.properties.Name);
		}
	}


	$("#searchButt").click(function(){

  		$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + $("#addr").val(), function(data) {
  			var items = [];

			$.each(data, function(key, val) {
			  items.push(
			    "<li><a href='#' onclick='chooseAddr(" +
			    val.lat + ", " + val.lon + ");return false;'>" + val.display_name +
			    '</a></li>'
			  );
			});


			$('#results').empty();
		    if (items.length != 0) {
		      $('<p>', { html: "Search results:" }).appendTo('#results');
		      $('<ul/>', {
		        'class': 'my-new-list',
		        html: items.join('')
		      }).appendTo('#results');
		    } else {
		      $('<p>', { html: "No results found" }).appendTo('#results');
		    }
		  
		});	

  	});	


   
});