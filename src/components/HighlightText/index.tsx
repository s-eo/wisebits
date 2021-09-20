import React, {FC, ReactNode, useMemo} from 'react';

interface IProps {
  with: FC | string;
  text: string[];
  children?: ReactNode;
}

export const HighlightText = (props:IProps) => {
  // remove duplicates and use effectively with Set
  const templates: Set<string> = useMemo(() => new Set(props.text), [props.text]);

  // if wrapping prop is an empty string,
  // if template array prop is empty,
  // if no children provided - return as is
  if (!props.with || !templates.size || !props.children) return <>props.children</> || null;

  // can`t search template in non-string children. Return as is
  if (typeof props.children !== 'string') return <>props.children</> || null;

  const With = props.with;

  return <>{
    props.children
      .split(' ')
      // wrap with {props.with} every word in {props.text} template
      .map((node, index, all) => {
        const isLast = index === all.length - 1;
        const ElementType = templates.has(node) ? With : React.Fragment;
        const PureNode = React.memo(({ text }: {text: string}) => <ElementType>{text}</ElementType>);
        const NewNode = <PureNode text={node} key={`${node + '_' + index}`}/>;

        return [NewNode, isLast ? null : ' '];
      })
  }</>;

};