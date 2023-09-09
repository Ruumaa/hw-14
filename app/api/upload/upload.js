// import { writeFile } from 'fs/promises'
// import { join } from 'path'

// export default function ServerUpload() {
//   async function upload(data){
//     const file = data.get('file')
//     if(!file){
//       throw new Error('No Files Uploaded')
//     }
//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     const path = join('/', 'tmp', file.name)
//     await writeFile(path,buffer)
//     console.log(`http://localhost:3000/${path}`)

//     return {success: true}
//   }
//   return(
//     <main>
//       <h1>React SSR Upload</h1>
//       <input type="file" name="file" />
//         <input type="submit" value="Upload" />
//     </main>
//   )
// }