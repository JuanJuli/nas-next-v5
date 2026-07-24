import { theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

const darkTokenOverrides = {
  colorBgLayout: "#141414",
  colorBgContainer: "#1f1f1f",
};

const lightTokenOverrides = {
  colorBgLayout: "#f8fafc",
  colorBgContainer: "#ffffff",
};

const darkComponentOverrides = {
  Table: {
    headerBg: "#1d1d1d",
  },
  Layout: {
    headerBg: "#141414",
    siderBg: "#141414",
  },
  Breadcrumb: {
    linkColor: "#9ca3af",
  },
};

const baseComponentOverrides = (primaryColor: string) => ({
  Button: {
    borderRadius: 6,
    controlHeight: 40,
    fontWeight: 500,
  },

  Input: {
    controlHeight: 40,
    borderRadius: 6,
  },
  Search: {
    controlHeight: 40,
    borderRadius: 6,
  },

  Select: {
    controlHeight: 40,
    borderRadius: 6,
  },

  DatePicker: {
    controlHeight: 40,
    borderRadius: 6,
  },

  Card: {
    borderRadiusLG: 10,
  },

  Modal: {
    borderRadiusLG: 10,
  },

  Drawer: {
    borderRadiusLG: 10,
  },

  Table: {
    borderRadius: 8,
    rowHoverBg: `${primaryColor}0d`,
    cellPaddingInline: 12,
    cellPaddingInlineMD: 12,
    cellPaddingInlineSM: 12,
  },

  Tag: {
    borderRadiusSM: 4,
  },

  Badge: {
    colorPrimary: primaryColor,
  },

  Alert: {
    borderRadiusLG: 8,
  },

  Progress: {
    defaultColor: primaryColor,
  },

  Slider: {
    trackBg: primaryColor,
    handleColor: primaryColor,
  },

  Switch: {
    colorPrimary: primaryColor,
  },

  Checkbox: {
    colorPrimary: primaryColor,
  },

  Radio: {
    colorPrimary: primaryColor,
  },

  Tabs: {
    itemSelectedColor: primaryColor,
    inkBarColor: primaryColor,
  },

  Menu: {
    itemSelectedColor: primaryColor,
    itemSelectedBg: `${primaryColor}1a`,
    itemHoverColor: primaryColor,
  },

  Layout: {
    headerBg: "#ffffff",
    siderBg: "#ffffff",
  },

  Breadcrumb: {
    linkColor: "#6b7280",
    lastItemColor: primaryColor,
  },

  Pagination: {
    colorPrimary: primaryColor,
  },

  Steps: {
    colorPrimary: primaryColor,
  },

  Spin: {
    colorPrimary: primaryColor,
  },

  Tooltip: {
    borderRadius: 6,
  },

  Popover: {
    borderRadius: 8,
  },

  Dropdown: {
    borderRadius: 8,
  },
});

const createComponentOverrides = (primaryColor: string, mode: "light" | "dark") => {
  const overrides = baseComponentOverrides(primaryColor);
  if (mode === "dark") {
    Object.assign(overrides.Table, darkComponentOverrides.Table);
    Object.assign(overrides.Layout, darkComponentOverrides.Layout);
    Object.assign(overrides.Breadcrumb, darkComponentOverrides.Breadcrumb);
  }
  return overrides;
};

export const createTenantTheme = (primaryColor: string, mode: "light" | "dark" = "light") => {
  const algorithm = mode === "dark" ? darkAlgorithm : defaultAlgorithm;
  const tokenOverrides = mode === "dark" ? darkTokenOverrides : lightTokenOverrides;

  return {
    algorithm,
    token: {
      colorPrimary: primaryColor,
      colorInfo: primaryColor,

      borderRadius: 6,

      ...tokenOverrides,
    },
    zeroRuntime: true,
    componentSize: "large",
    components: createComponentOverrides(primaryColor, mode),
  };
};