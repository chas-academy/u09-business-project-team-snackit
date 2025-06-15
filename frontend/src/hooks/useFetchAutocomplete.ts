// import { useEffect, useState } from "react";

// const API_URL =
//   import.meta.env.NODE_ENV === "prod"
//     ? import.meta.env.VITE_API_BASE_URL_PROD
//     : import.meta.env.VITE_API_BASE_URL_LOCAL;

// type Results = {
//     Titles: string[];
// }

// export const useFetchAutocomplete = () => {
//     const [results, setResults] = useState<Results |null>(null)
//     const [loadingResults, setLoadingResults] =useState(true);
//     const [errorResults, setErrorResults] = useState<Error | null>(null)

//     const fetchAutocomplete = async () => {
        
//         try{
//             // const res = await fetch(`${API_URL}/search`, {

//             })
//         } catch(err: unknown) {
//             if(err instanceof Error) {
//                 console.error(err)
//                 setErrorResults(err)
//             }
//         } finally {
//             setLoadingResults(false)
//         }
//     }
//     useEffect(() => {
//         fetchAutocomplete()
//     },[])
//     return {results, loadingResults, errorResults}
// }