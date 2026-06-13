import { createTripAction } from "./actions";
export default function NewTripPage() {
  return (
    <main className="max-w-md mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Create Trip
      </h1>

      <form 
        action  ={createTripAction}
        className="space-y-4"
        >
        <input
          name = "title"
          type="text"
          placeholder="Trip Title"
          className="w-full border rounded-lg p-3"
        />

        <input
          name = "country"
          type="text"   
          placeholder="Country"
          className="w-full border rounded-lg p-3"
        />

        <input
          name = "startDate"
          type="date"
          className="w-full border rounded-lg p-3"
        />

        <input
          name = "endDate"
          type="date"
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg p-3"
        >
          Save Trip
        </button>
      </form>
    </main>
  );
}