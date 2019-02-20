export const graphParser = (id, links, nodes) => {};

const getNodeInLinks = ({ source, target }) => id =>
  source === id || target === id;

const getUniqueNode = node => id => node !== id;

const filterList = list => func => list.filter(func);

const filterLinks = id => links => filterList(links)(getNodeInLinks(id));

const createDictionnary = links => filterLinks(links)(getUniqueNode);

const getNode = dictionnary => dictionnary.map;

const findPageInNode = page => nodes => {};
