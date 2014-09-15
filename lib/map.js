function Map() {
	this.map_data = [];
};

Map.prototype.parse_map = function(string) {
	rows = string.split("\n");
	map_result = [];
	for(row in rows) {
		row_split = rows[row].split(",");
		row_split = row_split.filter(function(x) {return x!="";})
		map_result.push(row_split);
	}
	map_result.shift();
	map_result.pop();
	this.map_data = map_result;
}
Map.prototype.slice = function(x, y, w, h) {
	result = [];
	for(row in this.map_data) {
		row_result = [];
		for(node in this.map_data[row]) {
			
			if(node - x >= 0 && node - x < w) {
				row_result.push(this.map_data[row][node]);
			}
		}
		if(row - y >= 0 && row - y < h) {
			result.push(row_result);
		}
	}	
	return result;
}

// Test
// x = new Map();
// x.map_data = [[0,0,0,0,0,1,0,1,1,0], [0,0,0,0,0,1,0,1,1,0], [0,0,0,0,0,1,0,1,1,0], [0,0,0,0,0,1,0,1,1,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];
// console.log(x.slice(1, 1, 7, 5));

module.exports = Map;