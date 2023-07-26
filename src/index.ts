/// <reference types="@sec-ant/readable-stream"/>
export async function* xielder<T, R>(
  _: (
    xield: (value: T) => Promise<void>,
    close: (returnValue: R) => Promise<void>
  ) => unknown
) {
  const { writable, readable } = new TransformStream<T, T>();
  const writer = writable.getWriter();
  let writerClosed = false;
  let returnValue: R | undefined;
  _(
    (v) => (writerClosed ? Promise.resolve() : writer.write(v)),
    (r) => ((returnValue = r), (writerClosed = true), writer.close())
  );
  for await (const chunk of readable) {
    yield chunk;
  }
  return returnValue as R;
}
