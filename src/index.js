export function fromType(type, withValues) {
  return function actionCreator(...args) {
    return {
      type,
    };
  };
}

export function fromMap(typeMap, withValues) {
  return {};
}

export default { fromType, fromMap, };
