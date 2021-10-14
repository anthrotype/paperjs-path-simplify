#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .command('$0 <source>', 'Use paper.js to simplify SVG path', () => {})
    .option('tolerance', {
        alias: 't',
        description: 'Simplify tolerance. Default: 0.01',
        type: 'float',
        default: 0.01,
    })
    .help()
    .alias('help', 'h')
    .argv;

var paper = require('paper');
paper.setup();
var parser = require('html-attribute-parser');
var tolerance = argv.tolerance;
var source_d = argv.source;

// simplify path with paper.js
var path = new paper.Path({pathData: source_d});
path.simplify(tolerance);
var svg = path.exportSVG({asString: true});
// var output_d = parser(svg).attributes.d;
// console.log(output_d);

// optimize it with svgo
const { optimize } = require('svgo');
const result = optimize(svg, {
  // svgo options go here
  "multipass": true,
});
var output_d = parser(result.data).attributes.d;
console.log(output_d);
