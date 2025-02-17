const MAX_ICON_SEARCH_RESULT_COUNT = 15;
const FONT_AWESOME_VERSION = "6.x";

export async function searchIcons(query: string) {
  // We can only display free icons that support the "solid" style.
  // To increase the likelihood of getting enough displayable results to fill a
  //  page, we request 5 times as many results from the FontAwesome API.
  const searchApiResultCount = MAX_ICON_SEARCH_RESULT_COUNT * 5;
  const response = await fetch("https://api.fontawesome.com", {
    method: "POST",
    body: `query { search (version: "${FONT_AWESOME_VERSION}", query: "${query}", first:${searchApiResultCount} ) { id familyStylesByLicense { free { style } } } }`,
  });
  const results = (await response.json()) as any;
  if (results.errors !== undefined) {
    console.error(results.errors);
    return [];
  }
  // Filter out the icons we can't display;
  const freeSolidIcons = results.data.search.filter((item: any) =>
    item.familyStylesByLicense.free.some(
      (styleObject: any) => styleObject.style === "solid"
    )
  );
  // Return a list of icon IDs only.
  return freeSolidIcons
    .map((item: any) => item.id as string)
    .slice(0, MAX_ICON_SEARCH_RESULT_COUNT);
}
