export const IfControl = (props: {
  when: boolean;
  children: any;
}): JSX.Element => {
  if (props.when) {
    return props.children;
  }

  return null as any;
};
export const IfElseControl = (props: {
  when: boolean;
  children: any;
  else: JSX.Element;
}): JSX.Element => {
  if (props.when) {
    return props.children;
  }

  return props.else;
};

export const ForControl = <I extends any>(props: {
  list: I[];
  children: (item: I, index: number) => React.ReactNode;
}): JSX.Element => {
  return props.list.map((item, index) => {
    return props.children(item, index);
  }) as any;
};
