const MAX_ICON_SEARCH_RESULT_COUNT = 15;

export async function searchIcons(query: string) {
  const response = await fetch(
    'https://api.fontawesome.com',
    {
      method: "POST",
      body: `query { search (version: "6.x", query: "${query}", first:${MAX_ICON_SEARCH_RESULT_COUNT} ) { id } }`
    });
  const results = (await response.json() as any).data.search.map((item: any) => item.id as string);
  return results;
}