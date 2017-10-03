var WIDTH = 360;
var HEIGHT = 360;

var dataset = [
    { label: 'Abulia', count: 10 },
    { label: 'Betelgeuse', count: 20 },
    { label: 'Cantaloupe', count: 30 },
    { label: 'Dijkstra', count: 40 }
];

var radius = Math.min(WIDTH, HEIGHT) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory10);

d3.select('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

var container = d3.select('g')
    .attr('transform', 'translate(' + (WIDTH / 2) + ',' + (HEIGHT / 2) + ')'); //pie center is at 0,0

var arc = d3.arc()
    .innerRadius(100)
    .outerRadius(radius);

var pie = d3.pie()
    .value(function(d) { return d.count; })
    .sort(null);

var path = container.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d) {
        return color(d.data.label);
    });
