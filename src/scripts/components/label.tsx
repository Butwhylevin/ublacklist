import { JSX, createContext, h } from 'preact';
import { forwardRef } from 'preact/compat';
import { Ref, useContext, useMemo } from 'preact/hooks';
import { applyClass, useInnerRef } from './helpers';
import { useCSS } from './styles';
import { useTheme } from './theme';

type LabelContextValue = { disabled?: boolean };

const LabelContext = createContext<LabelContextValue | null>(null);

function useLabelContext(): LabelContextValue {
  const value = useContext(LabelContext);
  if (!value) {
    throw new Error('useLabelContext: no matching provider');
  }
  return value;
}

export type LabelWrapperProps = {
  disabled?: boolean;
  fullWidth?: boolean;
} & JSX.IntrinsicElements['div'];

export const LabelWrapper = forwardRef(
  ({ disabled, fullWidth, ...props }: LabelWrapperProps, ref: Ref<HTMLDivElement>) => {
    const css = useCSS();
    const class_ = useMemo(
      () =>
        css({
          marginBottom: fullWidth ? '0.5em' : 0,
          opacity: disabled ? 0.38 : 1,
        }),
      [css, disabled, fullWidth],
    );
    return (
      <LabelContext.Provider value={{ disabled: disabled }}>
        <div {...applyClass(props, class_)} ref={ref} />
      </LabelContext.Provider>
    );
  },
);

export type LabelProps = JSX.IntrinsicElements['span'];

export const Label = forwardRef((props: LabelProps, ref: Ref<HTMLSpanElement>) => {
  const { disabled } = useLabelContext();

  const css = useCSS();
  const theme = useTheme();
  const class_ = useMemo(
    () =>
      css({
        color: theme.text.primary,
        cursor: disabled ? 'default' : 'auto',
      }),
    [css, theme, disabled],
  );

  return (
    <div>
      <span {...applyClass(props, class_)} ref={ref} />
    </div>
  );
});

export type ControlLabelProps = { for: string } & JSX.IntrinsicElements['label'];

export const ControlLabel = forwardRef(
  ({ children, for: for_, ...props }: ControlLabelProps, ref: Ref<HTMLLabelElement>) => {
    const { disabled } = useLabelContext();

    const css = useCSS();
    const theme = useTheme();
    const class_ = useMemo(
      () =>
        css({
          color: theme.text.primary,
          cursor: disabled ? 'default' : 'pointer',
        }),
      [css, theme, disabled],
    );

    return (
      <div>
        <label {...applyClass(props, class_)} for={for_} ref={ref}>
          {children}
        </label>
      </div>
    );
  },
);

export type ControlLikeLabelProps = { for: string } & JSX.IntrinsicElements['span'];

export const ControlLikeLabel = forwardRef(
  ({ for: for_, ...props }: ControlLikeLabelProps, ref: Ref<HTMLSpanElement>) => {
    const { disabled } = useLabelContext();
    const innerRef = useInnerRef(ref);

    const css = useCSS();
    const theme = useTheme();
    const class_ = useMemo(
      () =>
        css({
          color: theme.text.primary,
          cursor: disabled ? 'default' : 'pointer',
        }),
      [css, theme, disabled],
    );

    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <span
          {...applyClass(props, class_)}
          ref={innerRef}
          onClick={() =>
            (innerRef.current.getRootNode() as HTMLDocument | ShadowRoot)
              .querySelector<HTMLElement>(`#${for_}`)
              ?.focus()
          }
        />
      </div>
    );
  },
);

export type SubLabelProps = JSX.IntrinsicElements['span'];

export const SubLabel = forwardRef((props: SubLabelProps, ref: Ref<HTMLSpanElement>) => {
  const { disabled } = useLabelContext();

  const css = useCSS();
  const theme = useTheme();
  const class_ = useMemo(
    () =>
      css({
        color: theme.text.secondary,
        cursor: disabled ? 'default' : 'auto',
      }),
    [css, theme, disabled],
  );

  return (
    <div>
      <span {...applyClass(props, class_)} ref={ref} />
    </div>
  );
});