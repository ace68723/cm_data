var fs 	= require('fs');
var _	= require('lodash')

var myData = {
  name:'test',
  version:'1.0'
}

var outputFilename = './data/my2.json';



var locations;
// rede location data file
fs.readFile('./data/cm_order_base.json', function (err, data) {
  if (err) throw err;
  locations = JSON.parse(data);
  // console.log(locations);
  chang_lat();
});

var write_file = function(filename,data) {
	fs.writeFile(filename, JSON.stringify(data, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("JSON saved to " + outputFilename);
	    }
	}); 
};
var chang_lat = function() {
	_.forEach(locations, function(location, key) {
		// console.log(point, key);
		location.latitude 	= location.loc_la;
		location.longitude 	= location.loc_lo;
		location.loc_la_lo  = location.loc_la + ' ' +location.loc_lo;
		location.id 			= key;
		location.times 		= 1;
		// console.log(location)
	 	count_times(location);
	});
	// _.forEach(locations, function(location, key) {
	//   	count_times(location);
	 
	// });
	write_file('./data/locations.json', locations)
	
	var uniq_locations = _.uniq(locations,'loc_la_lo');
	
	write_file('./data/uniq_locations.json', uniq_locations)
	
	// console.log(uniq_locations)

	var sorted_locations = _.sortBy(uniq_locations, 'times')
	
	write_file('./data/sorted_locations.json', sorted_locations)
};

var count_times = function(cur_location) {
	_.forEach(locations, function(location, key) {
	  if(cur_location.loc_la == location.loc_la && cur_location.longitude == location.loc_lo){
	  	location.times += 1;
	  }
	});
	// console.log(cur_location)
	//  _.remove(locations, function(location, key) {
	// 	// console.log(location,key)
	//   	  // if(cur_location.loc_la == location.loc_la && cur_location.longitude == location.loc_lo){
	//   	  // 	// location.times += 1;
	//   	  // 	return location;
	//   	  // }

	// });
	
};


// var users = [
//   { 'user': 'fred',   'age': 48 },
//   { 'user': 'barney', 'age': 34 },
//   { 'user': 'fred',   'age': 42 },
//   { 'user': 'barney', 'age': 36 }
// ];

// // sort by `user` in ascending order and by `age` in descending order
// _.map(_.sortByOrder(users, ['user', 'age'], [true, false]), _.values);
// // → [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]

// console.log(_.sortBy(users, 'age'))



