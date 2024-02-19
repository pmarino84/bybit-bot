function parseFieldsAsNumber(obj, fields) {
  const result = {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const item = obj[key];
      if (fields.includes(key)) {
        result[key] = Number(item);
        continue;
      }

      result[key] = item;
    }
  }

  return result;
}
module.exports = parseFieldsAsNumber;
