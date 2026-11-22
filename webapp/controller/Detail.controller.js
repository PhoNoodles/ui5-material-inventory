sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend(
    "com.portfolio.materialinventory.controller.Detail",
    {
      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        const oRoute = oRouter.getRoute("materialDetail");

        oRoute.attachPatternMatched(this.onRouteMatched, this);
      },
      onRouteMatched: function (oEvent) {
        // 1. Get the material ID from the URL
        const oArgs = oEvent.getParameter("arguments");
        const sMaterialId = oArgs.materialId;

        // 2. Get the shared JSONModel
        const oModel = this.getView().getModel();

        // 3. Retrieve the materials array
        const aMaterials = oModel.getProperty("/materials");

        // 4. Handle data that hasn't loaded yet
        if (!Array.isArray(aMaterials)) {
          return;
        }

        // 5. Find the material's position in the array
        const iIndex = aMaterials.findIndex(function (oMaterial) {
          return oMaterial.materialId === sMaterialId;
        });

        // 6. Handle an invalid material ID
        if (iIndex === -1) {
          this.getView().unbindElement();
          return;
        }

        // 7. Bind the Detail View to the selected material
        const sPath = "/materials/" + iIndex;

        this.getView().bindElement({
          path: sPath,
        });
      },
      onNavBack: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("materialList");
      },
    },
  );
});
