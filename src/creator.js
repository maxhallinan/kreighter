export const emptyValues = () => ({});

export function toCreator(type, withValues) {
  return function actionCreator(...args) {
    return {
      ...withValues(...args),
      type,
    };
  };
}
