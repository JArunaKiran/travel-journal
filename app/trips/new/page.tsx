import { createTripAction } from "./actions";
import CreateTripForm from "@/components/CreateTripForm";

export default function NewTripPage() {
  return (
    <main className="max-w-md mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Create Trip
      </h1>
    <CreateTripForm
      action={createTripAction}
    />    
    </main>
  );
}