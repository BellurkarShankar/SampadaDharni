import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
export default async function Home() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    if (payload.role === "SUPERADMIN") {
      return redirect("/super-admin");
    } else if (payload.role === "USER") {
      return redirect("/user");
    } else {
      return redirect("/auth");
    }
  }

  return <div>Visit auth page</div>;
}
