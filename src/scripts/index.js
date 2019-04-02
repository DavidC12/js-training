import '../styles/index.scss';
import { get } from 'http';
import { Album, Compilation } from './models/Album.js';
import $ from 'jquery';
import { format } from 'path';

console.log('webpack starterkit!!!');
function showArray(day, ...someRestParameter) {
	console.log(day);
	
	//Well why wouldn't we call it REST parameters?  Nobody
	//would ever mix that up with REST services.  
	for (let i = 0; i < someRestParameter.length; i++) {
		console.log(someRestParameter[i]);
		console.log("some javascript");
	}
	
	//Willy Nilly Ha Ha Ho 
	someRestParameter.forEach(par => console.log(par));
}

function showDestructured(...someArray) {
	console.log(someArray);
}

showArray('Monday', 1,3,5,7,6,8);
let myArray = ['this', 'is', 'another', 'array'];
showArray('Tuesday',myArray);

const carId = 142;

let a = ['girschool', 'motorhead', 'everyone else'];
showDestructured(a);

console.log(typeof(1));
console.log(typeof(null));
console.log(typeof(NaN));
let someNumber = "55.23";

console.log(Number.parseFloat(someNumber));
console.log(Number.parseInt(someNumber));

let app = (function() {
	let carID = 456;
	return {};
})();
console.log(app);

//Example of overriding the "this" portion of an object using call
let album = {
	albumName: 'Alice Cooper',
	getAlbumName: function(prefix) {
		return prefix + this.albumName;
	}
};
let newAlbum = {  //the new context
	albumName: 'Led Zeppelin'
};
console.log(album.getAlbumName.apply(newAlbum, ['Album: ']));

//What if we want to copy the function itself?
let newFunction = album.getAlbumName.bind(newAlbum, ['MyAlbum: ']);
console.log(newFunction());

//Using Arrow Function
let getAlbumTitle = () => 'Hey Stoopid';
console.log(getAlbumTitle());

//Arrow function with arguments
let getAlbumTitleDisplay =	(prefix, suffix) => prefix + 'Hey Stoopid' + suffix;
console.log(getAlbumTitleDisplay('Title: ', '!'));

//Default Values in functions
function setMyVal (var1, var2 = 10) {
	return var1 + var2;
};
console.log(setMyVal(1)); //returns 11?
console.log(typeof(setMyVal(1)));
console.log(setMyVal(2,5)); //returns 7

function Car(id) {
	this.carId = id;
	this.start = function() {
		console.log('start: ' + this.carId);
	};
};

let car = new Car(123);
console.log(car.carId);
car.start();

let vehicle = new Car(456);
vehicle.start();

//Prototypes - Save memory by allowing a 
// function not to be duplicated with every new object
Car.prototype.accelerate = function() {
	console.log('Accelerate ' + this.carId);
};
vehicle.accelerate();

console.log(JSON.stringify(vehicle));

let trackVersionsJson = "{ \"album\" : { \"artist\" : \"Elton John\", \"title\" : \"Rocket Man\" } }";
let trackVersionObject = JSON.parse(trackVersionsJson);
console.log(trackVersionObject);

let trackVersions = [
	{artist: 'Striker', title: 'Play to win', rating: 4},
	{artist: 'Darkness', title: 'First Class Violence', rating: 3},
	{artist: 'Voivod', title: 'The Wake', rating: 4},
	{artist: 'White Wizzard', title: 'Infernal Overdrive', rating: 5}
];

console.log("*** foreach() test ***");
trackVersions.forEach((tvs, index) => console.log(tvs, index));

console.log("*** filter() test ***");
let tvf = trackVersions.filter (t => t.artist === 'Darkness');
console.log(tvf);

console.log("*** every() test ***");
//Returns true if every element in the array has a rating
let tve = trackVersions.every(t => t.rating > 0);  
console.log('result = ' + tve);

console.log("*** exported classes for Album and Compilation ***");
let recordAlbum = new Album(1);
console.log(recordAlbum.albumID);
console.log(recordAlbum.title);
console.log(recordAlbum.albumType);

let compilation = new Compilation(1);
console.log(compilation.albumID);
console.log(compilation.title);
console.log(compilation.albumType);

console.log("*** inner width of this window is.... ***");
console.log(window.innerWidth);

let intervalId = setInterval( function() {
	console.log('1 second passed');
} , 1000);

clearInterval(intervalId);
let winners = document.getElementsByClassName('winner');
console.log(typeof(winners));
console.log(winners);

for (let i = 0; i < winners.length; i++) {
	console.log(winners[i]);
	winners[i].style.color = 'red';
};
let summation = document.getElementById('summation');
summation.textContent = 'Rotting in their cells!';

console.log('*** This will result in an error ***');
let promise = new Promise(
	function(resolve, reject) {
		setTimeout(reject, 100, 'someValue');
	}
);
promise.then(
	value => console.log('fulfilled: ' + value),
	error => console.log('rejected: ' + error)
);

console.log('*** Data Access using HTTP ***');

console.log('*** jQuery get test ***');
let promise2 = $.get("http://5c5ab4a21041df0014b3ee29.mockapi.io/apitest/getItems");
promise2.then(
	data => console.log('success', data),
	error => console.log('error ', error)
);

console.log('*** jQuery post test ***');
let user = {
	name: "Dave Clough",
	avatar: "DaveClough.jpg"
};
let pr3 = $.post("http://5c5ab4a21041df0014b3ee29.mockapi.io/apitest/getItems", user);
pr3.then (
	data => console.log('post success', data),
	error => console.log('post error', error)
);

let form=document.getElementById('album-form');
form.addEventListener('submit', event => {
	let artist = form.elements['artist'];
	let title = form.elements['title'];

	let artistError = document.getElementById('artist-error');
	if (artist.value.length > 30) {
		artistError.textContent = 'Invalid Entry';
		artistError.style.color = 'red';
		artist.style.borderColor = 'red';
		artist.focus();
	}
	
	console.log('Posting Test');
	let posting = {
		artist: artist.value,
		title: title.value
	};

	let pr = $.post('http://5c5ab4a21041df0014b3ee29.mockapi.io/apitest/getItems', posting);
	pr.then (
		data => console.log('post success', data),
		error => console.log('post error', error)
	);
	event.preventDefault();
});

console.log("Destructuring Arrays Test.");
let arrRatings = [1,2,5,3,5];
let e1, e2, eRest;
[e1,e2, ... eRest] = arrRatings;
console.log(e1);
console.log(e2);
console.log(eRest);

console.log("Revisiting object desctructuring");
let trackProfile = {albumName : 'Various', artist: 'Wiz Khalifa', track: 'Been a long time', rating: 5};
let albumName,artist,track,rating;
({albumName,artist,track,rating} = trackProfile);
console.log(trackProfile);
console.log(albumName,artist,track,rating);

console.log("Revisiting Spread Syntax - the opposite of REST");
let myAlbumIds = [1000,2000,3000, 4000, 5000, 6000];
function showAlbumIds(album1, album2, album3, ...albumRest) {
	console.log(album1, album2, album3);
	console.log(albumRest);
};
showAlbumIds(...myAlbumIds);

let tObjectVar = { album : 'Lou Reed' };
let tObjectNull;
let tObjectPrimitive = 1;
console.log("=== TESTING LOGICAL OR CONDITION ===");
console.log(tObjectNull || tObjectVar);
console.log(tObjectNull || tObjectPrimitive);


console.log("=== IFFE test");
let appx = (function() {
	let tempvar = 234;
	console.log("Im in the IFFE");
	return {};
}) ();

console.log("=== Closure example ===");
let appref = (function() {
	let movie = "You Only Live Twice";
	let getMovie = function() {
		return movie;
	};
	return {
		getMovie: getMovie
	};
})();
console.log(appref.getMovie());

console.log("=== Usage of the 'this' keyword ===");
let myOjbect = {
	movie: "Goldfinger",
	getMovie: function() {
		return this.movie;
	}
};
console.log(myOjbect.getMovie());

console.log("Now executing a call to change the context of the object, because of course you can do this in javascript.  ");
let newMovie = {movie: "From Russia With Love"};

console.log(myOjbect.getMovie.call(newMovie));

//Returns a string 
let myNextMovie = myOjbect.getMovie.call(newMovie);
console.log(typeof(myNextMovie));
console.log(myNextMovie);

//Continues to return original object
console.log(myOjbect.getMovie());

console.log("=== Usage of apply function ===");
let myApplyOjbect = {
	movie: "Thunderball",
	getMovie: function(prefix) {
		return prefix + this.movie;
	}
};
console.log(myApplyOjbect.getMovie(""));
let movieLiveAndLetDie = {movie: "Live And Let Die"};
console.log(myApplyOjbect.getMovie.apply(movieLiveAndLetDie, ["Title: "]));

console.log("=== bind example ===");
let movieDiamondsAreForever = {movie: "Diamonds are Forever"};
let newGetMovie = myOjbect.getMovie.bind(movieDiamondsAreForever);
console.log(newGetMovie()); //Diamonds are forever

console.log("=== Arrow Functions ===");
let getStartingBPM = () => 152;
console.log(getStartingBPM);

let getStartingBPM2 = (artist, song) => {
	let startingBPM = 0;
	if (artist === 'whitesnake' && song === 'bad boys') {
		startingBPM = 152;
	}
	else
	{
		startingBPM = 100;
	}
	return startingBPM;
};

console.log(getStartingBPM2('whitesnake', 'bad boys'));
console.log(getStartingBPM2('whitesnake', 'give me all your love tonite'));

function rateAlbum(title, artist='various') {
	console.log(`The album ${title} by artist ${artist} has a rating of 4.`);
}

rateAlbum('Club Cutz');
rateAlbum('Whitesnake','Whitesnake');


console.log('=== constructor functions===');
function Category (name) {
	this.catName = name;
//	this.catType = function getCatType() {
//		if (this.catName === 'hardRock') {
//			return 'rock';
//		};
//	};
}

Category.prototype.catType = function() {
	if (this.catName === 'hardRock') {
			return 'rock';
	};
};

let hardRock = new Category('hardRock');
console.log(hardRock.catType());

console.log('=== Expanding Objects Using Prototype ====');

String.prototype.hello = function() {
	console.log(this.toString() + ":Hello");
};
console.log('foo'.hello());

console.log('=== create an object for a record track, convert to JSON, then show the resulting JSON ===');
function AlbumTrack(albumArtist,albumTitle,trackArtist,trackTitle,version,beatMixable=false) {
	this.albumArtist = albumArtist;
	this.albumTitle = albumTitle;
	this.trackArtist = trackArtist;
	this.trackTitle = trackTitle;
	this.version = version;
	this.beatMixable = beatMixable;
	this.isBeatMixable = function () {
		return this.beatMixable;
	};
};

let mindFluid = new AlbumTrack('various','club mix 96 vol 2', 'Nuyorican Soul', 'Mind Fluid', 'Remix');
console.log(mindFluid);
console.log(JSON.stringify(mindFluid));

let mindFluidJSON = JSON.stringify(mindFluid);
console.log(mindFluidJSON);
let mindFluidParsed = JSON.parse(mindFluidJSON);
console.log(mindFluidParsed);

let albumTrackArray = new Array();
albumTrackArray[0] = new AlbumTrack('various','club mix 96 vol 2', 'Nuyorican Soul', 'Mind Fluid', 'Remix',true);
albumTrackArray[1] = new AlbumTrack('various','club mix 96 vol 2', 'Black Magic', 'Freedom (Make It Funky) Lil Louis "Freedom" Remix', 'Remix', false);
albumTrackArray[2] = new AlbumTrack('various','club mix 96 vol 2', 'Taylor Dane', 'Say a Prayer Morales Mix', 'Remix',true);
albumTrackArray[3] = new AlbumTrack('various','club mix 96 vol 2', 'Vanessa Daou', 'Sunday Afternoons', 'Remix',false);
albumTrackArray[4] = new AlbumTrack('various','club mix 96 vol 2', 'Sandy B', 'Make the World Go Round', 'Remix',true);
albumTrackArray[5] = new AlbumTrack('various','club mix 96 vol 2', 'I Want Youl', 'Mind Fluid', 'Remix',false);

console.log("=== trying to see boolean ===");
console.log(albumTrackArray[0].isBeatMixable());

albumTrackArray.forEach(track => console.log(track));

let beatMixableAlbums = albumTrackArray.filter(track => track.beatMixable == true);
console.log(beatMixableAlbums);

let taylorDayne = albumTrackArray.find(track => track.trackArtist == 'Taylor Dane');
console.log(taylorDayne);

console.log("Testing if every track is on a compilation:" + albumTrackArray.every(track => track.albumArtist == 'various'));
console.log("Testing if every track is beatMixable:" + albumTrackArray.every(track => track.beatMixable == true));


class PhysicalUnit {
	constructor(catalogID,albumTrack) {
		this.catalogID = catalogID;
		this.albumTrack = albumTrack;
	};
	getAlbumArtist() {
		return this.albumTrack.albumArtist;
	}
}

let newPhysicalUnit = new PhysicalUnit("catABC", albumTrackArray[5]);
console.log(newPhysicalUnit);
console.log(newPhysicalUnit.getAlbumArtist());

console.log("=== Working with Inheritance ===");
class VinylDisk extends PhysicalUnit {
	constructor(catalogID,albumTrack,speed) {
		super(catalogID,albumTrack);
		this.speed = speed;
	}
	getSpeed() {
		return this.speed;		
	}
}

let myVinyl = new VinylDisk("catid",albumTrackArray[1],45);
console.log(myVinyl);
console.log(myVinyl.getSpeed());

let timeoutID = setTimeout(function() {
	console.log("Timeout 1 second.");
},1000);

let intervalID = setInterval(function() {
	console.log("Timeout 1 second.");
},1000);

clearInterval(intervalID);
