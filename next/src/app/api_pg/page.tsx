async function getData() {
  const res = await fetch('http://18.217.141.99/api/brk.b/6m')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  console.log("Success") 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main><p>{data}</p></main>
}
