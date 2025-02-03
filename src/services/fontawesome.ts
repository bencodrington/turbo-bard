export async function searchIcons() {
  const query = "coff";
  const maxResultCount = 15;
  const response = await fetch(
    'https://api.fontawesome.com',
    {
      method: "POST",
      body: `query { search (version: \"6.x\", query: "${query}", first:${maxResultCount} ) { id } }`
    });
  const results = (await response.json() as any).data.search.map((item: any) => item.id);
  console.log(results);
}