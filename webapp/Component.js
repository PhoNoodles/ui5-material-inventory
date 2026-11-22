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
        oModel.attachRequestCompleted(function (oEvent) {
          if (!oEvent.getParameter("success")) {
            console.error("Failed to load material inventory data");
          }

          this.getRouter().initialize();
        }, this);

        oModel.loadData(
          sap.ui.require.toUrl(
            "com/portfolio/materialinventory/model/materials.json",
          ),
        );
        this.setModel(oModel);
      },
    });
  },
);
