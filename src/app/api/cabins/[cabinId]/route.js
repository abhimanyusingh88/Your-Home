// api endpoint
export async function GET(request,{params})
{
    // console.log(request);
    // console.log(params);
    const {cabinId}= params;
    return Response.json({test:"tesst"});
} 
// these are basically to make everything on server , easy and data fetching at a single place,
// can be used to hide api keys as this all will run on server
// you can write the fetch logic etc....