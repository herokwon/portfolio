type ContentBoxProps = React.ComponentPropsWithoutRef<'section'>;

export default function ContentBox({ children, ...props }: ContentBoxProps) {
  return (
    <section {...props} className={`content-box ${props.className ?? ''}`}>
      {children}
    </section>
  );
}
