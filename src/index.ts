import { XmlElement, toXML } from "jstoxml";
import { APIResponse } from "./types";
import { writeFile } from "fs/promises";

const run = async () => {
  const response: APIResponse = await (
    await fetch("https://www.hvr.co.il/bs2/datasets/teamimcard_branches.json")
  ).json();

  const kmlObject: XmlElement = {
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

  const xml = toXML(kmlObject, {
    header: true,
    indent: "  ",
  });
  await writeFile("./places.kml", xml);
};

run();
