import jsontoxml from "jstoxml";
import { writeFile } from "fs/promises";

export interface PlaceResponse {
  img: string;
  name: string;
  desc: string;
  area: string;
  city: string;
  address: string;
  phone: string;
  category: string;
  type: string;
  hours: string;
  kosher: string;
  handicap: string;
  website: string;
  delivery: string;
  internal_link: string;
  is_new: string;
  search_words: string;
  latitude: string;
  longitude: string;
}

export interface APIResponse {
  branch: PlaceResponse[];
}

const response: APIResponse = await (
  await fetch("https://www.hvr.co.il/bs2/datasets/teamimcard_branches.json")
).json();

const kmlObject: jsontoxml.XmlElement = {
  kml: {
    _attrs: {
      xmlns: "http://www.opengis.net/kml/2.2",
    },
    Document: [
      { name: "חבר טעמים" },
      ...response.branch.map((place) => ({
        Placemark: {
          name: place.name,
          description: `${place.desc}
${place.category} - ${place.type}
${place.hours}
${place.address}, ${place.city}`,
          Point: {
            coordinates: `${place.longitude},${place.latitude},0`,
          },
        },
      })),
    ],
  },
};

const xml = jsontoxml.toXML(kmlObject, {
  header: true,
  indent: "  ",
});
await writeFile("./places.kml", xml);
