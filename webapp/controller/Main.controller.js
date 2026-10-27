sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
  ],
  function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend(
      "com.portfolio.materialinventory.controller.Main",
      {
        // Initialize the application
        onInit: function () {
          const oModel = new JSONModel();

          // Load material inventory data
          oModel.loadData(
            sap.ui.require.toUrl(
              "com/portfolio/materialinventory/model/materials.json",
            ),
          );

          // Attach the model to the View
          this.getView().setModel(oModel);
        },

        // Triggered when user types in the search field
        onSearch: function () {
          this.applyFilters();
        },

        // Triggered when user changes the plant dropdown
        onFilterChange: function () {
          this.applyFilters();
        },

        // Apply material search and plant filtering
        applyFilters: function () {
          const sQuery = this.byId("materialSearch").getValue().trim();

          const sPlant = this.byId("plantSelect").getSelectedKey();

          const aFilters = [];

          // Filter 1: Material ID OR Description
          if (sQuery) {
            aFilters.push(
              new Filter({
                filters: [
                  new Filter("materialId", FilterOperator.Contains, sQuery),
                  new Filter("description", FilterOperator.Contains, sQuery),
                ],
                and: false,
              }),
            );
          }

          // Filter 2: Plant
          if (sPlant && sPlant !== "ALL") {
            aFilters.push(new Filter("plant", FilterOperator.EQ, sPlant));
          }

          // Get the materials table
          const oTable = this.byId("materialsTable");

          // Get its items binding
          const oBinding = oTable.getBinding("items");

          // Apply search AND plant filters
          oBinding.filter(aFilters);
        },

        // Handle Load Materials button
        onLoadMaterials: function () {
          MessageToast.show("Materials loaded!");
        },
      },
    );
  },
);
