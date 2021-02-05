const renameKeys = (obj, newKeys) => {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}

const getGeo = (obj) => {
    const { geo: { coordinates: { coordinates = null } = {coordinates: null} } = { geo: null }} = obj;
    return coordinates;
}

module.exports = { renameKeys, getGeo }