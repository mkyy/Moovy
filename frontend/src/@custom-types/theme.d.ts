export type CustomizationType = {
  fontFamily: string;
  borderRadius: string | number;
  navType: string | null | undefined;
};

declare module '@mui/material/styles' {
  // allow configuration using `createTheme`

  interface TypographyVariants {
    mainContent: React.CSSProperties;
    menuCaption?: React.CSSProperties;
    subMenuCaption?: React.CSSProperties;
    caption?: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    mainContent?: React.CSSProperties;
    menuCaption?: React.CSSProperties;
    subMenuCaption?: React.CSSProperties;
    caption?: React.CSSProperties;
  }
}
