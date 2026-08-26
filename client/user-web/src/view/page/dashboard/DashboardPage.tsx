import useSignoutViewModel from "@/viewmodel/auth/useSignoutViewModel";

export default function DashboardPage() {
  const {signoutHandler} = useSignoutViewModel()

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={signoutHandler}>로그아웃</button>
    </>
  )
}
