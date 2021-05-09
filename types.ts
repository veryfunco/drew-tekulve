export type Await<T> = T extends PromiseLike<infer U> ? U : T;

// Next includes a type that attempts to extract static props,
// but it is currently broken if there is a notFound condition
// in the getStaticProps function. This is a hacky way to get
// around that limitation. As of Apr 2021.
export type StaticProps<T extends (...args: any) => any> = Await<
  ReturnType<T>
>["props"];
