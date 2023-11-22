import api from "@/app/api/axiosConfig";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try{
    const body = await request.json();
    const {email,name,password} = body;
    const user = await api.post("api/v1/user/create",{name, email, password});
    return NextResponse.json(user);
  }
  catch(error){
    console.log(error,"Registration Error")
    return new NextResponse("Internal Error",{status:500})
  }
}