export default function HomePageView() {
  return (
    <div className="h-screen">
      <h1>Homeee</h1>,
      <button
        className="text-red-600"
        onClick={() => {
          localStorage.removeItem("token");
        }}
      >
        Log out
      </button>
    </div>
  );
}
