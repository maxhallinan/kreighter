const emptyValues = () => ({});

export function toCreator(type, withValues=emptyValues) {
  return function actionCreator(...args) {
    return {
      ...withValues(...args),
      type,
    };
  };
}
