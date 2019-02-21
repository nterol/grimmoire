const createDictionnary = links =>
  links.reduce(
    (acc, { source, target }) => Array.from(new Set([...acc, source, target])),
    []
  );

const dictionnaryPurifier = dictionnary => id =>
  dictionnary.filter(page => page !== id);
const findNode = ({ page, nodes }) => nodes.find(({ id }) => id === page);
const getNodesFromDictionnary = dictionnary => nodes =>
  dictionnary.map(page => findNode({ page, nodes }));

export function graphParser(id, links, nodes) {
  const filteredLinks = links.filter(
    ({ source, target }) => source === id || target === id
  );
  const dictionnary = createDictionnary(filteredLinks);
  const pureDictionnary = dictionnaryPurifier(dictionnary)(id);
  const filterdNodes = getNodesFromDictionnary(pureDictionnary)(nodes);

  return { filterdNodes, filteredLinks };
}

// **************************************************************

// function getNodes(dictionnary) {
//   return  dictionnary.map(page => dataSet.nodes.find(e => e.id === page));
//   }

//   const reducer = (acc, {source, target}) => {
//     if (!acc.length)
//        acc = [];
//     return Array.from(new Set([...acc, source, target]))
//   }

//   const createDictionnary = links => links.reduce(reducer);

//   (function GraphParser(o) {
//     const {id, type} = o;

//   const filteredLink = dataSet.edges.filter(({source, target}) => source === id || target=== id);

//    const dictionnary = createDictionnary(filteredLink).filter(e => e !== id);
//    const newNodes = getNodes(dictionnary);

//     return {newNodes, filteredLink}

//   })({id:"media", type:"subject"});
