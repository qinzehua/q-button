module.exports = {
  base: "/q-gulu/",
  title: "Hello VuePress",
  description: "Just playing around",
  themeConfig: {
    sidebar: [
      {
        title: "入门",
        children: ["/install/", "/get-start/"],
      },
      {
        title: "组件",
        children: ["/components/button"],
      },
    ],
  },
};
