export default function getObjectKeys<O extends object>(
  obj: O
): Array<keyof O> {
  return Object.keys(obj) as Array<keyof O>;
}
