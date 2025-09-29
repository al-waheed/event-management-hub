import { auth } from "./Firebase";

export const handleLogout = async () => {
  try {
    localStorage.clear();
    await auth.signOut();
    window.location.href = "/";
  } catch (e) {
    console.log(e.message);
  }
};
