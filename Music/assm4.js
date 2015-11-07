var names = [];
var realnames = [];
var tracksort = [];
var realtracks = [];
var headliners = [];
var realhead = [];
function initialise()
{
	
	setupAjax();
	
}

/*---------SetupAjax------------*/

function setupAjax()
{
	/*-------get the elements------*/
	var elem = document.getElementById("artist");
	var elemtracks = document.getElementById("track");
	var elemevent = document.getElementById("events");
	var elemhome = document.getElementById("home");
	var elemsearch = document.getElementById("search");
	var elemsearch1 = document.getElementById("subtitleart");
	var elemsearch2 = document.getElementById("subtitletrack");
	var elemsearch3 = document.getElementById("subtitleev");
	var elemsort = document.getElementById("sort1");
	var elemsortracks = document.getElementById("sort2");
	var elemsortevent = document.getElementById("sort3");
	var elemli = document.getElementById("li1");
	var elemlitracks = document.getElementById("li2");
	var elemlievent = document.getElementById("li3");
	
	/*---set attributes on some of them ---*/
	elemsearch2.setAttribute("onclick","SearchMe(this)");
	elemsearch1.setAttribute("onclick", "SearchMe(this);");
	elemsearch3.setAttribute("onclick", "SearchEvent();");
	elemhome.setAttribute("onclick", "openHome();");
	elemsearch.setAttribute("onclick", "Search();");


	/*---set function onclick on the elements---*/
	elemsort.onclick = function() { requestData("topartists.json", SortArtists); };
	elemsortracks.onclick = function() { requestData("toptracks.json", SortTracks); };
	elemsortevent.onclick = function() { requestData("events.xml", SortEvent); };
	elem.onclick = function() { requestData("topartists.json", loadArtistsJSON); };
	elemtracks.onclick = function() { requestData("toptracks.json", loadTracksJSON); };
	elemevent.onclick = function() { requestData("events.xml", loadEventsXML); };
	elemli.onclick = function() { requestData("topartists.json", loadArtistsJSON); };
	elemlitracks.onclick = function() { requestData("toptracks.json", loadTracksJSON); };
	elemlievent.onclick = function() { requestData("events.xml", loadEventsXML); };

	

}

/*--------------SortArtists------------*/
function SortArtists(xmlhttp)
{
	var ol = document.getElementById("topart");

	/*--remove child nodes--*/
	while (ol.childNodes.length > 0) {
		ol.removeChild(ol.firstChild);
	}

	var jsondoc = JSON.parse(xmlhttp.responseText);
	names.sort(); /*-----sort the array with names----*/
	var sortarts = jsondoc.artists.artist;
	/*-----compare the sorted names with their original order----*/
	for(var i = 0 ; i<names.length;i++)
	{
		for(var j=0;j<realnames.length;j++)
		{

			if(realnames[j].indexOf(names[i]) > -1)
			{
				/*---upload them in their sorted order---*/
				var liimage = createImage(sortarts[j].image[2]["#text"]);
				var li = createArtist(names[i], sortarts[j].listeners, sortarts[j].playcount, sortarts[j].url,j);
				liimage.style.margin = "30px 0px";
				li.style.padding ="50px 0px";
				li.style.margin = "60px 100px";
				var div = createDiv(liimage,li,j);
				div.style.margin = "85px 0px";
				ol.appendChild(div);
				
			}
		}
	}
}
/*-----Sort tracks------*/
function SortTracks(xmlhttp)
{
	var ol = document.getElementById("toptrack");

	while (ol.childNodes.length > 0) {
		ol.removeChild(ol.firstChild);
	}
	var jsondoc = JSON.parse(xmlhttp.responseText);
	tracksort.sort();/*-----sort the array with tracks----*/
	var sorttracks = jsondoc.tracks.track;
	/*-----compare the sorted tracks with their original order----*/
	for(var i = 0 ; i<tracksort.length;i++)
	{
		for(var j=0;j<realtracks.length;j++)
		{

			if(realtracks[j].indexOf(tracksort[i]) > -1)
			{
				/*---upload them in their sorted order---*/
				var div = createTrack(tracksort[i], sorttracks[j].listeners, sorttracks[j].playcount,j);
				ol.appendChild(div);
				
			}
		}
	}
	for(var j=0; j<ol.childNodes.length; j=j+2)
	{
		ol.childNodes[j].style.backgroundColor = "#cccccc";
	}
}
/*-----Sort Events------*/
function SortEvent(xmlhttp)
{
	var ul = document.getElementById("topevent");

	while (ul.childNodes.length > 0) {
		ul.removeChild(ul.firstChild);
	}
	
	var br=1;
	
	var xmldoc = xmlhttp.responseXML;
	var events = xmldoc.getElementsByTagName("event");
	headliners.sort();/*-----sort the array with headliners----*/

	/*-----compare the sorted tracks with their original order----*/
	for(var i = 0 ; i<headliners.length;i++)
	{
		for(var j=0;j<realhead.length;j++)
		{

			if(realhead[j].indexOf(headliners[i]) > -1)
			{
				/*---upload them in their sorted order---*/
				var artist = events[j].getElementsByTagName("artist");
				var headliner = events[j].getElementsByTagName("headliner");
				var date = events[j].getElementsByTagName("startDate")[0].innerHTML;
				var url = events[j].getElementsByTagName("url")[0].innerHTML;
				var tags = events[j].getElementsByTagName("tags");
		
				var img = document.createElement("img");
				if(br>5)
				{
					br=1;
				}
	
				img.src = "music"+br+".png";
					br++;
				img.className = "music";

				var li = createEvents(artist,headliner,date, url, tags, img);
				ul.appendChild(li);
				
			}
		}
	}
}

/*------searchs for tags and name of artists in the event block----*/
function SearchEvent()
{
	var something;
		something = prompt("Enter a word", "word");
		var divs = document.getElementsByClassName("eventblock");
		for(var q=0; q<divs.length;q++)
		{
			/*------make of the divs invisible----*/
			divs[q].style.display="none";
		}
		if(something!=null)
		{
				
		for (var i=0;i<divs.length;i++)
		{

			var span = divs[i].getElementsByClassName("artists");
			var tag = divs[i].getElementsByClassName("tags");
			for(var j=0;j<span.length;j++)
			{
				if(span[j].innerHTML.toLowerCase().indexOf(something.toLowerCase()) > -1)
				{
					/*------show the divs we are searching for----*/
					divs[i].style.display="block";	
				}

			}

			for(var z=0;z<tag.length;z++)
			{
				if(tag[z].innerHTML.toLowerCase().indexOf(something.toLowerCase()) > -1)
				{ 
					/*------show the divs we are searching for----*/
					divs[i].style.display = "block";
				}
			}
		}
				
	 	}
}
/*------search method for tracks and artists-------*/
function SearchMe(blq)
{
	var something;
		something = prompt("Enter a word", "word");
		var divs;
		
		if(blq.innerHTML.toLowerCase().indexOf("artist") > -1)
		{
			
			divs = document.getElementsByClassName("divartists");
		}
		else if(blq.innerHTML.toLowerCase().indexOf("track") > -1) 
		{
		
			  divs = document.getElementsByClassName("divtracks");
			}
		
		
		if(something!=null)
		{
				
		for (var i=0;i<divs.length;i++)
		{

			var span = divs[i].getElementsByClassName("name")[0];
			if(span.innerHTML.toLowerCase().indexOf(something.toLowerCase()) > -1)
				{

					divs[i].style.display="block";
				
						
				}
				else
				{
					divs[i].style.display="none";
					
				}


			}
				
	 	}
}
/*-------search for title--------*/
function Search()
	{
		var something;
		something = prompt("Search an article", "word");
		var h3 = document.getElementsByTagName("h3");
	
		for (var i=0;i<h3.length;i++)
		{
			
			if(something!=null)
			{
				if(h3[i].innerHTML.toLowerCase().indexOf(something.toLowerCase()) > -1)
				{

						if(h3[i].id=="somename2")
						{
							alert(h3[i].innerHTML);	
							requestData("toptracks.json", loadTracksJSON);

						}
						else if(h3[i].id=="somename1")
						{
							alert(h3[i].innerHTML);
							requestData("topartists.json", loadArtistsJSON);

						}
						else if(h3[i].id=="somename3")
						{
							alert(h3[i].innerHTML);
							requestData("events.xml", loadEventsXML);
						}
						
					}

				}
				
			}
	
	}
/*------hide everything else when you open home page-----*/
function openHome()
{
	
	document.getElementById("artists").style.display="none";
	document.getElementById("eventsid").style.display="none";
	document.getElementById("tracks").style.display="none";
	document.getElementById("homediv").style.display="block";
}
/*------ create artists by given name, listeners, playcount, url ------*/
function createArtist(name, listeners, playcount, url,i)
{
	var li = document.createElement("li");
	li.className = "topartists";
	li.id = name;
	li.appendChild(createSpan("name", name));
	li.firstChild.innerHTML =(i+1) +". "+ name; 
	li.appendChild(createUl(name,listeners,playcount,url));

	return li;
}
/*------ create tracks by given name, listeners, playcount i ------*/
function createTrack(name, listeners, playcount,i)
{
	var div = document.createElement("div");
	div.className="divtracks";
	var li = document.createElement("li");
	li.className = "toptracks";
	li.id = name;
	li.appendChild(createSpan("name", name));
	li.firstChild.innerHTML = (i+1)+". "+name;
	li.appendChild(createUlTrack(listeners,playcount));
	
	div.appendChild(li);
	return div;
}

/*------- create list for the tracks------*/
function createUlTrack(listeners,playcount)
{
	var ul = document.createElement("ul");
	ul.className = "ultracks";
	var arguments = [listeners, playcount];
	var strings = ["listeners", "playcount"]
	for(var q=0;q<arguments.length;q++)
	{
		var li = document.createElement("li");
		li.appendChild(createSpan(strings[q], arguments[q]));
		ul.appendChild(li);
	}
	return ul;
}

/*-------create events-------*/
function createEvents(artist, headliner, date, url, tags, img)
{
	var div = document.createElement("div");
	div.className="eventblock";
	var ul = document.createElement("ul");
	var li = document.createElement("li");
	var mainli = document.createElement("li");
	ul.className = "topevents";
	div.appendChild(img);
	for(var j=0; j<artist.length;j++)
	{
		
			if(j==0)
			{
				li.appendChild(createSpan("artists" , artist[j].innerHTML));
			}
			else li.appendChild(createSpanArt(", ", artist[j].innerHTML));

		
	}
	ul.appendChild(li);
	var li1 = document.createElement("li");
	li1.appendChild(createSpan("headliner", headliner[0].innerHTML));
	
	ul.appendChild(li1);
	var li2 = document.createElement("li");
	li2.appendChild(createSpan("date", date));
	ul.appendChild(li2);
	var li3 = document.createElement("li");
	li3.appendChild(createURL("website", url));
	ul.appendChild(li3);
	if(tags.length>0)
	{
	var li4 = document.createElement("li");
		for(var i=0; i<tags.length;i++)
		{
			
				li4.appendChild(createSpan("tags", tags[i].innerHTML));
			

		}
		ul.appendChild(li4);
	}
	
	mainli.appendChild(ul);
	div.appendChild(mainli);
	

	return div;
}

/*-------creates the different links ------*/
function createURL(urltext, url)
{
	var a = document.createElement("a");
	a.href = url;
	a.className = urltext;
	a.innerHTML =  "Official website";
	return a;
}

/*-------creates separate span for the artists------*/
function createSpanArt(comma, text)
{
	var span = document.createElement("span");
	span.className = "artists";
	span.innerHTML = comma + text;
	return span;
}

/*------creates list for the artists------*/
function createUl(name,listeners,playcount, url)
{
	var ul = document.createElement("ul");
	var arguments = [listeners, playcount];
	var strings = ["listeners", "playcount"]
	var br=0;
	
	for(var q=0;q<arguments.length;q++)
	{
		br = br+20;
		var li = document.createElement("li");
		li.appendChild(createSpan(strings[q], arguments[q]));
		li.style.padding = "0px " + br + "px";
		ul.appendChild(li);
	}
	var li1 = document.createElement("li");
	li1.style.padding = "0px 60px";
	li1.appendChild(createURL(name,url));
	ul.appendChild(li1);
	return ul;
}

/*------creates span-------*/
function createSpan(className, text)
{
	var span = document.createElement("span");
	span.className = className;
	var name = className.charAt(0).toUpperCase() + className.substr(1);
	span.innerHTML = name + ": " + text;
	return span;
}

/*-----creates tag for the image-----*/
function createImage(image)
{
	var img = document.createElement("img");
	img.className = "classart";
	img.src = image;
	return img;
}

/*-------creates div tag--------*/
function createDiv(image ,li,i )
{
	var div = document.createElement("div");
	div.className = "divartists";
	div.id = "divartists" + i;
	div.appendChild(image);
	div.appendChild(li);
	var hr = document.createElement("hr");
	div.appendChild(hr);
	return div;
}

/*--------load artists using JSON--------*/
function loadArtistsJSON(xmlhttp)
{
	document.getElementById("artists").style.display="block";
	document.getElementById("eventsid").style.display="none";
	document.getElementById("tracks").style.display="none";
	document.getElementById("homediv").style.display="none";
	
	var ol = document.getElementById("topart");
	var iddiv = document.getElementById("title1");
	iddiv.style.display = "block";
	document.getElementsByClassName("sorting")[0].style.display="block";

	while (ol.childNodes.length > 0) {
		ol.removeChild(ol.firstChild);
	}
	
	
	var jsondoc = JSON.parse(xmlhttp.responseText);
	
	var arts = jsondoc.artists.artist;
	for (var i = 0; i < arts.length; i++) {

		var liimage = createImage(arts[i].image[2]["#text"]);
		names[i] = arts[i].name;		
		realnames[i] = arts[i].name;

		
		var li = createArtist(arts[i].name, arts[i].listeners, arts[i].playcount, arts[i].url,i);
		
		li.style.padding ="30px 0px";
		li.style.margin = "60px 100px";
		var div = createDiv(liimage,li,i);
		div.style.margin = "85px 0px";

		ol.appendChild(div);
	
		
		
	}
	
	var images  = document.getElementsByClassName("classart");
	for(var i=0; i<images.length;i++)
	{
		images[i].style.float="left";
		images[i].style.overflow = "auto";
		images[i].style.padding = "0px 60px";
	}
}

/*------load tracks using JSON ---------*/
function loadTracksJSON(xmlhttp)
{
	document.getElementById("artists").style.display="none";
	document.getElementById("eventsid").style.display="none";
	document.getElementById("tracks").style.display="block";
	document.getElementById("homediv").style.display="none";
	
	var ol = document.getElementById("toptrack");
	var iddiv = document.getElementById("title2");
	iddiv.style.display = "block";
	document.getElementsByClassName("sorting")[1].style.display="block";
	while (ol.childNodes.length > 0) {
		ol.removeChild(ol.firstChild);
	}
	
	
	var jsondoc = JSON.parse(xmlhttp.responseText);
	
	var tracks = jsondoc.tracks.track;
	for (var i = 0; i < tracks.length; i++) {
		tracksort[i] = tracks[i].name;		
		realtracks[i] = tracks[i].name;
		var div = createTrack(tracks[i].name, tracks[i].listeners, tracks[i].playcount,i);
		ol.appendChild(div);

	}
	console.log(tracksort);
	for(var j=0; j<ol.childNodes.length; j=j+2)
	{
		ol.childNodes[j].style.backgroundColor = "#cccccc";
	}
}

/*---------load events using XML----------*/
function loadEventsXML(xmlhttp)
{
	document.getElementById("artists").style.display="none";
	document.getElementById("eventsid").style.display="block";
	document.getElementById("tracks").style.display="none";
	document.getElementById("homediv").style.display="none";
	
	var ul = document.getElementById("topevent");
	var iddiv = document.getElementById("title3");
	iddiv.style.display = "block";
	document.getElementsByClassName("sorting")[2].style.display="block";
	while (ul.childNodes.length > 0) {
		ul.removeChild(ul.firstChild);
	}
	var br=1;
	
	var xmldoc = xmlhttp.responseXML;
	var events = xmldoc.getElementsByTagName("event");
	for (var i = 0; i < 10; i++) {
		
		var artist = events[i].getElementsByTagName("artist");
		var headliner = events[i].getElementsByTagName("headliner");
		var date = events[i].getElementsByTagName("startDate")[0].innerHTML;
		var url = events[i].getElementsByTagName("url")[0].innerHTML;
		var tags = events[i].getElementsByTagName("tags");
		
		headliners[i] = headliner[0].innerHTML;
		realhead[i] = headliner[0].innerHTML;
		
		var img = document.createElement("img");
		if(br>5)
		{
			br=1;
		}
	
		img.src = "music"+br+".png";
			br++;
		img.className = "music";

		var li = createEvents(artist,headliner,date, url, tags, img);
		ul.appendChild(li);
	}
	
	
}
