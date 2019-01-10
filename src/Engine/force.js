import * as d3 from "d3";
import ReactDOM from "react-dom";

/* eslint-disable */
const FORCE = (function(nsp) {
  let width = 1030,
    height = 1000;

  const setWidth = w => (nsp.width = w),
    setHeight = h => (nsp.height = h),
    initForce = (nodes, links) => {
      nsp.force = d3
        .forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-100))
        .force(
          "link",
          d3
            .forceLink(links)
            .id(d => d.id)
            .distance(400)
            .strength(0.055)
        )
        .force(
          "center",
          d3
            .forceCenter()
            .x(width / 2)
            .y(height / 2)
          // .x(nsp.width / 2)
          // .y(nsp.height / 2)
        )
        .force(
          "collide",
          d3
            .forceCollide()
            .radius(80)
            .iterations([5])
        );
    },
    enterNode = selection => {
      // const circle = selection.select("circle");
      const rect = selection.select("rect");

      // .style("fill", function(d) {
      //   if (d.id > 3) {
      //     return "darkcyan";
      //   } else {
      //     return "tomato";
      //   }
      // })
      // .style("stroke", "bisque")
      // .style("stroke-width", "3px");
    },
    updateNode = selection => {
      selection.attr("transform", ({ x, y }) => {
        if (x < 0) x = 250;
        if (x > width) x = width - 200;
        if (y < 0) y = 200;
        if (y > height) y = height;
        return "translate(" + (x - 60) + "," + (y - 60) + ")";
      });
      // .attr("cx", ({ x }) => {
      //   return (x = Math.max(30, Math.min(width - 30, x)));
      // })
      // .attr("cy", ({ y }) => {
      //   return (y = Math.max(30, Math.min(height - 30, y)));
      // });
    },
    updateLink = selection => {
      selection
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    },
    updateGraph = selection => {
      // console.log(selection, width, height);
      selection.selectAll(".node").call(updateNode);
      selection.selectAll(".link").call(updateLink);
    },
    dragStarted = d => {
      if (!d3.event.active) nsp.force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    },
    dragging = d => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    },
    dragEnded = d => {
      if (!d3.event.active) nsp.force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    },
    drag = () =>
      d3.selectAll("g.node").call(
        d3
          .drag()
          .on("start", dragStarted)
          .on("drag", dragging)
          .on("end", dragEnded)
      ),
    tick = that => {
      that.d3Graph = d3.select(ReactDOM.findDOMNode(that));
      nsp.force.on("tick", () => {
        that.d3Graph.call(updateGraph);
      });
    };
  // color = d3.scaleOrdinal(d3.schemeCategory10),

  nsp.height = height;
  nsp.width = width;
  nsp.setHeight = setHeight;
  nsp.setWidth = setWidth;
  nsp.enterNode = enterNode;
  nsp.updateNode = updateNode;
  nsp.updateLink = updateLink;
  nsp.updateGraph = updateGraph;
  nsp.initForce = initForce;
  nsp.dragStarted = dragStarted;
  nsp.dragging = dragging;
  nsp.dragEnded = dragEnded;
  nsp.drag = drag;
  nsp.tick = tick;
  // nsp.width = width;
  // nsp.height = height;
  // nsp.resetWidth = resetWidth;
  // nsp.resetHeight = resetHeight;
  // nsp.resetDim = resetDim;

  return nsp;
})(FORCE || {});

export default FORCE;
