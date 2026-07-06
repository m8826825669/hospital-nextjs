import { redirect } from "next/navigation";

export default function HomePage() {
  //return <h1>Welcome to the Hospital Management System</h1>;
  redirect("/dashboard");
}
