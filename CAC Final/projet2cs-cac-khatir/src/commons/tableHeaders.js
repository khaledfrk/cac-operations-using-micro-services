export const getTableHeaders = (contentType) => {
  if (contentType === "employeePreview") {
    return [
      {
        key: "name",
        value: "Ime",
      },
      {
        key: "surname",
        value: "Prezime",
      },
      {
        key: "lbz",
        value: "LBZ",
      },
      {
        key: "contact",
        value: "Kontakt",
      },
      {
        key: "email",
        value: "Email",
      },
      {
        key: "title",
        value: "Titula",
      },
      {
        key: "profession",
        value: "Zanimanje",
      },
      {
        key: "department",
        value: "Odeljenje",
      },
    ];
  } else if (contentType === "patientPreview") {
    return [
      {
        key: "id",
        value: "ID",
      },
      {
        // ime
        key: "Nom",
        value: "NOM",
      },
      {
        key: "nomdefamille",
        value: "nom de famille",
      },
      {
        key: "Numeroducontact",
        value: "Contact",
      },
      {
        key: "email",
        value: "Email",
      },
      {
        key: "Situationfamiliale",
        value: "Situation familiale",
      },
    ];
  }
  return [];
};
