sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"],
  function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("com.portfolio.materialinventory.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        UIComponent.prototype.init.apply(this, arguments);

        const oModel = new JSONModel();
        oModel.loadData(
          sap.ui.require.toUrl(
            "com/portfolio/materialinventory/model/materials.json",
          ),
        );
        this.setModel(oModel);

        this.getRouter().initialize();
      },
    });
  },
);
