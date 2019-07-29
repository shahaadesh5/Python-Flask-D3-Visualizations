// https://github.com/WYanChao/RadViz
$('#count').val('4'); 
var count = $('#count').val(); 
var currentDataset='Iris';
//GET request to fetch dataset lists from backend
$.getJSON('http://127.0.0.1:5000/datasetlist', function(dataset) {
	console.log(dataset);
	var $dropdown = $("#dataset");
	$.each(dataset, function() {
		$dropdown.append($("<option />").val(this.name).text(this.name));
	});
});
// request to GET JSON data from Python endpoint. Referred from - https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
$.getJSON('http://127.0.0.1:5000/dataset?name=Iris', function(dataset) {
	parseData(dataset);
});

$('select').on('change', function() {
		currentDataset=this.value;
		//GET request to change dataset on select value change for radviz
		$.getJSON('http://127.0.0.1:5000/dataset?name='+this.value, function(dataset) {
		console.log(dataset);
		parseData(dataset);
		});
		//GET request to change dataset on select value change for Clustering
		$.getJSON('http://127.0.0.1:5000/kmeans?name='+currentDataset+'&count='+count, function(kmeans) {
		console.log(kmeans);
		radviz2(kmeans);
		});
  });
  $("#button").click(function(){
	count = $("#count").val();
	//GET request to change dataset on select value change for Clustering
	$.getJSON('http://127.0.0.1:5000/kmeans?name='+currentDataset+'&count='+count, function(kmeans) {
		console.log(kmeans);
		radviz2(kmeans);
		});
  });
function parseData(data){
	d3.select("svg").remove(); // removing existing svg for creating new svg on new dataset load
	  console.log(data);
	  titles = d3.keys(data[0]);
	  const IDradviz = document.querySelector('#radviz');//the container of radviz
		console.log(titles);
		var dataCopy = titles;
		var classify_column = dataCopy.pop();
		const colorAccessor = function(d){ return d[classify_column]; };//dimension used for coloring
		var dimensions = dataCopy;
		console.log(dimensions);
		const dimensionAnchor = Array.apply(null, {length: dimensions.length}).map(Number.call, Number).map(x=>x*2*Math.PI/(dimensions.length)); // intial DA configration;

		// call the plot function
		RadViz()
			.DOMRadViz(IDradviz)
			.TableTitle(titles)
			.ColorAccessor(colorAccessor)
			.Dimensionality(dimensions)
			.DAnchor(dimensionAnchor)
			.DATA(data)
			.CLASSIFY(classify_column)
			.call();
  }

  
function radviz2(data){
		d3.select("#scatter svg").remove();// removing existing svg for creating new svg on new dataset load
	  console.log(data);
	  titles = d3.keys(data[0]);
	  const IDradviz = document.querySelector('#scatter');//the container of radviz
		console.log(titles);
		var dataCopy = titles;
		var classify_column = dataCopy.pop();
		const colorAccessor = function(d){ return d[classify_column]; };//dimension used for coloring
		var dimensions = dataCopy;
		console.log(dimensions);
		const dimensionAnchor = Array.apply(null, {length: dimensions.length}).map(Number.call, Number).map(x=>x*2*Math.PI/(dimensions.length)); // intial DA configration;

		// call the plot function
		RadViz2()
			.DOMRadViz(IDradviz)
			.TableTitle(titles)
			.ColorAccessor(colorAccessor)
			.Dimensionality(dimensions)
			.DAnchor(dimensionAnchor)
			.DATA(data)
			.CLASSIFY(classify_column)
			.call();
  }
