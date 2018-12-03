import * as d3 from "d3";

// dimensions
const width = 1000;
const height = 1000;

const margin = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50
};

// create an svg to draw in
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate("${margin.top},${margin.left}")`);

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

const simulation = d3
  .forceSimulation()
  // pull nodes together based on the links between them
  .force(
    "link",
    d3
      .forceLink()
      .id(({ id }) => id)
      .strength(0.025)
  )
  // push nodes apart to space them out
  .force("charge", d3.forceManyBody().strength(-200))
  // add some collision detection so they don't overlap
  .force("collide", d3.forceCollide().radius(12))
  // and draw them around the centre of the space
  .force("center", d3.forceCenter(width / 2, height / 2));

// load the graph
d3.json("mention_network.json", (error, graph) => {
  // set the nodes get the links
  const { nodes, links } = graph;

  // add the curved links to our graphic
  const link = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("stroke", d => {
      return "#ddd";
    });

  // add the nodes to the graphic
  const node = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g");

  // a circle to represent the node
  node
    .append("circle")
    .attr("class", "node")
    .attr("r", 8)
    .attr("fill", d => {
      return d.colour;
    })
    .on("mouseover", mouseOver(0.2))
    .on("mouseout", mouseOut);

  // hover text for the node
  node.append("title").text(d => {
    return d.twitter;
  });

  // add a label to each node
  node
    .append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(d => {
      return d.name;
    })
    .style("stroke", "black")
    .style("stroke-width", 0.5)
    .style("fill", d => {
      return d.colour;
    });

  // add the nodes to the simulation and
  // tell it what to do on each tick
  simulation.nodes(nodes).on("tick", ticked);

  // add the links to the simulation
  simulation.force("link").links(links);

  // on each tick, update node and link positions
  function ticked() {
    link.attr("d", positionLink);
    node.attr("transform", positionNode);
  }

  // links are drawn as curved paths between nodes,
  // through the intermediate nodes
  function positionLink(d) {
    const offset = 30;

    const midpointX = (d.source.x + d.target.x) / 2;
    const midpointY = (d.source.y + d.target.y) / 2;

    const dx = d.target.x - d.source.x;
    const dy = d.target.y - d.source.y;

    const normalise = Math.sqrt(dx * dx + dy * dy);

    const offSetX = midpointX + offset * (dy / normalise);
    const offSetY = midpointY - offset * (dx / normalise);
    return `M${d.source.x},${d.source.y},S${offSetX},${offSetY} ${d.target.x},${
      d.target.y
    }`;
  }

  // move the node based on forces calculations
  function positionNode(d) {
    // keep the node within the boundaries of the svg
    const { x, y } = d;
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    if (x > width) {
      x = width;
    }
    if (y > height) {
      y = height;
    }
    return `translate(${x},${y})`;
  }

  // build a dictionary of nodes that are linked
  const linkedByIndex = {};
  links.forEach(d => {
    linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
  });

  // check the dictionary to see if nodes are linked
  function isConnected(a, b) {
    return (
      linkedByIndex[`${a.index},${b.index}`] ||
      linkedByIndex[`${b.index},${a.index}`] ||
      a.index === b.index
    );
  }

  // fade nodes on hover
  function mouseOver(opacity) {
    return function(d) {
      // check all other nodes to see if they're connected
      // to this one. if so, keep the opacity at 1, otherwise
      // fade
      node.style("stroke-opacity", o => {
        const thisOpacity = isConnected(d, o) ? 1 : opacity;
        return thisOpacity;
      });
      node.style("fill-opacity", o => {
        const thisOpacity = isConnected(d, o) ? 1 : opacity;
        return thisOpacity;
      });
      // also style link accordingly
      link.style("stroke-opacity", o => {
        return o.source === d || o.target === d ? 1 : opacity;
      });
      link.style("stroke", o => {
        return o.source === d || o.target === d ? o.source.colour : "#ddd";
      });
    };
  }

  function mouseOut() {
    node.style("stroke-opacity", 1);
    node.style("fill-opacity", 1);
    link.style("stroke-opacity", 1);
    link.style("stroke", "#ddd");
  }
});
