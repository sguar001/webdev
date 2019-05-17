// svg measurements

var width = 600,
	height = 600,
	padding = 50;

var data = regionData.filter(mustHaveKeys); // consist of regions that only have data on 4 key variables

var xScale = d3.scaleLinear() // set the xScale based on min/max of adultLIteracy rate
				.domain(d3.extent(data, d => d.adultLiteracyRate))
				.range([padding, width - padding]);

var yScale = d3.scaleLinear() // set the yScale based on min/max of subscrbers
				.domain(d3.extent(data, d => d.subscribersPer100))
				.range([height - padding, padding]); // flip in order to have at lowest point

var rScale = d3.scaleLinear() // set the radial Scale based on min/max of medianAge
				.domain(d3.extent(data, d => d.medianAge))
				.range([5, 30]);

var fScale = d3.scaleLinear() // set the fill Scale based on min/max of urbanPopulationRate
				.domain(d3.extent(data, d => d.urbanPopulationRate))
				.range(['green', 'blue']);

var xAxis = d3.axisBottom(xScale)
			  .tickSize(- height + 2 * padding)
			  .tickSizeOuter(0);

var yAxis = d3.axisLeft(yScale)
			  .tickSize(- width + 2 * padding)
			  .tickSizeOuter(0);

var svg = d3.select('svg')
			.attr('width', width)
			.attr('height', height);

svg.append('g')
	.attr('transform', 'translate(0,' + (height - padding) + ')')
	.call(xAxis);

svg.append('g')
	.attr('transform', 'translate(' + padding + ',0)')
	.call(yAxis);


// Axes titles

svg.append('text')
	.attr('x', width / 2)
	.attr('y', (height - padding))
	.attr('dy', padding / 2)
	.style('text-anchor', 'middle')
	.text('Literacy Rate, Aged 15 and Up');

svg.append('text')
	.attr('transform', 'rotate(-90)')
	.attr('x', - height / 2)
	.attr('dy', padding / 2)
	.style('text-anchor', 'middle')
	.text('Cellular Subscribers per 100 People');

// Graph Title 
svg.append('text')
	.attr('x', width / 2)
	.attr('dy', '1em')
	.style('text-anchor', 'middle')
	.style('font-size', '2em')
	.text('Cellular Subscriptions vs. Literacy Rate');

svg
	.selectAll('circle')
	.data(data)
	.enter()
	.append('circle')
		.attr('cx', d => xScale(d.adultLiteracyRate))
		.attr('cy', d => yScale(d.subscribersPer100))
		.attr('r', d => rScale(d.medianAge))
		.attr('fill', d => fScale(d.urbanPopulationRate))
		.attr('stroke', '#fff');

function mustHaveKeys(obj) {
	var keys = [
		"subscribersPer100",
		"adultLiteracyRate",
		"medianAge",
		"urbanPopulationRate"
	];
	for(var i = 0; i < keys.length; i++) {
		if(obj[keys[i]] === null) return false; // ensure keys are present in the object
	}
	return true;
}