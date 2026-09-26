import { getWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>
      <h1>FitLog</h1>

      <p>Total workouts: {workouts.length}</p>

      {workouts.map((workout) => (
        <div key={workout.id}>
          <h2>{workout.name}</h2>
          <p>{workout.equipment}</p>
          <p>{workout.duration} min</p>
        </div>
      ))}
    </main>
  );
}