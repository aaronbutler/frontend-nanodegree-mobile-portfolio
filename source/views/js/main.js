/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?


Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/

/*
*
*
*bootstrap col-xs-2
<div class="col- xs-2 col-lg-1"></div>
honestly it was only maybe 2 months ago that I learned that. I used to do <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4"></div> when i could just do <div class="col-xs-12 col-md-4"></div> and get the same result
*
*
*/



// As you may have realized, this website randomly generates pizzas.
// Here are arrays of all possible pizza ingredients.
var pizzaIngredients = {};
pizzaIngredients.meats = [
	"Pepperoni",
	"Sausage",
	"Fennel Sausage",
	"Spicy Sausage",
	"Chicken",
	"BBQ Chicken",
	"Chorizo",
	"Chicken Andouille",
	"Salami",
	"Tofu",
	"Bacon",
	"Canadian Bacon",
	"Proscuitto",
	"Italian Sausage",
	"Ground Beef",
	"Anchovies",
	"Turkey",
	"Ham",
	"Venison",
	"Lamb",
	"Duck",
	"Soylent Green",
	"Carne Asada",
	"Soppressata Picante",
	"Coppa",
	"Pancetta",
	"Bresola",
	"Lox",
	"Guanciale",
	"Chili",
	"Beef Jerky",
	"Pastrami",
	"Kielbasa",
	"Scallops",
	"Filet Mignon"
];
pizzaIngredients.nonMeats = [
	"White Onions",
	"Red Onions",
	"Sauteed Onions",
	"Green Peppers",
	"Red Peppers",
	"Banana Peppers",
	"Ghost Peppers",
	"Habanero Peppers",
	"Jalapeno Peppers",
	"Stuffed Peppers",
	"Spinach",
	"Tomatoes",
	"Pineapple",
	"Pear Slices",
	"Apple Slices",
	"Mushrooms",
	"Arugula",
	"Basil",
	"Fennel",
	"Rosemary",
	"Cilantro",
	"Avocado",
	"Guacamole",
	"Salsa",
	"Swiss Chard",
	"Kale",
	"Sun Dried Tomatoes",
	"Walnuts",
	"Artichoke",
	"Asparagus",
	"Caramelized Onions",
	"Mango",
	"Garlic",
	"Olives",
	"Cauliflower",
	"Polenta",
	"Fried Egg",
	"Zucchini",
	"Hummus"
];
pizzaIngredients.cheeses = [
	"American Cheese",
	"Swiss Cheese",
	"Goat Cheese",
	"Mozzarella Cheese",
	"Parmesean Cheese",
	"Velveeta Cheese",
	"Gouda Cheese",
	"Muenster Cheese",
	"Applewood Cheese",
	"Asiago Cheese",
	"Bleu Cheese",
	"Boursin Cheese",
	"Brie Cheese",
	"Cheddar Cheese",
	"Chevre Cheese",
	"Havarti Cheese",
	"Jack Cheese",
	"Pepper Jack Cheese",
	"Gruyere Cheese",
	"Limberger Cheese",
	"Manchego Cheese",
	"Marscapone Cheese",
	"Pecorino Cheese",
	"Provolone Cheese",
	"Queso Cheese",
	"Roquefort Cheese",
	"Romano Cheese",
	"Ricotta Cheese",
	"Smoked Gouda"
];
pizzaIngredients.sauces = [
	"Red Sauce",
	"Marinara",
	"BBQ Sauce",
	"No Sauce",
	"Hot Sauce"
];
pizzaIngredients.crusts = [
	"White Crust",
	"Whole Wheat Crust",
	"Flatbread Crust",
	"Stuffed Crust"
];

// Name generator pulled from http://saturdaykid.com/usernames/generator.html
// Capitalizes first letter of each word
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
var dark = ["dark","morbid", "scary", "spooky", "gothic", "deviant", "creepy", "sadistic", "black", "dangerous", "dejected", "haunted", 
	"morose", "tragic", "shattered", "broken", "sad", "melancholy", "somber", "dark", "gloomy", "homicidal", "murderous", "shady", "misty", 
	"dusky", "ghostly", "shadowy", "demented", "cursed", "insane", "possessed", "grotesque", "obsessed"];
var colors = ["blue", "green", "purple", "grey", "scarlet", "NeonGreen", "NeonBlue", "NeonPink", "HotPink", "pink", "black", "red", 
	"maroon", "silver", "golden", "yellow", "orange", "mustard", "plum", "violet", "cerulean", "brown", "lavender", "violet", "magenta",
	"chestnut", "rosy", "copper", "crimson", "teal", "indigo", "navy", "azure", "periwinkle", "brassy", "verdigris", "veridian", "tan", 
	"raspberry", "beige", "sandy", "ElectricBlue", "white", "champagne", "coral", "cyan"];
var whimsy = ["whimsical", "silly", "drunken", "goofy", "funny", "weird", "strange", "odd", "playful", "clever", "boastful", "breakdancing",
	"hilarious", "conceited", "happy", "comical", "curious", "peculiar", "quaint", "quirky", "fancy", "wayward", "fickle", "yawning", "sleepy",
	"cockeyed", "dizzy", "dancing", "absurd", "laughing", "hairy", "smiling", "perplexed", "baffled", "cockamamie", "vulgar", "hoodwinked", 
	"brainwashed"];
var shiny = ["sapphire", "opal", "silver", "gold", "platinum", "ruby", "emerald", "topaz", "diamond", "amethyst", "turquoise", 
	"starlit", "moonlit", "bronze", "metal", "jade", "amber", "garnet", "obsidian", "onyx", "pearl", "copper", "sunlit", "brass", "brassy",
	"metallic"];
var noisy = ["untuned", "loud", "soft", "shrieking", "melodious", "musical", "operatic", "symphonic", "dancing", "lyrical", "harmonic", 
	"orchestral", "noisy", "dissonant", "rhythmic", "hissing", "singing", "crooning", "shouting", "screaming", "wailing", "crying", "howling",
	"yelling", "hollering", "caterwauling", "bawling", "bellowing", "roaring", "squealing", "beeping", "knocking", "tapping", "rapping", 
	"humming", "scatting", "whispered", "whispering", "rasping", "buzzing", "whirring", "whistling", "whistled"];
var apocalyptic = ["nuclear", "apocalyptic", "desolate", "atomic", "zombie", "collapsed", "grim", "fallen", "collapsed", "cannibalistic", 
	"radioactive", "toxic", "poisonous", "venomous", "disastrous", "grimy", "dirty", "undead", "bloodshot", "rusty", "glowing", "decaying",
	"rotten", "deadly", "plagued", "decimated", "rotting", "putrid", "decayed", "deserted", "acidic"];
var insulting = ["stupid", "idiotic", "fat", "ugly", "hideous", "grotesque", "dull", "dumb", "lazy", "sluggish", "brainless", "slow", 
	"gullible", "obtuse", "dense", "dim", "dazed", "ridiculous", "witless", "daft", "crazy", "vapid", "inane", "mundane", "hollow", "vacuous",
	"boring", "insipid", "tedious", "monotonous", "weird", "bizarre", "backward", "moronic", "ignorant", "scatterbrained", "forgetful", "careless", 
	"lethargic", "insolent", "indolent", "loitering", "gross", "disgusting", "bland", "horrid", "unseemly", "revolting", "homely", "deformed",
	"disfigured", "offensive", "cowardly", "weak", "villainous", "fearful", "monstrous", "unattractive", "unpleasant", "nasty", "beastly", "snide", 
	"horrible", "syncophantic", "unhelpful", "bootlicking"];
var praise = ["beautiful", "intelligent", "smart", "genius", "ingenious", "gorgeous", "pretty", "witty", "angelic", "handsome", "graceful",
	"talented", "exquisite", "enchanting", "fascinating", "interesting", "divine", "alluring", "ravishing", "wonderful", "magnificient", "marvelous",
	"dazzling", "cute", "charming", "attractive", "nifty", "delightful", "superior", "amiable", "gentle", "heroic", "courageous", "valiant", "brave", 
	"noble", "daring", "fearless", "gallant", "adventurous", "cool", "enthusiastic", "fierce", "awesome", "radical", "tubular", "fearsome", 
	"majestic", "grand", "stunning"];
var scientific = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological", 
	"innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar", 
	"extinct", "galactic"];
// Pulls adjective out of array using random number sent from generator
function getAdj(x){
	switch(x) {
	case "dark": 

		return dark;
	case "color": 

		return colors;
	case "whimsical": 

		return whimsy;
	case "shiny":

		return shiny;
	case "noisy":

		return noisy;
	case "apocalyptic":

		return apocalyptic;
	case "insulting":

		return insulting;
	case "praise":

		return praise;
	case "scientific":

		return scientific;
	default:

		return scientific;
	}
}

var animals = ["flamingo", "hedgehog", "owl", "elephant", "pussycat", "alligator", "dachsund", "poodle", "beagle", "crocodile", "kangaroo", 
	"wallaby", "woodpecker", "eagle", "falcon", "canary", "parrot", "parakeet", "hamster", "gerbil", "squirrel", "rat", "dove", "toucan", 
	"raccoon", "vulture", "peacock", "goldfish", "rook", "koala", "skunk", "goat", "rooster", "fox", "porcupine", "llama", "grasshopper", 
	"gorilla", "monkey", "seahorse", "wombat", "wolf", "giraffe", "badger", "lion", "mouse", "beetle", "cricket", "nightingale", 
	"hawk", "trout", "squid", "octopus", "sloth", "snail", "locust", "baboon", "lemur", "meerkat", "oyster", "frog", "toad", "jellyfish", 
	"butterfly", "caterpillar", "tiger", "hyena", "zebra", "snail", "pig", "weasel", "donkey", "penguin", "crane", "buzzard", "vulture", 
	"rhino", "hippopotamus", "dolphin", "sparrow", "beaver", "moose", "minnow", "otter", "bat", "mongoose", "swan", "firefly", "platypus"];
var professions = ["doctor", "lawyer", "ninja", "writer", "samurai", "surgeon", "clerk", "artist", "actor", "engineer", "mechanic",
	"comedian", "fireman", "nurse", "RockStar", "musician", "carpenter", "plumber", "cashier", "electrician", "waiter", "president", "governor", 
	"senator", "scientist", "programmer", "singer", "dancer", "director", "mayor", "merchant", "detective", "investigator", "navigator", "pilot",
	"priest", "cowboy", "stagehand", "soldier", "ambassador", "pirate", "miner", "police"];
var fantasy = ["centaur", "wizard", "gnome", "orc", "troll", "sword", "fairy", "pegasus", "halfling", "elf", "changeling", "ghost", 
	"knight", "squire", "magician", "witch", "warlock", "unicorn", "dragon", "wyvern", "princess", "prince", "king", "queen", "jester", 
	"tower", "castle", "kraken", "seamonster", "mermaid", "psychic", "seer", "oracle"];
var music = ["violin", "flute", "bagpipe", "guitar", "symphony", "orchestra", "piano", "trombone", "tuba", "opera", "drums", 
	"harpsichord", "harp", "harmonica", "accordion", "tenor", "soprano", "baritone", "cello", "viola", "piccolo", "ukelele", "woodwind", "saxophone",
	"bugle", "trumpet", "sousaphone", "cornet", "stradivarius", "marimbas", "bells", "timpani", "bongos", "clarinet", "recorder", "oboe", "conductor",
	"singer"];
var horror = ["murderer", "chainsaw", "knife", "sword", "murder", "devil", "killer", "psycho", "ghost", "monster", "godzilla", "werewolf", 
	"vampire", "demon", "graveyard", "zombie", "mummy", "curse", "death", "grave", "tomb", "beast", "nightmare", "frankenstein", "specter", 
	"poltergeist", "wraith", "corpse", "scream", "massacre", "cannibal", "skull", "bones", "undertaker", "zombie", "creature", "mask", "psychopath",
	"fiend", "satanist", "moon", "fullMoon"];
var gross = ["slime", "bug", "roach", "fluid", "pus", "booger", "spit", "boil", "blister", "orifice", "secretion", "mucus", "phlegm", 
	"centipede", "beetle", "fart", "snot", "crevice", "flatulence", "juice", "mold", "mildew", "germs", "discharge", "toilet", "udder", "odor", "substance", 
	"fluid", "moisture", "garbage", "trash", "bug"];
var everyday = ["mirror", "knife", "fork", "spork", "spoon", "tupperware", "minivan", "suburb", "lamp", "desk", "stereo", "television", "TV",
	"book", "car", "truck", "soda", "door", "video", "game", "computer", "calender", "tree", "plant", "flower", "chimney", "attic", "kitchen",
	"garden", "school", "wallet", "bottle"];
var jewelry = ["earrings", "ring", "necklace", "pendant", "choker", "brooch", "bracelet", "cameo", "charm", "bauble", "trinket", "jewelry", 
	"anklet", "bangle", "locket", "finery", "crown", "tiara", "blingBling", "chain", "rosary", "jewel", "gemstone", "beads", "armband", "pin",
	"costume", "ornament", "treasure"];
var places = ["swamp", "graveyard", "cemetery", "park", "building", "house", "river", "ocean", "sea", "field", "forest", "woods", "neighborhood",
	"city", "town", "suburb", "country", "meadow", "cliffs", "lake", "stream", "creek", "school", "college", "university", "library", "bakery",
	"shop", "store", "theater", "garden", "canyon", "highway", "restaurant", "cafe", "diner", "street", "road", "freeway", "alley"];
var scifi = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy", 
	"computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
	"quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
	"universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"];
var scifi_default = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy", 
	"computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
	"quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
	"universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"];

// Pulls noun out of array using random number sent from generator
function getNoun(y) {
	switch(y) {
		case "animals": 

			return animals;
		case "profession": 

			return professions; 
		case "fantasy": 

			return fantasy;
		case "music":

			return music;
		case "horror":

			return horror;
		case "gross":

			return gross;
		case "everyday":

			return everyday;
		case "jewelry":

			return jewelry;
		case "places":

			return places;
		case "scifi":

			return scifi;
		default:

			return scifi_default;
	}
}

var adjectives = ["dark", "color", "whimsical", "shiny", "noise", "apocalyptic", "insulting", "praise", "scientific"];  // types of adjectives for pizza titles
var nouns = ["animals", "everyday", "fantasy", "gross", "horror", "jewelry", "places", "scifi"];                        // types of nouns for pizza titles

// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
function generator(adj, noun) {
	var adjectives = getAdj(adj);
	var nouns = getNoun(noun);
	var randomAdjective = parseInt(Math.random() * adjectives.length);
	var randomNoun = parseInt(Math.random() * nouns.length);
	var name = "The " + adjectives[randomAdjective].capitalize() + " " + nouns[randomNoun].capitalize();
	return name;
}

// Chooses random adjective and random noun
function randomName() {
	var randomNumberAdj = parseInt(Math.random() * adjectives.length);
	var randomNumberNoun = parseInt(Math.random() * nouns.length);
	return generator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
}

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
	var randomMeat = pizzaIngredients.meats[Math.floor((Math.random() * pizzaIngredients.meats.length))];
	return randomMeat;
};

var selectRandomNonMeat = function() {
	var randomNonMeat = pizzaIngredients.nonMeats[Math.floor((Math.random() * pizzaIngredients.nonMeats.length))];
	return randomNonMeat;
};

var selectRandomCheese = function() {
	var randomCheese = pizzaIngredients.cheeses[Math.floor((Math.random() * pizzaIngredients.cheeses.length))];
	return randomCheese;
};

var selectRandomSauce = function() {
	var randomSauce = pizzaIngredients.sauces[Math.floor((Math.random() * pizzaIngredients.sauces.length))];
	return randomSauce;
};

var selectRandomCrust = function() {
	var randomCrust = pizzaIngredients.crusts[Math.floor((Math.random() * pizzaIngredients.crusts.length))];
	return randomCrust;
};

var ingredientItemizer = function(string) {
	return "<li>" + string + "</li>";
};

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function() {
	var pizza = "";

	var numberOfMeats = Math.floor((Math.random() * 4));
	var numberOfNonMeats = Math.floor((Math.random() * 3));
	var numberOfCheeses = Math.floor((Math.random() * 2));

	for (var i = 0; i < numberOfMeats; i++) {
		pizza = pizza + ingredientItemizer(selectRandomMeat());
	}

	for (var j = 0; j < numberOfNonMeats; j++) {
		pizza = pizza + ingredientItemizer(selectRandomNonMeat());
	}

	for (var k = 0; k < numberOfCheeses; k++) {
		pizza = pizza + ingredientItemizer(selectRandomCheese());
	}

	pizza = pizza + ingredientItemizer(selectRandomSauce());
	pizza = pizza + ingredientItemizer(selectRandomCrust());

	return pizza;
};

// returns a DOM element for each pizza
var pizzaElementGenerator = function(i) {
	var pizzaContainer,             // contains pizza title, image and list of ingredients
		pizzaImageContainer,        // contains the pizza image
		pizzaImage,                 // the pizza image itself
		pizzaDescriptionContainer,  // contains the pizza title and list of ingredients
		pizzaName,                  // the pizza name itself
		ul;                         // the list of ingredients

	pizzaContainer  = document.createElement("div");
	pizzaImageContainer = document.createElement("div");
	pizzaImage = document.createElement("img");
	pizzaDescriptionContainer = document.createElement("div");

	pizzaContainer.classList.add("randomPizzaContainer");
	pizzaContainer.classList.add("col-xs-4");

	pizzaContainer.id = "pizza" + i;                // gives each pizza element a unique id
	pizzaImageContainer.classList.add("col-xs-6");

	pizzaImage.src = "images/pizza_med.png";
	pizzaImage.classList.add("img-responsive");
	pizzaImage.classList.add("pizza-pic");
	pizzaImage.classList.add("medium-pizza");

	/*The screen that shows the most pizzas has 24, so those 24 pizza images get will-change layers
	The rest do not. There may be a way to better handle off-screen components,
	although I do not need it in order to reach 60fps.
	*/
	if(i<24) {
		pizzaImage.classList.add("pizza-pic-willchange");
	}
	else {
		pizzaImage.classList.add("pizza-pic-defer");
	}

	pizzaImageContainer.appendChild(pizzaImage);
	pizzaContainer.appendChild(pizzaImageContainer);


	pizzaDescriptionContainer.classList.add("col-xs-6");

	pizzaName = document.createElement("h4");
	pizzaName.innerHTML = randomName();
	pizzaDescriptionContainer.appendChild(pizzaName);

	ul = document.createElement("ul");
	ul.innerHTML = makeRandomPizza();
	pizzaDescriptionContainer.appendChild(ul);
	pizzaContainer.appendChild(pizzaDescriptionContainer);

	return pizzaContainer;
};

for (var i = 2; i < 100; i++) {
	var pizzasDiv = document.getElementById("randomPizzas");
	pizzasDiv.appendChild(pizzaElementGenerator(i));
}

var pizzaSizeResize = 0;
function reLabelSize() {
	changeSliderLabel(pizzaSizeResize);
	changeContentPizza(pizzaSizeResize);
}

// Changes the value for the size of the pizza above the slider
function changeSliderLabel(size) {
	switch(size) {
		case "1":
			document.getElementById("pizzaSize").innerHTML = "Small";
			return;
		case "2":
			document.getElementById("pizzaSize").innerHTML = "Medium";
			return;
		case "3":
			document.getElementById("pizzaSize").innerHTML = "Large";
			return;
		default:
			console.log("bug in changeSliderLabel");
			return;
	}
}
  
function changeContentPizza(size) {
	//console.log("Pizza size:" +size);
	//var con = document.getElementById("randomPizzas");
	var zas = document.querySelectorAll('.pizza-pic');
	for(var i=0,l=zas.length;i<l;i++) {
		var con=zas[i];

		switch(size) {
			case "1":

				con.classList.remove('medium-pizza');
				con.classList.remove('large-pizza');
				con.classList.add('small-pizza');
				break;
			case "2":

				con.classList.remove('large-pizza');
				con.classList.remove('small-pizza');
				con.classList.add('medium-pizza');
				break;
			case "3":

				con.classList.remove('medium-pizza');
				con.classList.remove('small-pizza');
				con.classList.add('large-pizza');
				break;
			default:
				console.log("bug in changeContentPizza: "+size+"--"+con);
		}

	}

}

var resizePizzas = function(size) { 
	//window.performance.mark("mark_start_resize");   // User Timing API function
	pizzaSizeResize = size;
	//requestAnimationFrame(reLabelSize);
	reLabelSize();
};

var items = [];

/*Stole Pauls code almost verbatim for efficient scroll handling
http://www.html5rocks.com/en/tutorials/speed/animations/
*/
var latestKnownScrollY = 0,
	ticking = false;

function onScroll() {
	latestKnownScrollY = document.body.scrollTop;
	requestTick();
}

function requestTick() {
	if(!ticking) {
		requestAnimationFrame(updatePositions);
	}
	ticking = true;
}

window.addEventListener('scroll', onScroll);

function updatePositions() {
	var cachedScrollTop = latestKnownScrollY;
	var phases = [100*Math.sin(cachedScrollTop/1250),
		100*Math.sin(cachedScrollTop/1250 + 1),
		100*Math.sin(cachedScrollTop/1250 + 2),
		100*Math.sin(cachedScrollTop/1250 + 3),
		100*Math.sin(cachedScrollTop/1250 + 4)];

	for (var i = 0; i < items.length; i++) {
		items[i].style["-webkit-transform"] = 'translateX('+phases[i%5]+'px)';
		items[i].style.transform = 'translateX('+phases[i%5]+'px)';
	}
	ticking = false;
}

function height(){
	return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;
}
// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {

	var movingContainer = document.getElementById('movingPizzas');
	var rowBase = document.getElementById('moverRow1');
	var rowClone = rowBase.cloneNode(true);
	rowClone.removeAttribute('id');

	var cols = 6;
	var s = 256;
	var rows = Math.ceil(height()/s);
	for (var r = 0;r<rows-1;r++) {
		var newRow = rowClone.cloneNode(true);
		newRow.setAttribute('id','moverRow'+(r+2));
		movingContainer.appendChild(newRow);
	}
	items = document.querySelectorAll('.mover');
	updatePositions();
});


