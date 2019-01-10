import React, { Component } from "react";
import Ultimate from "../components/Views/Ultimate";

class FORCE {
  element = {};
  width = 1080;
  height = 1000;
  color = d3.scaleOrdinal(d3.schemeCategory10);

  initForce(nodes, links) {
    this.element.force = d3
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
          .x(this.width / 2)
          .y(this.height / 2)
      )
      .force(
        "collide",
        d3
          .forceCollide()
          .radius(80)
          .iterations([5])
      );
  }
  enterNode(selection) {
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
  }
  updateNode(selection) {
    selection.attr("transform", ({ x, y }) => {
      if (x < 0) x = 250;
      if (x > this.width) x = this.width - 200;
      if (y < 0) y = 200;
      if (y > this.height) y = this.height;
      return "translate(" + (x - 60) + "," + (y - 60) + ")";
    });
    // .attr("cx", ({ x }) => {
    //   return (x = Math.max(30, Math.min(this.width - 30, x)));
    // })
    // .attr("cy", ({ y }) => {
    //   return (y = Math.max(30, Math.min(this.height - 30, y)));
    // });
  }
  updateLink(selection) {
    selection
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  }
  updateGraph(selection) {
    selection.selectAll(".node").call(this.updateNode);
    selection.selectAll(".link").call(this.updateLink);
  }
  dragStarted(d) {
    if (!d3.event.active) this.element.force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  dragEnded(d) {
    if (!d3.event.active) this.element.force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  drag() {
    d3.selectAll("g.node").call(
      d3
        .drag()
        .on("start", this.dragStarted)
        .on("drag", this.dragging)
        .on("end", this.dragEnded)
    );
  }
  tick(that) {
    that.d3Graph = d3.select(ReactDOM.findDOMNode(that));
    console.log("TAHT GRAPH3", that.d3Graph);
    this.element.force.on("tick", () => {
      that.d3Graph.call(this.updateGraph);
    });
  }
}
