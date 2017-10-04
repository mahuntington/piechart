var WIDTH = 360;
var HEIGHT = 360;

var dataset = [
    { id: 1, label: 'Abulia', count: 10 },
    { id: 2, label: 'Betelgeuse', count: 20 },
    { id: 3, label: 'Cantaloupe', count: 30 },
    { id: 4, label: 'Dijkstra', count: 40 }
];

var radius = Math.min(WIDTH, HEIGHT) / 2;

var colorScale = d3.scaleOrdinal();
colorScale.range(d3.schemeCategory10);
colorScale.domain(dataset.map(function(element){
    return element.label;
}));

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
    .data(pie(dataset), function(datum){
        return datum.data.id
    })
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d) {
        return colorScale(d.data.label);
    })
    .each(function(d) { this._current = d; });

path.on('click', function(clickedDatum, clickedIndex){
    dataset = dataset.filter(function(currentDatum, currentIndex){
        return clickedDatum.data.id !== currentDatum.id
    });
    path
        .data(pie(dataset), function(datum){
            return datum.data.id
        })
        .exit().remove();

    path.transition()
        .duration(750)
        .attrTween('d', function(d) {
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        });
});
