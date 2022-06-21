import { LocalImages } from "./imageUrlConstants";

export const SCREENS = {
  HOMESCREEN: {
    avatarName: "Robert Downey",
    appName: "Global ID",
    category: "CATEGORIES",
    documentLabel: "BY MOST FREQUENTLY USED DOCUMENTS",
    DocumentList: [
      {
        TITLE: "Passport",
        URI: LocalImages.CATEGORIES.personalcardImage,
        COLOR: "#D7EFFB",
      },
      {
        TITLE: "National ID",
        URI: LocalImages.CATEGORIES.educationImage,
        COLOR: "#FFDD9B",
      },
    ],
    categoryList: [
      {
        TITLE: "ID",
        URI: LocalImages.CATEGORIES.personalcardImage,
        COLOR: "#D7EFFB",
      },
      {
        TITLE: "Education",
        URI: LocalImages.CATEGORIES.educationImage,
        COLOR: "#FFDD9B",
      },
      {
        TITLE: "Insurance",
        URI: LocalImages.CATEGORIES.insuranceImage,
        COLOR: "#C5BDF6",
      },
      {
        TITLE: "Travel",
        URI: LocalImages.CATEGORIES.travelImage,
        COLOR: "#F5BCE8",
      },
    ],
  },
};
