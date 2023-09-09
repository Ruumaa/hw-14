import { NextResponse } from "next/server";

export function middleware(request) {
  //[endpoint client, endpoint server]
  const loginPath = ["/login", "/api/login"];
  //berisi path selanjutnya
  if (loginPath.some((v) => v === request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    //ambil nilai accessToken
    const accessToken = request.cookies.get("accessToken").value;
    if(!accessToken){
        return NextResponse.redirect(new URL("/login", request.url));

    } else{
        //masuk ke path selanjutnya
        return NextResponse.next();
    }
  }
}

export const config = {
  //path yg ingin jaga auth
  matcher: ["/books/:function*", "/", "/api/:function*"],
};
