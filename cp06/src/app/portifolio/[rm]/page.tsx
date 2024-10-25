 
export default async function Portifolio({params}:{params: {rm:string}}) {
  
  const { rm } = await params

  return (
    <div>{rm}</div>
  )
}
