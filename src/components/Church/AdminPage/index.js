import getEntityAdminPage from "../../hoc/getEntityAdminPage";

const settings = {
  initialState: {
    name: "",
    city: "",
    area: ""
  },
  cleanState: {
    name: "",
    city: "",
    area: ""
  },
  form: {
    fields: {
      name: {
        // icon: 'info',
      },
      city: {
        icon: "map-signs"
      },
      area: {
        icon: "map-pin"
      }
    }
  },
  list: {
    settings: {
      tableColumns: ["name", "city", "area"],
      tableSort: [{ id: "name" }]
    }
  }
};

const ChurchAdminPage = getEntityAdminPage("church", settings);

export default ChurchAdminPage;
