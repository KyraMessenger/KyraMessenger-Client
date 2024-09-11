export default function HomePageView() {
  return (
    <div className="h-screen">
      ,
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
