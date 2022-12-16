

const sample = [
{
language: 'Before 2012',
value: 899,
color: '#000000'
},
{
language: '2012',
value: 1695,
color: '#00a2ee'
},
{
language: '2013',
value: 4669,
color: '#fbcb39'
},
{
language: '2014',
value: 3665,
color: '#007bc8'
},
{
language: '2015',
value: 4918,
color: '#65cedb'
},
{
language: '2016',
value: 5709,
color: '#ff6e52'
},
{
language: '2017',
value: 8598,
color: '#f9de3f'
},
{
language: '2018',
value: 14190,
color: '#5d2f8e'
},
{
language: '2019',
value: 10216,
color: '#008fc9'
},
{
language: '2020',
value: 10998,
color: '#507dca'
},
{
language: '2021',
value: 18277,
color: '#507dca'
},
{
language: '2022',
value: 26455,
color: '#507dca'
},
{
language: '2023',
value: 1863,
color: '#507dca'
}
];

const svg = d3.select('div#plot');
const svgContainer = d3.select('#container');

const margin = 80;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

const chart = svg.append('g')
.attr('transform', `translate(${margin}, ${margin})`);

const xScale = d3.scaleBand()
.range([0, width])
.domain(sample.map((s) => s.language))
.padding(0.4)

const yScale = d3.scaleLinear()
.range([height, 0])
.domain([0, 27000]);

// vertical grid lines
// const makeXLines = () => d3.axisBottom()
//   .scale(xScale)

const makeYLines = () => d3.axisLeft()
.scale(yScale)

chart.append('g')
.attr('transform', `translate(0, ${height})`)
.call(d3.axisBottom(xScale));

chart.append('g')
.call(d3.axisLeft(yScale));

// vertical grid lines
// chart.append('g')
//   .attr('class', 'grid')
//   .attr('transform', `translate(0, ${height})`)
//   .call(makeXLines()
//     .tickSize(-height, 0, 0)
//     .tickFormat('')
//   )

chart.append('g')
.attr('class', 'grid')
.call(makeYLines()
.tickSize(-width, 0, 0)
.tickFormat('')
)

const barGroups = chart.selectAll()
.data(sample)
.enter()
.append('g')

barGroups.append('rect')
.attr('class', 'bar')
.attr('x', (g) => xScale(g.language))
.attr('y', (g) => yScale(g.value))
.attr('height', (g) => height - yScale(g.value))
.attr('width', xScale.bandwidth())
.on('mouseenter', function (actual, i) {
d3.selectAll('.value')
  .attr('opacity', 0)

d3.select(this)
  .transition()
  .duration(300)
  .attr('opacity', 0.6)
   .attr('x', (a) => xScale(a.language) - 5)
  .attr('width', xScale.bandwidth() + 10)

const y = yScale(i.value)


line = chart.append('line')
  .attr('id', 'limit')
  .attr('x1', 0)
  .attr('y1', y)
  .attr('x2', width)
  .attr('y2', y)

barGroups.append('text')
  .attr('class', 'divergence')
  .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
  .attr('y', (a) => yScale(a.value) + 30)
  .attr('fill', 'white')
  .attr('text-anchor', 'middle')
.text((a, idx) => {
  const divergence = (a.value/1121.52).toFixed(3)

  let text = ''
  text += `${divergence}%`

  return idx !== i ? text : '';
})

})
.on('mouseleave', function () {
d3.selectAll('.value')
  .attr('opacity', 1)

d3.select(this)
  .transition()
  .duration(300)
  .attr('opacity', 1)
  .attr('x', (a) => xScale(a.language))
  .attr('width', xScale.bandwidth())

chart.selectAll('#limit').remove()
chart.selectAll('.divergence').remove()
})

barGroups.append('text')
.attr('class', 'value')
.attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
.attr('y', (a) => yScale(a.value) + 30)
.attr('text-anchor', 'middle')
.text((a) => `${a.value}`)


svg.append('text')
.attr('class', 'label')
.attr('x', -(height / 2) - margin)
.attr('y', margin / 2.4)
.attr('transform', 'rotate(-90)')
.attr('text-anchor', 'middle')
.text('Vehicle Count')

svg.append('text')
.attr('class', 'label')
.attr('x', width / 2 + margin)
.attr('y', height + margin * 1.7)
.attr('text-anchor', 'middle')
.text('Year')

svg.append('text')
.attr('class', 'title')
.attr('x', width / 2 + margin)
.attr('y', 40)
.attr('text-anchor', 'middle')
.text('Amout of Electric Vehicles in Washington across Model Year')

