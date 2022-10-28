import { FC, ReactNode } from "react";

export interface BaseLayoutProps {
  navbar?: ReactNode;
  content?: ReactNode;
}

export const BaseLayout: FC<BaseLayoutProps> = (props) => {
  return (
    <div aria-label='BaseLayout'>
      <nav aria-label='BaseLayoutNav'>{props.navbar}</nav>
      <main aria-label='BaseLayoutContent'>{props.content}</main>
    </div>
  );
};
