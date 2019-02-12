function findNode(page) {
  return graph.nodes.find(({ id }) => id === page);
}

function getNodes(dictionnary) {
  return dictionnary.map(findNode);
}

function dictionnaryPurifier(dictionnary, id) {
  return dictionnary.filter(page => page !== id);
}

function linkReducer(dictionnary, { source, target }) {
  if (!dictionnary.length) dictionnary = [];
  return [...dictionnary, source, target];
}

function createDictionnary(links) {
  return links.reduce(linkReducer);
}

function linkReferenceChecker({ source, target }, id) {
  return source === id || target === id;
}

function filterLink({ links }, id) {
  links.filter(linkReducerChecker);
}

export function graphFromNodeParser({ id, type }, graph) {
  filterLink(graph, id);
}
