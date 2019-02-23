const createDictionnary = links =>
  links.reduce(
    (acc, { source: { id: sourceId }, target: { id: targetId } }) =>
      Array.from(new Set([...acc, sourceId, targetId])),
    []
  );

const dictionnaryPurifier = dictionnary => id =>
  dictionnary.filter(page => page !== id);
const findNode = ({ page, nodes }) => nodes.find(({ id }) => id === page);
const getNodesFromDictionnary = dictionnary => nodes =>
  dictionnary.map(page => findNode({ page, nodes }));

export function graphParser(id, links, nodes) {
  const filteredLinks = links.filter(
    ({ source, target }) => source.id === id || target.id === id
  );
  const dictionnary = createDictionnary(filteredLinks);

  const pureDictionnary = dictionnaryPurifier(dictionnary)(id);
  const filteredNodes = getNodesFromDictionnary(pureDictionnary)(nodes);
  const o = { filteredNodes, filteredLinks };

  return o;
}
